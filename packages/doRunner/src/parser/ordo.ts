import type {
  DivinumOfficiumSection,
  DivinumOfficiumSectionColumn,
  ParsedDivinumOfficiumPage,
} from './common';
import type { Ordo as StructuredOrdo, OrdoElement, Verse } from './types';

const DEFAULT_TITLE = 'Divinum Officium';
const DEFAULT_COLOUR = 'unknown';
const COLOUR_KEYWORDS = ['white', 'green', 'red', 'violet', 'purple', 'rose', 'black', 'gold'] as const;

export function parsedPageToOrdo(page: ParsedDivinumOfficiumPage): StructuredOrdo {
  const elements = page.sections.flatMap(sectionToElements);
  const title = page.metadata.feast ?? page.metadata.title ?? DEFAULT_TITLE;
  const colour = deriveColour(page) ?? DEFAULT_COLOUR;
  const service = page.metadata.service ?? 'horas';

  if (service === 'missa') {
    return {
      title,
      colour,
      body: {
        type: 'missal',
        missal: elements,
      },
    };
  }

  return {
    title,
    colour,
    body: {
      type: 'office',
      office: elements,
    },
  };
}

function sectionToElements(section: DivinumOfficiumSection): OrdoElement[] {
  const column = selectColumn(section.columns);
  if (!column) return [];

  const heading = sanitizeHeading(section.heading) ?? deriveHeadingFromColumn(column);

  if (column.psalm) {
    const verses = parseVerses(column.psalm);
    if (verses.length === 0) {
      return textElementFromColumn(column, heading);
    }
    const antiphon = column.antiphons?.[0] ?? '';
    if (isCanticleHeading(heading)) {
      return [
        {
          type: 'canticle',
          heading: heading ?? 'Canticle',
          antiphon,
          body: verses,
        },
      ];
    }
    return [
      {
        type: 'psalm',
        heading: heading ?? 'Psalm',
        antiphon,
        body: verses,
      },
    ];
  }

  if (isHymnHeading(heading, column)) {
    const hymnBody = column.text?.trim();
    if (!hymnBody) return [];
    return [
      {
        type: 'hymn',
        heading: heading ?? 'Hymn',
        body: hymnBody,
      },
    ];
  }

  return textElementFromColumn(column, heading);
}

function textElementFromColumn(
  column: DivinumOfficiumSectionColumn,
  heading: string | undefined,
): OrdoElement[] {
  const body = column.text?.trim();
  if (!body) return [];
  return [
    {
      type: 'text',
      heading: heading ?? 'Section',
      body,
    },
  ];
}

function deriveHeadingFromColumn(column: DivinumOfficiumSectionColumn): string | undefined {
  if (!column.text) return undefined;
  const firstLine = column.text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  return firstLine;
}

function selectColumn(columns: DivinumOfficiumSectionColumn[]): DivinumOfficiumSectionColumn | undefined {
  if (columns.length === 0) return undefined;
  return columns.find((column) => column.role === 'latin') ?? columns[0];
}

function sanitizeHeading(rawHeading?: string): string | undefined {
  if (!rawHeading) return undefined;
  return rawHeading.replace(/\s*\{.*$/, '').trim();
}

function isCanticleHeading(heading?: string): boolean {
  if (!heading) return false;
  const normalized = heading.toLowerCase();
  return (
    normalized.includes('cantic') ||
    normalized.includes('magnificat') ||
    normalized.includes('benedictus') ||
    normalized.includes('nunc dimittis')
  );
}

function isHymnHeading(
  heading: string | undefined,
  column: DivinumOfficiumSectionColumn,
): boolean {
  if (heading) {
    const normalized = heading.toLowerCase();
    if (normalized.startsWith('hymn')) {
      return true;
    }
  }
  const firstLine = column.text
    ?.split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  if (!firstLine) return false;
  return /^hymn(us)?/i.test(firstLine);
}

function parseVerses(psalm: string): Verse[] {
  const lines = psalm.split('\n');
  const verses: Verse[] = [];
  let fallbackIndex = 1;
  const verseRegex = /^(\d+(?::\d+)?)\s+(.*)$/;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = verseRegex.exec(line);
    if (!match) continue;
    const [, rawIndex, content] = match;
    const indexPart = rawIndex.includes(':') ? rawIndex.split(':')[1] : rawIndex;
    const parsedIndex = Number.parseInt(indexPart ?? '', 10);
    const verseIndex = Number.isFinite(parsedIndex) ? parsedIndex : fallbackIndex++;
    verses.push({
      index: verseIndex,
      content: content.trim(),
    });
    if (!Number.isFinite(parsedIndex)) {
      fallbackIndex = verseIndex + 1;
    }
  }

  return verses;
}

function deriveColour(page: ParsedDivinumOfficiumPage): string | undefined {
  const candidates = [page.metadata.subtitle, page.metadata.title, page.metadata.feast].filter(
    (value): value is string => Boolean(value),
  );

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase();
    for (const colour of COLOUR_KEYWORDS) {
      const regex = new RegExp(`\\b${colour}\\b`, 'i');
      if (regex.test(lower)) {
        return colour;
      }
    }
  }

  return undefined;
}
