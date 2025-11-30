export interface Horarium {
  Matins: Date;
  Lauds: Date;
  Prime: Date;
  Terce: Date;
  Sext: Date;
  None: Date;
  Vespers: Date;
  Compline: Date;
}

/**
 * Compute a Benedictine-style horarium from sunrise and sunset times.
 *
 * @param sunrise        Date for sunrise (local time)
 * @param sunset         Date for sunset (local time)
 * @param laudsOffsetMin Minutes before sunrise to schedule Lauds (default 30)
 * @param vespersOffsetMin Minutes before sunset to schedule Vespers (default 30)
 * @param complineOffsetMin Minutes after sunset to schedule Compline (default 30)
 * @returns Horarium mapping canonical hours to Date objects
 */
export function computeHorarium(
  sunrise: Date,
  sunset: Date,
  laudsOffsetMin: number = 30,
  vespersOffsetMin: number = 30,
  complineOffsetMin: number = 30,
): Horarium {
  // total milliseconds in a full day (24h)
  const fullDayMs = 24 * 60 * 60 * 1000;

  // length of daylight in ms (sunrise → sunset)
  const dayLengthMs = sunset.getTime() - sunrise.getTime();

  // length of night in ms (sunset → next sunrise)
  const nightLengthMs = fullDayMs - dayLengthMs;

  // one "solar hour" (daylight divided into 12 equal parts)
  const solarHour = dayLengthMs / 12;

  // one "night hour" (night divided into 12 equal parts)
  const nightHour = nightLengthMs / 12;

  // compute each canonical hour according to Benedictine rhythm
  return {
    // Matins: 8th hour of the night (deep night, ~2/3 through darkness)
    Matins: new Date(sunset.getTime() + nightHour * 8),

    // Lauds: before sunrise, anticipating dawn
    Lauds: new Date(sunrise.getTime() - laudsOffsetMin * 60 * 1000),

    // Prime: 1st solar hour (~1h after sunrise)
    Prime: new Date(sunrise.getTime() + solarHour * 1),

    // Terce: 3rd hour (mid-morning)
    Terce: new Date(sunrise.getTime() + solarHour * 3),

    // Sext: 6th hour (midday)
    Sext: new Date(sunrise.getTime() + solarHour * 6),

    // None: 9th hour (mid-afternoon)
    None: new Date(sunrise.getTime() + solarHour * 9),

    // Vespers: before sunset (“when light begins to fail”)
    Vespers: new Date(sunset.getTime() - vespersOffsetMin * 60 * 1000),

    // Compline: after sunset, transition to Great Silence
    Compline: new Date(sunset.getTime() + complineOffsetMin * 60 * 1000),
  };
}

/**
 * Identify which canonical hour currently applies.
 *
 * @param horarium Computed Horarium for the day
 * @param now Current time
 * @returns The key name (string) of the current canonical hour
 */
export function getCurrentHour(horarium: Horarium, now: Date): keyof Horarium {
  const entries = Object.entries(horarium) as [keyof Horarium, Date][];
  for (let i = 0; i < entries.length; i++) {
    const [name, time] = entries[i];
    const next = entries[(i + 1) % entries.length][1];
    if (now >= time && now < next) {
      return name;
    }
  }
  return 'Compline';
}

/* =========================
   Example Usage & Testing
   ========================= */

/*
// Example: for November 1, 2025 — sunrise 6:41 AM, sunset 5:00 PM
const sunrise = new Date(2025, 10, 1, 6, 41); // months are 0-based
const sunset = new Date(2025, 10, 1, 17, 0);

const horarium = computeHorarium(sunrise, sunset);

console.log('=== Daily Horarium ===');
for (const [hour, time] of Object.entries(horarium)) {
  console.log(`${hour.padEnd(9)} → ${time.toLocaleTimeString()}`);
}

const now = new Date();
console.log('\nCurrent canonical hour:', getCurrentHour(horarium, now));
*/
