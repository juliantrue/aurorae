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

  const { metadata, sections } = data.parsedBody;
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
    <article className="ordo-page">
      <div className="ordo-nav">
        <Link className="back-link" href="/">
          ← All hours
        </Link>
        <p className="eyebrow">{metadata.isoDate ?? isoDate}</p>
      </div>

      <header className="ordo-feast">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{feastTitle}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>

      <div className="ordo-meta">
        {metaItems.map((item) => (
          <div key={item.label} className="meta-item">
            <span className="meta-label">{item.label}</span>
            <span className="meta-value">{item.value}</span>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <p className="ordo-empty">No structured sections were returned for this office.</p>
      )}

      {sections.map((section, index) => (
        <section key={section.id ?? `${index}`} className="ordo-section">
          {section.heading && (
            <div className="ordo-section-heading">
              <p className="eyebrow">Section {index + 1}</p>
              <h2 className="ordo-section-title">{section.heading}</h2>
            </div>
          )}

          <div className="ordo-columns">
            {section.columns.map((column, columnIndex) => (
              <article key={`${section.id ?? index}-${columnIndex}`} className="ordo-column">
                <p className="column-role">{COLUMN_LABELS[column.role]}</p>
                <div className="ordo-text">
                  {paragraphBlocks(column.text).map((paragraph, paragraphIndex) => (
                    <p key={`${columnIndex}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>

                {column.psalm && <div className="ordo-psalm">{column.psalm}</div>}

                {column.antiphons && column.antiphons.length > 0 && (
                  <ul className="ordo-antiphons">
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
