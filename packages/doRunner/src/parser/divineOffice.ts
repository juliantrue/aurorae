import { type CheerioAPI } from 'cheerio';

import {
  extractMetadata,
  extractSections,
  ParsedDivinumOfficiumPage,
} from './common';

export function parseDivinumOfficiumHoras($: CheerioAPI): ParsedDivinumOfficiumPage {
  return {
    metadata: extractMetadata($, 'horas'),
    sections: extractSections($),
  };
}
