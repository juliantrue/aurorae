export default function RitePage() {
  return (
    <main className="editor-container">
      <section className="card">
        <div className="card-header">
          <h2>Rite</h2>
        </div>
        <p>
          Define and manage high-level liturgical rites (e.g., Roman, Ambrosian). This corresponds to the
          <code>Rite</code> model in the database and serves as the root for versions, calendars, and ordo configurations.
        </p>
      </section>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Next steps</h3>
        <ul>
          <li>Create, view, and edit Rite entries</li>
          <li>Link to associated Rite Versions</li>
        </ul>
      </div>
    </main>
  );
}

