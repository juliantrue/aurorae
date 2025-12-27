import type { OrdoElement } from '@aurorae/do-runner';
import { normalizeChantSearchKey } from '@aurorae/database';
import { getOrdoChants, type ChantSourceFilter, type OrdoChant } from './chants';

export type ChantLookupStrategy =
  | 'psalmAntiphon'
  | 'psalmIncipit'
  | 'canticleAntiphon'
  | 'canticleIncipit'
  | 'hymnHeading'
  | 'hymnFirstLine'
  | 'responsoryLabel'
  | 'textHeading';

export interface ChantLookupMetadata {
  query: string;
  strategy: ChantLookupStrategy;
  fullQuery?: string;
}

export type EnrichedOrdoElement = OrdoElement & {
  chantLookup?: ChantLookupMetadata;
  chants?: OrdoChant[];
};

type LookupResult = ChantLookupMetadata | undefined;

const TEXT_HEADINGS_WITH_CHANTS = [
  'collecta',
  'oratio',
  'postcommunio',
  'super oblata',
  'offertorium',
  'communio',
  'introitus',
  'graduale',
  'secreta',
] as const;

const DEFAULT_INCIPIT_WORDS = 8;
const DEFAULT_INCIPIT_CHARS = 8;

/**
 * Attach chant metadata to each ordo element by querying a chant source.
 */
export async function attachChantsToElements(
  elements: OrdoElement[],
  chantSource: ChantSourceFilter,
): Promise<EnrichedOrdoElement[]> {
  const queryCache = new Map<string, Promise<OrdoChant[]>>();

  return Promise.all(
    elements.map(async (element) => {
      const lookup = createLookupForElement(element);
      if (!lookup) {
        return element;
      }

      let pending = queryCache.get(lookup.query);
      if (!pending) {
        pending = getOrdoChants(lookup.query, chantSource);
        queryCache.set(lookup.query, pending);
      }

      const chants = await pending;
      const selectedChants = selectBestChant(chants, lookup.fullQuery);
      return {
        ...element,
        chantLookup: lookup,
        chants: selectedChants,
      };
    }),
  );
}

function createLookupForElement(element: OrdoElement): LookupResult {
  switch (element.type) {
    case 'psalm':
      return buildPsalmOrCanticleLookup(element, 'psalm');
    case 'canticle':
      return buildPsalmOrCanticleLookup(element, 'canticle');
    case 'hymn':
      return buildHymnLookup(element);
    case 'responsory':
      return buildResponsoryLookup(element);
    case 'text':
      return buildTextLookup(element);
    default:
      return undefined;
  }
}

function buildPsalmOrCanticleLookup(
  element: Extract<OrdoElement, { type: 'psalm' | 'canticle' }>,
  kind: 'psalm' | 'canticle',
): LookupResult {
  const cleanedAntiphon = cleanAntiphon(element.antiphon);
  if (cleanedAntiphon) {
    return {
      query: shortenIncipit(cleanedAntiphon),
      fullQuery: cleanedAntiphon,
      strategy: kind === 'psalm' ? 'psalmAntiphon' : 'canticleAntiphon',
    };
  }

  const firstLine = buildIncipit(firstNonEmptyVerse(element.body));
  if (!firstLine) {
    return undefined;
  }

  return {
    query: shortenIncipit(firstLine),
    fullQuery: firstLine,
    strategy: kind === 'psalm' ? 'psalmIncipit' : 'canticleIncipit',
  };
}

function buildHymnLookup(element: Extract<OrdoElement, { type: 'hymn' }>): LookupResult {
  const normalizedHeading = normalizeChantQuery(stripHymnHeading(element.heading));
  if (normalizedHeading) {
    return {
      query: normalizedHeading,
      fullQuery: normalizedHeading,
      strategy: 'hymnHeading',
    };
  }

  const firstLine = buildIncipit(firstNonEmptyLine(element.body), DEFAULT_INCIPIT_WORDS + 2);
  if (firstLine) {
    return {
      query: shortenIncipit(firstLine),
      fullQuery: firstLine,
      strategy: 'hymnFirstLine',
    };
  }

  return undefined;
}

function buildResponsoryLookup(
  element: Extract<OrdoElement, { type: 'responsory' }>,
): LookupResult {
  const firstPart = element.responsory.find((part) => normalizeChantQuery(part.content).length > 0);
  if (!firstPart) {
    return undefined;
  }

  const combined = [firstPart.label, firstPart.content].filter(Boolean).join(' ');
  const incipit = buildIncipit(combined);
  if (!incipit) {
    return undefined;
  }

  return {
    query: shortenIncipit(incipit),
    fullQuery: incipit,
    strategy: 'responsoryLabel',
  };
}

function buildTextLookup(element: Extract<OrdoElement, { type: 'text' }>): LookupResult {
  const heading = element.heading?.trim();
  if (!heading || !shouldLookupHeading(heading)) {
    return undefined;
  }

  const firstLine = buildIncipit(firstNonEmptyLine(element.body));
  if (!firstLine) {
    return undefined;
  }

  return {
    query: shortenIncipit(firstLine),
    fullQuery: firstLine,
    strategy: 'textHeading',
  };
}

function cleanAntiphon(raw: string | undefined): string {
  if (!raw) {
    return '';
  }
  const withoutLabel = raw.replace(/^ant(iphona)?\.?\s*\d*[:.]?\s*/i, '');
  return normalizeChantQuery(withoutLabel);
}

function stripHymnHeading(raw: string | undefined): string {
  if (!raw) {
    return '';
  }
  return raw.replace(/^hymn(us)?[:.\s-]*/i, '');
}

function buildIncipit(raw: string | undefined, maxWords: number = DEFAULT_INCIPIT_WORDS): string {
  if (!raw) {
    return '';
  }
  const words = raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/\d+\s*/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .slice(0, maxWords);
  return normalizeChantQuery(words.join(' '));
}

function shortenIncipit(raw: string): string {
  return raw.slice(0, DEFAULT_INCIPIT_CHARS).trim();
}

function selectBestChant(chants: OrdoChant[], fullQuery: string | undefined): OrdoChant[] {
  if (!fullQuery || chants.length <= 1) {
    return chants;
  }

  const euouaeCandidates = chants.filter((chant) => endsWithEuouae(chant.gabc));
  const candidates = euouaeCandidates.length > 0 ? euouaeCandidates : chants;

  const normalizedQuery = normalizeChantQuery(fullQuery);
  if (!normalizedQuery) {
    return candidates;
  }

  let best = candidates[0];
  let bestScore = scoreChantSimilarity(normalizedQuery, best);
  for (let index = 1; index < candidates.length; index += 1) {
    const chant = candidates[index];
    const score = scoreChantSimilarity(normalizedQuery, chant);
    if (score > bestScore) {
      best = chant;
      bestScore = score;
    }
  }

  return best ? [best] : [];
}

function endsWithEuouae(gabc: string | null | undefined): boolean {
  if (!gabc) {
    return false;
  }

  const markerIndex = gabc.search(/^%%\s*$/m);
  const notation =
    markerIndex >= 0
      ? gabc.slice(markerIndex).replace(/^%%\s*$/m, '')
      : gabc;
  const lyricText = notation
    .replace(/\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  return lyricText.endsWith('e u o u a e');
}

function scoreChantSimilarity(query: string, chant: OrdoChant): number {
  const chantKey = chant.searchKey?.trim() ?? normalizeChantQuery(chant.name);
  if (!chantKey) {
    return 0;
  }

  if (chantKey.includes(query)) {
    return 2 + query.length / chantKey.length;
  }

  const queryTokens = query.split(/\s+/).filter(Boolean);
  const chantTokens = chantKey.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0 || chantTokens.length === 0) {
    return 0;
  }

  const chantTokenSet = new Set(chantTokens);
  let overlap = 0;
  for (const token of queryTokens) {
    if (chantTokenSet.has(token)) {
      overlap += 1;
    }
  }

  const unionSize = new Set([...queryTokens, ...chantTokens]).size;
  const coverage = overlap / queryTokens.length;
  const jaccard = unionSize > 0 ? overlap / unionSize : 0;
  return coverage + jaccard;
}

function normalizeChantQuery(raw: string | undefined): string {
  if (!raw) {
    return '';
  }

  const cleaned = raw
    .replace(/[℣℟℞†*]/g, ' ')
    .replace(/[\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s,.;:!?'"-]+/, '')
    .replace(/[\s,.;:!?'"-]+$/, '')
    .trim();

  return normalizeChantSearchKey(cleaned);
}

function shouldLookupHeading(heading: string): boolean {
  const normalized = heading.toLowerCase();
  return TEXT_HEADINGS_WITH_CHANTS.some((keyword) => normalized.includes(keyword));
}

function firstNonEmptyLine(text: string | undefined): string {
  if (!text) {
    return '';
  }
  const line = text
    .split('\n')
    .map((entry) => entry.trim())
    .find((entry) => entry.length > 0);
  return line ?? '';
}

function firstNonEmptyVerse(
  verses: Array<{ content: string }> | undefined,
): string {
  if (!verses) {
    return '';
  }

  const verse = verses.find((entry) => normalizeChantQuery(entry.content).length > 0);
  return verse?.content ?? '';
}

export { normalizeChantQuery };
