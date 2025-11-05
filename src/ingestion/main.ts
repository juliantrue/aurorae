import { computet } from '@/lib/computet';

type Month = number;
type Day = number;
export function main() {
  const allPossibleEasterDates = getEasterDateTuples();
}

function getEasterDateTuples(): [Month, Day][] {
  const dates: [Month, Day][] = [];

  for (let day = 22; day <= 30; day += 1) {
    dates.push([3, day]);
  }

  for (let day = 1; day <= 25; day += 1) {
    dates.push([4, day]);
  }

  return dates;
}
