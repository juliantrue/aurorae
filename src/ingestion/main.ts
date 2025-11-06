type Month = number;
type Day = number;
export function main() {
  const allPossibleEasterDates = getEasterDateTuples();
}

// The values of the dates for this function come from running the
// computus over a couple thousand years and seeing the spread of Easter dates.
// Every day inclusive from 03-22 to 04-25 is a possibility for Easter.
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
