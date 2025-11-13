import fs from 'node:fs';
import path from 'node:path';

import { parseDivinumOfficiumHtml } from '../src/parser';

const vesperaeFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'hora-vesperae.html'), 'utf8');

describe('parseDivinumOfficiumHtml', () => {
  it('treats canticles as psalms', () => {
    const parsed = parseDivinumOfficiumHtml(vesperaeFixture);

    const canticleSection = parsed.sections.find((section) => section.heading?.includes('Magnificat'));

    expect(canticleSection).toBeDefined();
    const firstColumn = canticleSection?.columns[0];
    expect(firstColumn).toBeDefined();

    const psalmText = firstColumn?.psalm;
    expect(psalmText).toBeDefined();

    const normalizedPsalm = psalmText!
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    expect(normalizedPsalm.toLowerCase()).toContain('magnificat');
    expect(firstColumn?.text).not.toContain('Canticum: Magnificat');

    const firstNonEmptyLine = psalmText
      ?.split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 0);
    expect(firstNonEmptyLine?.toLowerCase()).not.toContain('canticum: magnificat');
  });
});
