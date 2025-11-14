import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import process from 'process';

import { Prisma, PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATHS = {
  chants: path.join(SCRIPT_DIR, 'GregoBase Chants.csv'),
  sources: path.join(SCRIPT_DIR, 'GregoBase Sources.csv'),
  chantSources: path.join(SCRIPT_DIR, 'GregoBase Chant Sources.csv'),
} as const;

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

    inputs.push({
      name: chant.incipit?.trim() || `Chant ${chant.id}`,
      mode: combineMode(chant),
      gabc,
      chantSourceId,
      chantUsageId,
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

async function main() {
  const { chantRows, sourceRows, chantSourceRows } = await loadCsvData();
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

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
