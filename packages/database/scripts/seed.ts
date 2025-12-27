import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import process from 'process';

import { Prisma, PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { normalizeChantSearchKey } from '../src/normalizeChantSearchKey';

const prisma = new PrismaClient();

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATHS = {
  chants: path.join(SCRIPT_DIR, 'GregoBase Chants.csv'),
  sources: path.join(SCRIPT_DIR, 'GregoBase Sources.csv'),
  chantSources: path.join(SCRIPT_DIR, 'GregoBase Chant Sources.csv'),
} as const;

const LIBER_ANTIPHONARIUS_PATH = path.join(SCRIPT_DIR, 'liber_antiphonarius.json');

type GregoBaseSourceRow = {
  id: string;
  year: string;
  period: string;
  editor: string;
  title: string;
  description: string;
  caption: string;
  pages: string;
  urls: string;
};

type GregoBaseChantRow = {
  id: string;
  cantusid: string;
  version: string;
  incipit: string;
  initial: string;
  'office-part': string;
  mode: string;
  mode_var: string;
  transcriber: string;
  commentary: string;
  headers: string;
  gabc: string;
  gabc_verses: string;
  tex_verses: string;
  remarks: string;
  copyrighted: string;
  duplicateof: string;
};

type GregoBaseChantSourceRow = {
  chant_id: string;
  source: string;
  page: string;
  sequence: string;
  extent: string;
};

type LiberAntiphonariusEntry = {
  text: string;
  gabc: string;
};

type SeedRows = {
  chantRows: GregoBaseChantRow[];
  sourceRows: GregoBaseSourceRow[];
  chantSourceRows: GregoBaseChantSourceRow[];
};

async function main() {
  if (process.env.SEED_FROM_CSVS === 'true') {
    await seedFromCsvs();
    return;
  }

  await seedLiberAntiphonarius();
}

const USAGE_LABEL_OVERRIDES: Record<string, string> = {
  al: 'Alleluia',
  an: 'Antiphon',
  ca: 'Canticle',
  co: 'Communion',
  gr: 'Gradual',
  hy: 'Hymn',
  in: 'Introit',
  ma: 'Magnificat Antiphon',
  of: 'Offertory',
  ps: 'Psalm',
  re: 'Responsory',
  se: 'Sequence',
  tr: 'Tract',
  ve: 'Versicle',
};

async function readCsv<T>(filePath: string): Promise<T[]> {
  const raw = await readFile(filePath, 'utf8');
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
  }) as T[];
}

function toInt(value: string, label: string): number {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Expected numeric ${label}, received "${value}"`);
  }
  return parsed;
}

function deriveSourceCode(externalId: string): string {
  return `GBS-${externalId}`;
}

function normaliseUsage(value?: string): string {
  return value?.trim().toLowerCase() || 'unknown';
}

function usageLabel(key: string): string {
  if (key === 'unknown') {
    return 'Unknown usage';
  }
  return USAGE_LABEL_OVERRIDES[key] ?? key;
}

function extractGabc(raw: string | undefined): string {
  if (!raw) {
    return '';
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      for (const entry of parsed) {
        if (Array.isArray(entry) && entry[0] === 'gabc' && typeof entry[1] === 'string') {
          return entry[1].replace(/\r\n/g, '\n');
        }
      }
    }
  } catch {
    // fall through to raw string
  }

  return raw;
}

function combineMode(chant: GregoBaseChantRow): string {
  const mode = chant.mode?.trim() ?? '';
  const variant = chant.mode_var?.trim() ?? '';
  if (mode && variant) {
    return `${mode}${variant}`;
  }
  return mode || variant || '?';
}

function parseGabcHeaderValue(gabc: string, key: string): string | undefined {
  const header = gabc.split('%%')[0] ?? '';
  const normalizedKey = key.toLowerCase();

  for (const line of header.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) {
      continue;
    }

    const fieldKey = trimmed.slice(0, colonIndex).trim().toLowerCase();
    if (fieldKey !== normalizedKey) {
      continue;
    }

    return trimmed.slice(colonIndex + 1).trim().replace(/;$/, '').trim();
  }

  return undefined;
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function loadCsvData() {
  const [chantRows, sourceRows, chantSourceRows] = await Promise.all([
    readCsv<GregoBaseChantRow>(CSV_PATHS.chants),
    readCsv<GregoBaseSourceRow>(CSV_PATHS.sources),
    readCsv<GregoBaseChantSourceRow>(CSV_PATHS.chantSources),
  ]);

  return { chantRows, sourceRows, chantSourceRows };
}

async function loadLiberAntiphonariusData() {
  const raw = await readFile(LIBER_ANTIPHONARIUS_PATH, 'utf8');
  return JSON.parse(raw) as LiberAntiphonariusEntry[];
}

async function resetTables() {
  await prisma.$transaction([
    prisma.gabcSource.deleteMany(),
    prisma.chantUsage.deleteMany(),
    prisma.chantSource.deleteMany(),
  ]);
}

async function seedChantSources(rows: GregoBaseSourceRow[]) {
  const sourceIdMap = new Map<string, number>();

  for (const row of rows) {
    const data = {
      code: deriveSourceCode(row.id),
      title: row.title?.trim() || `Unknown Source ${row.id}`,
      year: toInt(row.year, `year for source ${row.id}`),
      editor: row.editor?.trim() || null,
      publisher: null,
    };

    const created = await prisma.chantSource.create({ data });
    sourceIdMap.set(row.id, created.id);
  }

  return sourceIdMap;
}

async function seedChantUsage(rows: GregoBaseChantRow[]) {
  const usageSet = new Set<string>();
  for (const chant of rows) {
    usageSet.add(normaliseUsage(chant['office-part']));
  }

  const usageIdMap = new Map<string, number>();
  for (const key of usageSet) {
    const created = await prisma.chantUsage.create({
      data: {
        key,
        label: usageLabel(key),
      },
    });
    usageIdMap.set(key, created.id);
  }

  return usageIdMap;
}

function buildGabcSourceInputs(
  chantSourceRows: GregoBaseChantSourceRow[],
  chantRows: GregoBaseChantRow[],
  sourceIdMap: Map<string, number>,
  usageIdMap: Map<string, number>,
): Prisma.GabcSourceCreateManyInput[] {
  const chantById = new Map(chantRows.map((row) => [row.id, row]));
  const inputs: Prisma.GabcSourceCreateManyInput[] = [];
  let skipped = 0;

  for (const row of chantSourceRows) {
    const chant = chantById.get(row.chant_id);
    const chantSourceId = sourceIdMap.get(row.source);
    if (!chant || !chantSourceId) {
      skipped += 1;
      continue;
    }

    const usageKey = normaliseUsage(chant['office-part']);
    const chantUsageId = usageIdMap.get(usageKey);
    if (!chantUsageId) {
      skipped += 1;
      continue;
    }

    const gabc = extractGabc(chant.gabc);
    if (!gabc) {
      skipped += 1;
      continue;
    }

    const name = chant.incipit?.trim() || `Chant ${chant.id}`;
    inputs.push({
      name,
      mode: combineMode(chant),
      gabc,
      chantSourceId,
      chantUsageId,
      searchKey: normalizeChantSearchKey(chant.incipit ?? name),
    });
  }

  if (skipped > 0) {
    console.warn(`Skipped ${skipped} chant-source rows due to missing data`);
  }

  return inputs;
}

async function seedGabcSources(data: Prisma.GabcSourceCreateManyInput[]) {
  const CHUNK_SIZE = 250;
  let inserted = 0;

  for (const chunk of chunkArray(data, CHUNK_SIZE)) {
    await prisma.gabcSource.createMany({ data: chunk });
    inserted += chunk.length;
  }

  return inserted;
}

async function ensureLiberAntiphonariusSource() {
  return prisma.chantSource.upsert({
    where: { code: 'LA1960' },
    update: {
      title: 'Liber antiphonarius',
      year: 1960,
      editor: null,
      publisher: null,
    },
    create: {
      code: 'LA1960',
      title: 'Liber antiphonarius',
      year: 1960,
      editor: null,
      publisher: null,
    },
  });
}

async function seedLiberAntiphonariusUsage(entries: LiberAntiphonariusEntry[]) {
  const usageSet = new Set<string>();
  for (const entry of entries) {
    const usage = parseGabcHeaderValue(entry.gabc, 'office-part');
    usageSet.add(normaliseUsage(usage));
  }

  const usageIdMap = new Map<string, number>();
  for (const key of usageSet) {
    const usage = await prisma.chantUsage.upsert({
      where: { key },
      update: { label: usageLabel(key) },
      create: { key, label: usageLabel(key) },
    });
    usageIdMap.set(key, usage.id);
  }

  return usageIdMap;
}

function buildLiberAntiphonariusInputs(
  entries: LiberAntiphonariusEntry[],
  chantSourceId: number,
  usageIdMap: Map<string, number>,
): Prisma.GabcSourceCreateManyInput[] {
  const inputs: Prisma.GabcSourceCreateManyInput[] = [];
  let skipped = 0;

  for (const entry of entries) {
    const gabc = extractGabc(entry.gabc);
    if (!gabc) {
      skipped += 1;
      continue;
    }

    const usageKey = normaliseUsage(parseGabcHeaderValue(gabc, 'office-part'));
    const chantUsageId = usageIdMap.get(usageKey);
    if (!chantUsageId) {
      skipped += 1;
      continue;
    }

    const name =
      entry.text?.trim() || parseGabcHeaderValue(gabc, 'name')?.trim() || 'Unknown chant';
    const mode = parseGabcHeaderValue(gabc, 'mode')?.trim() || '?';

    inputs.push({
      name,
      mode,
      gabc,
      chantSourceId,
      chantUsageId,
      searchKey: normalizeChantSearchKey(name),
    });
  }

  if (skipped > 0) {
    console.warn(`Skipped ${skipped} Liber antiphonarius chants due to missing data`);
  }

  return inputs;
}

async function seedLiberAntiphonarius() {
  const entries = await loadLiberAntiphonariusData();
  console.log(`Loaded ${entries.length} Liber antiphonarius chants`);

  await resetTables();

  const source = await ensureLiberAntiphonariusSource();
  const usageIdMap = await seedLiberAntiphonariusUsage(entries);

  const gabcInputs = buildLiberAntiphonariusInputs(entries, source.id, usageIdMap);
  const gabcCount = await seedGabcSources(gabcInputs);

  console.log(
    `Inserted 1 chant source, ${usageIdMap.size} usages, ${gabcCount} GABC sources`,
  );
}

async function seedFromRows({ chantRows, sourceRows, chantSourceRows }: SeedRows) {
  console.log(
    `Loaded ${sourceRows.length} sources, ${chantRows.length} chants, ${chantSourceRows.length} chant-source links`,
  );

  await resetTables();

  const [sourceIdMap, usageIdMap] = await Promise.all([
    seedChantSources(sourceRows),
    seedChantUsage(chantRows),
  ]);

  const gabcInputs = buildGabcSourceInputs(chantSourceRows, chantRows, sourceIdMap, usageIdMap);
  const gabcCount = await seedGabcSources(gabcInputs);

  console.log(
    `Inserted ${sourceIdMap.size} chant sources, ${usageIdMap.size} usages, ${gabcCount} GABC sources`,
  );
}

async function seedFromCsvs() {
  const rows = await loadCsvData();
  await seedFromRows(rows);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
