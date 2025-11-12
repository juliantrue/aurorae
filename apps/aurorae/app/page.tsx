import Link from 'next/link';
import { ORDO_ROUTES } from './ordo/ordoConfig';

export default function Home() {
  const featuredRoute = ORDO_ROUTES[0];

  return (
    <div className="home-sections">
      <section className="hero">
        <p className="eyebrow">Sacred minimalism</p>
        <h1>Daily prayer held in parchment light.</h1>
        <p>
          Aurorae keeps the Divine Office close at hand with a still, manuscript-inspired surface rooted in the
          Sacred Minimalism design canon. Silence, proportion, and light lead the experience.
        </p>
        <p>Every hour is served fresh from Divinum Officium through the shared @aurorae/core runner utilities.</p>
        <div className="hero-actions">
          {featuredRoute && (
            <Link className="primary" href={`/ordo/${featuredRoute.slug}`}>
              Enter {featuredRoute.label}
            </Link>
          )}
          <a className="secondary" href="#ordo-navigation">
            View all hours
          </a>
        </div>
      </section>

      <section className="ordo-panel" id="ordo-navigation">
        <header>
          <p className="eyebrow">Ordo hodie</p>
          <h2>Select an hour with liturgical care.</h2>
          <p>Each card opens a server-rendered view that parses the returned Divinum Officium markup into quiet, bilingual columns.</p>
        </header>
        <div className="ordo-grid">
          {ORDO_ROUTES.map((route) => (
            <Link key={route.slug} href={`/ordo/${route.slug}`} className="ordo-card">
              <div className="ordo-card-header">
                <p className="ordo-kind">{route.kind === 'hora' ? 'Hora' : 'Missal'}</p>
                <h3>{route.label}</h3>
              </div>
              <p className="ordo-description">{route.description}</p>
              <span aria-hidden className="ordo-chevron">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
