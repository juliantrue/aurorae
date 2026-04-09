import type { ResponsePart } from '@aurorae/do-runner';
import { LabeledRowList, type LabeledRow } from './typography/shared';
import { cn } from './ui/cn';

type ResponsoryBlockProps = {
  parts?: ResponsePart[];
  className?: string;
};

const BASE_CLASS =
  'mt-4 border-t border-border pt-4 text-base leading-7 text-ink space-y-2';

export function ResponsoryBlock({ parts, className }: ResponsoryBlockProps) {
  if (!parts?.length) {
    return null;
  }

  const rows: LabeledRow[] = parts.map((part, index) => ({
    key: `responsory-${part.label ?? 'part'}-${index}`,
    label: part.label ?? '',
    content: part.content,
  }));

  return (
    <LabeledRowList
      className={cn(BASE_CLASS, className)}
      rows={rows}
      rowClassName="gap-3"
      labelClassName="min-w-[2.5rem] text-xs font-semibold uppercase tracking-[0.3em] text-muted"
    />
  );
}
