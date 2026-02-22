import type { Verse } from '@aurorae/do-runner';
import { LabeledRowList, type LabeledRow } from './typography/shared';
import { cn } from './ui/cn';

type PsalmBlockProps = {
  verses?: Verse[];
  className?: string;
  renderHtml?: boolean;
};

const BASE_CLASS = 'mt-2 text-base leading-7 text-ink space-y-3';

export function PsalmBlock({ verses, className, renderHtml = false }: PsalmBlockProps) {
  if (!verses?.length) {
    return null;
  }

  const rows: LabeledRow[] = verses.map((verse, index) => ({
    key: `psalm-verse-${verse.index}-${index}`,
    label: `${verse.index}.`,
    content: renderHtml ? (
      <span dangerouslySetInnerHTML={{ __html: verse.content }} />
    ) : (
      verse.content
    ),
  }));

  return (
    <LabeledRowList
      className={cn(BASE_CLASS, className)}
      rows={rows}
      rowClassName="gap-2"
      labelClassName="min-w-[2rem] text-right font-semibold text-muted"
    />
  );
}
