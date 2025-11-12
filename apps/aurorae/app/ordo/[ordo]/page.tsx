import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrdo, type ColumnRole } from '@aurorae/do-runner';
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

function paragraphBlocks(text: string): string[] {
  const lines = text.split('\n');
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (buffer.length) {
        paragraphs.push(buffer.join(' '));
        buffer = [];
      }
      continue;
    }
    buffer.push(trimmed);
  }

  if (buffer.length) {
    paragraphs.push(buffer.join(' '));
  }

  return paragraphs.length > 0 ? paragraphs : [text];
}

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
        <Link className="text-sm font-semibold uppercase tracking-[0.08em] text-oxblood transition-colors hover:text-oxblood-soft" href="/">
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
            <span className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted">{item.label}</span>
            <span className="font-display text-xl">{item.value}</span>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <p className="text-center italic text-muted">No structured sections were returned for this office.</p>
      )}

      {sections.map((section, index) => (
        <section key={section.id ?? `${index}`} className="flex flex-col gap-6 border-b border-border py-6 last:border-b-0">
          {section.heading && (
            <div className="text-center">
              <p className={EYEBROW_TEXT}>Section {index + 1}</p>
              <h2 className="font-display text-2xl font-medium">{section.heading}</h2>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {section.columns.map((column, columnIndex) => (
              <article
                key={`${section.id ?? index}-${columnIndex}`}
                className="flex flex-col gap-4 rounded-card border border-border bg-ivory p-5 shadow-pressed"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">{COLUMN_LABELS[column.role]}</p>
                <div className="mt-3 space-y-3 text-base leading-7 text-ink">
                  {paragraphBlocks(column.text).map((paragraph, paragraphIndex) => (
                    <p key={`${columnIndex}-${paragraphIndex}`} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {column.psalm && (
                  <div className="mt-4 border-t border-border pt-4 text-sm italic text-oxblood whitespace-pre-line">{column.psalm}</div>
                )}

                {column.antiphons && column.antiphons.length > 0 && (
                  <ul className="mt-4 list-none space-y-2 border-t border-border pt-4 text-sm text-ink">
                    {column.antiphons.map((antiphon, antiphonIndex) => (
                      <li key={`${columnIndex}-antiphon-${antiphonIndex}`}>{antiphon}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
