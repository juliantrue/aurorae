import type { Tone, ToneMeta } from './tone';

type ToneMap = Record<Tone, ToneMeta>;

const REGEX_TAGS = /<[^>]*>/g;
const REGEX_PARENS = /\([^)]*\)/g;

export function inverse(gabc: string, tones: ToneMap): Tone | undefined {
  const headerMode = extractModeHeader(gabc);
  const euouaeNotes = extractEuouaeNotes(gabc);
  if (!headerMode || !euouaeNotes) {
    return undefined;
  }

  const candidates = Object.keys(tones).filter((tone) => tone.startsWith(headerMode)) as Tone[];
  if (candidates.length === 0) {
    return undefined;
  }

  const matches: Tone[] = [];
  for (const tone of candidates) {
    const meta = tones[tone];
    const terminations =
      typeof meta.gabc.termination === 'string'
        ? [meta.gabc.termination]
        : Object.values(meta.gabc.termination);
    for (const termination of terminations) {
      const normalizedTermination = normalizeEuouaeSequence(termination);
      if (normalizedTermination === euouaeNotes) {
        matches.push(tone);
        break;
      }
    }
  }

  return matches.length === 1 ? matches[0] : undefined;
}

function normalizeNotes(input: string): string {
  const noTags = input.replace(REGEX_TAGS, '');
  const parenMatches = [...noTags.matchAll(REGEX_PARENS)];
  const source =
    parenMatches.length > 0 ? parenMatches.map((m) => m[0].slice(1, -1)).join(' ') : noTags;

  return source.toLowerCase().replace(/[^a-z]/g, '');
}

function extractModeHeader(gabc: string): string | null {
  const header = gabc.split(/^\s*%%\s*$/m)[0] ?? '';
  const match = header.match(/^\s*mode:\s*([0-9A-Za-z*+-]+)\s*;/im);
  return match ? match[1].trim() : null;
}

function extractEuouaeNotes(gabc: string): string | null {
  const tagged = gabc.match(/<eu>([\s\S]*?)<\/eu>/i);
  if (tagged?.[1]) {
    const trailing = gabc.match(/<\/eu>\s*(\([^)]*\))/i);
    const combined = trailing?.[1] ? `${tagged[1]} ${trailing[1]}` : tagged[1];
    const normalized = normalizeEuouaeSequence(combined);
    return normalized.length > 0 ? normalized : null;
  }

  return null;
}

function normalizeEuouaeSequence(input: string): string {
  const normalized = normalizeNotes(input);
  return collapseRepeats(normalized.replace(/r/g, ''));
}

function collapseRepeats(input: string): string {
  let collapsed = '';
  for (const note of input) {
    if (collapsed[collapsed.length - 1] !== note) {
      collapsed += note;
    }
  }
  return collapsed;
}
