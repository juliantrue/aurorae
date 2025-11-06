'use client';

import { Identifier, RiteVersionDefinition } from '../../liturgical-editor';

export function RiteVersionsStep({
  versions,
  activeVersionId,
  onAdd,
  onSelect,
  onDelete,
  onUpdate
}: {
  versions: RiteVersionDefinition[];
  activeVersionId: Identifier | null;
  onAdd: () => void;
  onSelect: (id: Identifier) => void;
  onDelete: (id: Identifier) => void;
  onUpdate: (
    id: Identifier,
    updater: (version: RiteVersionDefinition) => RiteVersionDefinition
  ) => void;
}) {
  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h2>Rite Versions</h2>
          <p>
            Capture the distinct promulgations for this rite. Selecting an active version enables
            the subsequent editors for blocks, ordinaries, and feasts.
          </p>
        </div>
        <button type="button" className="primary" onClick={onAdd}>
          Add Rite Version
        </button>
      </header>

      {versions.length === 0 ? (
        <p className="empty-state">No versions yet. Start by adding one above.</p>
      ) : (
        <div className="version-list">
          {versions.map((version) => {
            const isActive = version.id === activeVersionId;
            const otherVersions = versions.filter((v) => v.id !== version.id);

            return (
              <article key={version.id} className={isActive ? 'version active' : 'version'}>
                <div className="version-header">
                  <strong>{version.name || 'Unnamed version'}</strong>
                  <div className="version-actions">
                    <button type="button" onClick={() => onSelect(version.id)}>
                      {isActive ? 'Active' : 'Set Active'}
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => onDelete(version.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="field-grid">
                  <label>
                    Slug
                    <input
                      type="text"
                      value={version.slug}
                      onChange={(event) =>
                        onUpdate(version.id, (current) => ({
                          ...current,
                          slug: event.target.value
                        }))
                      }
                      placeholder="rom1962"
                    />
                  </label>

                  <label>
                    Name
                    <input
                      type="text"
                      value={version.name}
                      onChange={(event) =>
                        onUpdate(version.id, (current) => ({
                          ...current,
                          name: event.target.value
                        }))
                      }
                      placeholder="Missale Romanum (1962)"
                    />
                  </label>

                  <label>
                    Promulgated
                    <input
                      type="date"
                      value={version.promulgated}
                      onChange={(event) =>
                        onUpdate(version.id, (current) => ({
                          ...current,
                          promulgated: event.target.value
                        }))
                      }
                    />
                  </label>

                  <label>
                    Parent version
                    <select
                      value={version.parentId ?? ''}
                      onChange={(event) =>
                        onUpdate(version.id, (current) => ({
                          ...current,
                          parentId: event.target.value || undefined
                        }))
                      }
                    >
                      <option value="">None</option>
                      {otherVersions.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name || candidate.slug || candidate.id}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="wide">
                    Notes
                    <textarea
                      rows={3}
                      value={version.notes}
                      onChange={(event) =>
                        onUpdate(version.id, (current) => ({
                          ...current,
                          notes: event.target.value
                        }))
                      }
                      placeholder="Document sources, distinguishing features, or inheritance notes."
                    />
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

