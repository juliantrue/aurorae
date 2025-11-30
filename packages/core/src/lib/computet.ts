/**
 * Compute the date of Easter Sunday for a given year
 * using the Catholic (Western Gregorian) computus.
 *
 * Based on:
 *  - The Council of Nicaea (AD 325) rule.
 *  - The Gregorian reform (1582) corrections.
 *  - Gauss’s modular arithmetic formulation (1800),
 *    refined by Meeus and Oudin for clarity.
 *
 * @param year The civil year in the Gregorian calendar (>= 1583)
 * @returns A UTC Date object representing Easter Sunday of that year.
 */

export function computet(year: number): Date {
  if (!Number.isInteger(year)) {
    throw new TypeError(`Year must be an integer. Received: ${year}`);
  }
  if (year < 1583) {
    throw new RangeError(`Gregorian computus is defined for years >= 1583. Received: ${year}`);
  }

  // --- Step 1: Determine basic cycle values ---
  const a = year % 19; // Year's position in the 19-year Metonic cycle
  const b = Math.floor(year / 100); // Century number
  const c = year % 100; // Year within the century

  // --- Step 2: Apply solar and lunar corrections ---
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25); // Gregorian lunar correction
  const g = Math.floor((b - f + 1) / 3);

  // --- Step 3: Calculate the "epact" (age of moon on Jan 1) ---
  const h = (19 * a + b - d - g + 15) % 30;

  // --- Step 4: More solar corrections to align with Sunday ---
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;

  // --- Step 5: Final calendar adjustment ---
  const m = Math.floor((a + 11 * h + 22 * L) / 451);

  // --- Step 6: Compute month and day (March = 3, April = 4) ---
  const q = h + L - 7 * m + 114;
  const month = Math.floor(q / 31); // 3 or 4
  const day = (q % 31) + 1; // Day of month

  // --- Step 7: Return as a UTC Date object ---
  return new Date(Date.UTC(year, month - 1, day));
}

export const ALL_POSSIBLE_DATES_FOR_EASTER = [];

/* =========================
   Example Usage & Testing
   ========================= */

/*
// Easter 2024 → March 31 2024
console.log('Easter 2024 →', computet(2024).toISOString().slice(0, 10));

// Easter 2025 → April 20 2025
console.log('Easter 2025 →', computet(2025).toISOString().slice(0, 10));
*/
