'use client';

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  createSinusoidPoints,
  getLocalTimeZone,
  getPhaseForSolarNoon,
  getSolarTimes,
  getSinusoidPointAtFractionFromSamples,
  getTimeZoneDayFraction,
  type Horarium,
} from '@core/lib/horarium';
import { useElementSize } from './hooks/use-element-size';
import { useHorariumData, type HoraFractionEntry } from './hooks/use-horarium-data';
import { HORA_TO_ORDO } from './horarium-shared';

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

type SinusoidSamples = ReturnType<typeof createSinusoidPoints>;

type TooltipLayout = {
  x: number;
  y: number;
  rectX: number;
  textX: number;
};

type HoverPoint = {
  x: number;
  y: number;
  fraction: number;
  hora: keyof Horarium | null;
};

function formatSinusoidPoints(xValues: number[], yValues: number[]) {
  const length = Math.min(xValues.length, yValues.length);
  const points: string[] = [];

  for (let index = 0; index < length; index += 1) {
    points.push(`${xValues[index].toFixed(2)},${yValues[index].toFixed(2)}`);
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

function getTooltipLayout(point: { x: number; y: number }, width: number, noonX: number): TooltipLayout {
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
  entries: HoraFractionEntry[] | null,
): keyof Horarium | null {
  if (!entries || entries.length === 0) {
    return null;
  }

  for (let index = 0; index < entries.length; index += 1) {
    const current = entries[index];
    const next = entries[(index + 1) % entries.length];

    if (current.fraction <= next.fraction) {
      if (fraction >= current.fraction && fraction < next.fraction) {
        return current.hora;
      }
      continue;
    }

    if (fraction >= current.fraction || fraction < next.fraction) {
      return current.hora;
    }
  }

  return entries[entries.length - 1]?.hora ?? null;
}

function HoraTooltip({
  layout,
  primary,
  secondary,
  showArrow = false,
  pointerEvents,
}: {
  layout: TooltipLayout;
  primary?: string;
  secondary: string;
  showArrow?: boolean;
  pointerEvents?: 'none';
}) {
  return (
    <g transform={`translate(${layout.x},${layout.y})`} pointerEvents={pointerEvents}>
      <rect
        x={layout.rectX}
        y={-ACTIVE_TOOLTIP_HEIGHT + 6}
        width={HOVER_LABEL_WIDTH + 8}
        height={ACTIVE_TOOLTIP_HEIGHT}
        fill="transparent"
      />
      <text
        x={layout.textX}
        y={-5}
        textAnchor="start"
        dominantBaseline="middle"
        className="fill-muted text-[16px] font-mono font-semibold"
      >
        {primary ? (
          <>
            <tspan x={layout.textX} dy="-0.4em">
              {primary}
            </tspan>
            <tspan x={layout.textX} dy="1.2em">
              {secondary}
            </tspan>
          </>
        ) : (
          secondary
        )}
        {showArrow ? (
          <tspan dx="0.4em" className="fill-oxblood text-[22px]" opacity={0.8}>
            →
          </tspan>
        ) : null}
      </text>
    </g>
  );
}

function SunMarker({
  point,
  interactive,
  ariaLabel,
}: {
  point: { x: number; y: number };
  interactive: boolean;
  ariaLabel?: string;
}) {
  return (
    <g aria-label={ariaLabel} className={interactive ? 'cursor-pointer' : undefined}>
      {interactive ? (
        <circle cx={point.x} cy={point.y} r={18} fill="transparent" data-sun-handle="true" />
      ) : null}
      <circle
        cx={point.x}
        cy={point.y}
        r={10}
        className="fill-amber-400/60"
        filter="url(#sun-glow)"
        data-sun-handle="true"
      />
      <circle cx={point.x} cy={point.y} r={4} className="fill-oxblood" data-sun-handle="true" />
    </g>
  );
}

function HorariumControls({
  canReset,
  canNavigate,
  goLabel,
  onReset,
  onGo,
}: {
  canReset: boolean;
  canNavigate: boolean;
  goLabel: string;
  onReset: () => void;
  onGo: () => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-20 flex gap-2">
      <button
        type="button"
        className="rounded-full border border-oxblood/30 px-4 py-1 text-sm font-semibold text-oxblood transition hover:border-oxblood/60 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={onReset}
        disabled={!canReset}
      >
        Now
      </button>
      <button
        type="button"
        className="rounded-full bg-oxblood px-4 py-1 text-sm font-semibold text-amber-50 transition hover:bg-oxblood/90 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={onGo}
        disabled={!canNavigate}
        aria-label={`Go to ${goLabel}`}
      >
        Go
      </button>
    </div>
  );
}

function useHorariumInteraction({
  width,
  samples,
  horaFractions,
}: {
  width: number;
  samples: SinusoidSamples;
  horaFractions: HoraFractionEntry[] | null;
}) {
  const dragStartRef = useRef<{ x: number } | null>(null);
  const dragCaptureRef = useRef(false);
  const [selectedFraction, setSelectedFraction] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPoint, setHoverPoint] = useState<HoverPoint | null>(null);

  const getPointerFraction = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, width);
    return width > 0 ? x / width : 0;
  };

  const updateHoverPoint = (fraction: number) => {
    const point = getSinusoidPointAtFractionFromSamples(fraction, samples);
    if (!point) {
      setHoverPoint(null);
      return;
    }

    setHoverPoint({
      ...point,
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

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    dragStartRef.current = { x: event.clientX };
    const fraction = hoverPoint?.fraction ?? getPointerFraction(event);
    setSelectedFraction(fraction);
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const fraction = getPointerFraction(event);
    updateHoverPoint(fraction);

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
  };

  const handlePointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    clearDragState(event);
  };

  const handlePointerCancel = (event: ReactPointerEvent<SVGSVGElement>) => {
    clearDragState(event);
  };

  const handlePointerLeave = (event: ReactPointerEvent<SVGSVGElement>) => {
    setHoverPoint(null);
    clearDragState(event);
  };

  return {
    hoverPoint,
    selectedFraction,
    setSelectedFraction,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
  };
}

export function Horarium({ now }: { now: Date }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { width: availableWidth, height: availableHeight } = useElementSize(wrapperRef, {
    fallbackWidth: WIDTH_FALLBACK,
    fallbackHeight: HEIGHT_FALLBACK,
  });

  const timeZone = useMemo(() => getLocalTimeZone(), []);
  const { isoDate, currentHora, horaFractions } = useHorariumData({ now, timeZone });

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

    const nowFraction = getTimeZoneDayFraction(now, timeZone);

    return {
      points: formatSinusoidPoints(nextSamples[0], nextSamples[1]),
      sunrisePoint: getSinusoidPointAtFractionFromSamples(solarTimes?.sunriseFraction ?? null, nextSamples),
      solarNoonPoint: getSinusoidPointAtFractionFromSamples(
        solarTimes?.solarNoonFraction ?? null,
        nextSamples,
      ),
      nowPoint: getSinusoidPointAtFractionFromSamples(nowFraction, nextSamples),
      samples: nextSamples,
    };
  }, [baseHeight, now, resolvedHeight, resolvedWidth, timeZone]);

  const {
    hoverPoint,
    selectedFraction,
    setSelectedFraction,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
  } = useHorariumInteraction({ width: resolvedWidth, samples, horaFractions });

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

  const sunriseFadeStops = useMemo(() => {
    if (!sunrisePoint) {
      return null;
    }

    const start = clamp(sunrisePoint.y / resolvedHeight, 0, 1);
    const end = clamp((sunrisePoint.y + 40) / resolvedHeight, start, 1);

    return { start, end };
  }, [resolvedHeight, sunrisePoint]);

  const currentHoraSlug = getHoraSlug(currentHora);
  const selectedHoraSlug = getHoraSlug(selectedHora);
  const activePoint = selectedPoint ?? nowPoint;
  const activeHoraSlug = selectedHoraSlug ?? currentHoraSlug;
  const activeHoraLabel = selectedHora
    ? HORA_TO_ORDO[selectedHora]
    : currentHora
      ? HORA_TO_ORDO[currentHora]
      : null;

  const noonX = solarNoonPoint?.x ?? resolvedWidth / 2;
  const activeTooltipLayout = activePoint ? getTooltipLayout(activePoint, resolvedWidth, noonX) : null;
  const hoverTooltipLayout = hoverPoint ? getTooltipLayout(hoverPoint, resolvedWidth, noonX) : null;

  const activeTooltipSecondary =
    selectedFraction !== null ? formatFractionTime(selectedFraction) : formatClockTime(now, timeZone);

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
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
            <SunMarker
              point={activePoint}
              interactive={Boolean(activeHoraSlug)}
              ariaLabel={activeHoraSlug ? `Active ${activeHoraLabel ?? 'hora'}` : undefined}
            />
            {activeTooltipLayout ? (
              <HoraTooltip
                layout={activeTooltipLayout}
                primary={selectedHora ?? currentHora ?? 'Hora'}
                secondary={activeTooltipSecondary}
                showArrow
              />
            ) : null}
          </>
        ) : null}

        {hoverPoint && hoverTooltipLayout ? (
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
            <HoraTooltip
              layout={hoverTooltipLayout}
              primary={hoverPoint.hora ?? undefined}
              secondary={formatFractionTime(hoverPoint.fraction)}
              pointerEvents="none"
            />
          </>
        ) : null}
      </svg>

      <HorariumControls
        canReset={selectedFraction !== null}
        canNavigate={Boolean(activeHoraSlug)}
        goLabel={activeHoraLabel ?? 'hora'}
        onReset={() => setSelectedFraction(null)}
        onGo={() => {
          if (activeHoraSlug) {
            window.location.href = `/${isoDate}/${activeHoraSlug}`;
          }
        }}
      />
    </div>
  );
}
