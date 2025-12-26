import { describe, expect, test } from "@jest/globals";
import {
  computeHorarium,
  createSinusoidPoints,
  getCurrentHour,
  getPhaseForSolarNoon,
  getSinusoidMetrics,
  getSinusoidPointAtFraction,
  getSinusoidPointAtFractionFromSamples,
  getSolarTimes,
  getTimeZoneDayFraction,
  getSunriseSunsetForTimeZone,
} from "../horarium";
import { getSunriseSunsetUTC } from "../horarium/sunriseSunset";

describe("horarium solar helpers", () => {
  test("getTimeZoneDayFraction uses the provided time zone", () => {
    const noonUtc = new Date(Date.UTC(2025, 0, 1, 12, 0, 0));
    expect(getTimeZoneDayFraction(noonUtc, "UTC")).toBeCloseTo(0.5, 6);
    expect(getTimeZoneDayFraction(noonUtc, "America/New_York")).toBeCloseTo(7 / 24, 6);
  });

  test("getSunriseSunsetForTimeZone returns null for unknown zones", () => {
    const result = getSunriseSunsetForTimeZone("Not/A-Real_Zone", new Date());
    expect(result).toBeNull();
  });

  test("getSolarTimes returns ordered fractions for known zones", () => {
    const date = new Date(Date.UTC(2025, 5, 10));
    const solarTimes = getSolarTimes("Europe/Andorra", date);
    expect(solarTimes).not.toBeNull();
    expect(solarTimes?.sunriseFraction).toBeGreaterThanOrEqual(0);
    expect(solarTimes?.sunsetFraction).toBeLessThanOrEqual(1);
    expect(solarTimes?.sunriseFraction).toBeLessThan(solarTimes?.solarNoonFraction ?? 0);
    expect(solarTimes?.solarNoonFraction).toBeLessThan(solarTimes?.sunsetFraction ?? 1);
  });

  test("getSunriseSunsetUTC returns nulls during polar night", () => {
    const date = new Date(Date.UTC(2025, 11, 21));
    const { sunrise, sunset } = getSunriseSunsetUTC(date, 78, 15);
    expect(sunrise).toBeNull();
    expect(sunset).toBeNull();
  });
});

describe("horarium sinusoid helpers", () => {
  test("getSinusoidMetrics clamps amplitude", () => {
    const metrics = getSinusoidMetrics(100, 1000);
    expect(metrics.midline).toBe(50);
    expect(metrics.resolvedAmplitude).toBe(48);
  });

  test("createSinusoidPoints returns a stable point count", () => {
    const [xPoints, yPoints] = createSinusoidPoints({
      width: 12,
      height: 80,
      cycles: 1,
      phase: 0,
    });
    expect(xPoints).toHaveLength(49);
    expect(yPoints).toHaveLength(49);
  });

  test("getPhaseForSolarNoon falls back for null input", () => {
    expect(getPhaseForSolarNoon(null)).toBeCloseTo(-0.5 * Math.PI, 6);
    expect(getPhaseForSolarNoon(0.25)).toBeCloseTo(0, 6);
  });

  test("getSinusoidPointAtFraction clamps fraction bounds", () => {
    const point = getSinusoidPointAtFraction(-0.2, {
      width: 100,
      cycles: 1,
      midline: 40,
      amplitude: 20,
      phase: 0,
    });
    expect(point).toEqual({ x: 0, y: 40 });
    expect(getSinusoidPointAtFraction(null, {
      width: 100,
      cycles: 1,
      midline: 40,
      amplitude: 20,
      phase: 0,
    })).toBeNull();
  });

  test("getSinusoidPointAtFractionFromSamples clamps fraction bounds", () => {
    const samples = createSinusoidPoints({
      width: 10,
      height: 20,
      cycles: 1,
      phase: 0,
    });
    const point = getSinusoidPointAtFractionFromSamples(-0.5, samples);
    expect(point?.x).toBeCloseTo(0, 6);
    expect(getSinusoidPointAtFractionFromSamples(null, samples)).toBeNull();
  });
});

describe("horarium schedule", () => {
  test("computeHorarium derives canonical hours from sunrise/sunset", () => {
    const sunrise = new Date(Date.UTC(2025, 0, 1, 6, 0, 0));
    const sunset = new Date(Date.UTC(2025, 0, 1, 18, 0, 0));
    const horarium = computeHorarium(sunrise, sunset);

    expect(horarium.Matins.toISOString()).toBe("2025-01-02T02:00:00.000Z");
    expect(horarium.Lauds.toISOString()).toBe("2025-01-01T05:30:00.000Z");
    expect(horarium.Prime.toISOString()).toBe("2025-01-01T07:00:00.000Z");
    expect(horarium.Terce.toISOString()).toBe("2025-01-01T09:00:00.000Z");
    expect(horarium.Sext.toISOString()).toBe("2025-01-01T12:00:00.000Z");
    expect(horarium.None.toISOString()).toBe("2025-01-01T15:00:00.000Z");
    expect(horarium.Vespers.toISOString()).toBe("2025-01-01T17:30:00.000Z");
    expect(horarium.Compline.toISOString()).toBe("2025-01-01T18:30:00.000Z");
  });

  test("getCurrentHour matches the current canonical hour", () => {
    const sunrise = new Date(Date.UTC(2025, 0, 1, 6, 0, 0));
    const sunset = new Date(Date.UTC(2025, 0, 1, 18, 0, 0));
    const horarium = computeHorarium(sunrise, sunset);

    const nowPrime = new Date(Date.UTC(2025, 0, 1, 8, 0, 0));
    expect(getCurrentHour(horarium, nowPrime)).toBe("Prime");

    const nowCompline = new Date(Date.UTC(2025, 0, 1, 23, 0, 0));
    expect(getCurrentHour(horarium, nowCompline)).toBe("Compline");
  });
});
