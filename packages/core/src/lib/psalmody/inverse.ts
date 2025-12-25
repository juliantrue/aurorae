import type { Tone, ToneMeta } from "./tone";

type ToneMap = Record<Tone, ToneMeta>;

const REGEX_TAGS = /<[^>]*>/g;
const REGEX_PARENS = /\([^)]*\)/g;

export function inverse(gabc: string, tones: ToneMap): Tone {
  const normalizedGabc = normalizeNotes(gabc);

  let bestTone: Tone | null = null;
  let bestScore = -1;
  let bestTermLen = 0;

  for (const [tone, meta] of Object.entries(tones) as [Tone, ToneMeta][]) {
    const terminations =
      typeof meta.gabc.termination === "string"
        ? [meta.gabc.termination]
        : Object.values(meta.gabc.termination);

    for (const termination of terminations) {
      const normalizedTermination = normalizeNotes(termination);
      const score = scoreMatch(normalizedGabc, normalizedTermination);
      if (
        score > bestScore ||
        (score === bestScore && normalizedTermination.length > bestTermLen)
      ) {
        bestTone = tone;
        bestScore = score;
        bestTermLen = normalizedTermination.length;
      }
    }
  }

  if (!bestTone) {
    throw new Error("No tones provided for inverse matching.");
  }

  return bestTone;
}

function normalizeNotes(input: string): string {
  const noTags = input.replace(REGEX_TAGS, "");
  const parenMatches = [...noTags.matchAll(REGEX_PARENS)];
  const source =
    parenMatches.length > 0
      ? parenMatches.map((m) => m[0].slice(1, -1)).join(" ")
      : noTags;

  return source.toLowerCase().replace(/[^a-z]/g, "");
}

function scoreMatch(gabc: string, termination: string): number {
  if (!termination) return 0;

  const index = gabc.lastIndexOf(termination);
  if (index !== -1) {
    const tailDistance = gabc.length - (index + termination.length);
    const tailPenalty = Math.min(tailDistance, termination.length);
    return termination.length * 10 - tailPenalty;
  }

  return longestSuffixOverlap(gabc, termination);
}

function longestSuffixOverlap(a: string, b: string): number {
  const max = Math.min(a.length, b.length);
  for (let i = 1; i <= max; i++) {
    if (a.slice(-i) !== b.slice(-i)) return i - 1;
  }
  return max;
}
