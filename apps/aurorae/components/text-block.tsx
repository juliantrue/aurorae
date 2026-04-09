import { linesWithBreaks, splitIntoParagraphs } from './typography/shared';
import { cn } from './ui/cn';

type TextBlockProps = {
  text: string;
  className?: string;
};

const BASE_CLASS = 'mt-3 space-y-3 text-base leading-7 text-ink';

export function TextBlock({ text, className }: TextBlockProps) {
  if (!text) {
    return null;
  }

  const paragraphs = splitIntoParagraphs(text);

  return (
    <div className={cn(BASE_CLASS, className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={`text-block-${index}`} className="m-0">
          {linesWithBreaks(paragraph)}
        </p>
      ))}
    </div>
  );
}
