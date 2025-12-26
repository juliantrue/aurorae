import type { Verse } from '@aurorae/do-runner';

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

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <div className={combinedClass}>
      {verses.map((verse, index) => (
        <p key={`psalm-verse-${verse.index}-${index}`} className="m-0 flex gap-2">
          <span className="min-w-[2rem] text-right font-semibold text-muted">{verse.index}.</span>
          {renderHtml ? (
            <span className="flex-1" dangerouslySetInnerHTML={{ __html: verse.content }} />
          ) : (
            <span className="flex-1">{verse.content}</span>
          )}
        </p>
      ))}
    </div>
  );
}
