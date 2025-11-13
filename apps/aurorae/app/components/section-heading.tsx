type SectionHeadingProps = {
  title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
  if (!title) {
    return null;
  }

  return (
    <div className="text-center">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
    </div>
  );
}
