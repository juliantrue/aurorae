type AntiphonListProps = {
  antiphons?: string | string[];
  className?: string;
};

const BASE_CLASS =
  'mt-4 list-none space-y-2 border-t border-border pt-4 text-sm italic text-oxblood';

export function AntiphonList({ antiphons, className }: AntiphonListProps) {
  const normalized =
    typeof antiphons === 'string'
      ? [antiphons].filter((value) => value.trim().length > 0)
      : antiphons?.filter((value) => value.trim().length > 0) ?? [];

  if (normalized.length === 0) {
    return null;
  }

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <ul className={combinedClass}>
      {normalized.map((antiphon, index) => (
        <li key={`antiphon-${index}`} className="m-0">
          {antiphon}
        </li>
      ))}
    </ul>
  );
}
