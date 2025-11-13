import { getOrdo } from '../src/ordo';
import { HORA_COMMANDS } from '../src/runner';
import fs from 'node:fs';
import path from 'node:path';

type RunDivinumOfficiumHorasOptions = import('../src/runner').RunDivinumOfficiumHorasOptions;
type RunDivinumOfficiumOptions = import('../src/runner').RunDivinumOfficiumOptions;
type RunDivinumOfficiumResult = import('../src/runner').RunDivinumOfficiumResult;
type Ordo = import('../src/runner').Ordo;

const runDivinumOfficiumMock: jest.MockedFunction<
  (options: RunDivinumOfficiumOptions) => Promise<RunDivinumOfficiumResult>
> = jest.fn();

jest.mock('../src/runner', () => {
  const actual = jest.requireActual('../src/runner');
  return {
    ...actual,
    runDivinumOfficium: (options: RunDivinumOfficiumOptions) => runDivinumOfficiumMock(options),
  };
});

const FIXTURE_DIR = path.resolve(__dirname, 'fixtures');
const horaFixtures = new Map<Ordo, string>(
  HORA_COMMANDS.map((hour) => [
    hour,
    fs.readFileSync(path.join(FIXTURE_DIR, `hora-${hour.toLowerCase()}.html`), 'utf8'),
  ]),
);
const missaFixture = fs.readFileSync(path.join(FIXTURE_DIR, 'missa.html'), 'utf8');

const createMockResult = (body: string): RunDivinumOfficiumResult => ({
  headers: {
    'content-type': ['text/html'],
  },
  body,
  rawOutput: body,
});

runDivinumOfficiumMock.mockImplementation(async (options) => {
  if (options.service === 'missa') {
    return createMockResult(missaFixture);
  }

  const horaOptions = options as RunDivinumOfficiumHorasOptions;
  const fixture = horaFixtures.get(horaOptions.hora);
  if (!fixture) {
    throw new Error(`Missing fixture for hora ${horaOptions.hora}`);
  }
  return createMockResult(fixture);
});

const EXPECTED_META_HORA: Record<Ordo, string | undefined> = {
  Matutinum: 'Ad Matutinum',
  Laudes: 'Ad Laudes',
  Prima: 'Ad Primam',
  Tertia: 'Ad Tertiam',
  Sexta: 'Ad Sextam',
  Nona: 'Ad Nonam',
  Vesperae: 'Ad Vesperas',
  Completorium: 'Ad Completorium',
  Missa: undefined,
};

describe('getOrdo', () => {
  beforeEach(() => {
    runDivinumOfficiumMock.mockClear();
  });

  it.each(HORA_COMMANDS)('parses metadata for the %s hora', async (hour) => {
    const parsed = await getOrdo({ hora: hour, isoDate: '2025-11-24' });

    expect(parsed.metadata.service).toBe('horas');
    expect(parsed.metadata.hora).toBe(EXPECTED_META_HORA[hour]);
    expect(parsed.metadata.isoDate).toBe('2025-11-24');

    const section = parsed.sections[0];
    if (hour === 'Missa') {
      expect(section).toBeUndefined();
    } else {
      expect(section?.heading).toBe('Incipit');
      expect(section?.columns[0].text).not.toContain(section?.heading ?? '');
    }
    expect(runDivinumOfficiumMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ hora: hour, isoDate: '2025-11-24' }),
    );
  });

  it('parses metadata for the vesperae hora specifically (used for dev)', async () => {
    const parsed = await getOrdo({ hora: 'Vesperae', isoDate: '2025-11-24' });

    expect(parsed.metadata.service).toBe('horas');
    expect(parsed.metadata.hora).toBe(EXPECTED_META_HORA['Vesperae']);
    expect(parsed.metadata.isoDate).toBe('2025-11-24');

    const section = parsed.sections[0];
    expect(section?.heading).toBe('Incipit');
    expect(section?.columns[0].text).not.toContain(section?.heading ?? '');
    expect(runDivinumOfficiumMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ hora: 'Vesperae', isoDate: '2025-11-24' }),
    );

    console.log(JSON.stringify(parsed, null, 2));
  });

  it('parses the missa metadata and sections', async () => {
    const parsed = await getOrdo({ service: 'missa', isoDate: '2025-12-25' });

    expect(parsed.metadata.service).toBe('missa');
    expect(parsed.metadata.title).toBe('Sancta Missa');
    expect(parsed.metadata.hora).toBe('Rubrics 1960 - 1960');
    expect(parsed.metadata.isoDate).toBe('2025-12-25');

    const section = parsed.sections[0];
    expect(section?.heading).toBe('Ante');
    expect(section?.columns[0].text).not.toContain(section?.heading ?? '');
    expect(runDivinumOfficiumMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ service: 'missa', isoDate: '2025-12-25' }),
    );
  });
});
