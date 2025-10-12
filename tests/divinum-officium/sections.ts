import { ImportedSection } from './database';

const GLORIA_LATIN = 'V. Glória Patri, et Fílio, * et Spirítui Sancto.';
const SKIP_KEYS = new Set([
  'Responsory2',
  'Lectio4',
  'Responsory4',
  'Lectio5',
  'Responsory5',
  'Lectio6',
  'Responsory6',
  'Responsory7',
  'Responsory8',
  'Ant 1'
]);

export function sanitizeSectionBody(section: ImportedSection): string {
  if (section.body.trim().startsWith('@')) {
    return '';
  }

  const lines: string[] = [];
  for (const rawLine of section.body.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('[')) break;
    lines.push(line.startsWith('!') ? line.slice(1).trim() : line);
  }

  let result = lines.join('\n');
  result = result.replace(/&Gloria/gi, `${GLORIA_LATIN}\n`);
  return result;
}

export function shouldSkipSection(section: ImportedSection): boolean {
  if (section.body.trim().startsWith('@')) return true;
  if (SKIP_KEYS.has(section.key)) return true;
  return false;
}
