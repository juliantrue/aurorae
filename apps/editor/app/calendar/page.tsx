export default function CalendarPage() {
  return (
    <main className="editor-container">
      <section className="card">
        <div className="card-header">
          <h2>Calendar</h2>
        </div>
        <p>
          Schedule Missae and Horae across the liturgical cycle for a selected Rite Version and Locale. This will
          reference <code>MovableFeast</code>, <code>FixedFeast</code>, <code>Season</code>, and <code>SeasonalDay</code> data.
        </p>
      </section>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Next steps</h3>
        <ul>
          <li>Pick Rite Version and Locale</li>
          <li>Assign Missae/Horae to feasts and days</li>
          <li>Handle conflicts and transfers</li>
        </ul>
      </div>
    </main>
  );
}

