'use client';

import {
  BlockType,
  HoraDefinition,
  HoraElementDefinition,
  Identifier,
  MissaDefinition,
  MissaElementDefinition,
  OrdinariesDefinition,
  RiteVersionDefinition,
  blockTypes,
  createId,
  parseNumberInput
} from '../../liturgical-editor';

export function OrdinariesStep({
  version,
  onUpdate,
  blockTypeLabels
}: {
  version?: RiteVersionDefinition;
  onUpdate?: (updater: (version: RiteVersionDefinition) => RiteVersionDefinition) => void;
  blockTypeLabels: Record<BlockType, string>;
}) {
  if (!version || !onUpdate) {
    return (
      <section className="card">
        <h2>Ordinaries</h2>
        <p className="empty-state">
          Select a rite version to configure its hours and masses.
        </p>
      </section>
    );
  }

  const mutateOrdinaries = (
    mutator: (ordinaries: OrdinariesDefinition) => OrdinariesDefinition
  ) => {
    onUpdate((current) => ({
      ...current,
      ordinaries: mutator(current.ordinaries)
    }));
  };

  const { ordinaries } = version;
  const { blockLibrary } = version;

  const getBlockOptions = (type: BlockType) => {
    switch (type) {
      case 'ACTUSLITURGICUS':
        return blockLibrary.actusLiturgici.map((item) => ({
          id: item.id,
          label: item.action || item.id
        }));
      case 'TEXTBLOCK':
        return blockLibrary.textBlocks.map((item) => ({
          id: item.id,
          label: item.title || item.id
        }));
      case 'REFBLOCK':
        return blockLibrary.refBlocks.map((item) => ({
          id: item.id,
          label: item.title || item.id
        }));
      case 'CHANTBLOCK':
        return blockLibrary.chantBlocks.map((item) => ({
          id: item.id,
          label: item.title || item.id
        }));
      case 'RESPONSESEQUENCE':
        return blockLibrary.responseSequences.map((item) => ({
          id: item.id,
          label: item.title || item.id
        }));
      default:
        return [] as { id: string; label: string }[];
    }
  };

  const addHora = () =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: [
        ...current.horae,
        { id: createId(), name: '', description: '', elements: [] }
      ]
    }));

  const updateHora = (id: Identifier, changes: Partial<HoraDefinition>) =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: current.horae.map((hora) => (hora.id === id ? { ...hora, ...changes } : hora))
    }));

  const removeHora = (id: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: current.horae.filter((hora) => hora.id !== id)
    }));

  const addHoraElement = (horaId: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: current.horae.map((hora) =>
        hora.id === horaId
          ? {
              ...hora,
              elements: [
                ...hora.elements,
                { id: createId(), order: hora.elements.length + 1, blockType: 'TEXTBLOCK', blockId: undefined }
              ]
            }
          : hora
      )
    }));

  const updateHoraElement = (
    horaId: Identifier,
    elementId: Identifier,
    changes: Partial<HoraElementDefinition>
  ) =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: current.horae.map((hora) =>
        hora.id === horaId
          ? {
              ...hora,
              elements: hora.elements.map((element) =>
                element.id === elementId ? { ...element, ...changes } : element
              )
            }
          : hora
      )
    }));

  const removeHoraElement = (horaId: Identifier, elementId: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      horae: current.horae.map((hora) =>
        hora.id === horaId
          ? {
              ...hora,
              elements: hora.elements.filter((element) => element.id !== elementId)
            }
          : hora
      )
    }));

  const addMissa = () =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: [
        ...current.missae,
        { id: createId(), name: '', description: '', elements: [] }
      ]
    }));

  const updateMissa = (id: Identifier, changes: Partial<MissaDefinition>) =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: current.missae.map((missa) => (missa.id === id ? { ...missa, ...changes } : missa))
    }));

  const removeMissa = (id: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: current.missae.filter((missa) => missa.id !== id)
    }));

  const addMissaElement = (missaId: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: current.missae.map((missa) =>
        missa.id === missaId
          ? {
              ...missa,
              elements: [
                ...missa.elements,
                { id: createId(), order: missa.elements.length + 1, blockType: 'TEXTBLOCK', blockId: undefined }
              ]
            }
          : missa
      )
    }));

  const updateMissaElement = (
    missaId: Identifier,
    elementId: Identifier,
    changes: Partial<MissaElementDefinition>
  ) =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: current.missae.map((missa) =>
        missa.id === missaId
          ? {
              ...missa,
              elements: missa.elements.map((element) =>
                element.id === elementId ? { ...element, ...changes } : element
              )
            }
          : missa
      )
    }));

  const removeMissaElement = (missaId: Identifier, elementId: Identifier) =>
    mutateOrdinaries((current) => ({
      ...current,
      missae: current.missae.map((missa) =>
        missa.id === missaId
          ? {
              ...missa,
              elements: missa.elements.filter((element) => element.id !== elementId)
            }
          : missa
      )
    }));

  const renderElementEditor = (
    element: HoraElementDefinition | MissaElementDefinition,
    onChange: (
      elementId: Identifier,
      changes: Partial<HoraElementDefinition> | Partial<MissaElementDefinition>
    ) => void,
    onRemove: (elementId: Identifier) => void
  ) => {
    const options = getBlockOptions(element.blockType);

    return (
      <div className="field-grid nested" key={element.id}>
        <label>
          Order
          <input
            type="number"
            value={element.order}
            onChange={(event) =>
              onChange(element.id, { order: parseNumberInput(event.target.value) })
            }
            min={0}
          />
        </label>
        <label>
          Block type
          <select
            value={element.blockType}
            onChange={(event) =>
              onChange(element.id, { blockType: event.target.value as BlockType, blockId: undefined })
            }
          >
            {blockTypes.map((type) => (
              <option key={type} value={type}>
                {blockTypeLabels[type]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Block reference
          <select
            value={element.blockId ?? ''}
            onChange={(event) =>
              onChange(element.id, { blockId: event.target.value || undefined })
            }
          >
            <option value="">Select block</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="part-actions">
          <button type="button" className="danger" onClick={() => onRemove(element.id)}>
            Remove element
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="card">
      <h2>Ordinaries</h2>
      <p>
        Assemble the daily framework for the liturgy of the hours and the mass. Elements reference
        the block library defined in the previous step.
      </p>

      <div className="block-stack">
        <div className="block-section">
          <header>
            <h3>Horae</h3>
            <button type="button" onClick={addHora}>
              Add Hour
            </button>
          </header>
          {ordinaries.horae.length === 0 ? (
            <p className="empty-state">Build hours to define the daily office structure.</p>
          ) : (
            ordinaries.horae.map((hora) => (
              <article className="block-item" key={hora.id}>
                <div className="block-item-header">
                  <strong>{hora.name || 'Untitled hour'}</strong>
                  <button type="button" className="danger" onClick={() => removeHora(hora.id)}>
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      value={hora.name}
                      onChange={(event) =>
                        updateHora(hora.id, { name: event.target.value })
                      }
                      placeholder="Lauds"
                    />
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={3}
                      value={hora.description}
                      onChange={(event) =>
                        updateHora(hora.id, { description: event.target.value })
                      }
                      placeholder="Outline purpose or key distinctions."
                    />
                  </label>
                </div>
                <div className="nested-block">
                  <header>
                    <h4>Elements</h4>
                    <button type="button" onClick={() => addHoraElement(hora.id)}>
                      Add Element
                    </button>
                  </header>
                  {hora.elements.length === 0 ? (
                    <p className="empty-state">Add the hour's sequence of blocks.</p>
                  ) : (
                    hora.elements.map((element) =>
                      renderElementEditor(
                        element,
                        (id, changes) => updateHoraElement(hora.id, id, changes),
                        (id) => removeHoraElement(hora.id, id)
                      )
                    )
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Missae</h3>
            <button type="button" onClick={addMissa}>
              Add Mass
            </button>
          </header>
          {ordinaries.missae.length === 0 ? (
            <p className="empty-state">Compose the ordinary of the mass from blocks.</p>
          ) : (
            ordinaries.missae.map((missa) => (
              <article className="block-item" key={missa.id}>
                <div className="block-item-header">
                  <strong>{missa.name || 'Untitled mass'}</strong>
                  <button type="button" className="danger" onClick={() => removeMissa(missa.id)}>
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      value={missa.name}
                      onChange={(event) =>
                        updateMissa(missa.id, { name: event.target.value })
                      }
                      placeholder="Missa Solemnis"
                    />
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={3}
                      value={missa.description}
                      onChange={(event) =>
                        updateMissa(missa.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="nested-block">
                  <header>
                    <h4>Elements</h4>
                    <button type="button" onClick={() => addMissaElement(missa.id)}>
                      Add Element
                    </button>
                  </header>
                  {missa.elements.length === 0 ? (
                    <p className="empty-state">Add the mass' sequence of blocks.</p>
                  ) : (
                    missa.elements.map((element) =>
                      renderElementEditor(
                        element,
                        (id, changes) => updateMissaElement(missa.id, id, changes),
                        (id) => removeMissaElement(missa.id, id)
                      )
                    )
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

