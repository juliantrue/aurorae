type AntiphonListProps = {
  antiphons: string[] | undefined;
  className?: string;
};

const BASE_CLASS =
  'mt-4 list-none space-y-2 border-t border-border pt-4 text-sm text-ink';

export function AntiphonList({ antiphons, className }: AntiphonListProps) {
  if (!antiphons?.length) {
    return null;
  }

  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <ul className={combinedClass}>
      {antiphons.map((antiphon, index) => (
        <li key={`antiphon-${index}`} className="m-0">
          {antiphon}
        </li>
      ))}
    </ul>
  );
}
