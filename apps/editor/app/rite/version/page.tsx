export default function RiteVersionPage() {
  return (
    <main className="editor-container">
      <section className="card">
        <div className="card-header">
          <h2>Rite Version</h2>
        </div>
        <p>
          Define versions within a Rite (e.g., 1962, 1970, 2002). This maps to the <code>RiteVersion</code> model, with optional
          inheritance/parenting among versions for shared definitions.
        </p>
      </section>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Next steps</h3>
        <ul>
          <li>Create and organize versions under a selected Rite</li>
          <li>Set promulgation dates and notes</li>
          <li>Navigate to Ordo to assemble Missae and Horae for this version</li>
        </ul>
      </div>
    </main>
  );
}

