import { load, type CheerioAPI, type Cheerio } from 'cheerio';

type CheerioSelection = Cheerio<any>;

export type ColumnRole = 'latin' | 'vernacular' | 'unknown';

export interface DivinumOfficiumSectionColumn {
  role: ColumnRole;
  text: string;
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

function extractTopParagraph($: CheerioAPI): CheerioSelection | undefined {
  const topParagraph = $('p[align="center"]').first();
  if (topParagraph.length === 0) return undefined;
  return topParagraph;
}

function divinumDateToIso(date: string | undefined): string | undefined {
  if (!date) return undefined;
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(date.trim());
  if (!match) return undefined;
  const [, month, day, year] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function extractMetadata($: CheerioAPI): DivinumOfficiumMetadata {
  const topParagraph = extractTopParagraph($);
  const feastText = topParagraph
    ? extractElementText(topParagraph.find('font[color="blue"]').first())
    : undefined;
  const subtitleText = topParagraph
    ? (extractElementText(topParagraph.find('i').first()) ?? extractElementText(topParagraph))
    : undefined;

  const rawDate = $('input#date').first().attr('value');

  const metadata: DivinumOfficiumMetadata = {
    feast: feastText,
    subtitle: subtitleText,
    title: normalizeWhitespace($('h1').first().text()),
    hora: normalizeWhitespace($('h2').first().text()),
    rawDate,
    isoDate: divinumDateToIso(rawDate),
  };

  return metadata;
}

export function parseDivinumOfficiumHtml(html: string): ParsedDivinumOfficiumPage {
  const $ = load(html);
  const sections: DivinumOfficiumSection[] = [];

  $('table.contrastbg tr').each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length === 0) return;

    const columns: DivinumOfficiumSectionColumn[] = [];

    cells.each((index, cellEl) => {
      const cell = $(cellEl);
      const text = extractCellText(cell);
      if (!text) return;
      columns.push({
        role: guessColumnRole(index, cells.length),
        text,
      });
    });

    if (columns.length === 0) return;

    const headingSource = columns[0]?.text ?? columns[1]?.text;

    sections.push({
      id: cells.first().attr('id') ?? undefined,
      heading: deriveHeading(headingSource),
      columns,
    });
  });

  return {
    metadata: extractMetadata($),
    sections,
  };
}
