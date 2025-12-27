import { TONE_META, Tone, ToneCounts } from './tone';

const REGEX_VOWEL = /(?:[cgq]u|[iy])?([aeiouyáéëíóúýǽæœ]+)/i;
const REGEX_ACCENT = /[áéíóúýǽ\u0301]/i;

// Core syllable-regex from the original file (HTML tags supported).
const REGEX_LATIN =
  /((?:<\w+>)*)(((?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽœ́æœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ]\u0301?)(?:(?:[\wáéíóúýǽæœ]\u0301?)*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]\u0301?|[bcdgptf][lrh][\wáéíóúýǽæœ]\u0301?)|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|((?:[^\w\sáëéíóúýǽæœ\u0301])*(?:\s[:;†\^\*"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/\w+>)*)/gi;

type Syllable = {
  index: number;
  prepunctuation: string;
  prespace: string;
  openTags: string;
  closeTags: string;
  syl: string;
  sylnospace: string;
  vowel: string;
  punctuation: string;
  space: string;
  accent: boolean;
  word?: Syllable[];
};

export function pointText(text: string, tone: Tone): string {
  const meta = TONE_META[tone];

  const split = splitOnMediantAsterisk(text);
  if (!split) {
    return pointSegment(text, meta.termination);
  }

  const left = pointSegment(split.left, meta.mediant);
  const right = pointSegment(split.right, meta.termination);
  return left + split.delim + right;
}

function pointSegment(text: string, counts: ToneCounts): string {
  const syls = getLatinSyllables(text);

  let doneAccents = 0;
  let donePrep = 0;
  let lastAccentI = syls.length;
  let result = '';
  const minAccentIndex = counts.preparatory;

  for (let i = lastAccentI - 1; i >= 0; i--) {
    const s = syls[i];
    const isAccentCandidate = s.accent && i >= minAccentIndex;
    const prevIsAccentCandidate = i > 0 ? syls[i - 1].accent && i - 1 >= minAccentIndex : false;

    // Accent syllables (bold)
    if (
      doneAccents < counts.accents &&
      (isAccentCandidate || (i === lastAccentI - 2 && (i === 0 || !prevIsAccentCandidate)))
    ) {
      if (doneAccents === counts.accents - 1 && i < minAccentIndex) {
        continue;
      }
      lastAccentI = i;
      result = s.punctuation + result;
      result = s.prepunctuation + renderSyllable(s, 'b') + result;
      doneAccents++;
      continue;
    }

    // Preparatory syllables (italic), after accents are satisfied
    if (doneAccents === counts.accents && donePrep < counts.preparatory) {
      result = s.punctuation + result;
      result = s.prepunctuation + renderSyllable(s, 'i') + result;
      donePrep++;
      continue;
    }

    // Plain syllable
    result = s.prepunctuation + s.syl + s.punctuation + result;
  }

  return result;
}

function renderSyllable(s: Syllable, tag: 'b' | 'i'): string {
  return `${s.openTags}${s.prespace}<${tag}>${s.sylnospace}</${tag}>${s.closeTags}`;
}

function splitOnMediantAsterisk(
  text: string,
): { left: string; delim: string; right: string } | null {
  const re = /\s+\*\s+/g;
  const m = re.exec(text);
  if (!m || m.index == null) return null;

  const delim = m[0];
  const i = m.index;
  return { left: text.slice(0, i), delim, right: text.slice(i + delim.length) };
}

// --- Syllabification ---

function getLatinSyllables(text: string): Syllable[] {
  if (typeof text !== 'string') return [];

  const out: Syllable[] = [];
  let lastI = 0;

  REGEX_LATIN.lastIndex = 0;
  for (let m: RegExpExecArray | null; (m = REGEX_LATIN.exec(text)); ) {
    if (!m[0]) break;

    const matchIndex = m.index ?? 0;

    // Special case: if syllable starts with ncu-/ngu- and previous syllable is mid-word, attach initial "n".
    const startsWithNCU = /^n[cg]u[aeiouyáéëíóúýǽæœ]/i.test(m[0]);
    if (startsWithNCU && out.length > 0) {
      const prev = out[out.length - 1];
      if (!prev.space && !prev.punctuation) {
        prev.syl += 'n';
        prev.sylnospace += 'n';
      }
    }

    const pre = text.slice(lastI, matchIndex);
    const openTags = m[1] ?? '';
    const all = m[2] ?? m[0];
    const rawSyl = m[3] ?? m[0];
    const hasTrailingAsterisk = rawSyl.endsWith('*');
    const cleanedRawSyl = hasTrailingAsterisk ? rawSyl.slice(0, -1) : rawSyl;
    const rawPrespace = m[4] ?? '';
    const vowel = (m[5] ?? REGEX_VOWEL.exec(cleanedRawSyl)?.[0] ?? '') as string;
    const separator = m[6] ?? '';
    const punct = (m[7] ?? '').replace(/\s+$/g, '');
    const space = m[8] ?? '';
    const closeTags = m[9] ?? '';

    const prespace = pre ? '' : rawPrespace;
    const sylnospace = cleanedRawSyl.slice(rawPrespace.length);
    const isAccent = separator === '*' || hasTrailingAsterisk || REGEX_ACCENT.test(cleanedRawSyl);

    const syl = openTags + (pre ? sylnospace : cleanedRawSyl) + closeTags;

    out.push({
      index: matchIndex,
      prepunctuation: pre,
      prespace,
      openTags,
      closeTags,
      syl,
      sylnospace,
      vowel,
      punctuation: punct,
      space,
      accent: isAccent,
    });

    lastI = matchIndex + all.length;
  }

  assignWordAccents(out);
  addImplicitAccents(out);

  return out;
}

function assignWordAccents(syls: Syllable[]): void {
  const len = syls.length;
  let curWord: Syllable[] = [];
  let curWordAccents = 0;

  for (let i = 0; i < len; i++) {
    const s = syls[i];
    curWord.push(s);
    s.word = curWord;
    if (s.accent) curWordAccents++;

    const endOfWord = i === len - 1 || !!s.space;
    if (!endOfWord) continue;

    if (curWordAccents === 0) {
      if (curWord.length === 2) {
        curWord[0].accent = true;
      } else if (curWord.length > 2) {
        const first = curWord[0];
        const beginsWithVowel = first.vowel && first.vowel === first.sylnospace.slice(0, 1);
        if (beginsWithVowel) {
          first.accent = true;
        } else {
          for (const wSyl of curWord) {
            if (wSyl.vowel === 'æ' || wSyl.vowel === 'œ') {
              wSyl.accent = true;
              break;
            }
          }
        }
      }
    }

    curWord = [];
    curWordAccents = 0;
  }
}

function addImplicitAccents(syls: Syllable[]): void {
  let lastAccentI = syls.length;
  for (let i = syls.length - 1; i >= 0; i--) {
    const s = syls[i];
    if (s.accent) {
      while ((lastAccentI -= 2) > i + 1) {
        syls[lastAccentI].accent = true;
      }
      lastAccentI = i;
    }
  }
}
