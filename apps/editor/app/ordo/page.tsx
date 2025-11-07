export default function OrdoPage() {
  return (
    <main className="editor-container">
      <section className="card">
        <div className="card-header">
          <h2>Ordo</h2>
        </div>
        <p>
          Define the building blocks and assemble Missae and Horae for a given Rite Version. Blocks correspond to
          the schema models: <code>ActusLiturgicus</code>, <code>TextBlock</code>, <code>RefBlock</code>, <code>ChantBlock</code>, and
          <code>ResponseSequence</code>, which are referenced in <code>MissaElement</code> and <code>HoraElement</code> via
          <code>blockType</code>/<code>blockId</code>.
        </p>
      </section>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Sections</h3>
        <ul>
          <li><a href="/ordo/blocks">Blocks Library</a> — create and manage reusable liturgical blocks</li>
          <li><a href="/ordo/missae">Missae</a> — assemble Masses from blocks</li>
          <li><a href="/ordo/horas">Horae</a> — assemble Hours from blocks</li>
        </ul>
      </div>
    </main>
  );
}

