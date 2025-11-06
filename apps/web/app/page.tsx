import { computet } from '@aurorae/core';

function formatEasterDate(year: number) {
  const easter = computet(year);
  return easter.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function Home() {
  const currentYear = new Date().getUTCFullYear();
  const formattedDate = formatEasterDate(currentYear);

  return (
    <main className="container">
      <section className="card">
        <h1>Aurorae</h1>
        <p>Shared liturgical tooling exposed via a Next.js application.</p>
        <p>
          Easter {currentYear}: <strong>{formattedDate}</strong>
        </p>
      </section>
    </main>
  );
}
