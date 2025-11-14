import type { ResponsePart } from '@aurorae/do-runner';

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

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <div className={combinedClass}>
      {parts.map((part, index) => (
        <p key={`responsory-${part.label ?? 'part'}-${index}`} className="m-0 flex gap-3">
          <span className="min-w-[2.5rem] text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {part.label ?? ''}
          </span>
          <span className="flex-1">{part.content}</span>
        </p>
      ))}
    </div>
  );
}
