'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createSinusoidPoints,
  getLocalTimeZone,
  getPhaseForSolarNoon,
  getSolarTimes,
  getSinusoidMetrics,
  getSinusoidPointAtFraction,
  getTimeZoneDayFraction,
} from '@core/lib/horarium';

const WIDTH_FALLBACK = 480;
const HEIGHT = 400;
const CYCLES = 1;
const AMPLITUDE = 100;
const PHASE = -0.5 * Math.PI;

export type HorariumProps = {
  now: Date;
};

export function Horarium({ now }: HorariumProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      setWidth(WIDTH_FALLBACK);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === element) {
          const nextWidth = Math.floor(entry.contentRect.width);
          if (nextWidth > 0) {
            setWidth(nextWidth);
          }
        }
      }
    });

    observer.observe(element);
    setWidth(element.clientWidth || WIDTH_FALLBACK);

    return () => {
      observer.disconnect();
    };
  }, []);

  const timeZone = getLocalTimeZone();
  const resolvedWidth = Math.max(1, width ?? WIDTH_FALLBACK);
  const { midline, resolvedAmplitude } = getSinusoidMetrics(HEIGHT, AMPLITUDE);
  const {
    points,
    sunrisePoint,
    nowPoint,
  } = useMemo(() => {
    const solarTimes = getSolarTimes(timeZone, now);
    const resolvedPhase = getPhaseForSolarNoon(solarTimes?.solarNoonFraction, PHASE);
    const nextPoints = createSinusoidPoints({
      width: resolvedWidth,
      height: HEIGHT,
      cycles: CYCLES,
      amplitude: AMPLITUDE,
      phase: resolvedPhase,
    });
    const nextSunrisePoint = getSinusoidPointAtFraction(solarTimes?.sunriseFraction ?? null, {
      width: resolvedWidth,
      cycles: CYCLES,
      midline,
      amplitude: resolvedAmplitude,
      phase: resolvedPhase,
    });
    const nowFraction = getTimeZoneDayFraction(now, timeZone);
    const nextNowPoint = getSinusoidPointAtFraction(nowFraction, {
      width: resolvedWidth,
      cycles: CYCLES,
      midline,
      amplitude: resolvedAmplitude,
      phase: resolvedPhase,
    });

    return {
      points: nextPoints,
      sunrisePoint: nextSunrisePoint,
      nowPoint: nextNowPoint,
    };
  }, [midline, now, resolvedAmplitude, resolvedWidth, timeZone]);

  return (
    <div ref={wrapperRef} className="mx-auto w-full max-w-[500px]">
      <svg
        className="h-auto w-full"
        width={resolvedWidth}
        height={HEIGHT}
        viewBox={`0 0 ${resolvedWidth} ${HEIGHT}`}
        role="img"
        aria-label="Horarium sinusoid"
      >
        <defs>
          <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <polyline
          points={points}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-oxblood"
        />
        {sunrisePoint ? (
          <line
            x1={0}
            y1={sunrisePoint.y}
            x2={resolvedWidth}
            y2={sunrisePoint.y}
            strokeWidth={1}
            className="stroke-muted"
          />
        ) : null}
        {nowPoint ? (
          <>
            <circle
              cx={nowPoint.x}
              cy={nowPoint.y}
              r={10}
              className="fill-amber-400/60"
              filter="url(#sun-glow)"
            />
            <circle cx={nowPoint.x} cy={nowPoint.y} r={4} className="fill-oxblood" />
          </>
        ) : null}
      </svg>
    </div>
  );
}
