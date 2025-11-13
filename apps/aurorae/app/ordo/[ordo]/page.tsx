import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrdo, type ColumnRole } from '@aurorae/do-runner';
import { AntiphonList } from '../../components/antiphon-list';
import { PsalmBlock } from '../../components/psalm-block';
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

const COLUMN_LABELS: Record<ColumnRole, string> = {
  latin: 'Latin text',
  vernacular: 'Vernacular',
  unknown: 'Manuscript',
};
const EYEBROW_TEXT = 'text-[0.72rem] uppercase tracking-[0.4em] text-muted';

export function generateStaticParams(): OrdoParams[] {
  return ORDO_ROUTES.map((config) => ({ ordo: config.slug }));
}

export default async function OrdoPage({ params }: { params: OrdoParams }) {
  const ordo = (await params).ordo;
  const config = ORDO_LOOKUP[ordo];
  if (!config) {
    notFound();
  }

  const isoDate = todayIsoDate();
  const data =
    config.kind === 'hora'
      ? await getOrdo({ hora: config.ordo, isoDate })
      : await getOrdo({ service: 'missa', isoDate });

  const { metadata, sections } = data;
  const feastTitle = metadata.feast ?? metadata.title ?? config.label;
  const subtitle = metadata.subtitle ?? metadata.hora ?? config.description;
  const eyebrow = metadata.service === 'missa' ? 'Missale Romanum' : 'Divinum Officium';
  const metaItems = [
    { label: 'Date', value: metadata.isoDate ?? isoDate },
    { label: 'Office', value: metadata.hora ?? config.label },
    { label: 'Source', value: 'Divinum Officium' },
    { label: 'Sections', value: sections.length ? sections.length.toString() : '—' },
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

      {sections.length === 0 && (
        <p className="text-center italic text-muted">
          No structured sections were returned for this office.
        </p>
      )}

      {sections.map((section, index) => (
        <section
          key={section.id ?? `${index}`}
          className="flex flex-col gap-6 border-b border-border py-6 last:border-b-0"
        >
          {section.heading && <SectionHeading title={section.heading} />}

          <div className="grid gap-5 md:grid-cols-2">
            {section.columns.map((column, columnIndex) => {
              const columnAntiphons = column.antiphons ?? [];
              const firstAntiphon = columnAntiphons[0];
              const bottomAntiphons = columnAntiphons.slice(1);

              return (
                <article
                  key={`${section.id ?? index}-${columnIndex}`}
                  className="flex flex-col gap-4 rounded-card border border-border bg-ivory p-5 shadow-pressed"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                    {COLUMN_LABELS[column.role]}
                  </p>
                  {column.psalm ? (
                    <>
                      <AntiphonList antiphons={firstAntiphon ? [firstAntiphon] : []} />
                      <PsalmBlock psalm={column.psalm} />
                      <AntiphonList antiphons={bottomAntiphons} />
                    </>
                  ) : (
                    <>
                      <TextBlock text={column.text ?? ''} />
                      <AntiphonList antiphons={columnAntiphons} />
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </article>
  );
}
