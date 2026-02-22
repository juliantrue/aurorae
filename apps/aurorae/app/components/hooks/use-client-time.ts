import { useEffect, useState } from 'react';
import { getLocalTimeZone } from '@core/lib/horarium';

type UseNowOptions<TClientOnly extends boolean = false> = {
  intervalMs?: number;
  clientOnly?: TClientOnly;
};

export function useNow<TClientOnly extends boolean = false>(
  options: UseNowOptions<TClientOnly> = {},
): TClientOnly extends true ? Date | null : Date {
  const { intervalMs, clientOnly = false as TClientOnly } = options;
  const [now, setNow] = useState<Date | null>(() => (clientOnly ? null : new Date()));

  useEffect(() => {
    if (!clientOnly) {
      return;
    }

    setNow(new Date());
  }, [clientOnly]);

  useEffect(() => {
    if (!intervalMs || intervalMs <= 0) {
      return;
    }

    const id = window.setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => {
      window.clearInterval(id);
    };
  }, [intervalMs]);

  return now as TClientOnly extends true ? Date | null : Date;
}

export function useLocalTimeZone() {
  const [timeZone, setTimeZone] = useState<string | null>(null);

  useEffect(() => {
    setTimeZone(getLocalTimeZone());
  }, []);

  return timeZone;
}
