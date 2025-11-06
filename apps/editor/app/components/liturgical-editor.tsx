'use client';

import { useRef, useState, useMemo } from 'react';
import { StepperCarousel } from './StepperCarousel';
import { useLiturgicalEditorState } from './hooks/useLiturgicalEditorState';
import { RiteDetailsStep } from './liturgical-editor/steps/RiteDetailsStep';
import { RiteVersionsStep } from './liturgical-editor/steps/RiteVersionsStep';
import { BlockLibraryStep } from './liturgical-editor/steps/BlockLibraryStep';
import { OrdinariesStep } from './liturgical-editor/steps/OrdinariesStep';
import { FeastDaysStep } from './liturgical-editor/steps/FeastDaysStep';
import { ReviewStep } from './liturgical-editor/steps/ReviewStep';

export type Identifier = string;

const createId = () => Math.random().toString(36).slice(2, 10);

export const parseNumberInput = (value: string): number | '' => {
  if (value === '') return '';
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? '' : numericValue;
};

export type ActusLiturgicusDefinition = {
  id: Identifier;
  action: string;
};

export type TextBlockDefinition = {
  id: Identifier;
  title: string;
  text: string;
  genus: string;
  parentId?: Identifier;
};

export type RefBlockDefinition = {
  id: Identifier;
  title: string;
  seqStart: number | '';
  seqEnd: number | '';
  genus: string;
  textSource: string;
  parentId?: Identifier;
  startLabel?: string;
  endLabel?: string;
};

export type ChantBlockDefinition = {
  id: Identifier;
  title: string;
  text: string;
  tone?: string;
  genus: string;
  parentId?: Identifier;
};

export type ResponsePartDefinition = {
  id: Identifier;
  order: number | '';
  label: string;
  text: string;
};

export type ResponseSequenceDefinition = {
  id: Identifier;
  title: string;
  description: string;
  kind: 'RESPONSORY' | 'VERSICLE' | 'BENEDICTION' | 'DISMISSAL' | 'OTHER';
  parentId?: Identifier;
  parts: ResponsePartDefinition[];
};

export type BlockType =
  | 'ACTUSLITURGICUS'
  | 'TEXTBLOCK'
  | 'REFBLOCK'
  | 'CHANTBLOCK'
  | 'RESPONSESEQUENCE';

export type HoraElementDefinition = {
  id: Identifier;
  order: number | '';
  blockType: BlockType;
  blockId?: Identifier;
};

export type HoraDefinition = {
  id: Identifier;
  name: string;
  description: string;
  elements: HoraElementDefinition[];
};

export type MissaElementDefinition = {
  id: Identifier;
  order: number | '';
  blockType: BlockType;
  blockId?: Identifier;
};

export type MissaDefinition = {
  id: Identifier;
  name: string;
  description: string;
  elements: MissaElementDefinition[];
};

export type CalendarScope =
  | 'UNIVERSAL'
  | 'NATIONAL'
  | 'DIOCESAN'
  | 'RELIGIOUS_ORDER'
  | 'LOCAL';

export type CalendarLocaleDefinition = {
  id: Identifier;
  name: string;
  scope: CalendarScope;
};

export type RankDefinition = {
  id: Identifier;
  key: string;
  name: string;
  precedence: number | '';
  description: string;
};

export type SeasonDefinition = {
  id: Identifier;
  key: string;
  name: string;
  color: string;
  description: string;
};

export type SeasonalDayDefinition = {
  id: Identifier;
  key: string;
  yearNumber: number | '';
  weekNumber: number | '';
  dayNumber: number | '';
  description: string;
  seasonId?: Identifier;
  rankId?: Identifier;
};

export type MovableFeastDefinition = {
  id: Identifier;
  key: string;
  name: string;
  yearNumber: number | '';
  offsetFromEaster: number | '';
  description: string;
  localeId?: Identifier;
  rankId?: Identifier;
};

export type FixedFeastDefinition = {
  id: Identifier;
  key: string;
  name: string;
  yearNumber: number | '';
  monthNumber: number | '';
  dayNumber: number | '';
  description: string;
  localeId?: Identifier;
  rankId?: Identifier;
};

export type ConflictAction = 'OMIT' | 'OPTIONAL' | 'COMMEMORATE' | 'TRANSFER';

export type ConflictResolutionRuleDefinition = {
  id: Identifier;
  onConflict: ConflictAction;
  notes: string;
  condition: string;
  transferTo: string;
  rankId?: Identifier;
  movableFeastId?: Identifier;
  fixedFeastId?: Identifier;
};

export type TransferKind = 'TO_MOVEABLE' | 'TO_FIXED';

export type OnConflictTransferDefinition = {
  id: Identifier;
  transferKind: TransferKind;
  offsetFromEaster: number | '';
  fixedYear: number | '';
  fixedMonth: number | '';
  fixedDay: number | '';
};

export type BlockLibraryDefinition = {
  actusLiturgici: ActusLiturgicusDefinition[];
  textBlocks: TextBlockDefinition[];
  refBlocks: RefBlockDefinition[];
  chantBlocks: ChantBlockDefinition[];
  responseSequences: ResponseSequenceDefinition[];
};

export type OrdinariesDefinition = {
  horae: HoraDefinition[];
  missae: MissaDefinition[];
};

export type FeastCollectionDefinition = {
  locales: CalendarLocaleDefinition[];
  ranks: RankDefinition[];
  seasons: SeasonDefinition[];
  seasonalDays: SeasonalDayDefinition[];
  movableFeasts: MovableFeastDefinition[];
  fixedFeasts: FixedFeastDefinition[];
  conflictRules: ConflictResolutionRuleDefinition[];
  transferDefinitions: OnConflictTransferDefinition[];
};

export type RiteVersionDefinition = {
  id: Identifier;
  slug: string;
  name: string;
  promulgated: string;
  notes: string;
  parentId?: Identifier;
  blockLibrary: BlockLibraryDefinition;
  ordinaries: OrdinariesDefinition;
  feasts: FeastCollectionDefinition;
};

export type RiteDefinition = {
  name: string;
  description: string;
  versions: RiteVersionDefinition[];
};

const createEmptyBlockLibrary = (): BlockLibraryDefinition => ({
  actusLiturgici: [],
  textBlocks: [],
  refBlocks: [],
  chantBlocks: [],
  responseSequences: []
});

const createEmptyOrdinaries = (): OrdinariesDefinition => ({
  horae: [],
  missae: []
});

const createEmptyFeasts = (): FeastCollectionDefinition => ({
  locales: [],
  ranks: [],
  seasons: [],
  seasonalDays: [],
  movableFeasts: [],
  fixedFeasts: [],
  conflictRules: [],
  transferDefinitions: []
});

const initialDefinition: RiteDefinition = {
  name: '',
  description: '',
  versions: []
};

const stepLabels = [
  'Rite Details',
  'Rite Versions',
  'Block Library',
  'Ordinaries',
  'Feast Days',
  'Review'
];

const blockTypeLabels: Record<BlockType, string> = {
  ACTUSLITURGICUS: 'Actus Liturgicus',
  TEXTBLOCK: 'Text Block',
  REFBLOCK: 'Reference Block',
  CHANTBLOCK: 'Chant Block',
  RESPONSESEQUENCE: 'Response Sequence'
};

export const blockTypes: BlockType[] = [
  'ACTUSLITURGICUS',
  'TEXTBLOCK',
  'REFBLOCK',
  'CHANTBLOCK',
  'RESPONSESEQUENCE'
];

export const responseSequenceKinds: ResponseSequenceDefinition['kind'][] = [
  'RESPONSORY',
  'VERSICLE',
  'BENEDICTION',
  'DISMISSAL',
  'OTHER'
];

export const calendarScopes: CalendarScope[] = [
  'UNIVERSAL',
  'NATIONAL',
  'DIOCESAN',
  'RELIGIOUS_ORDER',
  'LOCAL'
];

export const conflictActions: ConflictAction[] = ['OMIT', 'OPTIONAL', 'COMMEMORATE', 'TRANSFER'];

export const transferKinds: TransferKind[] = ['TO_MOVEABLE', 'TO_FIXED'];

type LiturgicalEditorState = {
  rite: RiteDefinition;
  activeVersionId: Identifier | null;
  currentStep: number;
};

export function LiturgicalEditor() {
  const { state, activeVersion, goToStep, updateRiteField, addVersion, updateVersion, deleteVersion, setActiveVersion } =
    useLiturgicalEditorState();

  return (
    <div className="liturgical-editor">
      <div className="step-content">
        {state.currentStep === 0 && (
          <RiteDetailsStep rite={state.rite} onChange={updateRiteField} />
        )}

        {state.currentStep === 1 && (
          <RiteVersionsStep
            versions={state.rite.versions}
            activeVersionId={state.activeVersionId}
            onAdd={addVersion}
            onSelect={setActiveVersion}
            onDelete={deleteVersion}
            onUpdate={updateVersion}
          />
        )}

        {state.currentStep === 2 && (
          <BlockLibraryStep
            version={activeVersion}
            onUpdate={
              activeVersion
                ? (updater) => updateVersion(activeVersion.id, updater)
                : undefined
            }
          />
        )}

        {state.currentStep === 3 && (
          <OrdinariesStep
            version={activeVersion}
            blockTypeLabels={blockTypeLabels}
            onUpdate={
              activeVersion
                ? (updater) => updateVersion(activeVersion.id, updater)
                : undefined
            }
          />
        )}

        {state.currentStep === 4 && (
          <FeastDaysStep
            version={activeVersion}
            onUpdate={
              activeVersion
                ? (updater) => updateVersion(activeVersion.id, updater)
                : undefined
            }
          />
        )}

        {state.currentStep === 5 && (
          <ReviewStep rite={state.rite} blockTypeLabels={blockTypeLabels} />
        )}
      </div>

      <StepperCarousel labels={stepLabels} current={state.currentStep} onSelect={goToStep} />
    </div>
  );
}

function InternalRiteDetailsStep({
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

function InternalRiteVersionsStep({
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

function InternalBlockLibraryStep({
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
                        placeholder="Lectio ad Matutinum"
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
                        placeholder="Reading"
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
                        placeholder="VULG"
                      />
                    </label>
                    <label>
                      Seq. start
                      <input
                        type="number"
                        value={block.seqStart}
                        onChange={(event) =>
                          updateRefBlock(block.id, { seqStart: parseNumberInput(event.target.value) })
                        }
                        min={0}
                      />
                    </label>
                    <label>
                      Seq. end
                      <input
                        type="number"
                        value={block.seqEnd}
                        onChange={(event) =>
                          updateRefBlock(block.id, { seqEnd: parseNumberInput(event.target.value) })
                        }
                        min={0}
                      />
                    </label>
                    <label>
                      Start label
                      <input
                        type="text"
                        value={block.startLabel || ''}
                        onChange={(event) =>
                          updateRefBlock(block.id, { startLabel: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      End label
                      <input
                        type="text"
                        value={block.endLabel || ''}
                        onChange={(event) =>
                          updateRefBlock(block.id, { endLabel: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Parent block
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
            <p className="empty-state">
              Define chant texts and tones for antiphons, responsories, and other sung elements.
            </p>
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
                        placeholder="Antiphona ad Magnificat"
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
                        placeholder="Antiphon"
                      />
                    </label>
                    <label>
                      Tone
                      <input
                        type="text"
                        value={block.tone || ''}
                        onChange={(event) =>
                          updateChantBlock(block.id, { tone: event.target.value })
                        }
                        placeholder="VIII G"
                      />
                    </label>
                    <label>
                      Parent block
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
                    <label className="wide">
                      Text
                      <textarea
                        rows={3}
                        value={block.text}
                        onChange={(event) =>
                          updateChantBlock(block.id, { text: event.target.value })
                        }
                        placeholder="Chant text or incipit."
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
              Add Response Sequence
            </button>
          </header>
          {blockLibrary.responseSequences.length === 0 ? (
            <p className="empty-state">
              Response sequences capture responsories, versicles, blessings, and related patterns.
            </p>
          ) : (
            blockLibrary.responseSequences.map((sequence) => {
              const parentOptions = blockLibrary.responseSequences.filter(
                (item) => item.id !== sequence.id
              );

              return (
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
                        placeholder="Responsory"
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
                        {parentOptions.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.title || candidate.id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="wide">
                      Description
                      <textarea
                        rows={3}
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
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function InternalOrdinariesStep({
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
        return [];
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
                    <p className="empty-state">
                      Link blocks to assemble this hour&apos;s liturgy.
                    </p>
                  ) : (
                    hora.elements.map((element) =>
                      renderElementEditor(
                        element,
                        (elementId, changes) =>
                          updateHoraElement(hora.id, elementId, changes as Partial<HoraElementDefinition>),
                        (elementId) => removeHoraElement(hora.id, elementId)
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
            <p className="empty-state">Outline masses for ordinary usage within this rite.</p>
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
                      placeholder="Missa lecta"
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
                      placeholder="Describe when this ordinary is applied."
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
                    <p className="empty-state">
                      Link blocks to outline the order of this mass.
                    </p>
                  ) : (
                    missa.elements.map((element) =>
                      renderElementEditor(
                        element,
                        (elementId, changes) =>
                          updateMissaElement(missa.id, elementId, changes as Partial<MissaElementDefinition>),
                        (elementId) => removeMissaElement(missa.id, elementId)
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

function InternalFeastDaysStep({
  version,
  onUpdate
}: {
  version?: RiteVersionDefinition;
  onUpdate?: (updater: (version: RiteVersionDefinition) => RiteVersionDefinition) => void;
}) {
  if (!version || !onUpdate) {
    return (
      <section className="card">
        <h2>Feast Days</h2>
        <p className="empty-state">Select a rite version to curate feasts and calendars.</p>
      </section>
    );
  }

  const mutateFeasts = (
    mutator: (feasts: FeastCollectionDefinition) => FeastCollectionDefinition
  ) => {
    onUpdate((current) => ({
      ...current,
      feasts: mutator(current.feasts)
    }));
  };

  const { feasts } = version;

  const addLocale = () =>
    mutateFeasts((current) => ({
      ...current,
      locales: [...current.locales, { id: createId(), name: '', scope: 'UNIVERSAL' }]
    }));

  const updateLocale = (id: Identifier, changes: Partial<CalendarLocaleDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      locales: current.locales.map((locale) =>
        locale.id === id ? { ...locale, ...changes } : locale
      )
    }));

  const removeLocale = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      locales: current.locales.filter((locale) => locale.id !== id),
      movableFeasts: current.movableFeasts.map((feast) =>
        feast.localeId === id ? { ...feast, localeId: undefined } : feast
      ),
      fixedFeasts: current.fixedFeasts.map((feast) =>
        feast.localeId === id ? { ...feast, localeId: undefined } : feast
      )
    }));

  const addRank = () =>
    mutateFeasts((current) => ({
      ...current,
      ranks: [
        ...current.ranks,
        { id: createId(), key: '', name: '', precedence: '', description: '' }
      ]
    }));

  const updateRank = (id: Identifier, changes: Partial<RankDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      ranks: current.ranks.map((rank) => (rank.id === id ? { ...rank, ...changes } : rank))
    }));

  const removeRank = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      ranks: current.ranks.filter((rank) => rank.id !== id),
      seasonalDays: current.seasonalDays.map((day) =>
        day.rankId === id ? { ...day, rankId: undefined } : day
      ),
      movableFeasts: current.movableFeasts.map((feast) =>
        feast.rankId === id ? { ...feast, rankId: undefined } : feast
      ),
      fixedFeasts: current.fixedFeasts.map((feast) =>
        feast.rankId === id ? { ...feast, rankId: undefined } : feast
      ),
      conflictRules: current.conflictRules.map((rule) =>
        rule.rankId === id ? { ...rule, rankId: undefined } : rule
      )
    }));

  const addSeason = () =>
    mutateFeasts((current) => ({
      ...current,
      seasons: [
        ...current.seasons,
        { id: createId(), key: '', name: '', color: '', description: '' }
      ]
    }));

  const updateSeason = (id: Identifier, changes: Partial<SeasonDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      seasons: current.seasons.map((season) =>
        season.id === id ? { ...season, ...changes } : season
      )
    }));

  const removeSeason = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      seasons: current.seasons.filter((season) => season.id !== id),
      seasonalDays: current.seasonalDays.map((day) =>
        day.seasonId === id ? { ...day, seasonId: undefined } : day
      )
    }));

  const addSeasonalDay = () =>
    mutateFeasts((current) => ({
      ...current,
      seasonalDays: [
        ...current.seasonalDays,
        {
          id: createId(),
          key: '',
          yearNumber: '',
          weekNumber: '',
          dayNumber: '',
          description: '',
          seasonId: undefined,
          rankId: undefined
        }
      ]
    }));

  const updateSeasonalDay = (id: Identifier, changes: Partial<SeasonalDayDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      seasonalDays: current.seasonalDays.map((day) =>
        day.id === id ? { ...day, ...changes } : day
      )
    }));

  const removeSeasonalDay = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      seasonalDays: current.seasonalDays.filter((day) => day.id !== id)
    }));

  const addMovableFeast = () =>
    mutateFeasts((current) => ({
      ...current,
      movableFeasts: [
        ...current.movableFeasts,
        {
          id: createId(),
          key: '',
          name: '',
          yearNumber: '',
          offsetFromEaster: '',
          description: '',
          localeId: undefined,
          rankId: undefined
        }
      ]
    }));

  const updateMovableFeast = (id: Identifier, changes: Partial<MovableFeastDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      movableFeasts: current.movableFeasts.map((feast) =>
        feast.id === id ? { ...feast, ...changes } : feast
      )
    }));

  const removeMovableFeast = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      movableFeasts: current.movableFeasts.filter((feast) => feast.id !== id),
      conflictRules: current.conflictRules.map((rule) =>
        rule.movableFeastId === id ? { ...rule, movableFeastId: undefined } : rule
      )
    }));

  const addFixedFeast = () =>
    mutateFeasts((current) => ({
      ...current,
      fixedFeasts: [
        ...current.fixedFeasts,
        {
          id: createId(),
          key: '',
          name: '',
          yearNumber: '',
          monthNumber: '',
          dayNumber: '',
          description: '',
          localeId: undefined,
          rankId: undefined
        }
      ]
    }));

  const updateFixedFeast = (id: Identifier, changes: Partial<FixedFeastDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      fixedFeasts: current.fixedFeasts.map((feast) =>
        feast.id === id ? { ...feast, ...changes } : feast
      )
    }));

  const removeFixedFeast = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      fixedFeasts: current.fixedFeasts.filter((feast) => feast.id !== id),
      conflictRules: current.conflictRules.map((rule) =>
        rule.fixedFeastId === id ? { ...rule, fixedFeastId: undefined } : rule
      )
    }));

  const addConflictRule = () =>
    mutateFeasts((current) => ({
      ...current,
      conflictRules: [
        ...current.conflictRules,
        {
          id: createId(),
          onConflict: 'OMIT',
          notes: '',
          condition: '',
          transferTo: '',
          rankId: undefined,
          movableFeastId: undefined,
          fixedFeastId: undefined
        }
      ]
    }));

  const updateConflictRule = (id: Identifier, changes: Partial<ConflictResolutionRuleDefinition>) =>
    mutateFeasts((current) => ({
      ...current,
      conflictRules: current.conflictRules.map((rule) =>
        rule.id === id ? { ...rule, ...changes } : rule
      )
    }));

  const removeConflictRule = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      conflictRules: current.conflictRules.filter((rule) => rule.id !== id)
    }));

  const addTransferDefinition = () =>
    mutateFeasts((current) => ({
      ...current,
      transferDefinitions: [
        ...current.transferDefinitions,
        {
          id: createId(),
          transferKind: 'TO_MOVEABLE',
          offsetFromEaster: '',
          fixedYear: '',
          fixedMonth: '',
          fixedDay: ''
        }
      ]
    }));

  const updateTransferDefinition = (
    id: Identifier,
    changes: Partial<OnConflictTransferDefinition>
  ) =>
    mutateFeasts((current) => ({
      ...current,
      transferDefinitions: current.transferDefinitions.map((definition) =>
        definition.id === id ? { ...definition, ...changes } : definition
      )
    }));

  const removeTransferDefinition = (id: Identifier) =>
    mutateFeasts((current) => ({
      ...current,
      transferDefinitions: current.transferDefinitions.filter(
        (definition) => definition.id !== id
      )
    }));

  return (
    <section className="card">
      <h2>Feast Days</h2>
      <p>
        Configure locales, ranks, seasons, and feast definitions for this rite version. The data
        aligns with the Prisma calendar models to support persistence.
      </p>

      <div className="block-stack">
        <div className="block-section">
          <header>
            <h3>Calendar Locales</h3>
            <button type="button" onClick={addLocale}>
              Add Locale
            </button>
          </header>
          {feasts.locales.length === 0 ? (
            <p className="empty-state">
              Define locales to differentiate universal, national, or local calendars.
            </p>
          ) : (
            feasts.locales.map((locale) => (
              <article className="block-item" key={locale.id}>
                <div className="block-item-header">
                  <strong>{locale.name || 'Unnamed locale'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeLocale(locale.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      value={locale.name}
                      onChange={(event) =>
                        updateLocale(locale.id, { name: event.target.value })
                      }
                      placeholder="United States"
                    />
                  </label>
                  <label>
                    Scope
                    <select
                      value={locale.scope}
                      onChange={(event) =>
                        updateLocale(locale.id, {
                          scope: event.target.value as CalendarScope
                        })
                      }
                    >
                      {calendarScopes.map((scope) => (
                        <option key={scope} value={scope}>
                          {scope}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Ranks</h3>
            <button type="button" onClick={addRank}>
              Add Rank
            </button>
          </header>
          {feasts.ranks.length === 0 ? (
            <p className="empty-state">
              Create ranks to describe precedence for feasts and seasonal observances.
            </p>
          ) : (
            feasts.ranks.map((rank) => (
              <article className="block-item" key={rank.id}>
                <div className="block-item-header">
                  <strong>{rank.name || 'Unnamed rank'}</strong>
                  <button type="button" className="danger" onClick={() => removeRank(rank.id)}>
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Key
                    <input
                      type="text"
                      value={rank.key}
                      onChange={(event) =>
                        updateRank(rank.id, { key: event.target.value })
                      }
                      placeholder="sollemnitas"
                    />
                  </label>
                  <label>
                    Name
                    <input
                      type="text"
                      value={rank.name}
                      onChange={(event) =>
                        updateRank(rank.id, { name: event.target.value })
                      }
                      placeholder="Solemnity"
                    />
                  </label>
                  <label>
                    Precedence
                    <input
                      type="number"
                      value={rank.precedence}
                      onChange={(event) =>
                        updateRank(rank.id, {
                          precedence: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={3}
                      value={rank.description}
                      onChange={(event) =>
                        updateRank(rank.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Seasons</h3>
            <button type="button" onClick={addSeason}>
              Add Season
            </button>
          </header>
          {feasts.seasons.length === 0 ? (
            <p className="empty-state">
              Seasons help organize seasonal days and validate calendar coverage.
            </p>
          ) : (
            feasts.seasons.map((season) => (
              <article className="block-item" key={season.id}>
                <div className="block-item-header">
                  <strong>{season.name || 'Unnamed season'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeSeason(season.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Key
                    <input
                      type="text"
                      value={season.key}
                      onChange={(event) =>
                        updateSeason(season.id, { key: event.target.value })
                      }
                      placeholder="Quadragesimae"
                    />
                  </label>
                  <label>
                    Name
                    <input
                      type="text"
                      value={season.name}
                      onChange={(event) =>
                        updateSeason(season.id, { name: event.target.value })
                      }
                      placeholder="Lent"
                    />
                  </label>
                  <label>
                    Color
                    <input
                      type="text"
                      value={season.color}
                      onChange={(event) =>
                        updateSeason(season.id, { color: event.target.value })
                      }
                      placeholder="Violet"
                    />
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={3}
                      value={season.description}
                      onChange={(event) =>
                        updateSeason(season.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Seasonal Days</h3>
            <button type="button" onClick={addSeasonalDay}>
              Add Seasonal Day
            </button>
          </header>
          {feasts.seasonalDays.length === 0 ? (
            <p className="empty-state">
              Seasonal days link seasons and ranks with specific observances.
            </p>
          ) : (
            feasts.seasonalDays.map((day) => (
              <article className="block-item" key={day.id}>
                <div className="block-item-header">
                  <strong>{day.key || 'Unnamed day'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeSeasonalDay(day.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Key
                    <input
                      type="text"
                      value={day.key}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, { key: event.target.value })
                      }
                      placeholder="advent-1-sunday"
                    />
                  </label>
                  <label>
                    Year number
                    <input
                      type="number"
                      value={day.yearNumber}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, {
                          yearNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label>
                    Week number
                    <input
                      type="number"
                      value={day.weekNumber}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, {
                          weekNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label>
                    Day number
                    <input
                      type="number"
                      value={day.dayNumber}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, {
                          dayNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label>
                    Season
                    <select
                      value={day.seasonId ?? ''}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, {
                          seasonId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Select season</option>
                      {feasts.seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                          {season.name || season.key || season.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Rank
                    <select
                      value={day.rankId ?? ''}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, {
                          rankId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Select rank</option>
                      {feasts.ranks.map((rank) => (
                        <option key={rank.id} value={rank.id}>
                          {rank.name || rank.key || rank.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={2}
                      value={day.description}
                      onChange={(event) =>
                        updateSeasonalDay(day.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Movable Feasts</h3>
            <button type="button" onClick={addMovableFeast}>
              Add Movable Feast
            </button>
          </header>
          {feasts.movableFeasts.length === 0 ? (
            <p className="empty-state">
              Define movable feasts anchored around Easter with offsets and locales.
            </p>
          ) : (
            feasts.movableFeasts.map((feast) => (
              <article className="block-item" key={feast.id}>
                <div className="block-item-header">
                  <strong>{feast.name || 'Unnamed feast'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeMovableFeast(feast.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Key
                    <input
                      type="text"
                      value={feast.key}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, { key: event.target.value })
                      }
                      placeholder="pentecost-sunday"
                    />
                  </label>
                  <label>
                    Name
                    <input
                      type="text"
                      value={feast.name}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, { name: event.target.value })
                      }
                      placeholder="Pentecost Sunday"
                    />
                  </label>
                  <label>
                    Year number
                    <input
                      type="number"
                      value={feast.yearNumber}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, {
                          yearNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label>
                    Offset from Easter
                    <input
                      type="number"
                      value={feast.offsetFromEaster}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, {
                          offsetFromEaster: parseNumberInput(event.target.value)
                        })
                      }
                    />
                  </label>
                  <label>
                    Locale
                    <select
                      value={feast.localeId ?? ''}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, {
                          localeId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Universal</option>
                      {feasts.locales.map((locale) => (
                        <option key={locale.id} value={locale.id}>
                          {locale.name || locale.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Rank
                    <select
                      value={feast.rankId ?? ''}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, {
                          rankId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Select rank</option>
                      {feasts.ranks.map((rank) => (
                        <option key={rank.id} value={rank.id}>
                          {rank.name || rank.key || rank.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={2}
                      value={feast.description}
                      onChange={(event) =>
                        updateMovableFeast(feast.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Fixed Feasts</h3>
            <button type="button" onClick={addFixedFeast}>
              Add Fixed Feast
            </button>
          </header>
          {feasts.fixedFeasts.length === 0 ? (
            <p className="empty-state">
              Define fixed-date feasts with locale and rank associations.
            </p>
          ) : (
            feasts.fixedFeasts.map((feast) => (
              <article className="block-item" key={feast.id}>
                <div className="block-item-header">
                  <strong>{feast.name || 'Unnamed feast'}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeFixedFeast(feast.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Key
                    <input
                      type="text"
                      value={feast.key}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, { key: event.target.value })
                      }
                      placeholder="immaculate-conception"
                    />
                  </label>
                  <label>
                    Name
                    <input
                      type="text"
                      value={feast.name}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, { name: event.target.value })
                      }
                      placeholder="Immaculate Conception"
                    />
                  </label>
                  <label>
                    Year number
                    <input
                      type="number"
                      value={feast.yearNumber}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, {
                          yearNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label>
                    Month
                    <input
                      type="number"
                      value={feast.monthNumber}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, {
                          monthNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={1}
                      max={12}
                    />
                  </label>
                  <label>
                    Day
                    <input
                      type="number"
                      value={feast.dayNumber}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, {
                          dayNumber: parseNumberInput(event.target.value)
                        })
                      }
                      min={1}
                      max={31}
                    />
                  </label>
                  <label>
                    Locale
                    <select
                      value={feast.localeId ?? ''}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, {
                          localeId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Universal</option>
                      {feasts.locales.map((locale) => (
                        <option key={locale.id} value={locale.id}>
                          {locale.name || locale.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Rank
                    <select
                      value={feast.rankId ?? ''}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, {
                          rankId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Select rank</option>
                      {feasts.ranks.map((rank) => (
                        <option key={rank.id} value={rank.id}>
                          {rank.name || rank.key || rank.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={2}
                      value={feast.description}
                      onChange={(event) =>
                        updateFixedFeast(feast.id, { description: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Conflict Rules</h3>
            <button type="button" onClick={addConflictRule}>
              Add Rule
            </button>
          </header>
          {feasts.conflictRules.length === 0 ? (
            <p className="empty-state">
              Model how feast collisions are resolved across ranks and locales.
            </p>
          ) : (
            feasts.conflictRules.map((rule) => (
              <article className="block-item" key={rule.id}>
                <div className="block-item-header">
                  <strong>{rule.onConflict}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeConflictRule(rule.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Action
                    <select
                      value={rule.onConflict}
                      onChange={(event) =>
                        updateConflictRule(rule.id, {
                          onConflict: event.target.value as ConflictAction
                        })
                      }
                    >
                      {conflictActions.map((action) => (
                        <option key={action} value={action}>
                          {action}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Rank
                    <select
                      value={rule.rankId ?? ''}
                      onChange={(event) =>
                        updateConflictRule(rule.id, {
                          rankId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Any rank</option>
                      {feasts.ranks.map((rank) => (
                        <option key={rank.id} value={rank.id}>
                          {rank.name || rank.key || rank.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Movable feast
                    <select
                      value={rule.movableFeastId ?? ''}
                      onChange={(event) =>
                        updateConflictRule(rule.id, {
                          movableFeastId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Any movable feast</option>
                      {feasts.movableFeasts.map((feast) => (
                        <option key={feast.id} value={feast.id}>
                          {feast.name || feast.key || feast.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Fixed feast
                    <select
                      value={rule.fixedFeastId ?? ''}
                      onChange={(event) =>
                        updateConflictRule(rule.id, {
                          fixedFeastId: event.target.value || undefined
                        })
                      }
                    >
                      <option value="">Any fixed feast</option>
                      {feasts.fixedFeasts.map((feast) => (
                        <option key={feast.id} value={feast.id}>
                          {feast.name || feast.key || feast.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="wide">
                    Condition
                    <input
                      type="text"
                      value={rule.condition}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { condition: event.target.value })
                      }
                      placeholder="If falls during Holy Week"
                    />
                  </label>
                  <label className="wide">
                    Transfer to
                    <input
                      type="text"
                      value={rule.transferTo}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { transferTo: event.target.value })
                      }
                      placeholder="Monday after 2nd Sunday of Easter"
                    />
                  </label>
                  <label className="wide">
                    Notes
                    <textarea
                      rows={2}
                      value={rule.notes}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { notes: event.target.value })
                      }
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="block-section">
          <header>
            <h3>Transfer Definitions</h3>
            <button type="button" onClick={addTransferDefinition}>
              Add Transfer Definition
            </button>
          </header>
          {feasts.transferDefinitions.length === 0 ? (
            <p className="empty-state">
              Capture reusable transfer destinations for conflict handling.
            </p>
          ) : (
            feasts.transferDefinitions.map((definition) => (
              <article className="block-item" key={definition.id}>
                <div className="block-item-header">
                  <strong>{definition.transferKind}</strong>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeTransferDefinition(definition.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="field-grid">
                  <label>
                    Transfer kind
                    <select
                      value={definition.transferKind}
                      onChange={(event) =>
                        updateTransferDefinition(definition.id, {
                          transferKind: event.target.value as TransferKind
                        })
                      }
                    >
                      {transferKinds.map((kind) => (
                        <option key={kind} value={kind}>
                          {kind}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Offset from Easter
                    <input
                      type="number"
                      value={definition.offsetFromEaster}
                      onChange={(event) =>
                        updateTransferDefinition(definition.id, {
                          offsetFromEaster: parseNumberInput(event.target.value)
                        })
                      }
                    />
                  </label>
                  <label>
                    Fixed year
                    <input
                      type="number"
                      value={definition.fixedYear}
                      onChange={(event) =>
                        updateTransferDefinition(definition.id, {
                          fixedYear: parseNumberInput(event.target.value)
                        })
                      }
                    />
                  </label>
                  <label>
                    Fixed month
                    <input
                      type="number"
                      value={definition.fixedMonth}
                      onChange={(event) =>
                        updateTransferDefinition(definition.id, {
                          fixedMonth: parseNumberInput(event.target.value)
                        })
                      }
                      min={1}
                      max={12}
                    />
                  </label>
                  <label>
                    Fixed day
                    <input
                      type="number"
                      value={definition.fixedDay}
                      onChange={(event) =>
                        updateTransferDefinition(definition.id, {
                          fixedDay: parseNumberInput(event.target.value)
                        })
                      }
                      min={1}
                      max={31}
                    />
                  </label>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function InternalReviewStep({
  rite,
  blockTypeLabels
}: {
  rite: RiteDefinition;
  blockTypeLabels: Record<BlockType, string>;
}) {
  const summary = useMemo(() => JSON.stringify(rite, null, 2), [rite]);

  return (
    <section className="review">
      <h2>Review Definition</h2>
      <p>
        The review stage surfaces the composed rite configuration as JSON data that can be submitted
        to persistence or used with Prisma. Earlier steps will populate this once implemented.
      </p>
      <pre>{summary}</pre>
      <details>
        <summary>Block type reference</summary>
        <ul>
          {Object.entries(blockTypeLabels).map(([key, label]) => (
            <li key={key}>
              {key}: {label}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

export { createId, stepLabels, blockTypeLabels };
