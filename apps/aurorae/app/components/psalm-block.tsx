import type { Verse } from '@aurorae/do-runner';

type PsalmBlockProps = {
  verses?: Verse[];
  className?: string;
};

const BASE_CLASS =
  'mt-4 border-t border-border pt-4 text-base leading-7 text-ink space-y-3';

export function PsalmBlock({ verses, className }: PsalmBlockProps) {
  if (!verses?.length) {
    return null;
  }

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <div className={combinedClass}>
      {verses.map((verse, index) => (
        <p key={`psalm-verse-${verse.index}-${index}`} className="m-0 flex gap-2">
          <span className="min-w-[2rem] text-right font-semibold text-muted">{verse.index}.</span>
          <span className="flex-1">{verse.content}</span>
        </p>
      ))}
    </div>
  );
}
