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
  const fullDayMs = 24 * 60 * 60 * 1000;
  const dayLengthMs = sunset.getTime() - sunrise.getTime();
  const nightLengthMs = fullDayMs - dayLengthMs;
  const solarHour = dayLengthMs / 12;
  const nightHour = nightLengthMs / 12;

  return {
    Matins: new Date(sunset.getTime() + nightHour * 8),
    Lauds: new Date(sunrise.getTime() - laudsOffsetMin * 60 * 1000),
    Prime: new Date(sunrise.getTime() + solarHour * 1),
    Terce: new Date(sunrise.getTime() + solarHour * 3),
    Sext: new Date(sunrise.getTime() + solarHour * 6),
    None: new Date(sunrise.getTime() + solarHour * 9),
    Vespers: new Date(sunset.getTime() - vespersOffsetMin * 60 * 1000),
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
  for (let i = 0; i < entries.length; i += 1) {
    const [name, time] = entries[i];
    const next = entries[(i + 1) % entries.length][1];
    if (now >= time && now < next) {
      return name;
    }
  }
  return 'Compline';
}
