import Link from 'next/link';
import type { ReactNode } from 'react';
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
import { ORDO_LOOKUP, ORDO_ROUTES } from '../../ordo/ordoConfig';

export function generateStaticParams(): OrdoParams[] {
  const DEFAULT_RANGE_DAYS = 180;
  const envRangeDays = Number(process.env.GENERATE_NEXT_N_DAYS);
  const rangeDays =
    Number.isFinite(envRangeDays) && envRangeDays >= 0 ? envRangeDays : DEFAULT_RANGE_DAYS;
  const today = new Date();
  const params: OrdoParams[] = [];

  for (let offset = 0; offset <= rangeDays; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const isoDate = date.toISOString().split('T')[0]!;
    for (const config of ORDO_ROUTES) {
      params.push({ isodate: isoDate, ordo: config.slug });
    }
  }

  return params;
}

type OrdoParams = {
  isodate: string;
  ordo: string;
};

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

export default async function OrdoPage({ params }: { params: Promise<OrdoParams> }) {
  const { ordo, isodate } = await params;
  const config = ORDO_LOOKUP[ordo];
  if (!config) {
    notFound();
  }

  const isoDate = isodate;
  const { parsed, structured, elementsWithChants } =
    config.kind === 'hora'
      ? await getOrdo({ hora: config.ordo, isoDate, chantSource: DEFAULT_CHANT_SOURCE })
      : await getOrdo({ service: 'missa', isoDate, chantSource: DEFAULT_CHANT_SOURCE });
  const elements = elementsWithChants;
  const { metadata } = parsed;
  const feastTitle = metadata.feast ?? structured.title ?? config.label;
  const subtitle = metadata.subtitle ?? metadata.hora ?? config.description;
  const eyebrow = structured.body.type === 'missal' ? 'Missale Romanum' : 'Divinum Officium';
  return (
    <article className="mx-auto flex w-full max-w-aurorae flex-col gap-6 rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="text-sm font-semibold uppercase tracking-[0.08em] text-oxblood transition-colors hover:text-oxblood-soft"
          href="/"
        >
          ← Horarium
        </Link>
      </div>

      <header className="rounded-card border border-border bg-ivory p-6 text-center shadow-pressed">
        <h1 className="mt-2 font-display text-3xl font-medium sm:text-[2.6rem]">{feastTitle}</h1>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </header>

      {elements.length === 0 && (
        <p className="text-center italic text-muted">
          No structured elements were returned for this office.
        </p>
      )}

      {elements.map((element, index) => {
        const chantMatches = renderChantMatches(element);
        return (
          <section
            key={`${getElementHeading(element)}-${index}`}
            className="flex flex-col gap-2 border-b border-border py-6 last:border-b-0"
          >
            <SectionHeading title={getElementHeading(element)} />

            <article className="flex flex-col gap-0 rounded-card bg-ivory p-5">
              {renderElementContent(element, chantMatches)}
              {shouldRenderChantMatchesOutside(element) ? chantMatches : null}
            </article>
          </section>
        );
      })}
    </article>
  );
}

function renderElementContent(element: EnrichedOrdoElement, chantMatches: ReactNode) {
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
          {chantMatches && <div className="flex justify-end">{chantMatches}</div>}
          {antiphonGabc ? (
            <Chant
              gabc={antiphonGabc}
              caption="Antiphon"
              className="mt-0"
              dropCap
              annotation={formatChantAnnotation(antiphonChant)}
            />
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

function shouldRenderChantMatchesOutside(element: EnrichedOrdoElement): boolean {
  return element.type !== 'psalm' && element.type !== 'canticle';
}

function renderChantMatches(element: EnrichedOrdoElement) {
  if (element.chants && element.chants.length > 0) {
    return (
      <div className="rounded-card bg-ivory px-3 py-2 text-right">
        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          {element.chants.map((chant) => (
            <li key={chant.id}>
              {chant.chantSource.title} ({chant.chantSource.year})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (element.chantLookup) {
    return (
      <p className="text-xs text-muted not-italic">
        No chant match found for "{element.chantLookup.query}".
      </p>
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

  return inverse(selected.gabc, TONE_META) ?? null;
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

function formatChantAnnotation(chant: OrdoChant | null): string | undefined {
  if (!chant?.gabc) {
    return undefined;
  }

  const mode = inverse(chant.gabc, TONE_META);
  if (!mode) {
    return undefined;
  }

  const formattedMode = mode.replace(/^(\d+)([A-Za-z].*)$/, '$1 $2');
  return formattedMode.trim();
}
