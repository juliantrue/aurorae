'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  computeHorarium,
  getCurrentHour,
  getLocalTimeZone,
  getSunriseSunsetForTimeZone,
  type Horarium,
} from '@core/lib/horarium';

type OrdoRoute =
  | {
      slug: string;
      label: string;
      description: string;
      kind: 'hora';
      ordo: string;
    }
  | {
      slug: string;
      label: 'Missa';
      description: string;
      kind: 'missa';
      ordo: 'Missa';
    };

const HORA_ORDER: (keyof Horarium)[] = [
  'Matins',
  'Lauds',
  'Prime',
  'Terce',
  'Sext',
  'None',
  'Vespers',
  'Compline',
];

const HORA_TO_ORDO: Record<keyof Horarium, string> = {
  Matins: 'Matutinum',
  Lauds: 'Laudes',
  Prime: 'Prima',
  Terce: 'Tertia',
  Sext: 'Sexta',
  None: 'Nona',
  Vespers: 'Vesperae',
  Compline: 'Completorium',
};

function formatHoraTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function OrdoSchedule({ routes }: { routes: OrdoRoute[] }) {
  const [now, setNow] = useState(() => new Date());
  const [timeZone, setTimeZone] = useState<string | null>(null);

  useEffect(() => {
    setTimeZone(getLocalTimeZone());
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  const horaRoutes = useMemo(() => routes.filter((route) => route.kind === 'hora'), [routes]);
  const routeByOrdo = useMemo(
    () => Object.fromEntries(horaRoutes.map((route) => [route.ordo, route])),
    [horaRoutes],
  );

  const schedule = useMemo(() => {
    if (!timeZone) {
      return null;
    }

    const solarTimes = getSunriseSunsetForTimeZone(timeZone, now);
    if (!solarTimes?.sunrise || !solarTimes?.sunset) {
      return null;
    }

    const horarium = computeHorarium(solarTimes.sunrise, solarTimes.sunset);
    const currentHoraKey = getCurrentHour(horarium, now);
    return { horarium, currentHoraKey };
  }, [now, timeZone]);

  const missaRoute = routes.find((route) => route.kind === 'missa') ?? null;

  if (!timeZone) {
    return (
      <section
        className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10"
        id="ordo-navigation"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Ordo</p>
          <h2 className="font-display text-2xl font-medium">Loading horarium</h2>
          <p className="text-sm leading-relaxed text-muted">Calculating local solar times.</p>
        </div>
      </section>
    );
  }

  if (!schedule) {
    return (
      <section
        className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10"
        id="ordo-navigation"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Ordo</p>
          <h2 className="font-display text-2xl font-medium">Horarium unavailable</h2>
          <p className="text-sm leading-relaxed text-muted">
            We could not resolve sunrise and sunset for your time zone.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/ordo/${route.slug}`}
              className="flex h-full transform flex-col gap-2 rounded-card border border-border border-l-4 border-l-oxblood bg-ivory p-5 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-oxblood hover:shadow-[0_15px_30px_rgba(75,15,15,0.15)]"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                  {route.kind === 'hora' ? 'Hora' : 'Missal'}
                </p>
                <h3 className="font-display text-2xl font-medium">{route.label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{route.description}</p>
              <span aria-hidden className="self-end text-xl text-oxblood">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const currentOrdoLabel = HORA_TO_ORDO[schedule.currentHoraKey];
  const currentRoute = routeByOrdo[currentOrdoLabel] ?? null;

  return (
    <section
      className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10"
      id="ordo-navigation"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Ordo</p>
        <h2 className="font-display text-2xl font-medium">Today&apos;s horarium</h2>
        <p className="text-sm leading-relaxed text-muted">
          Current hora: <span className="font-semibold text-oxblood">{currentOrdoLabel}</span>
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-card border border-border bg-parchment/60 p-4 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Schedule</p>
          <div className="mt-4 space-y-3">
            {HORA_ORDER.map((horaKey) => {
              const ordoLabel = HORA_TO_ORDO[horaKey];
              const horaRoute = routeByOrdo[ordoLabel];
              const isCurrent = schedule.currentHoraKey === horaKey;
              const horaLabel = horaRoute?.label ?? ordoLabel;
              const horaTime = formatHoraTime(schedule.horarium[horaKey], timeZone);

              return (
                <div
                  key={horaKey}
                  className={`flex items-center justify-between rounded-card border px-4 py-2 text-sm ${
                    isCurrent
                      ? 'border-oxblood bg-amber-50/80 text-oxblood'
                      : 'border-border bg-ivory text-muted'
                  }`}
                >
                  <span className="font-medium">{horaLabel}</span>
                  <span className="font-mono text-xs">{horaTime}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {currentRoute ? (
            <Link
              href={`/ordo/${currentRoute.slug}`}
              className="flex h-full transform flex-col gap-2 rounded-card border border-border border-l-4 border-l-oxblood bg-ivory p-5 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-oxblood hover:shadow-[0_15px_30px_rgba(75,15,15,0.15)]"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Current hora</p>
              <h3 className="font-display text-2xl font-medium">{currentRoute.label}</h3>
              <p className="text-sm leading-relaxed text-muted">{currentRoute.description}</p>
              <span aria-hidden className="self-end text-xl text-oxblood">
                →
              </span>
            </Link>
          ) : null}

          {missaRoute ? (
            <Link
              href={`/ordo/${missaRoute.slug}`}
              className="flex h-full transform flex-col gap-2 rounded-card border border-border border-l-4 border-l-oxblood bg-ivory p-5 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-oxblood hover:shadow-[0_15px_30px_rgba(75,15,15,0.15)]"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Missal</p>
              <h3 className="font-display text-2xl font-medium">{missaRoute.label}</h3>
              <p className="text-sm leading-relaxed text-muted">{missaRoute.description}</p>
              <span aria-hidden className="self-end text-xl text-oxblood">
                →
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
