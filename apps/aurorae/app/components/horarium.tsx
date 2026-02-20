'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  computeHorarium,
  createSinusoidPoints,
  getCurrentHour,
  getLocalTimeZone,
  getPhaseForSolarNoon,
  getSolarTimes,
  getSinusoidPointAtFractionFromSamples,
  getSunriseSunsetForTimeZone,
  getTimeZoneDayFraction,
  type Horarium,
} from '@core/lib/horarium';
import { formatCivilDateInTimeZone, HORA_ORDER, HORA_TO_ORDO } from './horarium-shared';

const WIDTH_FALLBACK = 480;
const HEIGHT_FALLBACK = 400;
const ASPECT_RATIO = HEIGHT_FALLBACK / WIDTH_FALLBACK;
const HEIGHT_SCALE = 1.2;
const CYCLES = 1;
const AMPLITUDE_RATIO = 0.4;
const PHASE = -0.5 * Math.PI;
const HOVER_LABEL_WIDTH = 60;
const ACTIVE_TOOLTIP_HEIGHT = 44;
const TOOLTIP_OFFSET_X = 16;
const TOOLTIP_OFFSET_Y = 28;
const TOOLTIP_MARGIN = 8;
const ACTIVE_TOOLTIP_CENTER_RANGE = 0.06;
const TOOLTIP_MIN_Y = 16;
const DRAG_ACTIVATION_DELTA = 4;

function formatSinusoidPoints(xValues: number[], yValues: number[]) {
  const length = Math.min(xValues.length, yValues.length);
  const points: string[] = [];

  for (let i = 0; i < length; i += 1) {
    points.push(`${xValues[i].toFixed(2)},${yValues[i].toFixed(2)}`);
  }

  return points.join(' ');
}

function formatFractionTime(fraction: number) {
  const totalMinutes = Math.round(Math.min(1, Math.max(0, fraction)) * 24 * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatClockTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTooltipLayout(
  point: { x: number; y: number },
  width: number,
  noonX: number,
) {
  const centerRange = Math.max(24, width * ACTIVE_TOOLTIP_CENTER_RANGE);
  const normalized = clamp((point.x - noonX) / centerRange, -1, 1);
  const anchorRatio = (1 - normalized) / 2;
  const minX = anchorRatio * HOVER_LABEL_WIDTH + TOOLTIP_MARGIN;
  const maxX = width - (1 - anchorRatio) * HOVER_LABEL_WIDTH - TOOLTIP_MARGIN;

  return {
    x: clamp(point.x + TOOLTIP_OFFSET_X * normalized, minX, maxX),
    y: Math.max(TOOLTIP_MIN_Y, point.y - TOOLTIP_OFFSET_Y),
    rectX: -anchorRatio * HOVER_LABEL_WIDTH - 4,
    textX: -anchorRatio * HOVER_LABEL_WIDTH,
  };
}

function getHoraSlug(hora: keyof Horarium | null) {
  if (!hora) {
    return null;
  }

  return HORA_TO_ORDO[hora].toLowerCase();
}

function getHoraForFraction(
  fraction: number,
  entries: { hora: keyof Horarium; fraction: number }[] | null,
): keyof Horarium | null {
  if (!entries || entries.length === 0) {
    return null;
  }

  for (let i = 0; i < entries.length; i += 1) {
    const current = entries[i];
    const next = entries[(i + 1) % entries.length];
    if (current.fraction <= next.fraction) {
      if (fraction >= current.fraction && fraction < next.fraction) {
        return current.hora;
      }
    } else if (fraction >= current.fraction || fraction < next.fraction) {
      return current.hora;
    }
  }

  return entries[entries.length - 1]?.hora ?? null;
}

export function Horarium({ now }: { now: Date }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number } | null>(null);
  const dragCaptureRef = useRef(false);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [selectedFraction, setSelectedFraction] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPoint, setHoverPoint] = useState<{
    x: number;
    y: number;
    fraction: number;
    hora: keyof Horarium | null;
  } | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) {
      setWidth(WIDTH_FALLBACK);
      return;
    }

    const updateSize = () => {
      const nextWidth = Math.floor(element.clientWidth);
      const nextHeight = Math.floor(element.clientHeight);
      if (nextWidth > 0) {
        setWidth(nextWidth);
      }
      if (nextHeight > 0) {
        setHeight(nextHeight);
      }
    };

    updateSize();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === element) {
            const nextWidth = Math.floor(entry.contentRect.width);
            const nextHeight = Math.floor(entry.contentRect.height);
            if (nextWidth > 0) {
              setWidth(nextWidth);
            }
            if (nextHeight > 0) {
              setHeight(nextHeight);
            }
          }
        }
      });
      observer.observe(element);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      observer?.disconnect();
    };
  }, []);

  const timeZone = getLocalTimeZone();
  const isoDate = useMemo(() => formatCivilDateInTimeZone(now, timeZone), [now, timeZone]);
  const availableWidth = width ?? WIDTH_FALLBACK;
  const availableHeight = height ?? HEIGHT_FALLBACK;
  const resolvedWidth = Math.max(
    1,
    Math.min(availableWidth, Math.floor(availableHeight / ASPECT_RATIO)),
  );
  const baseHeight = Math.max(1, Math.round(resolvedWidth * ASPECT_RATIO));
  const resolvedHeight = Math.max(1, Math.round(baseHeight * HEIGHT_SCALE));
  const { points, sunrisePoint, solarNoonPoint, nowPoint, samples } = useMemo(() => {
    const solarTimes = getSolarTimes(timeZone, now);
    const resolvedPhase = getPhaseForSolarNoon(solarTimes?.solarNoonFraction, PHASE);
    const nextSamples = createSinusoidPoints({
      width: resolvedWidth,
      height: resolvedHeight,
      cycles: CYCLES,
      amplitude: baseHeight * AMPLITUDE_RATIO,
      phase: resolvedPhase,
    });
    const nextPoints = formatSinusoidPoints(nextSamples[0], nextSamples[1]);
    const nextSunrisePoint = getSinusoidPointAtFractionFromSamples(
      solarTimes?.sunriseFraction ?? null,
      nextSamples,
    );
    const nextSolarNoonPoint = getSinusoidPointAtFractionFromSamples(
      solarTimes?.solarNoonFraction ?? null,
      nextSamples,
    );
    const nowFraction = getTimeZoneDayFraction(now, timeZone);
    const nextNowPoint = getSinusoidPointAtFractionFromSamples(nowFraction, nextSamples);

    return {
      points: nextPoints,
      sunrisePoint: nextSunrisePoint,
      solarNoonPoint: nextSolarNoonPoint,
      nowPoint: nextNowPoint,
      samples: nextSamples,
    };
  }, [now, resolvedHeight, resolvedWidth, timeZone]);
  const horaFractions = useMemo(() => {
    const sunriseSunset = getSunriseSunsetForTimeZone(timeZone, now);
    if (!sunriseSunset?.sunrise || !sunriseSunset?.sunset) {
      return null;
    }

    const horarium = computeHorarium(sunriseSunset.sunrise, sunriseSunset.sunset);
    return HORA_ORDER.map((hora) => ({
      hora,
      fraction: getTimeZoneDayFraction(horarium[hora], timeZone),
    }));
  }, [now, timeZone]);
  const currentHora = useMemo(() => {
    const sunriseSunset = getSunriseSunsetForTimeZone(timeZone, now);
    if (!sunriseSunset?.sunrise || !sunriseSunset?.sunset) {
      return null;
    }

    const horarium = computeHorarium(sunriseSunset.sunrise, sunriseSunset.sunset);
    return getCurrentHour(horarium, now);
  }, [now, timeZone]);
  const currentHoraSlug = useMemo(() => getHoraSlug(currentHora), [currentHora]);
  const currentHoraLabel = useMemo(() => {
    if (!currentHora) {
      return null;
    }

    return HORA_TO_ORDO[currentHora];
  }, [currentHora]);
  const selectedPoint = useMemo(() => {
    if (selectedFraction === null) {
      return null;
    }

    return getSinusoidPointAtFractionFromSamples(selectedFraction, samples);
  }, [samples, selectedFraction]);
  const selectedHora = useMemo(() => {
    if (selectedFraction === null) {
      return null;
    }

    return getHoraForFraction(selectedFraction, horaFractions);
  }, [horaFractions, selectedFraction]);
  const selectedHoraSlug = useMemo(() => getHoraSlug(selectedHora), [selectedHora]);
  const selectedHoraLabel = useMemo(() => {
    if (!selectedHora) {
      return null;
    }

    return HORA_TO_ORDO[selectedHora];
  }, [selectedHora]);
  const sunriseFadeStops = useMemo(() => {
    if (!sunrisePoint) {
      return null;
    }

    const start = Math.min(1, Math.max(0, sunrisePoint.y / resolvedHeight));
    const end = Math.min(1, Math.max(start, (sunrisePoint.y + 40) / resolvedHeight));

    return { start, end };
  }, [resolvedHeight, sunrisePoint]);
  const activePoint = selectedPoint ?? nowPoint;
  const activeHoraSlug = selectedHoraSlug ?? currentHoraSlug;
  const activeHoraLabel = selectedHoraLabel ?? currentHoraLabel;
  const noonX = solarNoonPoint?.x ?? resolvedWidth / 2;
  const hoverTooltipLayout = useMemo(() => {
    if (!hoverPoint) {
      return null;
    }

    return getTooltipLayout(hoverPoint, resolvedWidth, noonX);
  }, [hoverPoint, noonX, resolvedWidth]);
  const activeTooltipLayout = useMemo(() => {
    if (!activePoint) {
      return null;
    }

    return getTooltipLayout(activePoint, resolvedWidth, noonX);
  }, [activePoint, noonX, resolvedWidth]);

  const getPointerFraction = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, resolvedWidth);
    return resolvedWidth > 0 ? x / resolvedWidth : 0;
  };

  const updateHoverFromFraction = (fraction: number) => {
    const nextPoint = getSinusoidPointAtFractionFromSamples(fraction, samples);
    if (!nextPoint) {
      setHoverPoint(null);
      return;
    }

    setHoverPoint({
      ...nextPoint,
      fraction,
      hora: getHoraForFraction(fraction, horaFractions),
    });
  };

  const clearDragState = (event?: ReactPointerEvent<SVGSVGElement>) => {
    if (
      event &&
      dragCaptureRef.current &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStartRef.current = null;
    dragCaptureRef.current = false;
    setIsDragging(false);
  };
  const activeTooltip = activeTooltipLayout ? (
    <g transform={`translate(${activeTooltipLayout.x},${activeTooltipLayout.y})`}>
      <rect
        x={activeTooltipLayout.rectX}
        y={-ACTIVE_TOOLTIP_HEIGHT + 6}
        width={HOVER_LABEL_WIDTH + 8}
        height={ACTIVE_TOOLTIP_HEIGHT}
        fill="transparent"
      />
      <text
        x={activeTooltipLayout.textX}
        y={-5}
        textAnchor="start"
        dominantBaseline="middle"
        className="fill-muted text-[16px] font-mono font-semibold"
      >
        <>
          <tspan x={activeTooltipLayout.textX} dy="-0.4em">
            {selectedHora ?? currentHora ?? 'Hora'}
          </tspan>
          <tspan x={activeTooltipLayout.textX} dy="1.2em">
            {selectedFraction !== null
              ? formatFractionTime(selectedFraction)
              : formatClockTime(now, timeZone)}
          </tspan>
          <tspan dx="0.4em" className="fill-oxblood text-[22px]" opacity={0.8}>
            →
          </tspan>
        </>
      </text>
    </g>
  ) : null;

  return (
    <div
      ref={wrapperRef}
      className="mx-auto h-auto max-h-[80vh] w-full max-w-[800px] overscroll-contain box-border p-6"
    >
      <svg
        className="h-auto w-full cursor-crosshair select-none touch-none"
        width={resolvedWidth}
        height={resolvedHeight}
        viewBox={`0 0 ${resolvedWidth} ${resolvedHeight}`}
        role="img"
        aria-label="Horarium sinusoid"
        onPointerDown={(event) => {
          dragStartRef.current = { x: event.clientX };
          const fraction = hoverPoint?.fraction ?? getPointerFraction(event);
          setSelectedFraction(fraction);
        }}
        onPointerMove={(event) => {
          const fraction = getPointerFraction(event);
          updateHoverFromFraction(fraction);

          const dragStart = dragStartRef.current;
          if (!dragStart) {
            return;
          }

          let dragging = isDragging;
          if (!dragging) {
            const delta = Math.abs(event.clientX - dragStart.x);
            if (delta > DRAG_ACTIVATION_DELTA) {
              dragging = true;
              setIsDragging(true);
              if (!dragCaptureRef.current) {
                event.currentTarget.setPointerCapture(event.pointerId);
                dragCaptureRef.current = true;
              }
            }
          }

          if (dragging) {
            setSelectedFraction(fraction);
          }
        }}
        onPointerUp={(event) => {
          clearDragState(event);
        }}
        onPointerCancel={(event) => {
          clearDragState(event);
        }}
        onPointerLeave={(event) => {
          setHoverPoint(null);
          clearDragState(event);
        }}
      >
        <defs>
          <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
          {sunriseFadeStops ? (
            <linearGradient
              id="sinusoid-fade"
              x1="0"
              y1="0"
              x2="0"
              y2={resolvedHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="currentColor" stopOpacity="1" />
              <stop offset={sunriseFadeStops.start} stopColor="currentColor" stopOpacity="1" />
              <stop offset={sunriseFadeStops.end} stopColor="currentColor" stopOpacity="0.35" />
              <stop offset={1} stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          ) : null}
        </defs>
        <polyline
          points={points}
          fill="none"
          strokeWidth={18}
          stroke="transparent"
          pointerEvents="stroke"
          data-sinusoid-hit="true"
        />
        <polyline
          points={points}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-oxblood"
          stroke={sunriseFadeStops ? 'url(#sinusoid-fade)' : 'currentColor'}
          data-sinusoid-hit="true"
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
        {activePoint ? (
          <>
            {activeHoraSlug ? (
              <>
                <g aria-label={`Active ${activeHoraLabel ?? 'hora'}`} className="cursor-pointer">
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r={18}
                    fill="transparent"
                    data-sun-handle="true"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r={10}
                    className="fill-amber-400/60"
                    filter="url(#sun-glow)"
                    data-sun-handle="true"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r={4}
                    className="fill-oxblood"
                    data-sun-handle="true"
                  />
                </g>
                {activeTooltip}
              </>
            ) : (
              <>
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r={10}
                  className="fill-amber-400/60"
                  filter="url(#sun-glow)"
                  data-sun-handle="true"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r={4}
                  className="fill-oxblood"
                  data-sun-handle="true"
                />
                {activeTooltip}
              </>
            )}
          </>
        ) : null}
        {hoverPoint ? (
          <>
            {hoverTooltipLayout ? (
              <>
                <line
                  x1={hoverPoint.x}
                  y1={0}
                  x2={hoverPoint.x}
                  y2={resolvedHeight}
                  strokeWidth={12}
                  stroke="transparent"
                  pointerEvents="stroke"
                  data-sinusoid-hit="true"
                />
                <line
                  x1={hoverPoint.x}
                  y1={0}
                  x2={hoverPoint.x}
                  y2={resolvedHeight}
                  strokeWidth={1}
                  className="stroke-muted"
                />
                <circle cx={hoverPoint.x} cy={hoverPoint.y} r={6} className="fill-muted" />
                <g
                  transform={`translate(${hoverTooltipLayout.x},${hoverTooltipLayout.y})`}
                  pointerEvents="none"
                >
                  <rect
                    x={hoverTooltipLayout.rectX}
                    y={-ACTIVE_TOOLTIP_HEIGHT + 6}
                    width={HOVER_LABEL_WIDTH + 8}
                    height={ACTIVE_TOOLTIP_HEIGHT}
                    fill="transparent"
                  />
                  <text
                    x={hoverTooltipLayout.textX}
                    y={-5}
                    textAnchor="start"
                    dominantBaseline="middle"
                    className="fill-muted text-[16px] font-mono font-semibold"
                  >
                    {hoverPoint.hora ? (
                      <>
                        <tspan x={hoverTooltipLayout.textX} dy="-0.4em">
                          {hoverPoint.hora}
                        </tspan>
                        <tspan x={hoverTooltipLayout.textX} dy="1.2em">
                          {formatFractionTime(hoverPoint.fraction)}
                        </tspan>
                      </>
                    ) : (
                      formatFractionTime(hoverPoint.fraction)
                    )}
                  </text>
                </g>
              </>
            ) : null}
          </>
        ) : null}
      </svg>
      <div className="fixed bottom-6 right-6 z-20 flex gap-2">
        <button
          type="button"
          className="rounded-full border border-oxblood/30 px-4 py-1 text-sm font-semibold text-oxblood transition hover:border-oxblood/60 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => setSelectedFraction(null)}
          disabled={selectedFraction === null}
        >
          Now
        </button>
        <button
          type="button"
          className="rounded-full bg-oxblood px-4 py-1 text-sm font-semibold text-amber-50 transition hover:bg-oxblood/90 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            if (activeHoraSlug) {
              window.location.href = `/${isoDate}/${activeHoraSlug}`;
            }
          }}
          disabled={!activeHoraSlug}
          aria-label={`Go to ${activeHoraLabel ?? 'hora'}`}
        >
          Go
        </button>
      </div>
    </div>
  );
}
