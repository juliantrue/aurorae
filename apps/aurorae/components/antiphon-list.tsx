import { toNonEmptyStringArray } from './typography/shared';
import { cn } from './ui/cn';

type AntiphonListProps = {
  antiphons?: string | string[];
  className?: string;
};

const BASE_CLASS =
  'mt-4 list-none space-y-2 border-t border-border pt-4 text-sm italic text-oxblood';

export function AntiphonList({ antiphons, className }: AntiphonListProps) {
  const normalized = toNonEmptyStringArray(antiphons);

  if (normalized.length === 0) {
    return null;
  }

  return (
    <ul className={cn(BASE_CLASS, className)}>
      {normalized.map((antiphon, index) => (
        <li key={`antiphon-${index}`} className="m-0">
          {antiphon}
        </li>
      ))}
    </ul>
  );
}
