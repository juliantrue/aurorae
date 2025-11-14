import fs from 'node:fs';
import path from 'node:path';

import { parseDivinumOfficiumHtml } from '../src/parser';

const vesperaeFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'hora-vesperae.html'), 'utf8');
const omitSectionFixture = `
  <html>
    <head>
      <title>Divinum Officium Test</title>
    </head>
    <body>
      <form action="officium.pl"></form>
      <input id="date" value="01-01-2024" />
      <p align="center"><font color="blue">Test Feast</font></p>
      <h1>Test Office</h1>
      <h2>Test Hora</h2>
      <table class="contrastbg">
        <tr>
          <td id="omitLatin">Omit Hymnus Preces</td>
          <td>Omit Hymnus Preces</td>
        </tr>
        <tr>
          <td id="retainLatin">Capitulum\nLectio Brevis</td>
          <td>Chapter\nShort reading</td>
        </tr>
      </table>
    </body>
  </html>
`;

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

  it('omits sections that only instruct to omit content', () => {
    const parsed = parseDivinumOfficiumHtml(omitSectionFixture);
    expect(parsed.sections).toHaveLength(1);
    expect(parsed.sections[0]?.id).toBe('retainLatin');
    expect(parsed.sections[0]?.columns[0]?.text).toContain('Lectio Brevis');
  });
});
