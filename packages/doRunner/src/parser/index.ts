import { load } from 'cheerio';

import {
  detectService,
  ParsedDivinumOfficiumPage,
  ParsedDivinumOfficiumService,
} from './common';
import { parseDivinumOfficiumHoras } from './divineOffice';
import { parseDivinumOfficiumMissal } from './missal';

export type {
  ColumnRole,
  DivinumOfficiumMetadata,
  DivinumOfficiumSection,
  DivinumOfficiumSectionColumn,
  ParsedDivinumOfficiumPage,
  ParsedDivinumOfficiumService,
} from './common';

export { parseDivinumOfficiumHoras } from './divineOffice';
export { parseDivinumOfficiumMissal } from './missal';

export function parseDivinumOfficiumHtml(html: string): ParsedDivinumOfficiumPage {
  const $ = load(html);
  const service: ParsedDivinumOfficiumService = detectService($);

  if (service === 'missa') {
    return parseDivinumOfficiumMissal($);
  }

  return parseDivinumOfficiumHoras($);
}
