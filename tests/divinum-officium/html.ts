import { load } from 'cheerio';

/**
 * Extract the Latin column (left-hand side) for a given hora from the Divinum Officium HTML output.
 * Converts `<br>` tags to newlines and strips navigation chrome.
 */
export function extractLatinColumn(html: string, hora: string): string {
  const $ = load(html, { decodeEntities: true });
  const selector = `td[id^='${hora}']`;
  const chunks: string[] = [];

  $(selector).each((_, element) => {
    const cell = $(element).clone();
    // Remove navigation controls (Top/Next)
    cell.children('div').remove();

    const text = cell
      .html()
      ?.replace(/<br\s*\/?/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\u00a0/g, ' ');

    if (!text) return;

    const normalized = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    if (normalized.length > 0) {
      chunks.push(normalized);
    }
  });

  return chunks.join('\n\n');
}

function canonicalize(value: string): string {
  return value
    .replace(/[J]/g, 'I')
    .replace(/[j]/g, 'i')
    .replace(/æ/gi, 'ae')
    .replace(/œ/gi, 'oe')
    .replace(/℟\./gi, 'r.')
    .replace(/℣\./gi, 'v.')
    .replace(/[><«»]/g, ' ')
    .replace(/\*/g, '');
}

export function normalizeForComparison(value: string): string {
  return canonicalize(value)
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

