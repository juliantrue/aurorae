export type SinusoidOptions = {
  width: number;
  height: number;
  cycles: number;
  amplitude?: number;
  phase: number;
};

export type SinusoidMetrics = {
  midline: number;
  resolvedAmplitude: number;
};

export type SinusoidPointOptions = {
  width: number;
  cycles: number;
  midline: number;
  amplitude: number;
  phase: number;
};

export type SinusoidPoint = {
  x: number;
  y: number;
};

export function createSinusoidPoints({ width, height, cycles, amplitude, phase }: SinusoidOptions) {
  const safeWidth = Math.max(1, width);
  const { midline, resolvedAmplitude } = getSinusoidMetrics(height, amplitude);
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

export function getSinusoidMetrics(height: number, amplitude?: number): SinusoidMetrics {
  const safeHeight = Math.max(1, height);
  const midline = safeHeight / 2;
  const maxAmplitude = Math.max(0, midline - 2);
  const resolvedAmplitude = Math.min(Math.abs(amplitude ?? safeHeight * 0.4), maxAmplitude);

  return { midline, resolvedAmplitude };
}

export function getPhaseForSolarNoon(
  solarNoonFraction: number | null | undefined,
  fallbackPhase: number = -0.5 * Math.PI,
): number {
  if (solarNoonFraction === null || solarNoonFraction === undefined) {
    return fallbackPhase;
  }

  return Math.PI / 2 - 2 * Math.PI * solarNoonFraction;
}

export function getSinusoidPointAtFraction(
  fraction: number | null,
  { width, cycles, midline, amplitude, phase }: SinusoidPointOptions,
): SinusoidPoint | null {
  if (fraction === null) {
    return null;
  }

  const t = Math.min(1, Math.max(0, fraction));
  const x = t * width;
  const angle = t * cycles * Math.PI * 2 + phase;
  const y = midline - amplitude * Math.sin(angle);

  return { x, y };
}
