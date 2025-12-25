import {
  getOrdo as runDivinumOfficiumOrdo,
  parsedPageToOrdo,
  type Ordo as StructuredOrdo,
  type OrdoElement,
  type ParsedDivinumOfficiumPage,
  type RunDivinumOfficiumOptions,
} from '@aurorae/do-runner';
import { assertChantSourceExists, type ChantSourceFilter } from './chants';
import { attachChantsToElements, type EnrichedOrdoElement } from './ordoChants';

export type { ChantLookupMetadata, ChantLookupStrategy, EnrichedOrdoElement } from './ordoChants';

export type { OrdoElement, StructuredOrdo as Ordo, ParsedDivinumOfficiumPage };

export type GetOrdoOptions = RunDivinumOfficiumOptions & {
  chantSource?: ChantSourceFilter;
};

export interface GetOrdoResult {
  parsed: ParsedDivinumOfficiumPage;
  structured: StructuredOrdo;
  elements: OrdoElement[];
  elementsWithChants: EnrichedOrdoElement[];
}

/**
 * Fetches an ordo page via Divinum Officium and returns both the parsed metadata/sections
 * alongside the structured ordo representation consumed by the apps.
 */
export async function getOrdo(options: GetOrdoOptions): Promise<GetOrdoResult> {
  const { chantSource, ...runOptions } = options;
  const parsed = await runDivinumOfficiumOrdo(runOptions);
  const structured = parsedPageToOrdo(parsed);
  const elements =
    structured.body.type === 'office' ? structured.body.office : structured.body.missal;
  if (chantSource != null) {
    await assertChantSourceExists(chantSource);
  }
  const elementsWithChants =
    chantSource != null ? await attachChantsToElements(elements, chantSource) : elements;
  return { parsed, structured, elements, elementsWithChants };
}
