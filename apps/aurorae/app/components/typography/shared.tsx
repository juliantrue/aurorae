import type { ReactNode } from 'react';
import { cn } from '../ui/cn';

export function toNonEmptyStringArray(value?: string | string[]) {
  if (typeof value === 'string') {
    return value.trim() ? [value.trim()] : [];
  }

  if (!value) {
    return [];
  }

  return value
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function splitIntoParagraphs(text: string) {
  const lines = text.split('\n');
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (buffer.length > 0) {
        paragraphs.push(buffer.join('\n'));
        buffer = [];
      }
      continue;
    }
    buffer.push(trimmed);
  }

  if (buffer.length > 0) {
    paragraphs.push(buffer.join('\n'));
  }

  return paragraphs.length > 0 ? paragraphs : [text];
}

export function linesWithBreaks(text: string): ReactNode[] {
  const lines = text.split('\n');
  const content: ReactNode[] = [];

  lines.forEach((line, index) => {
    content.push(line);
    if (index < lines.length - 1) {
      content.push(<br key={`line-break-${index}`} />);
    }
  });

  return content;
}

export type LabeledRow = {
  key: string;
  label: ReactNode;
  content: ReactNode;
};

type LabeledRowListProps = {
  rows: LabeledRow[];
  className?: string;
  rowClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
};

export function LabeledRowList({
  rows,
  className,
  rowClassName,
  labelClassName,
  contentClassName,
}: LabeledRowListProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {rows.map((row) => (
        <p key={row.key} className={cn('m-0 flex', rowClassName)}>
          <span className={labelClassName}>{row.label}</span>
          <span className={cn('flex-1', contentClassName)}>{row.content}</span>
        </p>
      ))}
    </div>
  );
}
