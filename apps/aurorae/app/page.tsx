import Link from 'next/link';
import { ORDO_ROUTES } from './ordo/ordoConfig';
import { HorariumClient } from './components/horarium-client';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex w-full max-w-aurorae flex-col gap-8">
      <HorariumClient />

      <section
        className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10"
        id="ordo-navigation"
      >
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORDO_ROUTES.map((route) => (
            <Link
              key={route.slug}
              href={`/ordo/${route.slug}`}
              className="flex h-full transform flex-col gap-2 rounded-card border border-border border-l-4 border-l-oxblood bg-ivory p-5 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-oxblood hover:shadow-[0_15px_30px_rgba(75,15,15,0.15)]"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                  {route.kind === 'hora' ? 'Hora' : 'Missal'}
                </p>
                <h3 className="font-display text-2xl font-medium">{route.label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{route.description}</p>
              <span aria-hidden className="self-end text-xl text-oxblood">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
