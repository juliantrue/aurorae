import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getOrdo,
  inverse,
  pointText,
  TONE_META,
  type ChantSourceFilter,
  type EnrichedOrdoElement,
  type OrdoChant,
  type Tone,
} from '@aurorae/core';
import { AntiphonList } from '../../components/antiphon-list';
import { Chant } from '../../components/chant';
import { PsalmBlock } from '../../components/psalm-block';
import { ResponsoryBlock } from '../../components/responsory-block';
import { SectionHeading } from '../../components/section-heading';
import { TextBlock } from '../../components/text-block';
import { ORDO_LOOKUP, ORDO_ROUTES } from '../ordoConfig';

export const runtime = 'nodejs';
export const revalidate = 0;

function todayIsoDate(): string {
  return new Date().toISOString().split('T')[0]!;
}

type OrdoParams = {
  ordo: string;
};

const EYEBROW_TEXT = 'text-[0.72rem] uppercase tracking-[0.4em] text-muted';
const ELEMENT_LABELS: Record<EnrichedOrdoElement['type'], string> = {
  text: 'Reading',
  psalm: 'Psalm',
  canticle: 'Canticle',
  hymn: 'Hymn',
  responsory: 'Responsory',
};

const DEFAULT_CHANT_SOURCE: ChantSourceFilter = {
  name: 'Liber antiphonarius',
  year: 1960,
};

export function generateStaticParams(): OrdoParams[] {
  return ORDO_ROUTES.map((config) => ({ ordo: config.slug }));
}

export default async function OrdoPage({ params }: { params: Promise<OrdoParams> }) {
  const ordo = (await params).ordo;
  const config = ORDO_LOOKUP[ordo];
  if (!config) {
    notFound();
  }

  const isoDate = todayIsoDate();
  const { parsed, structured, elementsWithChants } =
    config.kind === 'hora'
      ? await getOrdo({ hora: config.ordo, isoDate, chantSource: DEFAULT_CHANT_SOURCE })
      : await getOrdo({ service: 'missa', isoDate, chantSource: DEFAULT_CHANT_SOURCE });
  const elements = elementsWithChants;
  const { metadata } = parsed;
  const feastTitle = metadata.feast ?? structured.title ?? config.label;
  const subtitle = metadata.subtitle ?? metadata.hora ?? config.description;
  const eyebrow = structured.body.type === 'missal' ? 'Missale Romanum' : 'Divinum Officium';
  const metaItems = [
    { label: 'Date', value: metadata.isoDate ?? isoDate },
    { label: 'Office', value: metadata.hora ?? config.label },
    { label: 'Source', value: 'Divinum Officium' },
    { label: 'Elements', value: elements.length ? elements.length.toString() : '—' },
  ];

  return (
    <article className="mx-auto flex w-full max-w-aurorae flex-col gap-6 rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="text-sm font-semibold uppercase tracking-[0.08em] text-oxblood transition-colors hover:text-oxblood-soft"
          href="/"
        >
          ← All hours
        </Link>
        <p className={EYEBROW_TEXT}>{metadata.isoDate ?? isoDate}</p>
      </div>

      <header className="rounded-card border border-border bg-parchment p-6 text-center shadow-pressed">
        <p className={EYEBROW_TEXT}>{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-medium sm:text-[2.6rem]">{feastTitle}</h1>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </header>

      <div className="grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
        {metaItems.map((item) => (
          <div key={item.label} className="text-center">
            <span className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted">
              {item.label}
            </span>
            <span className="font-display text-xl">{item.value}</span>
          </div>
        ))}
      </div>

      {elements.length === 0 && (
        <p className="text-center italic text-muted">
          No structured elements were returned for this office.
        </p>
      )}

      {elements.map((element, index) => (
        <section
          key={`${getElementHeading(element)}-${index}`}
          className="flex flex-col gap-6 border-b border-border py-6 last:border-b-0"
        >
          <SectionHeading title={getElementHeading(element)} />

          <article className="flex flex-col gap-4 rounded-card border border-border bg-ivory p-5 shadow-pressed">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">
              {ELEMENT_LABELS[element.type]}
            </p>
            {renderElementContent(element)}
            {renderChantMatches(element)}
          </article>
        </section>
      ))}
    </article>
  );
}

function renderElementContent(element: EnrichedOrdoElement) {
  switch (element.type) {
    case 'psalm':
    case 'canticle': {
      const antiphonChant = selectAntiphonChant(element);
      const antiphonGabc = antiphonChant?.gabc?.trim();
      const tone = deriveToneFromAntiphon(element);
      const verses = tone
        ? element.body.map((verse) => ({
            ...verse,
            content: pointText(verse.content, tone),
          }))
        : element.body;
      return (
        <>
          {antiphonGabc ? (
            <Chant gabc={antiphonGabc} caption="Antiphon" className="mt-0" />
          ) : (
            <AntiphonList antiphons={element.antiphon} className="mt-0 border-t-0 pt-0" />
          )}
          <PsalmBlock verses={verses} renderHtml={Boolean(tone)} />
        </>
      );
    }
    case 'hymn':
    case 'text':
      return <TextBlock text={element.body} />;
    case 'responsory':
      return <ResponsoryBlock parts={element.responsory} />;
    default:
      return null;
  }
}

function renderChantMatches(element: EnrichedOrdoElement) {
  if (element.chants && element.chants.length > 0) {
    return (
      <div className="rounded-card border border-border bg-parchment p-4">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
          Chant Sources ({element.chants.length})
        </p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed">
          {element.chants.map((chant) => (
            <li key={chant.id}>
              <span className="font-semibold">{chant.name}</span>
              {chant.mode && <span className="ml-2 text-muted">Mode {chant.mode}</span>}
              <span className="block text-xs text-muted">
                {chant.chantSource.title} ({chant.chantSource.year}) - {chant.chantUsage.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (element.chantLookup) {
    return (
      <p className="text-xs text-muted">No chant match found for "{element.chantLookup.query}".</p>
    );
  }

  return null;
}

function getElementHeading(element: EnrichedOrdoElement): string {
  if (hasHeading(element)) {
    return element.heading;
  }
  return ELEMENT_LABELS[element.type];
}

function hasHeading(
  element: EnrichedOrdoElement,
): element is EnrichedOrdoElement & { heading: string } {
  return 'heading' in element && typeof element.heading === 'string' && element.heading.length > 0;
}

function deriveToneFromAntiphon(element: EnrichedOrdoElement): Tone | null {
  if (element.type !== 'psalm' && element.type !== 'canticle') {
    return null;
  }

  const selected = selectAntiphonChant(element);
  if (!selected?.gabc) {
    return null;
  }

  try {
    return inverse(selected.gabc, TONE_META);
  } catch {
    return null;
  }
}

function selectAntiphonChant(element: EnrichedOrdoElement): OrdoChant | null {
  if (element.type !== 'psalm' && element.type !== 'canticle') {
    return null;
  }

  const chants = element.chants ?? [];
  if (chants.length === 0) {
    return null;
  }

  const antiphonCandidates = chants.filter((chant) =>
    chant.chantUsage.label.toLowerCase().includes('antiphon'),
  );
  return antiphonCandidates[0] ?? chants[0] ?? null;
}
