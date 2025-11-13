import { load, type CheerioAPI, type Cheerio } from 'cheerio';

type CheerioSelection = Cheerio<any>;

export type ColumnRole = 'latin' | 'vernacular' | 'unknown';

export type ParsedDivinumOfficiumService = 'horas' | 'missa';

export interface DivinumOfficiumSectionColumn {
  role: ColumnRole;
  text: string;
  psalm?: string;
  antiphons?: string[];
}

export interface DivinumOfficiumSection {
  id?: string;
  heading?: string;
  columns: DivinumOfficiumSectionColumn[];
}

export interface DivinumOfficiumMetadata {
  feast?: string;
  subtitle?: string;
  title?: string;
  hora?: string;
  isoDate?: string;
  rawDate?: string;
  service?: ParsedDivinumOfficiumService;
}

export interface ParsedDivinumOfficiumPage {
  metadata: DivinumOfficiumMetadata;
  sections: DivinumOfficiumSection[];
}

function normalizeWhitespace(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value
    .replace(/\u00a0/g, ' ')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n');

  return normalized.length > 0 ? normalized : undefined;
}

function guessColumnRole(columnIndex: number, totalColumns: number): ColumnRole {
  if (totalColumns === 1) return 'latin';
  if (columnIndex === 0) return 'latin';
  if (columnIndex === 1) return 'vernacular';
  return 'unknown';
}

function textFromCheerio(node: CheerioSelection): string | undefined {
  node.find('br').replaceWith('\n');
  return normalizeWhitespace(node.text());
}

function extractCellText(cell: CheerioSelection): string | undefined {
  const clone = cell.clone();
  clone.children('div[align]').remove();
  clone.find('script, style').remove();
  return textFromCheerio(clone);
}

function extractElementText(element?: CheerioSelection): string | undefined {
  if (!element || element.length === 0) return undefined;
  return textFromCheerio(element.clone());
}

function deriveHeading(text?: string): string | undefined {
  if (!text) return undefined;
  const firstLine = text.split('\n').find((line) => line.trim().length > 0);
  return firstLine ? firstLine.trim() : undefined;
}

function sanitizePsalmHeading(heading?: string): string | undefined {
  if (!heading) return undefined;
  const normalized = heading.trim().replace(/\s*\[[^\]]+\]$/, '').trim();
  return normalized.length > 0 ? normalized : undefined;
}

function dropFirstNonEmptyLine(text?: string): string | undefined {
  if (!text) return text;
  const lines = text.split('\n');
  const firstLineIndex = lines.findIndex((line) => line.trim().length > 0);
  if (firstLineIndex === -1) return text;
  lines.splice(firstLineIndex, 1);
  const remaining = lines.join('\n');
  return remaining.trim().length > 0 ? remaining : undefined;
}

function extractTopParagraph($: CheerioAPI): CheerioSelection | undefined {
  const topParagraph = $('p[align="center"]').first();
  if (topParagraph.length === 0) return undefined;
  return topParagraph;
}

function extractFeastText(topParagraph?: CheerioSelection): string | undefined {
  if (!topParagraph) return undefined;
  const highlighted = topParagraph.find('font[color="blue"]').first();
  if (highlighted.length > 0) {
    return extractElementText(highlighted);
  }
  const firstFont = topParagraph.find('font').first();
  if (firstFont.length > 0) {
    return extractElementText(firstFont);
  }
  return undefined;
}

function extractMissaTitleAndVersion($: CheerioAPI): {
  title?: string;
  version?: string;
} {
  const headingFont = $('p[align="center"] font[color="maroon"]').first();
  if (headingFont.length === 0) {
    return {};
  }

  const versionText = extractElementText(headingFont.find('font[color="red"]').first());
  const titleClone = headingFont.clone();
  titleClone.find('font[color="red"]').remove();
  const titleText = extractElementText(titleClone);

  return {
    title: titleText,
    version: versionText,
  };
}

function detectService($: CheerioAPI): ParsedDivinumOfficiumService {
  if ($('form[action="missa.pl"]').length > 0) return 'missa';
  if ($('form[action="officium.pl"]').length > 0) return 'horas';
  const bodyClass = $('body').attr('class') ?? '';
  if (bodyClass.toLowerCase().includes('missa')) return 'missa';
  const title = $('title').text();
  if (/missa/i.test(title)) return 'missa';
  return 'horas';
}

type PsalmAntiphonData = {
  psalm?: string;
  antiphons?: string[];
};

const PSALM_OR_CANTICLE_HEADING = /^(Psalm(?:us)?|Cant(?:icle|icum))\b/i;

function isPsalmOrCanticleHeading(line: string): boolean {
  return PSALM_OR_CANTICLE_HEADING.test(line);
}

function extractPsalmAndAntiphons(text: string): PsalmAntiphonData {
  const lines = text.split('\n');
  const antiphons: string[] = [];
  const psalmLines: string[] = [];
  let collectingPsalm = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.length === 0) continue;

    const antMatch = line.match(/^Ant\.\s*(?:\d+\.\s*)?(.*)$/i);
    if (antMatch) {
      const antiphonText = antMatch[1].trim();
      if (antiphonText.length > 0) {
        antiphons.push(antiphonText);
      } else {
        antiphons.push('');
      }
      if (collectingPsalm && psalmLines.length > 0) {
        collectingPsalm = false;
      }
      continue;
    }

    if (isPsalmOrCanticleHeading(line)) {
      collectingPsalm = true;
    }

    if (collectingPsalm) {
      psalmLines.push(line);
    }
  }

  const result: PsalmAntiphonData = {};
  if (psalmLines.length > 0) {
    result.psalm = psalmLines.join('\n');
  }
  if (antiphons.length > 0) {
    result.antiphons = antiphons;
  }
  return result;
}

function divinumDateToIso(date: string | undefined): string | undefined {
  if (!date) return undefined;
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(date.trim());
  if (!match) return undefined;
  const [, month, day, year] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function extractMetadata(
  $: CheerioAPI,
  service: ParsedDivinumOfficiumService,
): DivinumOfficiumMetadata {
  const topParagraph = extractTopParagraph($);
  const feastText = extractFeastText(topParagraph);
  const subtitleText = topParagraph
    ? (extractElementText(topParagraph.find('i').first()) ?? extractElementText(topParagraph))
    : undefined;

  const { title: missaTitle, version: missaVersion } = extractMissaTitleAndVersion($);

  const rawDate = $('input#date').first().attr('value');

  const metadata: DivinumOfficiumMetadata = {
    feast: feastText,
    subtitle: subtitleText,
    title: normalizeWhitespace($('h1').first().text()) ?? missaTitle,
    hora: normalizeWhitespace($('h2').first().text()) ?? missaVersion,
    rawDate,
    isoDate: divinumDateToIso(rawDate),
    service,
  };

  return metadata;
}

export function parseDivinumOfficiumHtml(html: string): ParsedDivinumOfficiumPage {
  const $ = load(html);
  const service = detectService($);
  const sections: DivinumOfficiumSection[] = [];

  $('table.contrastbg tr').each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length === 0) return;

    const columns: DivinumOfficiumSectionColumn[] = [];
    let rowPsalmHeading: string | undefined;

    cells.each((index, cellEl) => {
      const cell = $(cellEl);
      const text = extractCellText(cell);
      if (!text) return;
      const column: DivinumOfficiumSectionColumn = {
        role: guessColumnRole(index, cells.length),
        text,
      };
      const { psalm, antiphons } = extractPsalmAndAntiphons(text);
      if (psalm) {
        const psalmLines = psalm.split('\n');
        const headingIndex = psalmLines.findIndex((line) => line.trim().length > 0);
        const possibleHeading =
          headingIndex >= 0 ? psalmLines[headingIndex].trim() : undefined;
        if (headingIndex >= 0) {
          psalmLines.splice(headingIndex, 1);
        }
        const sanitizedHeading = sanitizePsalmHeading(possibleHeading);
        let remainingPsalm: string | undefined;
        if (psalmLines.length > 0) {
          remainingPsalm = psalmLines.join('\n');
        }

        if (possibleHeading) {
          if (!rowPsalmHeading && sanitizedHeading) {
            rowPsalmHeading = sanitizedHeading;
          }

          const textLines = column.text.split('\n');
          const textHeadingIndex = textLines.findIndex((line) => line.trim().length > 0);
          if (textHeadingIndex >= 0 && textLines[textHeadingIndex]?.trim() === possibleHeading) {
            textLines.splice(textHeadingIndex, 1);
            column.text = textLines.join('\n');
          }
        }

        if (remainingPsalm) {
          column.psalm = remainingPsalm;
        }
      }
      if (antiphons) column.antiphons = antiphons;
      columns.push(column);
    });

    if (columns.length === 0) return;

    const headingSource = columns[0]?.text ?? columns[1]?.text;
    const baseHeading = deriveHeading(headingSource);
    const heading = rowPsalmHeading ?? baseHeading;

    if (!rowPsalmHeading && heading) {
      columns.forEach((column) => {
        if (column.text && column.text.trim().length > 0) {
          const dropped = dropFirstNonEmptyLine(column.text);
          column.text = dropped ?? '';
        }
      });
    }

    sections.push({
      id: cells.first().attr('id') ?? undefined,
      heading,
      columns,
    });
  });

  return {
    metadata: extractMetadata($, service),
    sections,
  };
}
