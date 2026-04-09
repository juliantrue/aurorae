'use client';

import { useMemo } from 'react';
import { useHorariumData } from './hooks/use-horarium-data';
import { useLocalTimeZone, useNow } from './hooks/use-client-time';
import { HORA_ORDER, HORA_TO_ORDO } from './horarium-shared';
import { OrdoRouteCard, OrdoSection } from './ordo-schedule-parts';

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

function formatHoraTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function OrdoSchedule({ routes }: { routes: OrdoRoute[] }) {
  const now = useNow({ intervalMs: 60 * 1000, clientOnly: true });
  const timeZone = useLocalTimeZone();
  const { isoDate, horarium, currentHora } = useHorariumData({ now, timeZone });
  const horaRoutes = useMemo(() => routes.filter((route) => route.kind === 'hora'), [routes]);
  const routeByOrdo = useMemo(() => new Map(horaRoutes.map((route) => [route.ordo, route])), [horaRoutes]);

  const missaRoute = routes.find((route) => route.kind === 'missa') ?? null;

  if (!now || !timeZone) {
    return (
      <OrdoSection
        title="Loading horarium"
        subtitle="Calculating local solar times."
      />
    );
  }

  if (!horarium || !currentHora) {
    return (
      <OrdoSection
        title="Horarium unavailable"
        subtitle="We could not resolve sunrise and sunset for your time zone."
      >
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <OrdoRouteCard
              key={route.slug}
              href={`/${isoDate}/${route.slug}`}
              eyebrow={route.kind === 'hora' ? 'Hora' : 'Missal'}
              label={route.label}
              description={route.description}
            />
          ))}
        </div>
      </OrdoSection>
    );
  }

  const currentOrdoLabel = HORA_TO_ORDO[currentHora];
  const currentRoute = routeByOrdo.get(currentOrdoLabel) ?? null;

  return (
    <OrdoSection
      title="Today's horarium"
      subtitle={
        <>
          Current hora: <span className="font-semibold text-oxblood">{currentOrdoLabel}</span>
        </>
      }
    >
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-card border border-border bg-parchment/60 p-4 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Schedule</p>
          <div className="mt-4 space-y-3">
            {HORA_ORDER.map((horaKey) => {
              const ordoLabel = HORA_TO_ORDO[horaKey];
              const horaRoute = routeByOrdo.get(ordoLabel);
              const isCurrent = currentHora === horaKey;
              const horaLabel = horaRoute?.label ?? ordoLabel;
              const horaTime = formatHoraTime(horarium[horaKey], timeZone);

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
            <OrdoRouteCard
              href={`/${isoDate}/${currentRoute.slug}`}
              eyebrow="Current hora"
              label={currentRoute.label}
              description={currentRoute.description}
            />
          ) : null}

          {missaRoute ? (
            <OrdoRouteCard
              href={`/${isoDate}/${missaRoute.slug}`}
              eyebrow="Missal"
              label={missaRoute.label}
              description={missaRoute.description}
            />
          ) : null}
        </div>
      </div>
    </OrdoSection>
  );
}
