import { useMemo } from 'react';
import {
  computeHorarium,
  getCurrentHour,
  getSunriseSunsetForTimeZone,
  getTimeZoneDayFraction,
  type Horarium,
} from '@core/lib/horarium';
import { formatCivilDateInTimeZone, HORA_ORDER } from '../horarium-shared';

export type HoraFractionEntry = {
  hora: keyof Horarium;
  fraction: number;
};

type UseHorariumDataOptions = {
  now: Date | null;
  timeZone: string | null;
};

export function useHorariumData({ now, timeZone }: UseHorariumDataOptions) {
  const isoDate = useMemo(() => {
    if (!now) {
      return '';
    }
    return formatCivilDateInTimeZone(now, timeZone);
  }, [now, timeZone]);

  const horarium = useMemo(() => {
    if (!now || !timeZone) {
      return null;
    }

    const solarTimes = getSunriseSunsetForTimeZone(timeZone, now);
    if (!solarTimes?.sunrise || !solarTimes?.sunset) {
      return null;
    }

    return computeHorarium(solarTimes.sunrise, solarTimes.sunset);
  }, [now, timeZone]);

  const currentHora = useMemo(() => {
    if (!now || !horarium) {
      return null;
    }

    return getCurrentHour(horarium, now);
  }, [horarium, now]);

  const horaFractions = useMemo(() => {
    if (!timeZone || !horarium) {
      return null;
    }

    return HORA_ORDER.map((hora) => ({
      hora,
      fraction: getTimeZoneDayFraction(horarium[hora], timeZone),
    }));
  }, [horarium, timeZone]);

  return {
    isoDate,
    horarium,
    currentHora,
    horaFractions,
  };
}
