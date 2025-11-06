export type Identifier = string;

export const createId = () => Math.random().toString(36).slice(2, 10);

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

export const createEmptyBlockLibrary = (): BlockLibraryDefinition => ({
  actusLiturgici: [],
  textBlocks: [],
  refBlocks: [],
  chantBlocks: [],
  responseSequences: []
});

export const createEmptyOrdinaries = (): OrdinariesDefinition => ({
  horae: [],
  missae: []
});

export const createEmptyFeasts = (): FeastCollectionDefinition => ({
  locales: [],
  ranks: [],
  seasons: [],
  seasonalDays: [],
  movableFeasts: [],
  fixedFeasts: [],
  conflictRules: [],
  transferDefinitions: []
});

export const initialDefinition: RiteDefinition = {
  name: '',
  description: '',
  versions: []
};

export const stepLabels = [
  'Rite Details',
  'Rite Versions',
  'Block Library',
  'Ordinaries',
  'Feast Days',
  'Review'
];

export const blockTypeLabels: Record<BlockType, string> = {
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
