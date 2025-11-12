import Link from 'next/link';
import { ORDO_ROUTES } from './ordo/ordoConfig';

const EYEBROW_TEXT = 'text-[0.72rem] uppercase tracking-[0.4em] text-muted';

export default function Home() {
  const featuredRoute = ORDO_ROUTES[0];

  return (
    <div className="flex w-full max-w-aurorae flex-col gap-8">
      <section className="rounded-card border border-border bg-ivory p-6 text-center shadow-soft sm:p-10">
        <p className={EYEBROW_TEXT}>Sacred minimalism</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-[3.25rem]">
          Daily prayer held in parchment light.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink">
          Aurorae keeps the Divine Office close at hand with a still, manuscript-inspired surface rooted in the Sacred
          Minimalism design canon. Silence, proportion, and light lead the experience.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-ink">
          Every hour is served fresh from Divinum Officium through the shared @aurorae/core runner utilities.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {featuredRoute && (
            <Link
              className="inline-flex w-full transform items-center justify-center rounded-md border border-transparent bg-oxblood px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-ivory shadow-soft transition duration-200 hover:-translate-y-0.5 sm:w-auto"
              href={`/ordo/${featuredRoute.slug}`}
            >
              Enter {featuredRoute.label}
            </Link>
          )}
          <a
            className="inline-flex w-full transform items-center justify-center rounded-md border border-oxblood/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-oxblood transition duration-200 hover:-translate-y-0.5 sm:w-auto"
            href="#ordo-navigation"
          >
            View all hours
          </a>
        </div>
      </section>

      <section className="rounded-card border border-border bg-ivory p-6 shadow-soft sm:p-10" id="ordo-navigation">
        <header className="text-center">
          <p className={EYEBROW_TEXT}>Ordo hodie</p>
          <h2 className="mt-2 font-display text-3xl font-medium leading-tight sm:text-[2.4rem]">
            Select an hour with liturgical care.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base leading-7 text-muted">
            Each card opens a server-rendered view that parses the returned Divinum Officium markup into quiet, bilingual
            columns.
          </p>
        </header>
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
