import type { Horarium } from '@core/lib/horarium';

export const HORA_TO_ORDO: Record<keyof Horarium, string> = {
  Matins: 'Matutinum',
  Lauds: 'Laudes',
  Prime: 'Prima',
  Terce: 'Tertia',
  Sext: 'Sexta',
  None: 'Nona',
  Vespers: 'Vesperae',
  Compline: 'Completorium',
};

export const HORA_ORDER: (keyof Horarium)[] = [
  'Matins',
  'Lauds',
  'Prime',
  'Terce',
  'Sext',
  'None',
  'Vespers',
  'Compline',
];

export function formatCivilDateInTimeZone(date: Date, timeZone: string | null) {
  if (!timeZone) {
    return date.toISOString().split('T')[0] ?? '';
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) {
    return date.toISOString().split('T')[0] ?? '';
  }

  return `${year}-${month}-${day}`;
}
