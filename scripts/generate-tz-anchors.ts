// scripts/build-tz-anchors.mjs
import { writeFile } from 'node:fs/promises';

const ZONE1970_URL = 'https://data.iana.org/time-zones/tzdb/zone1970.tab';
const BACKWARD_URL = 'https://data.iana.org/time-zones/tzdb/backward';

// Parse TZDB ISO 6709 coords: ±DDMM±DDDMM or ±DDMMSS±DDDMMSS
// Examples: +404251-0740023 or +515030-0000731
type Coord = { lat: number; lon: number };

function parseIso6709(coord: string): Coord {
  // split into lat part and lon part by finding the second sign
  const idx = coord.slice(1).search(/[+-]/) + 1;
  const latStr = coord.slice(0, idx);
  const lonStr = coord.slice(idx);

  const parsePart = (s: string, isLon: boolean): number => {
    const sign = s[0] === '-' ? -1 : 1;
    const digits = s.slice(1);
    const degLen = isLon ? 3 : 2;

    const deg = Number(digits.slice(0, degLen));
    const min = Number(digits.slice(degLen, degLen + 2));

    let sec = 0;
    if (digits.length === degLen + 4) {
      sec = Number(digits.slice(degLen + 2, degLen + 4));
    } else if (digits.length !== degLen + 2) {
      throw new Error(`Unexpected ISO6709 coord part: ${s}`);
    }

    return sign * (deg + min / 60 + sec / 3600);
  };

  return {
    lat: parsePart(latStr, false),
    lon: parsePart(lonStr, true),
  };
}

function parseZone1970Tab(text: string): Record<string, Coord> {
  const map: Record<string, Coord> = {};
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue;
    // columns: countries \t coordinates \t zone \t [comments]
    const [, coord, zone] = line.split('\t');
    if (!coord || !zone) continue;
    map[zone.trim()] = parseIso6709(coord.trim());
  }
  return map;
}

// Parse `backward` to build alias -> canonical map using "Link TARGET LINKNAME"
function parseBackward(text: string): Record<string, string> {
  const aliasToCanonical: Record<string, string> = {};
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    // e.g. Link  America/New_York  US/Eastern
    const m = line.match(/^Link\s+(\S+)\s+(\S+)\s*$/);
    if (!m) continue;
    const [, canonical, alias] = m;
    aliasToCanonical[alias] = canonical;
  }
  return aliasToCanonical;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return await res.text();
}

async function main() {
  const zone1970Text = await fetchText(ZONE1970_URL);
  const anchors = parseZone1970Tab(zone1970Text);

  // Optional: include aliases for "100% IANA names" coverage
  const backwardText = await fetchText(BACKWARD_URL);
  const aliases = parseBackward(backwardText);

  // Expand anchors with alias entries
  for (const [alias, canonical] of Object.entries(aliases)) {
    const coord = anchors[canonical];
    if (coord) anchors[alias] = coord;
  }

  await writeFile('tz-anchors.json', JSON.stringify(anchors, null, 2) + '\n', 'utf8');
  console.log(`Wrote tz-anchors.json with ${Object.keys(anchors).length} entries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
