import { RunDivinumOfficiumOptions, runDivinumOfficium } from './runner';
import { parseDivinumOfficiumHtml, ParsedDivinumOfficiumPage } from './parser';

export async function getOrdo(
  options: RunDivinumOfficiumOptions,
): Promise<ParsedDivinumOfficiumPage> {
  const result = await runDivinumOfficium(options);
  return parseDivinumOfficiumHtml(result.body);
}
