import { RunDivinumOfficiumOptions, runDivinumOfficium } from './runner';
import {
  parseDivinumOfficiumHtml,
  ParsedDivinumOfficiumPage,
  parsedPageToOrdo,
} from './parser';
import type { Ordo as StructuredOrdo } from './parser/types';

export async function getOrdo(
  options: RunDivinumOfficiumOptions,
): Promise<ParsedDivinumOfficiumPage> {
  const result = await runDivinumOfficium(options);
  return parseDivinumOfficiumHtml(result.body);
}

export async function getStructuredOrdo(
  options: RunDivinumOfficiumOptions,
): Promise<StructuredOrdo> {
  const parsed = await getOrdo(options);
  return parsedPageToOrdo(parsed);
}
