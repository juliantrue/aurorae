import type { ReactNode } from 'react';

type TextBlockProps = {
  text: string;
  className?: string;
};

const BASE_CLASS = 'mt-3 space-y-3 text-base leading-7 text-ink';

export function TextBlock({ text, className }: TextBlockProps) {
  if (!text) {
    return null;
  }

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;
  const paragraphs = paragraphBlocks(text);

  return (
    <div className={combinedClass}>
      {paragraphs.map((paragraph, index) => (
        <p key={`text-block-${index}`} className="m-0">
          {paragraphTextWithLineBreaks(paragraph)}
        </p>
      ))}
    </div>
  );
}

function paragraphBlocks(text: string): string[] {
  const lines = text.split('\n');
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (buffer.length) {
        paragraphs.push(buffer.join('\n'));
        buffer = [];
      }
      continue;
    }
    buffer.push(trimmed);
  }

  if (buffer.length) {
    paragraphs.push(buffer.join('\n'));
  }

  return paragraphs.length > 0 ? paragraphs : [text];
}

function paragraphTextWithLineBreaks(text: string): ReactNode[] {
  const lines = text.split('\n');
  return lines.reduce<ReactNode[]>((acc, line, index) => {
    acc.push(line);
    if (index < lines.length - 1) {
      acc.push(<br key={`paragraph-br-${index}`} />);
    }
    return acc;
  }, []);
}
