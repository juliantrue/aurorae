import { getSunriseSunsetUTC } from './sunriseSunset';
import tzAnchors from '../tz-anchors.json';

export type SolarTimes = {
  sunriseFraction: number;
  sunsetFraction: number;
  solarNoonFraction: number;
};

type TzAnchor = { lat: number; lon: number };
const tzAnchorMap = tzAnchors as Record<string, TzAnchor>;

export function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getTimeZoneDayFraction(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  const second = Number(parts.find((part) => part.type === 'second')?.value ?? 0);

  return (hour * 3600 + minute * 60 + second) / 86400;
}

export function getSunriseSunsetForTimeZone(
  timeZone: string,
  date: Date = new Date(),
): { sunrise: Date | null; sunset: Date | null } | null {
  const anchor = tzAnchorMap[timeZone];
  if (!anchor) {
    return null;
  }

  return getSunriseSunsetUTC(date, anchor.lat, anchor.lon);
}

export function getSolarTimes(timeZone: string, date: Date): SolarTimes | null {
  const sunriseSunset = getSunriseSunsetForTimeZone(timeZone, date);
  if (!sunriseSunset?.sunrise || !sunriseSunset?.sunset) {
    return null;
  }

  const sunriseFraction = getTimeZoneDayFraction(sunriseSunset.sunrise, timeZone);
  const sunsetFraction = getTimeZoneDayFraction(sunriseSunset.sunset, timeZone);
  const solarNoonFraction = (sunriseFraction + sunsetFraction) / 2;

  return { sunriseFraction, sunsetFraction, solarNoonFraction };
}
