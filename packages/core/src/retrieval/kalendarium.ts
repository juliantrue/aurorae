/**
 * LITURGICAL CALENDAR RESOLVER (multi-rite + inheritance)
 * -------------------------------------------------------
 * Given a civil date (UTC) and a rite version code (e.g., "ROM1970", "ROM1962"),
 * determine which liturgical observance happens that day.
 *
 * Data model (Prisma):
 *   Rite → RiteVersion (with parentId for inheritance)
 *   Season (per RiteVersion)
 *   Rank   (per RiteVersion)
 *   MovableFeast, FixedFeast, SeasonalDay  (each row belongs to one RiteVersion)
 *
 * Algorithm (per date):
 *   1) Compute Easter for the year (Gregorian computus)
 *   2) Try MOVABLE feast    (offsetFromEaster == date - Easter) using inheritance chain
 *   3) Try FIXED feast      (monthNumber/dayNumber match)       using inheritance chain
 *   4) Else SEASONAL day    (season/week/weekday → key)        using inheritance chain
 *
 * Inheritance:
 *   We search in the selected RiteVersion first; if not found,
 *   we walk up parent → parent → ... until the root.
 *
 * Notes:
 *   - This file intentionally favors clarity over micro-optimizations.
 *   - All DB numbers are small (~hundreds of rows), so simple queries are fine.
 */

import { prisma } from '@aurorae/database';
import { computet } from '../lib/computet';

/* -------------------------------------------------------------------------- */
/* Basic Date Utilities                                                       */
/* -------------------------------------------------------------------------- */

/** Compare two UTC dates by Y/M/D only (ignore time). */
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

/** Add (or subtract) N whole days to a UTC date, returning a new Date. */
function offsetDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** Signed whole-day difference (b - a) in days, 00:00 UTC boundary. */
function diffDays(a: Date, b: Date): number {
  const MS = 24 * 60 * 60 * 1000;
  const aYmd = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const bYmd = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.round((bYmd - aYmd) / MS);
}

/* -------------------------------------------------------------------------- */
/* RiteVersion Inheritance Helpers                                            */
/* -------------------------------------------------------------------------- */

/**
 * Build the inheritance chain for a RiteVersion:
 * [selectedVersion, parent, grandparent, ...] until root.
 */
async function getVersionChain(slug: string) {
  const version = await prisma.riteVersion.findUnique({
    where: { slug },
    include: { parent: true },
  });
  if (!version) {
    throw new Error(`Unknown RiteVersion slug: ${slug}`);
  }

  const chain = [version];
  let cursor = version.parentId;

  // Walk upward to the root
  while (cursor) {
    const parent = await prisma.riteVersion.findUnique({
      where: { id: cursor },
      include: { parent: true },
    });
    if (!parent) break;
    chain.push(parent);
    cursor = parent.parentId;
  }

  return chain; // first element is the selected version
}

/* -------------------------------------------------------------------------- */
/* Presence-based “mode” detection (Ordinary vs. pre-1970)                    */
/* -------------------------------------------------------------------------- */

/**
 * Fetch the season keys defined for this RiteVersion (no inheritance).
 * We use this to detect whether the version provides pre-Lent (Septuagesimae)
 * and “Time after Pentecost” (PostPentecosten), etc.
 */
async function getOwnSeasonKeys(riteVersionId: number): Promise<Set<string>> {
  const seasons = await prisma.season.findMany({
    where: { riteVersionId },
    select: { key: true },
  });
  return new Set(seasons.map((s) => s.key));
}

/**
 * Determine which seasonal rule set to use:
 * - If the version defines "Septuagesimae" or "PostPentecosten",
 *   we assume an Extraordinary/Tridentine-like structure.
 * - Otherwise we assume Ordinary Form (1970/2002) structure.
 */
async function detectSeasonMode(riteVersionId: number): Promise<'OF' | 'EF'> {
  const keys = await getOwnSeasonKeys(riteVersionId);
  if (keys.has('Septuagesimae') || keys.has('PostPentecosten')) return 'EF';
  return 'OF';
}

/* -------------------------------------------------------------------------- */
/* Seasonal Boundary Helpers                                                  */
/* -------------------------------------------------------------------------- */

/**
 * OF (1970/2002) boundaries:
 *   Advent: 4 Sundays before Christmas → Dec 24
 *   Christmas: Dec 25 → Baptism of the Lord
 *   Lent: Ash Wednesday (Easter - 46) → Holy Thursday (not needed here)
 *   Easter: Easter Sunday → Pentecost (Easter + 49)
 *   Ordinary Time: after Baptism → day before Ash Wednesday, and after Pentecost → Advent
 *
 * EF (pre-1970) highlights we model here:
 *   - Pre-Lent: Septuagesima Sunday = 63 days before Easter (9 Sundays),
 *               continues until day before Ash Wednesday
 *   - “PostPentecosten”: Time after Pentecost (long green season) until Advent
 *
 * NOTE: This logic is intentionally simplified but correct in spirit.
 *       If you later encode full rubrical edge cases, you can drop them in.
 */

/** First Sunday of Advent in a given year (Sunday four weeks before Christmas). */
function findAdventStartOF(year: number): Date {
  const christmas = new Date(Date.UTC(year, 11, 25)); // Dec 25
  const weekday = christmas.getUTCDay(); // 0..6
  const daysToPrevSunday = (weekday + 7) % 7;
  const fourthSundayBefore = 21 + daysToPrevSunday; // 3 weeks + 1 Sunday
  return offsetDays(christmas, -fourthSundayBefore);
}

/** Epiphany is Jan 6 in the universal calendar; we use that here. */
function epiphany(year: number): Date {
  return new Date(Date.UTC(year, 0, 6));
}

/** Baptism of the Lord (OF): Sunday after Epiphany (Jan 6). */
function baptismOfTheLordOF(year: number): Date {
  const e = epiphany(year);
  const weekday = e.getUTCDay(); // 0=Sun ... 6=Sat
  return offsetDays(e, 7 - weekday);
}

/** Septuagesima Sunday (EF): 63 days before Easter. */
function septuagesimaSunday(easter: Date): Date {
  return offsetDays(easter, -63);
}

/** Ash Wednesday: 46 days before Easter (common to OF & EF). */
function ashWednesday(easter: Date): Date {
  return offsetDays(easter, -46);
}

/** Pentecost Sunday: 49 days after Easter. */
function pentecost(easter: Date): Date {
  return offsetDays(easter, +49);
}

/* -------------------------------------------------------------------------- */
/* Seasonal Day Computation (produces a key like QUADRAGESIMAE_03_FeriaQuinta)*/
/* -------------------------------------------------------------------------- */

/**
 * Compute the seasonal key for a given date/easter using OF rules.
 * Season keys expected in DB (per RiteVersion):
 *   Adventus, Nativitatis, Quadragesimae, Paschale, PerAnnum
 */
function computeSeasonalKeyOF(
  date: Date,
  easter: Date,
): {
  seasonKey: string; // e.g., "Quadragesimae"
  weekNumber: number;
  weekdayKey: string; // e.g., "FeriaQuinta"
} {
  const year = date.getUTCFullYear();

  // Core anchors
  const advStart = findAdventStartOF(year);
  const christmas = new Date(Date.UTC(year, 11, 25));
  const bapLord = baptismOfTheLordOF(year);
  const ashWed = ashWednesday(easter);
  const pent = pentecost(easter);

  // Determine season
  let seasonKey: string;
  let seasonStart: Date;

  if (date >= advStart && date < christmas) {
    seasonKey = 'Adventus';
    seasonStart = advStart;
  } else if (date >= christmas && date < ashWed) {
    seasonKey = 'Nativitatis';
    seasonStart = christmas;
  } else if (date >= ashWed && date < easter) {
    seasonKey = 'Quadragesimae';
    seasonStart = ashWed;
  } else if (date >= easter && date <= pent) {
    seasonKey = 'Paschale';
    seasonStart = easter;
  } else {
    // Ordinary Time: split across the year
    // If date < Ash Wednesday, we’re in OT-I (after Baptism → before Lent)
    // Else OT-II (after Pentecost → before Advent)
    const advStartNext = findAdventStartOF(year);
    if (date < ashWed) {
      seasonKey = 'PerAnnum';
      seasonStart = bapLord;
    } else {
      seasonKey = 'PerAnnum';
      seasonStart = offsetDays(pent, 1); // Monday after Pentecost
      // If date is in Advent already, this branch won’t be used (caught by Advent case above)
    }
  }

  // Week number = count from seasonStart (0-based → +1)
  const w = Math.floor(diffDays(seasonStart, date) / 7) + 1;

  // Latin weekday labels (as per schema enum DiesHebdomadis)
  const weekdayKeys = [
    'Dominica', // Sunday
    'FeriaSecunda', // Monday
    'FeriaTertia', // Tuesday
    'FeriaQuarta', // Wednesday
    'FeriaQuinta', // Thursday
    'FeriaSexta', // Friday
    'Sabbatum', // Saturday
  ];
  const weekdayKey = weekdayKeys[date.getUTCDay()];

  return { seasonKey, weekNumber: w, weekdayKey };
}

/**
 * Compute the seasonal key for EF-like versions (pre-1970):
 * Season keys expected (examples): Adventus, Nativitatis, Septuagesimae, Quadragesimae, Paschale, PostPentecosten
 *
 * Simplified structure:
 *   - Advent: same as OF (4 Sundays before Christmas → Dec 24)
 *   - Christmas: Dec 25 → day before Septuagesima (if very early) or Ash Wednesday (practically it hits Pre-Lent)
 *   - Pre-Lent (Septuagesimae): from Septuagesima Sunday (Easter-63) → day before Ash Wednesday
 *   - Lent: Ash Wednesday → Easter
 *   - Easter: Easter → Pentecost
 *   - PostPentecosten: Monday after Pentecost → Advent
 *
 * If the version doesn’t define one of these keys, you can map it later or
 * allow inheritance to supply the missing SeasonalDay rows.
 */
function computeSeasonalKeyEF(
  date: Date,
  easter: Date,
): {
  seasonKey: string;
  weekNumber: number;
  weekdayKey: string;
} {
  const year = date.getUTCFullYear();
  const advStart = findAdventStartOF(year);
  const christmas = new Date(Date.UTC(year, 11, 25));
  const septu = septuagesimaSunday(easter);
  const ashWed = ashWednesday(easter);
  const pent = pentecost(easter);

  let seasonKey: string;
  let seasonStart: Date;

  if (date >= advStart && date < christmas) {
    seasonKey = 'Adventus';
    seasonStart = advStart;
  } else if (date >= christmas && date < septu) {
    // Time after Epiphany (many EF editions treat this implicitly)
    // If you have a dedicated key in your Season table, use it instead.
    seasonKey = 'Nativitatis';
    seasonStart = christmas;
  } else if (date >= septu && date < ashWed) {
    seasonKey = 'Septuagesimae';
    seasonStart = septu;
  } else if (date >= ashWed && date < easter) {
    seasonKey = 'Quadragesimae';
    seasonStart = ashWed;
  } else if (date >= easter && date <= pent) {
    seasonKey = 'Paschale';
    seasonStart = easter;
  } else {
    // Long green season after Pentecost in EF
    seasonKey = 'PostPentecosten';
    seasonStart = offsetDays(pent, 1); // Monday after Pentecost
  }

  const w = Math.floor(diffDays(seasonStart, date) / 7) + 1;

  const weekdayKeys = [
    'Dominica',
    'FeriaSecunda',
    'FeriaTertia',
    'FeriaQuarta',
    'FeriaQuinta',
    'FeriaSexta',
    'Sabbatum',
  ];
  const weekdayKey = weekdayKeys[date.getUTCDay()];

  return { seasonKey, weekNumber: w, weekdayKey };
}

/* -------------------------------------------------------------------------- */
/* Inheritance-aware lookups                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Movable feast lookup:
 *   offset = (date - Easter) in whole days
 *   Find MovableFeast with matching offset in the selected version,
 *   otherwise walk up the inheritance chain (parent, grandparent...).
 */
async function findMovableWithInheritance(
  targetDate: Date,
  easter: Date,
  versionChain: Array<{ id: number }>,
) {
  const offset = diffDays(easter, targetDate); // positive if after Easter
  for (const v of versionChain) {
    const feast = await prisma.movableFeast.findFirst({
      where: { riteVersionId: v.id, offsetFromEaster: offset },
      include: { rank: true },
    });
    if (feast) return feast;
  }
  return null;
}

/**
 * Fixed feast lookup:
 *   Match monthNumber/dayNumber for the date; search version → parent → ...
 */
async function findFixedWithInheritance(targetDate: Date, versionChain: Array<{ id: number }>) {
  const monthNumber = targetDate.getUTCMonth() + 1;
  const dayNumber = targetDate.getUTCDate();
  for (const v of versionChain) {
    const feast = await prisma.fixedFeast.findFirst({
      where: { riteVersionId: v.id, monthNumber, dayNumber },
      include: { rank: true },
    });
    if (feast) return feast;
  }
  return null;
}

/**
 * Seasonal day lookup:
 *   1) Compute seasonal key (season/week/weekday) for the target date
 *      using OF or EF rules depending on the *selected* version’s own Season set.
 *   2) Try to find a SeasonalDay with that key in the selected version,
 *      else walk up to parents.
 */
async function findSeasonalWithInheritance(
  targetDate: Date,
  easter: Date,
  selectedVersionId: number,
  versionChain: Array<{ id: number }>,
) {
  // Decide which seasonal rule set to use based on the selected version only
  const mode = await detectSeasonMode(selectedVersionId);
  const { seasonKey, weekNumber, weekdayKey } =
    mode === 'OF'
      ? computeSeasonalKeyOF(targetDate, easter)
      : computeSeasonalKeyEF(targetDate, easter);

  const seasonalKey = `${seasonKey.toUpperCase()}_${String(weekNumber).padStart(
    2,
    '0',
  )}_${weekdayKey}`;

  for (const v of versionChain) {
    const row = await prisma.seasonalDay.findFirst({
      where: { riteVersionId: v.id, key: seasonalKey },
      include: { rank: true, season: true },
    });
    if (row) return row;
  }

  // If not found in DB (e.g., you haven’t populated every week),
  // return a “synthetic” fallback object suitable for UI/rendering.
  return {
    key: seasonalKey,
    description: seasonalKey,
    rank: { key: 'ferialis', name: 'Ferialis' }, // default
  } as any;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Resolve the liturgical observance for a given UTC date and RiteVersion code.
 *
 * @param date UTC Date (use Date.UTC to construct)
 * @param versionCode e.g., "ROM1970", "ROM1962", "ROM1570"
 *
 * @returns { type, key, name, rank, sourceVersion }
 *   - type: "movable" | "fixed" | "seasonal"
 *   - key: the stable key of the observance (e.g., "EASTER_SUNDAY", "QUADRAGESIMAE_03_FeriaQuinta")
 *   - name/description: best human name available
 *   - rank: the Rank row (or minimal fallback)
 *   - sourceVersion: which RiteVersion id actually supplied the row (after inheritance)
 */
export async function resolveLiturgicalDay(
  date: Date,
  versionCode: string,
): Promise<{
  type: 'movable' | 'fixed' | 'seasonal';
  key: string;
  name: string;
  rank: { key: string; name: string; precedence?: number | null };
  sourceVersion: { id: number; slug: string };
}> {
  // 0) Build inheritance chain (selected → parent → grandparent ...)
  const chain = await getVersionChain(versionCode); // first element is “selected”
  const selected = chain[0];

  // 1) Compute Easter for the civil year of the date.
  const year = date.getUTCFullYear();
  const easter = computet(year);

  // 2) MOVABLE
  const mov = await findMovableWithInheritance(date, easter, chain);
  if (mov) {
    const src = chain.find((v) => v.id === mov.riteVersionId)!;
    return {
      type: 'movable',
      key: mov.key,
      name: mov.name,
      rank: {
        key: mov.rank.key,
        name: mov.rank.name,
        precedence: mov.rank.precedence ?? null,
      },
      sourceVersion: { id: src.id, slug: src.slug },
    };
  }

  // 3) FIXED
  const fix = await findFixedWithInheritance(date, chain);
  if (fix) {
    const src = chain.find((v) => v.id === fix.riteVersionId)!;
    return {
      type: 'fixed',
      key: fix.key,
      name: fix.name,
      rank: {
        key: fix.rank.key,
        name: fix.rank.name,
        precedence: fix.rank.precedence ?? null,
      },
      sourceVersion: { id: src.id, slug: src.slug },
    };
  }

  // 4) SEASONAL
  const sea = await findSeasonalWithInheritance(date, easter, selected.id, chain);

  // If it came from DB, it has riteVersionId; otherwise, it’s a fallback object.
  const source =
    'riteVersionId' in sea ? chain.find((v) => v.id === (sea as any).riteVersionId)! : selected;

  return {
    type: 'seasonal',
    key: sea.key,
    name: sea.description ?? sea.key,
    rank: {
      key: sea.rank.key,
      name: sea.rank.name,
      precedence: sea.rank.precedence ?? null,
    },
    sourceVersion: { id: source.id, slug: source.slug },
  };
}

/* -------------------------------------------------------------------------- */
/* Example Usage (manual test)                                                */
/* -------------------------------------------------------------------------- */
/*
(async () => {
  // March 5, 2025 (UTC) — Ash Wednesday in 2025
  const d = new Date(Date.UTC(2025, 2, 5));
  console.log(await resolveLiturgicalDay(d, "ROM1970")); // Ordinary Form
  console.log(await resolveLiturgicalDay(d, "ROM1962")); // Extraordinary Form (pre-Lent exists)
})();
*/
