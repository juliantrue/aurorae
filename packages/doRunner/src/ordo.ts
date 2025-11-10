import { RunDivinumOfficiumOptions, RunDivinumOfficiumResult, runDivinumOfficium } from './runner';
import { parseDivinumOfficiumHtml, ParsedDivinumOfficiumPage } from './parser';

export interface OrdoResult extends RunDivinumOfficiumResult {
  parsedBody: ParsedDivinumOfficiumPage;
}

export async function getOrdo(
  options: RunDivinumOfficiumOptions,
): Promise<OrdoResult> {
  const result = await runDivinumOfficium(options);
  return {
    ...result,
    parsedBody: parseDivinumOfficiumHtml(result.body),
  };
}
