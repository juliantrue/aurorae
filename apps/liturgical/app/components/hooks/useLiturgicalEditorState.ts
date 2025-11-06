import { useMemo, useState } from 'react';
import type { Identifier, RiteDefinition, RiteVersionDefinition } from '../liturgical-types';
import { initialDefinition, createEmptyBlockLibrary, createEmptyFeasts, createEmptyOrdinaries } from '../liturgical-types';

export type LiturgicalEditorState = {
  rite: RiteDefinition;
  activeVersionId: Identifier | null;
  currentStep: number;
};

export function useLiturgicalEditorState() {
  const [state, setState] = useState<LiturgicalEditorState>({
    rite: initialDefinition,
    activeVersionId: null,
    currentStep: 0
  });

  const activeVersion = useMemo(() => {
    if (!state.activeVersionId) return undefined;
    return state.rite.versions.find((version) => version.id === state.activeVersionId);
  }, [state.activeVersionId, state.rite.versions]);

  const goToStep = (step: number) => setState((prev) => ({ ...prev, currentStep: step }));

  const updateRiteField = (field: 'name' | 'description', value: string) => {
    setState((prev) => ({
      ...prev,
      rite: {
        ...prev.rite,
        [field]: value
      }
    }));
  };

  const addVersion = () => {
    const version: RiteVersionDefinition = {
      id: Math.random().toString(36).slice(2, 10),
      slug: '',
      name: '',
      promulgated: '',
      notes: '',
      parentId: undefined,
      blockLibrary: createEmptyBlockLibrary(),
      ordinaries: createEmptyOrdinaries(),
      feasts: createEmptyFeasts()
    };
    setState((prev) => ({
      ...prev,
      rite: { ...prev.rite, versions: [...prev.rite.versions, version] },
      activeVersionId: version.id
    }));
  };

  const updateVersion = (
    id: Identifier,
    updater: (version: RiteVersionDefinition) => RiteVersionDefinition
  ) => {
    setState((prev) => {
      const versions = prev.rite.versions.map((version) =>
        version.id === id ? updater(version) : version
      );
      return { ...prev, rite: { ...prev.rite, versions } };
    });
  };

  const deleteVersion = (id: Identifier) => {
    setState((prev) => {
      const versions = prev.rite.versions.filter((version) => version.id !== id);
      const activeVersionId =
        prev.activeVersionId === id ? versions.at(-1)?.id ?? null : prev.activeVersionId;
      return { ...prev, activeVersionId, rite: { ...prev.rite, versions } };
    });
  };

  const setActiveVersion = (id: Identifier) =>
    setState((prev) => ({ ...prev, activeVersionId: id }));

  return {
    state,
    setState,
    activeVersion,
    goToStep,
    updateRiteField,
    addVersion,
    updateVersion,
    deleteVersion,
    setActiveVersion
  } as const;
}

