import { type CheerioAPI } from 'cheerio';

import {
  extractMetadata,
  extractSections,
  ParsedDivinumOfficiumPage,
} from './common';

export function parseDivinumOfficiumMissal($: CheerioAPI): ParsedDivinumOfficiumPage {
  return {
    metadata: extractMetadata($, 'missa'),
    sections: extractSections($),
  };
}
