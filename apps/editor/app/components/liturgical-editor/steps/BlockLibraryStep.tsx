'use client';

import {
  ActusLiturgicusDefinition,
  BlockLibraryDefinition,
  ChantBlockDefinition,
  Identifier,
  TextBlockDefinition,
  RefBlockDefinition,
  ResponsePartDefinition,
  ResponseSequenceDefinition,
  RiteVersionDefinition,
  createId,
  parseNumberInput,
  responseSequenceKinds
} from '../../liturgical-editor';

export function BlockLibraryStep({
  version,
  onUpdate
}: {
  version?: RiteVersionDefinition;
  onUpdate?: (updater: (version: RiteVersionDefinition) => RiteVersionDefinition) => void;
}) {
  if (!version || !onUpdate) {
    return (
      <section className="card">
        <h2>Block Library</h2>
        <p className="empty-state">Select a rite version first to curate its block library.</p>
      </section>
    );
  }

  const mutateLibrary = (mutator: (library: BlockLibraryDefinition) => BlockLibraryDefinition) => {
    onUpdate((current) => ({
      ...current,
      blockLibrary: mutator(current.blockLibrary)
    }));
  };

  const { blockLibrary } = version;

  const addActus = () =>
    mutateLibrary((library) => ({
      ...library,
      actusLiturgici: [...library.actusLiturgici, { id: createId(), action: '' }]
    }));

  const updateActus = (id: Identifier, changes: Partial<ActusLiturgicusDefinition>) =>
    mutateLibrary((library) => ({
      ...library,
      actusLiturgici: library.actusLiturgici.map((entry) =>
        entry.id === id ? { ...entry, ...changes } : entry
      )
    }));

  const removeActus = (id: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      actusLiturgici: library.actusLiturgici.filter((entry) => entry.id !== id)
    }));

  const addTextBlock = () =>
    mutateLibrary((library) => ({
      ...library,
      textBlocks: [
        ...library.textBlocks,
        { id: createId(), title: '', text: '', genus: '', parentId: undefined }
      ]
    }));

  const updateTextBlock = (id: Identifier, changes: Partial<TextBlockDefinition>) =>
    mutateLibrary((library) => ({
      ...library,
      textBlocks: library.textBlocks.map((block) =>
        block.id === id ? { ...block, ...changes } : block
      )
    }));

  const removeTextBlock = (id: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      textBlocks: library.textBlocks.filter((block) => block.id !== id)
    }));

  const addRefBlock = () =>
    mutateLibrary((library) => ({
      ...library,
      refBlocks: [
        ...library.refBlocks,
        {
          id: createId(),
          title: '',
          seqStart: '',
          seqEnd: '',
          genus: '',
          textSource: '',
          parentId: undefined,
          startLabel: '',
          endLabel: ''
        }
      ]
    }));

  const updateRefBlock = (id: Identifier, changes: Partial<RefBlockDefinition>) =>
    mutateLibrary((library) => ({
      ...library,
      refBlocks: library.refBlocks.map((block) =>
        block.id === id ? { ...block, ...changes } : block
      )
    }));

  const removeRefBlock = (id: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      refBlocks: library.refBlocks.filter((block) => block.id !== id)
    }));

  const addChantBlock = () =>
    mutateLibrary((library) => ({
      ...library,
      chantBlocks: [
        ...library.chantBlocks,
        { id: createId(), title: '', text: '', tone: '', genus: '', parentId: undefined }
      ]
    }));

  const updateChantBlock = (id: Identifier, changes: Partial<ChantBlockDefinition>) =>
    mutateLibrary((library) => ({
      ...library,
      chantBlocks: library.chantBlocks.map((block) =>
        block.id === id ? { ...block, ...changes } : block
      )
    }));

  const removeChantBlock = (id: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      chantBlocks: library.chantBlocks.filter((block) => block.id !== id)
    }));

  const addResponseSequence = () =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: [
        ...library.responseSequences,
        {
          id: createId(),
          title: '',
          description: '',
          kind: 'RESPONSORY',
          parentId: undefined,
          parts: []
        }
      ]
    }));

  const updateResponseSequence = (id: Identifier, changes: Partial<ResponseSequenceDefinition>) =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: library.responseSequences.map((sequence) =>
        sequence.id === id ? { ...sequence, ...changes } : sequence
      )
    }));

  const removeResponseSequence = (id: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: library.responseSequences.filter((sequence) => sequence.id !== id)
    }));

  const addSequencePart = (sequenceId: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: library.responseSequences.map((sequence) =>
        sequence.id === sequenceId
          ? {
              ...sequence,
              parts: [
                ...sequence.parts,
                { id: createId(), order: sequence.parts.length + 1, label: '', text: '' }
              ]
            }
          : sequence
      )
    }));

  const updateSequencePart = (
    sequenceId: Identifier,
    partId: Identifier,
    changes: Partial<ResponsePartDefinition>
  ) =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: library.responseSequences.map((sequence) =>
        sequence.id === sequenceId
          ? {
              ...sequence,
              parts: sequence.parts.map((part) =>
                part.id === partId ? { ...part, ...changes } : part
              )
            }
          : sequence
      )
    }));

  const removeSequencePart = (sequenceId: Identifier, partId: Identifier) =>
    mutateLibrary((library) => ({
      ...library,
      responseSequences: library.responseSequences.map((sequence) =>
        sequence.id === sequenceId
          ? {
              ...sequence,
              parts: sequence.parts.filter((part) => part.id !== partId)
            }
          : sequence
      )
    }));

  return (
    <section className="card">
      <h2>Block Library</h2>
      <p>
        Define the reusable content blocks that make up hours, masses, and feasts. Every entity from
        the Prisma block tables is represented here.
      </p>

      <div className="block-stack">
        <div className="block-section">
          <header>
            <h3>Actus Liturgici</h3>
            <button type="button" onClick={addActus}>
              Add Actus
            </button>
          </header>
          {blockLibrary.actusLiturgici.length === 0 ? (
            <p className="empty-state">Add liturgical actions that will appear across structures.</p>
          ) : (
            blockLibrary.actusLiturgici.map((entry) => (
              <article className="block-item" key={entry.id}>
                <div className="block-item-header">
                  <strong>{entry.action || 'Unnamed action'}</strong>
                  <button type="button" className="danger" onClick={() => removeActus(entry.id)}>
                    Remove
                  </button>
                </div>
                <label>
                  Action
                  <input
                    type="text"
                    value={entry.action}
                    onChange={(event) =>
                      updateActus(entry.id, { action: event.target.value })
                    }
                    placeholder="Incensatio altaris"
                  />
                </label>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Text Blocks</h3>
            <button type="button" onClick={addTextBlock}>
              Add Text Block
            </button>
          </header>
          {blockLibrary.textBlocks.length === 0 ? (
            <p className="empty-state">
              Capture prayers, antiphons, or readings that can be reused in ordinaries and feasts.
            </p>
          ) : (
            blockLibrary.textBlocks.map((block) => {
              const parentOptions = blockLibrary.textBlocks.filter((item) => item.id !== block.id);

              return (
                <article className="block-item" key={block.id}>
                  <div className="block-item-header">
                    <strong>{block.title || 'Untitled text block'}</strong>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => removeTextBlock(block.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="field-grid">
                    <label>
                      Title
                      <input
                        type="text"
                        value={block.title}
                        onChange={(event) =>
                          updateTextBlock(block.id, { title: event.target.value })
                        }
                        placeholder="Collecta"
                      />
                    </label>
                    <label>
                      Genus
                      <input
                        type="text"
                        value={block.genus}
                        onChange={(event) =>
                          updateTextBlock(block.id, { genus: event.target.value })
                        }
                        placeholder="Collecta"
                      />
                    </label>
                    <label>
                      Parent block
                      <select
                        value={block.parentId ?? ''}
                        onChange={(event) =>
                          updateTextBlock(block.id, {
                            parentId: event.target.value || undefined
                          })
                        }
                      >
                        <option value="">None</option>
                        {parentOptions.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title || candidate.id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="wide">
                      Text
                      <textarea
                        rows={4}
                        value={block.text}
                        onChange={(event) =>
                          updateTextBlock(block.id, { text: event.target.value })
                        }
                        placeholder="Text of the prayer or reading."
                      />
                    </label>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Reference Blocks</h3>
            <button type="button" onClick={addRefBlock}>
              Add Reference Block
            </button>
          </header>
          {blockLibrary.refBlocks.length === 0 ? (
            <p className="empty-state">
              Reference blocks map passages in text sources for lectionary usage.
            </p>
          ) : (
            blockLibrary.refBlocks.map((block) => {
              const parentOptions = blockLibrary.refBlocks.filter((item) => item.id !== block.id);

              return (
                <article className="block-item" key={block.id}>
                  <div className="block-item-header">
                    <strong>{block.title || 'Untitled reference'}</strong>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => removeRefBlock(block.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="field-grid">
                    <label>
                      Title
                      <input
                        type="text"
                        value={block.title}
                        onChange={(event) =>
                          updateRefBlock(block.id, { title: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Genus
                      <input
                        type="text"
                        value={block.genus}
                        onChange={(event) =>
                          updateRefBlock(block.id, { genus: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Text source
                      <input
                        type="text"
                        value={block.textSource}
                        onChange={(event) =>
                          updateRefBlock(block.id, { textSource: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Parent reference
                      <select
                        value={block.parentId ?? ''}
                        onChange={(event) =>
                          updateRefBlock(block.id, {
                            parentId: event.target.value || undefined
                          })
                        }
                      >
                        <option value="">None</option>
                        {parentOptions.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title || candidate.id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Start label
                      <input
                        type="text"
                        value={block.startLabel}
                        onChange={(event) =>
                          updateRefBlock(block.id, { startLabel: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      End label
                      <input
                        type="text"
                        value={block.endLabel}
                        onChange={(event) =>
                          updateRefBlock(block.id, { endLabel: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Sequence start
                      <input
                        type="number"
                        value={block.seqStart}
                        onChange={(event) =>
                          updateRefBlock(block.id, {
                            seqStart: parseNumberInput(event.target.value)
                          })
                        }
                      />
                    </label>
                    <label>
                      Sequence end
                      <input
                        type="number"
                        value={block.seqEnd}
                        onChange={(event) =>
                          updateRefBlock(block.id, {
                            seqEnd: parseNumberInput(event.target.value)
                          })
                        }
                      />
                    </label>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Chant Blocks</h3>
            <button type="button" onClick={addChantBlock}>
              Add Chant Block
            </button>
          </header>
          {blockLibrary.chantBlocks.length === 0 ? (
            <p className="empty-state">Define chant texts with optional tone metadata.</p>
          ) : (
            blockLibrary.chantBlocks.map((block) => {
              const parentOptions = blockLibrary.chantBlocks.filter((item) => item.id !== block.id);
              return (
                <article className="block-item" key={block.id}>
                  <div className="block-item-header">
                    <strong>{block.title || 'Untitled chant'}</strong>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => removeChantBlock(block.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="field-grid">
                    <label>
                      Title
                      <input
                        type="text"
                        value={block.title}
                        onChange={(event) =>
                          updateChantBlock(block.id, { title: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Genus
                      <input
                        type="text"
                        value={block.genus}
                        onChange={(event) =>
                          updateChantBlock(block.id, { genus: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Parent chant
                      <select
                        value={block.parentId ?? ''}
                        onChange={(event) =>
                          updateChantBlock(block.id, {
                            parentId: event.target.value || undefined
                          })
                        }
                      >
                        <option value="">None</option>
                        {parentOptions.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title || candidate.id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Tone
                      <input
                        type="text"
                        value={block.tone}
                        onChange={(event) =>
                          updateChantBlock(block.id, { tone: event.target.value })
                        }
                        placeholder="Mode 8"
                      />
                    </label>
                    <label className="wide">
                      Text
                      <textarea
                        rows={4}
                        value={block.text}
                        onChange={(event) =>
                          updateChantBlock(block.id, { text: event.target.value })
                        }
                      />
                    </label>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Response Sequences</h3>
            <button type="button" onClick={addResponseSequence}>
              Add Sequence
            </button>
          </header>
          {blockLibrary.responseSequences.length === 0 ? (
            <p className="empty-state">Define responsories, versicles, or dismissal forms.</p>
          ) : (
            blockLibrary.responseSequences.map((sequence) => (
              <article className="block-item" key={sequence.id}>
                <div className="block-item-header">
                  <strong>{sequence.title || 'Untitled sequence'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeResponseSequence(sequence.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Title
                    <input
                      type="text"
                      value={sequence.title}
                      onChange={(event) =>
                        updateResponseSequence(sequence.id, { title: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Kind
                    <select
                      value={sequence.kind}
                      onChange={(event) =>
                        updateResponseSequence(sequence.id, {
                          kind: event.target.value as ResponseSequenceDefinition['kind']
                        })
                      }
                    >
                      {responseSequenceKinds.map((kind) => (
                        <option key={kind} value={kind}>
                          {kind}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Parent sequence
                    <select
                      value={sequence.parentId ?? ''}
                      onChange={(event) =>
                        updateResponseSequence(sequence.id, {
                          parentId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">None</option>
                      {blockLibrary.responseSequences
                        .filter((item) => item.id !== sequence.id)
                        .map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title || candidate.id}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={2}
                      value={sequence.description}
                      onChange={(event) =>
                        updateResponseSequence(sequence.id, {
                          description: event.target.value
                        })
                      }
                      placeholder="How this sequence is used liturgically."
                    />
                  </label>
                </div>

                <div className="nested-block">
                  <header>
                    <h4>Parts</h4>
                    <button type="button" onClick={() => addSequencePart(sequence.id)}>
                      Add Part
                    </button>
                  </header>
                  {sequence.parts.length === 0 ? (
                    <p className="empty-state">Add versicles, responses, or other labeled lines.</p>
                  ) : (
                    sequence.parts.map((part) => (
                      <div className="field-grid part" key={part.id}>
                        <label>
                          Order
                          <input
                            type="number"
                            value={part.order}
                            onChange={(event) =>
                              updateSequencePart(sequence.id, part.id, {
                                order: parseNumberInput(event.target.value)
                              })
                            }
                            min={0}
                          />
                        </label>
                        <label>
                          Label
                          <input
                            type="text"
                            value={part.label}
                            onChange={(event) =>
                              updateSequencePart(sequence.id, part.id, {
                                label: event.target.value
                              })
                            }
                            placeholder="V."
                          />
                        </label>
                        <label className="wide">
                          Text
                          <textarea
                            rows={2}
                            value={part.text}
                            onChange={(event) =>
                              updateSequencePart(sequence.id, part.id, {
                                text: event.target.value
                              })
                            }
                          />
                        </label>
                        <div className="part-actions">
                          <button
                            type="button"
                            className="danger"
                            onClick={() => removeSequencePart(sequence.id, part.id)}
                          >
                            Remove part
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
