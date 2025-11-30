/**
 * Calculate sunrise and sunset (in UTC) for a given date and geographic location.
 *
 * This implementation is based on the commonly used NOAA (U.S. National Oceanic and
 * Atmospheric Administration) solar calculation algorithm:
 *   https://gml.noaa.gov/grad/solcalc/
 *
 * It:
 *   - Uses only basic math (no astronomical libraries).
 *   - Returns times as JavaScript Date objects in UTC.
 *   - Returns `null` for sunrise or sunset if the sun never rises/sets that day
 *     at the given latitude (e.g. polar day/night near the poles).
 *
 * IMPORTANT:
 *   - The input `date` is interpreted in UTC (not local time).
 *   - The returned `Date` objects are also in UTC. If you need local time, convert
 *     using your time zone logic (e.g. Intl APIs or a library like luxon/dayjs).
 *
 * Typical accuracy: within a few minutes for most locations and dates.
 */
export function getSunriseSunsetUTC(
  date: Date,
  latitude: number, // Degrees, positive north, negative south  (range: -90 .. +90)
  longitude: number, // Degrees, positive east, negative west   (range: -180 .. +180)
): { sunrise: Date | null; sunset: Date | null } {
  /**
   * Solar zenith angle used to define "official" sunrise/sunset.
   *
   * 90° would be when the sun's center is exactly on the horizon.
   * 90.8333° includes:
   *   - ~0.833° atmospheric refraction
   *   - ~0.5° apparent radius of the sun
   *
   * This is the standard used by many sunrise/sunset calculators.
   */
  const ZENITH = 90.8333;

  // Handy degree <-> radian conversion constants
  const DEG2RAD = Math.PI / 180;
  const RAD2DEG = 180 / Math.PI;

  // Extract YEAR, MONTH (1-12), DAY from the given date *in UTC*.
  // We do everything in UTC to avoid time zone / DST confusion.
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // JavaScript months are 0-based, NOAA expects 1-based
  const year = date.getUTCFullYear();

  /**
   * STEP 1: Day of year (N)
   *
   * We convert (year, month, day) -> N, where N is the day of the year
   * (Jan 1 is 1, Feb 1 is 32, etc.). NOAA provides this integer-based formula.
   *
   * Note: For approximate sunrise/sunset times, this "N" is sufficient and
   * avoids dealing with leap year details manually.
   */
  const N1 = Math.floor((275 * month) / 9);
  const N2 = Math.floor((month + 9) / 12);
  const N3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  const N = N1 - N2 * N3 + day - 30;

  /**
   * Internal helper that actually computes a single solar event time (sunrise OR sunset).
   *
   * @param isSunrise - true for sunrise, false for sunset
   * @returns Date in UTC or null if the event does not occur (polar day/night)
   */
  function calculateSunTime(isSunrise: boolean): Date | null {
    /**
     * STEP 2: Approximate time (t)
     *
     * Convert longitude to "hour" units (360° = 24h -> 15° per hour).
     * lngHour is positive for east longitudes, negative for west.
     */
    const lngHour = longitude / 15;

    /**
     * base = 6 for sunrise, 18 for sunset
     *
     * These are rough guesses:
     *   - sunrise is approximately at 6:00 local solar time
     *   - sunset is approximately at 18:00 local solar time
     *
     * We refine this guess in later steps.
     */
    const base = isSunrise ? 6 : 18;

    /**
     * t is the approximate day fraction:
     *   N        = day of year
     *   base     = 6 or 18 (as above)
     *   lngHour  = longitude expressed in hours
     *
     * The idea:
     *   - Convert longitude into an offset from UTC.
     *   - Add that to the day number to get a rough guess of where
     *     in the day the event occurs.
     */
    const t = N + (base - lngHour) / 24;

    /**
     * STEP 3: Sun's mean anomaly (M)
     *
     * M is an angle that increases at a constant rate as the Earth orbits the sun.
     * NOAA: M = (0.9856 * t) - 3.289
     *
     * Units: degrees
     */
    const M = 0.9856 * t - 3.289;

    /**
     * STEP 4: Sun's true longitude (L)
     *
     * Correct the mean anomaly (M) to get the "true" longitude of the sun:
     *
     *   L = M
     *       + 1.916 * sin(M)
     *       + 0.020 * sin(2M)
     *       + 282.634
     *
     * Then normalize L to the range [0, 360).
     *
     * Units: degrees
     */
    let L = M + 1.916 * Math.sin(DEG2RAD * M) + 0.02 * Math.sin(2 * DEG2RAD * M) + 282.634;
    L = (L + 360) % 360;

    /**
     * STEP 5: Sun's Right Ascension (RA)
     *
     * RA is similar to longitude, but measured on the celestial sphere.
     * The relationship between RA and L here assumes the ecliptic tilt.
     *
     * First we compute atan(0.91764 * tan(L)) and convert to degrees.
     */
    let RA = RAD2DEG * Math.atan(0.91764 * Math.tan(DEG2RAD * L));
    RA = (RA + 360) % 360; // normalize to [0,360)

    /**
     * STEP 5b: Quadrant adjustment
     *
     * atan returns values between -90° and +90°, but L can be anywhere
     * in [0°, 360°). To get the correct RA, we must put RA in the same
     * "quadrant" as L (i.e., 0–90, 90–180, 180–270, 270–360).
     *
     * Example:
     *   If L is in the 3rd quadrant (180°..270°), RA should also be in 180°..270°.
     */
    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);

    // Convert RA from degrees to hours (360° -> 24h, so divide by 15)
    RA /= 15;

    /**
     * STEP 6: Sun's declination (Dec)
     *
     * Declination is analogous to latitude, but on the celestial sphere.
     *
     * sinDec = 0.39782 * sin(L)
     * cosDec = cos(arcsin(sinDec))
     */
    const sinDec = 0.39782 * Math.sin(DEG2RAD * L);
    const cosDec = Math.cos(Math.asin(sinDec));

    /**
     * STEP 7: Sun's local hour angle (H)
     *
     * The local hour angle tells us how far the sun is from crossing the
     * local meridian, measured in angle. From that, we can derive the time
     * of day when the sun reaches a specific zenith angle (i.e., sunrise/sunset).
     *
     * Formula:
     *   cosH = (cos(ZENITH) - sinDec * sin(lat)) / (cosDec * cos(lat))
     *
     * If:
     *   cosH > 1  -> the sun never rises that day (polar night)
     *   cosH < -1 -> the sun never sets that day (midnight sun)
     */
    const cosH =
      (Math.cos(DEG2RAD * ZENITH) - sinDec * Math.sin(DEG2RAD * latitude)) /
      (cosDec * Math.cos(DEG2RAD * latitude));

    if (cosH > 1) {
      // Sun never rises on this date at this latitude.
      // Example: Polar night in the Arctic winter.
      return null;
    }

    if (cosH < -1) {
      // Sun never sets on this date at this latitude.
      // Example: Midnight sun in the Arctic summer.
      return null;
    }

    /**
     * STEP 7b: Finish computing H (in hours)
     *
     * For sunrise:
     *   H = 360° - arccos(cosH)
     * For sunset:
     *   H = arccos(cosH)
     *
     * Then convert from degrees to hours by dividing by 15.
     */
    let H: number;
    if (isSunrise) {
      H = 360 - RAD2DEG * Math.acos(cosH);
    } else {
      H = RAD2DEG * Math.acos(cosH);
    }
    H /= 15; // degrees -> hours

    /**
     * STEP 8: Local mean time of event (T)
     *
     * T = H + RA - (0.06571 * t) - 6.622
     *
     * Units: hours (in local solar time)
     */
    const T = H + RA - 0.06571 * t - 6.622;

    /**
     * STEP 9: Convert local mean time to UTC (UT)
     *
     * UT (in hours) = T - lngHour
     *
     * We then normalize to [0,24) and split into hours/minutes/seconds.
     */
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24; // ensure it's in [0,24)

    // Convert UT (in fractional hours) into hours/minutes/seconds
    const hour = Math.floor(UT);
    const minute = Math.floor((UT - hour) * 60);
    const second = Math.round(((UT - hour) * 60 - minute) * 60);

    /**
     * Finally, construct a Date in UTC for the computed time.
     *
     * We use Date.UTC(year, month-1, day, h, m, s) so that the returned
     * Date represents that exact UTC time regardless of the environment's
     * local time zone.
     */
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  }

  // Compute both events
  const sunrise = calculateSunTime(true);
  const sunset = calculateSunTime(false);

  return { sunrise, sunset };
}

/**
 * EXAMPLE USAGE
 *
 * (You can delete this from your codebase if you don’t want in-file examples.)
 *
 * const date = new Date(Date.UTC(2025, 5, 10)); // 10 June 2025 (month is 0-based)
 * const lat = 41.9028;  // Rome
 * const lon = 12.4964;
 *
 * const { sunrise, sunset } = getSunriseSunsetUTC(date, lat, lon);
 *
 * console.log("Sunrise (UTC):", sunrise);
 * console.log("Sunset (UTC):", sunset);
 *
 * // If you want local time, convert using your preferred time zone handling:
 * //
 * //   const sunriseLocal = sunrise
 * //     ? sunrise.toLocaleString("en-GB", { timeZone: "Europe/Rome" })
 * //     : null;
 * //
 * //   const sunsetLocal = sunset
 * //     ? sunset.toLocaleString("en-GB", { timeZone: "Europe/Rome" })
 * //     : null;
 */
