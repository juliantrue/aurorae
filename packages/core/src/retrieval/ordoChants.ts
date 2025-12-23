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
const DEFAULT_INCIPIT_CHARS = 10;

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
      return {
        ...element,
        chantLookup: lookup,
        chants,
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
  return {
    query: shortenIncipit(cleanedAntiphon),
    strategy: kind === 'psalm' ? 'psalmAntiphon' : 'canticleAntiphon',
  };
}

function buildHymnLookup(element: Extract<OrdoElement, { type: 'hymn' }>): LookupResult {
  const normalizedHeading = normalizeChantQuery(stripHymnHeading(element.heading));
  if (normalizedHeading) {
    return {
      query: normalizedHeading,
      strategy: 'hymnHeading',
    };
  }

  const firstLine = buildIncipit(firstNonEmptyLine(element.body), DEFAULT_INCIPIT_WORDS + 2);
  if (firstLine) {
    return {
      query: shortenIncipit(firstLine),
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

export { normalizeChantQuery };
