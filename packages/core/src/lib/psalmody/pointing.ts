import { TONE_META, Tone, ToneCounts } from './tone';

const REGEX_VOWEL = /(?:[cgq]u|[iy])?([aeiouyáéëíóúýǽæœ]+)/i;
const REGEX_ACCENT = /[áéíóúýǽ\u0301]/i;

const REGEX_LATIN =
  /((?:<\w+>)*)(((?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽœ́æœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ]\u0301?)(?:(?:[\wáéíóúýǽæœ]\u0301?)*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]\u0301?|[bcdgptf][lrh][\wáéíóúýǽæœ]\u0301?)|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|((?:[^\w\sáëéíóúýǽæœ\u0301])*(?:\s[:;†\^\*"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/\w+>)*)/gi;

type OutputMode = 'markup' | 'gabc' | 'mixed';
type RenderMode = Exclude<OutputMode, 'mixed'>;

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

export function pointText(text: string, tone: Tone, output: OutputMode = 'markup'): string {
  if (output === 'mixed') {
    return pointTextMixed(text, tone);
  }

  return pointTextSingleMode(text, tone, output);
}

function pointTextMixed(text: string, tone: Tone): string {
  if (!/\r?\n/.test(text)) {
    return pointTextSingleMode(text, tone, 'markup');
  }

  const lines = splitLinesPreserve(text);
  if (lines.length === 0) return '';

  let result = '';
  for (let i = 0; i < lines.length; i++) {
    const { line, newline } = lines[i];
    const mode: RenderMode = i === 0 ? 'gabc' : 'markup';
    result += pointTextSingleMode(line, tone, mode) + newline;
  }

  return result;
}

function pointTextSingleMode(text: string, tone: Tone, output: RenderMode): string {
  if (output === 'gabc') {
    return pointTextGabc(text, tone);
  }

  const meta = TONE_META[tone];

  const split = splitOnMediantAsterisk(text);
  if (!split) {
    return pointSegment(text, meta.termination, output);
  }

  const left = pointSegment(split.left, meta.mediant, output);
  const right = pointSegment(split.right, meta.termination, output);
  return left + split.delim + right;
}

function pointSegment(text: string, counts: ToneCounts, output: RenderMode): string {
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

    // Accent syllables
    if (
      doneAccents < counts.accents &&
      (isAccentCandidate || (i === lastAccentI - 2 && (i === 0 || !prevIsAccentCandidate)))
    ) {
      if (doneAccents === counts.accents - 1 && i < minAccentIndex) continue;

      lastAccentI = i;
      result = s.punctuation + result;
      result = s.prepunctuation + renderSyllable(s, 'accent', output) + result;
      doneAccents++;
      continue;
    }

    // Preparatory syllables
    if (doneAccents === counts.accents && donePrep < counts.preparatory) {
      result = s.punctuation + result;
      result = s.prepunctuation + renderSyllable(s, 'prep', output) + result;
      donePrep++;
      continue;
    }

    // Plain syllable
    result = s.prepunctuation + renderSyllable(s, 'plain', output) + s.punctuation + result;
  }

  return result;
}

type Emphasis = 'accent' | 'prep' | 'plain';

function renderSyllable(s: Syllable, kind: Emphasis, output: RenderMode): string {
  if (output === 'markup') {
    if (kind === 'plain') return s.syl; // preserves existing tags exactly like before
    const tag = kind === 'accent' ? 'b' : 'i';
    return `${s.openTags}${s.prespace}<${tag}>${s.sylnospace}</${tag}>${s.closeTags}`;
  }

  // output === 'gabc' is handled by pointTextGabc to emit valid GABC.
  return `${s.prespace}${s.sylnospace}`;
}

function splitLinesPreserve(text: string): Array<{ line: string; newline: string }> {
  const out: Array<{ line: string; newline: string }> = [];
  let lastIndex = 0;
  const re = /\r?\n/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    out.push({ line: text.slice(lastIndex, m.index), newline: m[0] });
    lastIndex = m.index + m[0].length;
  }

  out.push({ line: text.slice(lastIndex), newline: '' });
  return out;
}

function pointTextGabc(text: string, tone: Tone): string {
  const meta = TONE_META[tone];
  const clef = meta.gabc.clef;
  const split = splitOnMediantAsterisk(text);

  const intonationNotes = parseGabcNotes(meta.gabc.intonation);
  const tenorMediant = normalizeGabcNote(meta.gabc.tenor.mediant) ?? 'h';
  const tenorTermination = normalizeGabcNote(meta.gabc.tenor.termination) ?? tenorMediant;
  const mediantCadence = parseGabcNotes(meta.gabc.mediant);
  const terminationCadence = parseTerminationCadence(meta.gabc.termination);

  if (!split) {
    const body = renderGabcSegment(text, tenorTermination, intonationNotes, terminationCadence);
    return body ? `(${clef}) ${body} (::)` : '';
  }

  const left = renderGabcSegment(split.left, tenorMediant, intonationNotes, mediantCadence);
  const right = renderGabcSegment(split.right, tenorTermination, [], terminationCadence);
  if (!left && !right) return '';

  const delim = ' *(:) ';
  return `(${clef}) ${left}${delim}${right} (::)`;
}

function renderGabcSegment(
  text: string,
  tenor: string,
  intonation: string[],
  cadence: string[],
): string {
  const syls = getLatinSyllables(text);
  if (syls.length === 0) return '';

  let result = '';
  const cadenceStart = Math.max(0, syls.length - cadence.length);
  for (let i = 0; i < syls.length; i++) {
    const s = syls[i];
    const note =
      i < intonation.length
        ? intonation[i]
        : i >= cadenceStart && cadence.length > 0
          ? cadence[i - cadenceStart]
          : tenor;
    result += s.prepunctuation + renderSyllableGabc(s, note) + s.punctuation;
  }

  return result.trim();
}

function renderSyllableGabc(s: Syllable, note: string): string {
  const cleanNote = normalizeGabcNote(note) ?? 'h';
  return `${s.prespace}${s.sylnospace}(${cleanNote})`;
}

function parseGabcNotes(raw: string): string[] {
  return raw
    .split(/\s+/)
    .map((token) => normalizeGabcNote(token))
    .filter((token): token is string => Boolean(token));
}

function parseTerminationCadence(raw: string | Record<string, string>): string[] {
  const source = typeof raw === 'string' ? raw : Object.values(raw)[0] ?? '';
  return parseGabcNotes(source);
}

function normalizeGabcNote(raw: string): string | null {
  const match = raw.match(/[a-mA-M]/);
  return match ? match[0].toLowerCase() : null;
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
