import { HORA_COMMANDS, type Hora } from '@aurorae/do-runner';

type HoraOrdo = Exclude<Hora, 'Missa'>;

export type OrdoRouteConfig =
  | {
      slug: string;
      label: HoraOrdo;
      description: string;
      kind: 'hora';
      ordo: HoraOrdo;
    }
  | {
      slug: string;
      label: 'Missa';
      description: string;
      kind: 'missa';
      ordo: 'Missa';
    };

const MISSAL_LABEL = 'Missa' as const;

const hourDescriptions: Partial<Record<HoraOrdo, string>> = {
  Matutinum: 'Night watch celebrated in the deep hours before dawn.',
  Laudes: 'Morning praise greeting the first light of day.',
  Prima: 'Prime hour carrying intentions into the work of the day.',
  Tertia: 'Mid-morning pause recalling the descent of the Spirit.',
  Sexta: 'Midday rest to recollect the Passion at the sixth hour.',
  Nona: 'Mid-afternoon prayer uniting with Christ on the cross.',
  Vesperae: 'Evening thanksgiving as the light fades.',
  Completorium: 'Night prayer entrusting the hours to God before rest.',
};

function isHora(value: Hora): value is HoraOrdo {
  return value !== MISSAL_LABEL;
}

function toSlug(label: string): string {
  return label.toLowerCase();
}

const horaRoutes: OrdoRouteConfig[] = HORA_COMMANDS
  .filter(isHora)
  .map((ordo) => ({
    slug: toSlug(ordo),
    label: ordo,
    description: hourDescriptions[ordo] ?? 'Pray this canonical hour via Divinum Officium.',
    kind: 'hora',
    ordo,
  }));

const missalRoute: OrdoRouteConfig = {
  slug: toSlug(MISSAL_LABEL),
  label: MISSAL_LABEL,
  description: 'Access the daily missal texts from Divinum Officium.',
  kind: 'missa',
  ordo: MISSAL_LABEL,
};

export const ORDO_ROUTES: OrdoRouteConfig[] = [...horaRoutes, missalRoute];

export const ORDO_LOOKUP: Record<string, OrdoRouteConfig> = Object.fromEntries(
  ORDO_ROUTES.map((config) => [config.slug, config]),
);
