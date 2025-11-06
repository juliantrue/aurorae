'use client';

import { RiteDefinition } from '../../liturgical-editor';

export function RiteDetailsStep({
  rite,
  onChange
}: {
  rite: RiteDefinition;
  onChange: (field: 'name' | 'description', value: string) => void;
}) {
  return (
    <section className="card">
      <h2>Rite Metadata</h2>
      <p>
        Provide the canonical name and context for this rite. These details help identify which
        liturgical family the downstream data belongs to.
      </p>
      <div className="field-grid">
        <label>
          Name
          <input
            type="text"
            value={rite.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Roman Rite"
          />
        </label>
        <label className="wide">
          Description
          <textarea
            value={rite.description}
            onChange={(event) => onChange('description', event.target.value)}
            placeholder="Brief background for this liturgical rite."
            rows={4}
          />
        </label>
      </div>
    </section>
  );
}

