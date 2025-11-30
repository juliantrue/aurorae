import {
  getOrdo as runDivinumOfficiumOrdo,
  parsedPageToOrdo,
  type Ordo as StructuredOrdo,
  type OrdoElement,
  type ParsedDivinumOfficiumPage,
  type RunDivinumOfficiumOptions,
} from '@aurorae/do-runner';

export type { OrdoElement, StructuredOrdo as Ordo, ParsedDivinumOfficiumPage };

export interface GetOrdoResult {
  parsed: ParsedDivinumOfficiumPage;
  structured: StructuredOrdo;
}

/**
 * Fetches an ordo page via Divinum Officium and returns both the parsed metadata/sections
 * alongside the structured ordo representation consumed by the apps.
 */
export async function getOrdo(options: RunDivinumOfficiumOptions): Promise<GetOrdoResult> {
  const parsed = await runDivinumOfficiumOrdo(options);
  const structured = parsedPageToOrdo(parsed);
  return { parsed, structured };
}
