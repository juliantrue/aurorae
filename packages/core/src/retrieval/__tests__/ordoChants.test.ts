jest.mock('../chants', () => ({
  getOrdoChants: jest.fn(),
}));

import type { OrdoElement } from '@aurorae/do-runner';
import type { ChantSourceFilter, OrdoChant } from '../chants';
import { getOrdoChants } from '../chants';
import { attachChantsToElements, normalizeChantQuery } from '../ordoChants';

const mockedGetOrdoChants = jest.mocked(getOrdoChants);

const chantSource: ChantSourceFilter = {
  name: 'The Liber Usualis',
  year: 1961,
};

describe('attachChantsToElements', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('looks up psalms using the normalized antiphon', async () => {
    const elements: OrdoElement[] = [
      {
        type: 'psalm',
        heading: 'Psalmus',
        antiphon: 'Ant. 1: Verbum caro factum est',
        body: [{ index: 1, content: 'Verbum caro factum est' }],
      },
    ];
    const chants: OrdoChant[] = [{ id: 42 } as OrdoChant];
    mockedGetOrdoChants.mockResolvedValueOnce(chants);

    const result = await attachChantsToElements(elements, chantSource);

    expect(getOrdoChants).toHaveBeenCalledWith('Verbum caro factum est', chantSource);
    expect(result[0]?.chantLookup).toEqual({
      query: 'Verbum caro factum est',
      strategy: 'psalmAntiphon',
    });
    expect(result[0]?.chants).toEqual(chants);
  });

  it('falls back to the psalm incipit when no antiphon is present', async () => {
    const elements: OrdoElement[] = [
      {
        type: 'psalm',
        heading: 'Psalmus',
        antiphon: '',
        body: [{ index: 1, content: 'Beatus vir qui non abiit' }],
      },
    ];
    const chants: OrdoChant[] = [{ id: 7 } as OrdoChant];
    mockedGetOrdoChants.mockResolvedValueOnce(chants);

    const result = await attachChantsToElements(elements, chantSource);

    expect(getOrdoChants).toHaveBeenCalledWith('Beatus vir qui non abiit', chantSource);
    expect(result[0]?.chantLookup).toEqual({
      query: 'Beatus vir qui non abiit',
      strategy: 'psalmIncipit',
    });
  });

  it('deduplicates identical chant queries across elements', async () => {
    const elements: OrdoElement[] = [
      {
        type: 'psalm',
        heading: 'Psalm 1',
        antiphon: '',
        body: [{ index: 1, content: 'Beati immaculati in via' }],
      },
      {
        type: 'psalm',
        heading: 'Psalm 2',
        antiphon: '',
        body: [{ index: 1, content: 'Beati immaculati in via' }],
      },
    ];
    const chants: OrdoChant[] = [{ id: 11 } as OrdoChant];
    mockedGetOrdoChants.mockResolvedValue(chants);

    const result = await attachChantsToElements(elements, chantSource);

    expect(getOrdoChants).toHaveBeenCalledTimes(1);
    expect(result[0]?.chants).toBe(result[1]?.chants);
  });
});

describe('normalizeChantQuery', () => {
  it('trims punctuation, liturgical markers, and whitespace', () => {
    expect(normalizeChantQuery('  ℟.  Adéste fidéles; ')).toBe('Adéste fidéles');
    expect(normalizeChantQuery('[℣.] Nos autem')).toBe('Nos autem');
  });
});
