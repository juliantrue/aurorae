import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from './ui/cn';

type OrdoRouteCardProps = {
  href: string;
  eyebrow: string;
  label: string;
  description: string;
  className?: string;
};

const ROUTE_CARD_CLASS =
  'flex h-full transform flex-col gap-2 rounded-card border border-border border-l-4 border-l-oxblood bg-ivory p-5 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-oxblood hover:shadow-[0_15px_30px_rgba(75,15,15,0.15)]';

export function OrdoRouteCard({
  href,
  eyebrow,
  label,
  description,
  className,
}: OrdoRouteCardProps) {
  return (
    <Link href={href} className={cn(ROUTE_CARD_CLASS, className)}>
      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
      <h3 className="font-display text-2xl font-medium">{label}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <span aria-hidden className="self-end text-xl text-oxblood">
        →
      </span>
    </Link>
  );
}

type OrdoSectionProps = {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
};

export function OrdoSection({ title, subtitle, children }: OrdoSectionProps) {
  return (
    <section
      className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10"
      id="ordo-navigation"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">Ordo</p>
        <h2 className="font-display text-2xl font-medium">{title}</h2>
        {subtitle ? <p className="text-sm leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
