// Tone definitions + metadata (including GABC strings)

export type Tone = keyof typeof TONE_META;

export type ToneCounts = Readonly<{ accents: number; preparatory: number }>;

export type ToneMeta = Readonly<{
  mediant: ToneCounts;
  termination: ToneCounts;
  gabc: Readonly<{
    clef: string;

    // NEW: intonation + tenor metadata
    // - intonation is the part before the first reciting-note token (e.g. "... hr ..." / "... jr ..." / "... ir ...")
    // - tenor is the reciting note for each half
    intonation: string;
    tenor: Readonly<{
      mediant: string;
      termination: string;
    }>;

    mediant: string;
    termination: string | Record<string, string>; // some tones have multiple endings
  }>;
}>;

export const TONE_META = {
  // --- Tone 1 ---
  '1D': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'gh gr gvFED.",
    },
  },
  '1D-': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'g gr gvFED.",
    },
  },
  '1D2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f gr 'gf d.",
    },
  },
  '1f': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'gh gr gf..",
    },
  },
  '1g': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'gh gr g.",
    },
  },
  '1g2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'g gr ghg.",
    },
  },
  '1g3': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'g gr g.",
    },
  },
  '1a': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'g hr h.",
    },
  },
  '1a2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'g gr gh..",
    },
  },
  '1a3': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr g f 'gh gr gh..",
    },
  },

  // --- Tone 2 ---
  '2': {
    mediant: { accents: 1, preparatory: 0 },
    termination: { accents: 1, preparatory: 1 },
    gabc: {
      clef: 'f3',
      intonation: 'e f',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "e f hr 'i hr h.",
      termination: "hr g 'e fr f.",
    },
  },

  // --- Tone 3 ---
  '3b': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 1 },
    gabc: {
      clef: 'c4',
      intonation: 'g hj',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g hj jr 'k jr jr 'ih j.",
      termination: "jr h 'j jr i.",
    },
  },
  '3a': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 1 },
    gabc: {
      clef: 'c4',
      intonation: 'g hj',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g hj jr 'k jr jr 'ih j.",
      termination: "jr h 'j jr ih..",
    },
  },
  '3a2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'g hj',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g hj jr 'k jr jr 'ih j.",
      termination: "jr ji hi 'h gr gh..",
    },
  },
  '3g': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'g hj',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g hj jr 'k jr jr 'ih j.",
      termination: "jr ji hi 'h gr g.",
    },
  },
  '3g2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 3 },
    gabc: {
      clef: 'c4',
      intonation: 'g hj',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g hj jr 'k jr jr 'ih j.",
      termination: "jr h j i 'h gr g.",
    },
  },

  // --- Tone 4 ---
  '4g': {
    mediant: { accents: 1, preparatory: 2 },
    termination: { accents: 1, preparatory: 0 },
    gabc: {
      clef: 'c4',
      intonation: 'h gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "h gh hr g h 'i hr h.",
      termination: "hr 'h gr g.",
    },
  },
  '4E': {
    mediant: { accents: 1, preparatory: 2 },
    termination: { accents: 1, preparatory: 3 },
    gabc: {
      clef: 'c4',
      intonation: 'h gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "h gh hr g h 'i hr h.",
      termination: "hr g h ih gr 'gf e.",
    },
  },

  // --- Tone 5 ---
  '5': {
    mediant: { accents: 1, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'd f',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "d f hr 'i hr h.",
      termination: "hr 'i gr 'h fr f.",
    },
  },

  // --- Tone 6 ---
  '6': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'f gh',
      tenor: { mediant: 'h', termination: 'h' },
      mediant: "f gh hr 'ixi hr 'g hr h.",
      termination: "hr f gh 'g fr f.",
    },
  },

  // --- Tone 7 ---
  '7a': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'hg hi',
      tenor: { mediant: 'i', termination: 'i' },
      mediant: "hg hi ir 'k jr 'i jr j.",
      termination: "ir 'j ir 'h hr gf..",
    },
  },
  '7b': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'hg hi',
      tenor: { mediant: 'i', termination: 'i' },
      mediant: "hg hi ir 'k jr 'i jr j.",
      termination: "ir 'j ir 'h hr g.",
    },
  },
  '7c': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'hg hi',
      tenor: { mediant: 'i', termination: 'i' },
      mediant: "hg hi ir 'k jr 'i jr j.",
      termination: "ir 'j ir 'h hr gh..",
    },
  },
  '7c2': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'hg hi',
      tenor: { mediant: 'i', termination: 'i' },
      mediant: "hg hi ir 'k jr 'i jr j.",
      termination: "ir 'j ir 'h hr ih..",
    },
  },
  '7d': {
    mediant: { accents: 2, preparatory: 0 },
    termination: { accents: 2, preparatory: 0 },
    gabc: {
      clef: 'c3',
      intonation: 'hg hi',
      tenor: { mediant: 'i', termination: 'i' },
      mediant: "hg hi ir 'k jr 'i jr j.",
      termination: "ir 'j ir 'h hr gi..",
    },
  },

  // --- Tone 8 ---
  '8G': {
    mediant: { accents: 1, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'g h',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g h jr 'k jr j.",
      termination: "jr i j 'h gr g.",
    },
  },
  '8G*': {
    mediant: { accents: 1, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'g h',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g h jr 'k jr j.",
      termination: "jr i j 'h gr gh..",
    },
  },
  '8c': {
    mediant: { accents: 1, preparatory: 0 },
    termination: { accents: 1, preparatory: 2 },
    gabc: {
      clef: 'c4',
      intonation: 'g h',
      tenor: { mediant: 'j', termination: 'j' },
      mediant: "g h jr 'k jr j.",
      termination: "jr h j 'k jr j.",
    },
  },

  // --- Peregrinus ---
  per: {
    mediant: { accents: 1, preparatory: 3 },
    termination: { accents: 1, preparatory: 1 },
    gabc: {
      clef: 'c4',
      intonation: 'ixhi',
      tenor: { mediant: 'h', termination: 'g' },
      mediant: "ixhi hr g ixi h 'g fr f.",
      termination: "gr d 'f fr ed..",
    },
  },
  'per-alt': {
    mediant: { accents: 1, preparatory: 2 },
    termination: { accents: 1, preparatory: 1 },
    gabc: {
      clef: 'c4',
      intonation: 'ixhi',
      tenor: { mediant: 'h', termination: 'i' },
      mediant: "ixhi hr ixi h 'g fr f.",
      termination: "ixhi gr d 'f fr ed..",
    },
  },
} as const satisfies Record<string, ToneMeta>;
