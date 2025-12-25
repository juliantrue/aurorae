'use client';

import { useEffect, useRef, useState } from 'react';

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

  const resolvedWidth = Math.max(1, width ?? WIDTH_FALLBACK);
  const points = createSinusoidPoints({
    width: resolvedWidth,
    height: HEIGHT,
    cycles: CYCLES,
    amplitude: AMPLITUDE,
    phase: PHASE,
  });

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
        <polyline
          points={points}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-oxblood"
        />
      </svg>
    </div>
  );
}

type SinusoidOptions = {
  width: number;
  height: number;
  cycles: number;
  amplitude?: number;
  phase: number;
};

function createSinusoidPoints({ width, height, cycles, amplitude, phase }: SinusoidOptions) {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const midline = safeHeight / 2;
  const maxAmplitude = Math.max(0, midline - 2);
  const resolvedAmplitude = Math.min(Math.abs(amplitude ?? safeHeight * 0.4), maxAmplitude);
  const steps = Math.max(48, Math.floor(safeWidth));
  const points: string[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = t * safeWidth;
    const angle = t * cycles * Math.PI * 2 + phase;
    const y = midline - resolvedAmplitude * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return points.join(' ');
}
