type PsalmBlockProps = {
  psalm: string;
  className?: string;
};

const BASE_CLASS =
  'mt-4 border-t border-border pt-4 text-base leading-7 text-ink whitespace-pre-line';

export function PsalmBlock({ psalm, className }: PsalmBlockProps) {
  if (!psalm) {
    return null;
  }

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return <div className={combinedClass}>{psalm}</div>;
}
