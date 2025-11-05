/**
 * Script to ingest Divinum Officium "horas" data into the Prisma database.
 *
 * Focuses on the Latin sources under vendor/divinum-officium/web/www/horas and normalises
 * each .txt file into LiturgicalDay plus per-hour Office records. The raw sections are stored
 * as JSON inside `Office.rubric` so downstream tooling can reconstruct the layout.
 *
 * Usage:
 *   pnpm prisma:generate
 *   pnpm ts-node scripts/import-divinum-officium.ts
 *
 * WARNING: the script truncates existing office-related tables before import.
 */

import path from 'node:path';
import { access, readFile, readdir } from 'node:fs/promises';
import process from 'node:process';
import { PrismaClient, OfficeHour, Season, Rank, LiturgicalDay } from '@prisma/client';

const prisma = new PrismaClient();

const HORAS_BASE_DIR = path.join(
  process.cwd(),
  'vendor',
  'divinum-officium',
  'web',
  'www',
  'horas',
);

const MISSA_BASE_DIR = path.join(
  process.cwd(),
  'vendor',
  'divinum-officium',
  'web',
  'www',
  'missa',
);

const TARGET_LANGUAGES = ['Latin'] as const;
const TARGET_FOLDERS = ['Tempora', 'Sancti', 'Commune'] as const;

const OfficeHourEnum = OfficeHour;
const SeasonEnum = Season;
const RankEnum = Rank;

type OfficeHourDefinition = {
  hour: OfficeHour;
  patterns: RegExp[];
};

type SectionEntry = {
  key: string;
  body: string;
};

type RankInfo = {
  name: string | null;
  descriptor: string | null;
  precedence: number | null;
  raw: string | null;
};

type ImportMetadata = {
  language: string;
  folder: string;
  fileName: string;
  sourcePath: string;
  slug: string;
  rank: RankInfo;
  rules: string[];
  scriptura: string | undefined;
  hour?: OfficeHour;
  sections: SectionEntry[];
};

const METADATA_KEYS = new Set(['Rank', 'Rule', 'Scriptura', 'Name', 'Officium']);
const MASS_METADATA_KEYS = METADATA_KEYS;

const HOUR_PATTERNS: OfficeHourDefinition[] = [
  {
    hour: OfficeHourEnum.MATUTINUM,
    patterns: [
      /Matutin/i,
      /^Lectio/i,
      /^Responsory/i,
      /^Invit/i,
      /^Nocturn/i,
      /^Versum/i,
      /^Absolutio/i,
      /^Benedictio/i,
      /^Te Deum/i,
    ],
  },
  {
    hour: OfficeHourEnum.LAUDES,
    patterns: [/Laud/i, /^Benedictus/i, /^Psalmi Laudes/i, /^Ant Laudes/i, /^Preces Laudes/i],
  },
  {
    hour: OfficeHourEnum.PRIMA,
    patterns: [/Prima/i, /^Capitulum Prima/i, /^Psalmi Prima/i],
  },
  {
    hour: OfficeHourEnum.TERTIA,
    patterns: [/Tertia/i, /^Capitulum Tertia/i, /^Psalmi Tertia/i],
  },
  {
    hour: OfficeHourEnum.SEXTA,
    patterns: [/Sexta/i, /^Capitulum Sexta/i, /^Psalmi Sexta/i],
  },
  {
    hour: OfficeHourEnum.NONA,
    patterns: [/Nona/i, /^Capitulum Nona/i, /^Psalmi Nona/i],
  },
  {
    hour: OfficeHourEnum.VESPERAE,
    patterns: [/Vesper/i, /^Magnificat/i, /^Capitulum Vesper/i, /^Oratio$/i, /^Preces Vesper/i],
  },
  {
    hour: OfficeHourEnum.COMPLETORIUM,
    patterns: [/Completor/i, /^Ant Completorium/i, /^Hymnus Completorium/i],
  },
];

async function pathExists(candidatePath: string): Promise<boolean> {
  try {
    await access(candidatePath);
    return true;
  } catch {
    return false;
  }
}

function parseHorasFile(content: string): Map<string, string> {
  const lines = content.split(/\r?\n/);
  const sections = new Map<string, string>();
  let currentKey: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (!currentKey) {
      buffer = [];
      return;
    }
    const text = buffer.join('\n').trim();
    sections.set(currentKey, text);
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^\[(.+)]$/);
    if (match) {
      flush();
      currentKey = match[1]?.trim() ?? null;
    } else {
      buffer.push(line);
    }
  }

  flush();
  return sections;
}

function extractFirstNonEmptyLine(block?: string | null): string | null {
  if (!block) return null;
  const line = block
    .split(/\r?\n/)
    .map((item) => item.trim())
    .find((item) => item.length > 0);
  return line ?? null;
}

function parseRank(rawRank?: string): RankInfo {
  if (!rawRank) {
    return {
      name: null,
      descriptor: null,
      precedence: null,
      raw: null,
    };
  }

  const firstLine = extractFirstNonEmptyLine(rawRank);
  if (!firstLine) {
    return {
      name: null,
      descriptor: null,
      precedence: null,
      raw: rawRank,
    };
  }

  const parts = firstLine.split(';;');
  const name = parts[0] ? parts[0].trim() : null;
  const descriptor = parts[1] ? parts[1].trim() : null;
  const precedenceCandidate = parts[2] ? parts[2].trim() : null;
  let precedence: number | null = null;

  if (precedenceCandidate) {
    const numeric = Number.parseFloat(precedenceCandidate.replace(/[^0-9.]/g, ''));
    if (Number.isFinite(numeric)) {
      precedence = numeric;
    }
  }

  return {
    name,
    descriptor,
    precedence,
    raw: rawRank,
  };
}

function parseRules(rawRules?: string): string[] {
  if (!rawRules) return [];
  return rawRules
    .split(/\r?\n/)
    .map((line) => line.replace(/;$/, '').trim())
    .filter((line) => line.length > 0);
}

function inferSeason(folder: string, baseName: string): Season {
  if (folder === 'Tempora') {
    return inferSeasonFromTempora(baseName);
  }
  if (folder === 'Sancti') {
    return inferSeasonFromSancti(baseName);
  }
  return SeasonEnum.TEMPUS_POST_PENTECOSTEN;
}

function inferSeasonFromTempora(baseName: string): Season {
  const lower = baseName.toLowerCase();

  if (lower.startsWith('adv')) return SeasonEnum.ADVENTUS;
  if (lower.startsWith('nat')) return SeasonEnum.NATIVITAS;
  if (lower.startsWith('epip') || lower.startsWith('epi')) return SeasonEnum.EPIPHANIA;
  if (lower.startsWith('sept')) return SeasonEnum.SEPTUAGESIMA;
  if (lower.startsWith('quadp')) return SeasonEnum.TEMPUS_PASSIONIS;
  if (lower.startsWith('quad')) return SeasonEnum.QUADRAGESIMA;
  if (lower.startsWith('pasc')) return SeasonEnum.PASCHA;
  if (lower.startsWith('pent')) return SeasonEnum.PENTECOSTES;

  const numericPrefix = Number.parseInt(lower.slice(0, 3), 10);
  if (Number.isFinite(numericPrefix)) {
    return SeasonEnum.TEMPUS_POST_PENTECOSTEN;
  }

  return SeasonEnum.TEMPUS_POST_PENTECOSTEN;
}

function inferSeasonFromSancti(baseName: string): Season {
  const month = Number.parseInt(baseName.slice(0, 2), 10);
  if (!Number.isFinite(month)) {
    return SeasonEnum.TEMPUS_POST_PENTECOSTEN;
  }

  if (month === 12 || month === 1) return SeasonEnum.NATIVITAS;
  if (month === 2) return SeasonEnum.EPIPHANIA;
  if (month === 3) return SeasonEnum.SEPTUAGESIMA;
  if (month === 4) return SeasonEnum.QUADRAGESIMA;
  if (month === 5) return SeasonEnum.PASCHA;
  if (month === 6) return SeasonEnum.PENTECOSTES;
  if (month === 11) return SeasonEnum.ADVENTUS;

  return SeasonEnum.TEMPUS_POST_PENTECOSTEN;
}

function mapRankDescriptorToEnum(descriptor: string | null): Rank {
  if (!descriptor) return RankEnum.FEAST;

  const lower = descriptor.toLowerCase();
  if (lower.includes('dominica')) return RankEnum.SUNDAY;
  if (lower.includes('feria')) return RankEnum.FERIA;
  if (lower.includes('semiduplex')) return RankEnum.SEMIDOUBLE;
  if (lower.includes('simplex')) return RankEnum.SIMPLE;
  if (lower.includes('duplex')) return RankEnum.DOUBLE;

  return RankEnum.FEAST;
}

function makeSlug(...parts: Array<string | null | undefined>): string {
  return parts
    .filter((part): part is string => Boolean(part))
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    )
    .filter((part) => part.length > 0)
    .join('-');
}

function splitSectionsByHour(sections: Map<string, string>): Map<OfficeHour, SectionEntry[]> {
  const hourMap = new Map<OfficeHour, SectionEntry[]>();
  const unmatched: SectionEntry[] = [];

  for (const [key, rawValue] of sections) {
    if (METADATA_KEYS.has(key)) continue;
    const value = (rawValue ?? '').trim();
    if (!value) continue;

    const definition = HOUR_PATTERNS.find((item) =>
      item.patterns.some((pattern) => pattern.test(key)),
    );

    if (!definition) {
      unmatched.push({ key, body: value });
      continue;
    }

    const existing = hourMap.get(definition.hour) ?? [];
    existing.push({ key, body: value });
    hourMap.set(definition.hour, existing);
  }

  if (unmatched.length > 0) {
    const fallback = hourMap.get(OfficeHourEnum.MATUTINUM) ?? [];
    hourMap.set(OfficeHourEnum.MATUTINUM, fallback.concat(unmatched));
  }

  return hourMap;
}

async function resetLiturgicalData(): Promise<void> {
  await prisma.$transaction([
    prisma.antiphon.deleteMany(),
    prisma.officeHymnAssignment.deleteMany(),
    prisma.officePsalmAssignment.deleteMany(),
    prisma.massProper.deleteMany(),
    prisma.massOrdinary.deleteMany(),
    prisma.office.deleteMany(),
    prisma.calendarMapping.deleteMany(),
    prisma.liturgicalDay.deleteMany(),
  ]);
}

function buildDayDescription(rankDescriptor: string | null, relativePath: string): string {
  const descriptorPart = rankDescriptor ? `Rank: ${rankDescriptor}` : 'Rank: n/a';
  const pathPart = `Source: ${relativePath}`;
  return `${descriptorPart} | ${pathPart}`;
}

async function ensureLiturgicalDay(data: {
  slug: string;
  name: string;
  rank: Rank;
  season: Season;
  color?: string | null;
  description?: string | null;
  isMovable: boolean;
  precedence?: number | null;
}): Promise<LiturgicalDay> {
  const existing = await prisma.liturgicalDay.findUnique({
    where: { slug: data.slug },
  });

  if (existing) return existing;

  const createData: Parameters<typeof prisma.liturgicalDay.create>[0]['data'] = {
    slug: data.slug,
    name: data.name,
    rank: data.rank,
    season: data.season,
    color: data.color ?? null,
    description: data.description ?? null,
    isMovable: data.isMovable,
    precedence: data.precedence ?? undefined,
  };

  return prisma.liturgicalDay.create({ data: createData });
}

async function processFile(language: string, folder: string, fileName: string): Promise<void> {
  const filePath = path.join(HORAS_BASE_DIR, language, folder, fileName);
  const content = await readFile(filePath, 'utf8');
  const sections = parseHorasFile(content);

  const rankInfo = parseRank(sections.get('Rank'));
  const rules = parseRules(sections.get('Rule'));
  const scripturaRaw = sections.get('Scriptura');
  const scripturaSummary = extractFirstNonEmptyLine(scripturaRaw);

  const baseName = path.parse(fileName).name;
  const slug = makeSlug(language, folder, baseName);
  const season = inferSeason(folder, baseName);
  const rankEnum = mapRankDescriptorToEnum(rankInfo.descriptor);
  const precedenceScaled =
    Number.isFinite(rankInfo.precedence) && rankInfo.precedence !== null
      ? Math.round(rankInfo.precedence * 10)
      : null;

  const nameCandidate =
    rankInfo.name ??
    extractFirstNonEmptyLine(sections.get('Officium')) ??
    extractFirstNonEmptyLine(sections.get('Name')) ??
    scripturaSummary ??
    baseName;

  const relativePath = path.relative(process.cwd(), filePath);

  const liturgicalDay = await ensureLiturgicalDay({
    slug,
    name: nameCandidate,
    rank: rankEnum,
    season,
    color: null,
    description: buildDayDescription(rankInfo.descriptor, relativePath),
    isMovable: folder === 'Tempora',
    precedence: precedenceScaled,
  });

  sections.delete('Rank');
  sections.delete('Rule');
  sections.delete('Scriptura');
  sections.delete('Name');
  sections.delete('Officium');

  const hourSections = splitSectionsByHour(sections);
  const baseMetadata: Omit<ImportMetadata, 'sections'> = {
    language,
    folder,
    fileName,
    sourcePath: relativePath,
    slug,
    rank: rankInfo,
    rules,
    scriptura: scripturaRaw,
  };

  if (hourSections.size === 0) {
    const fallbackSections = Array.from(sections.entries()).map<SectionEntry>(([key, body]) => ({
      key,
      body,
    }));
    await prisma.office.create({
      data: {
        liturgicalDayId: liturgicalDay.id,
        hour: OfficeHourEnum.MATUTINUM,
        rubric: JSON.stringify(
          {
            ...baseMetadata,
            hour: OfficeHourEnum.MATUTINUM,
            sections: fallbackSections,
          },
          null,
          2,
        ),
      },
    });
    return;
  }

  for (const [hour, entries] of hourSections.entries()) {
    const metadata: ImportMetadata = {
      ...baseMetadata,
      hour,
      sections: entries,
    };

    await prisma.office.create({
      data: {
        liturgicalDayId: liturgicalDay.id,
        hour,
        rubric: JSON.stringify(metadata, null, 2),
      },
    });
  }
}

async function processFolder(language: string, folder: string): Promise<void> {
  const folderPath = path.join(HORAS_BASE_DIR, language, folder);
  if (!(await pathExists(folderPath))) {
    console.warn(`Skipping missing directory: ${folderPath}`);
    return;
  }

  const dirents = await readdir(folderPath, { withFileTypes: true });
  const txtFiles = dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.txt'))
    .map((dirent) => dirent.name)
    .sort();

  for (const fileName of txtFiles) {
    await processFile(language, folder, fileName);
  }
}

async function processMissaFile(language: string, folder: string, fileName: string): Promise<void> {
  const filePath = path.join(MISSA_BASE_DIR, language, folder, fileName);
  const content = await readFile(filePath, 'utf8');
  const sections = parseHorasFile(content);

  const rankInfo = parseRank(sections.get('Rank'));
  const baseName = path.parse(fileName).name;
  const slug = makeSlug(language, folder, baseName);
  const season = inferSeason(folder, baseName);
  const rankEnum = mapRankDescriptorToEnum(rankInfo.descriptor);
  const precedenceScaled =
    Number.isFinite(rankInfo.precedence) && rankInfo.precedence !== null
      ? Math.round(rankInfo.precedence * 10)
      : null;

  const nameCandidate =
    extractFirstNonEmptyLine(sections.get('Officium')) ?? rankInfo.name ?? baseName;

  const relativePath = path.relative(process.cwd(), filePath);

  const liturgicalDay = await ensureLiturgicalDay({
    slug,
    name: nameCandidate,
    rank: rankEnum,
    season,
    color: null,
    description: buildDayDescription(rankInfo.descriptor, relativePath),
    isMovable: folder === 'Tempora',
    precedence: precedenceScaled,
  });

  for (const key of MASS_METADATA_KEYS) {
    sections.delete(key);
  }

  for (const [key, rawValue] of sections.entries()) {
    const value = (rawValue ?? '').trim();
    if (!value) continue;

    await prisma.massProper.create({
      data: {
        liturgicalDayId: liturgicalDay.id,
        type: key,
        text: value,
      },
    });
  }
}

async function processMissaFolder(language: string, folder: string): Promise<void> {
  const folderPath = path.join(MISSA_BASE_DIR, language, folder);
  if (!(await pathExists(folderPath))) {
    console.warn(`Skipping missing directory: ${folderPath}`);
    return;
  }

  const dirents = await readdir(folderPath, { withFileTypes: true });
  const txtFiles = dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.txt'))
    .map((dirent) => dirent.name)
    .sort();

  for (const fileName of txtFiles) {
    await processMissaFile(language, folder, fileName);
  }
}

async function main(): Promise<void> {
  console.log('Divinum Officium import started…');
  console.log('Resetting existing liturgical data…');
  await resetLiturgicalData();

  for (const language of TARGET_LANGUAGES) {
    console.log(`Processing language: ${language}`);
    for (const folder of TARGET_FOLDERS) {
      console.log(`  Folder: ${folder}`);
      await processFolder(language, folder);
      await processMissaFolder(language, folder);
    }
  }

  console.log('Import complete.');
}

main()
  .catch((error: unknown) => {
    console.error('Import failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
