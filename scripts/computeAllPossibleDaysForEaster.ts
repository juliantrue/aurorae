import { pathToFileURL } from 'node:url';

import { computet } from '@core/lib/computet';

type EasterHistogram = Record<string, number>;

const DEFAULT_START_YEAR = 1600;
const DEFAULT_END_YEAR = 3000;

const MIN_SUPPORTED_YEAR = 1583;

function formatMonthDay(date: Date): string {
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${month}-${day}`;
}

export function computeEasterHistogram(
  startYear = DEFAULT_START_YEAR,
  endYear = DEFAULT_END_YEAR,
): EasterHistogram {
  if (!Number.isInteger(startYear) || !Number.isInteger(endYear)) {
    throw new TypeError('startYear and endYear must be integers.');
  }
  if (startYear < MIN_SUPPORTED_YEAR || endYear < MIN_SUPPORTED_YEAR) {
    throw new RangeError(`Years must be >= ${MIN_SUPPORTED_YEAR}.`);
  }
  if (startYear > endYear) {
    throw new RangeError('startYear must not be greater than endYear.');
  }

  const histogram = new Map<string, number>();

  for (let year = startYear; year <= endYear; year += 1) {
    const easterDate = computet(year);
    const key = formatMonthDay(easterDate);
    histogram.set(key, (histogram.get(key) ?? 0) + 1);
  }

  return Object.fromEntries(
    [...histogram.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
  );
}

export function main(): EasterHistogram {
  const histogram = computeEasterHistogram();
  console.log(JSON.stringify(histogram, null, 2));
  return histogram;
}

if (typeof process !== 'undefined' && Array.isArray(process.argv) && process.argv[1]) {
  const entryUrl = pathToFileURL(process.argv[1]).href;
  if (import.meta.url === entryUrl) {
    main();
  }
}
