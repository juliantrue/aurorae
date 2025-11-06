'use client';

import {
  CalendarLocaleDefinition,
  CalendarScope,
  ConflictAction,
  ConflictResolutionRuleDefinition,
  FeastCollectionDefinition,
  FixedFeastDefinition,
  Identifier,
  MovableFeastDefinition,
  OnConflictTransferDefinition,
  RankDefinition,
  RiteVersionDefinition,
  SeasonalDayDefinition,
  SeasonDefinition,
  TransferKind,
  calendarScopes,
  conflictActions,
  createId,
  parseNumberInput,
  transferKinds
} from '../../liturgical-editor';

export function FeastDaysStep({
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

  const mutateFeasts = (mutator: (feasts: FeastCollectionDefinition) => FeastCollectionDefinition) => {
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
      ranks: [...current.ranks, { id: createId(), key: '', name: '', precedence: '', description: '' }]
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
            <p className="empty-state">Define a hierarchy for observances.</p>
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
                      onChange={(event) => updateRank(rank.id, { key: event.target.value })}
                      placeholder="duplex"
                    />
                  </label>
                  <label>
                    Name
                    <input
                      type="text"
                      value={rank.name}
                      onChange={(event) => updateRank(rank.id, { name: event.target.value })}
                      placeholder="Duplex"
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
                      rows={2}
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
            <p className="empty-state">Define seasons in the liturgical year.</p>
          ) : (
            feasts.seasons.map((season) => (
              <article className="block-item" key={season.id}>
                <div className="block-item-header">
                  <strong>{season.name || 'Unnamed season'}</strong>
                  <button type="button" className="danger" onClick={() => removeSeason(season.id)}>
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
                      placeholder="adventus"
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
                      placeholder="Adventus"
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
                      placeholder="Purple"
                    />
                  </label>
                  <label className="wide">
                    Description
                    <textarea
                      rows={2}
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
              Add Day
            </button>
          </header>
          {feasts.seasonalDays.length === 0 ? (
            <p className="empty-state">Model occurrences within seasons with optional ranks.</p>
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
                      <option value="">None</option>
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
                      <option value="">None</option>
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
              Define feasts based on Easter with locale and rank.
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
                      placeholder="septuagesima"
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
                      placeholder="Septuagesima"
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
                    Notes
                    <textarea
                      rows={2}
                      value={rule.notes}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { notes: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Condition
                    <input
                      type="text"
                      value={rule.condition}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { condition: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Transfer to
                    <input
                      type="text"
                      value={rule.transferTo}
                      onChange={(event) =>
                        updateConflictRule(rule.id, { transferTo: event.target.value })
                      }
                    />
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
                      <option value="">None</option>
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
                      <option value="">None</option>
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
                      <option value="">None</option>
                      {feasts.fixedFeasts.map((feast) => (
                        <option key={feast.id} value={feast.id}>
                          {feast.name || feast.key || feast.id}
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
            <h3>Transfer Definitions</h3>
            <button type="button" onClick={addTransferDefinition}>
              Add Transfer
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

