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

export type SinusoidSamples = [x: number[], y: number[]];

export function createSinusoidPoints({
  width,
  height,
  cycles,
  amplitude,
  phase,
}: SinusoidOptions): SinusoidSamples {
  const safeWidth = Math.max(1, width);
  const { midline, resolvedAmplitude } = getSinusoidMetrics(height, amplitude);
  const steps = Math.max(48, Math.floor(safeWidth));
  const xPoints: number[] = [];
  const yPoints: number[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = t * safeWidth;
    const angle = t * cycles * Math.PI * 2 + phase;
    const y = midline - resolvedAmplitude * Math.sin(angle);
    xPoints.push(x);
    yPoints.push(y);
  }

  return [xPoints, yPoints];
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

export function getSinusoidPointAtFractionFromSamples(
  fraction: number | null,
  [xValues, yValues]: SinusoidSamples,
): SinusoidPoint | null {
  if (fraction === null) {
    return null;
  }

  const length = Math.min(xValues.length, yValues.length);
  if (length === 0) {
    return null;
  }

  if (length === 1) {
    return { x: xValues[0], y: yValues[0] };
  }

  const t = Math.min(1, Math.max(0, fraction));
  const maxIndex = length - 1;
  const rawIndex = t * maxIndex;
  const lowerIndex = Math.floor(rawIndex);
  const upperIndex = Math.min(maxIndex, lowerIndex + 1);
  const mix = rawIndex - lowerIndex;
  const x = xValues[lowerIndex] + (xValues[upperIndex] - xValues[lowerIndex]) * mix;
  const y = yValues[lowerIndex] + (yValues[upperIndex] - yValues[lowerIndex]) * mix;

  return { x, y };
}
