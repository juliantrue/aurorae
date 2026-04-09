'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import './chant.module.css';

const STAFF_NOTES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'] as const;

const MINIMUM_STAFF_WIDTH = 280;
const BASE_ZOOM_SCALE = 1.25;
const ZOOM_LEVELS = [1, 1.25, 1.5] as const;
const PITCH_CLASSES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

type ExsurgeModule = typeof import('exsurge');
type ToneModule = typeof import('tone');
type StaffNote = (typeof STAFF_NOTES)[number];
type DroneKind = 'do' | 'finalis';
type ModeId = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII';

type ModeConfig = {
  clef: 'c2' | 'c3' | 'c4' | 'f3';
  finalis: StaffNote;
  range: readonly [StaffNote, StaffNote];
};

const MODE_CONFIG: Record<ModeId, ModeConfig> = {
  I: { clef: 'c4', finalis: 'd', range: ['d', 'k'] },
  II: { clef: 'f3', finalis: 'g', range: ['d', 'k'] },
  III: { clef: 'c4', finalis: 'e', range: ['e', 'l'] },
  IV: { clef: 'c4', finalis: 'e', range: ['b', 'i'] },
  V: { clef: 'c3', finalis: 'd', range: ['d', 'k'] },
  VI: { clef: 'c4', finalis: 'f', range: ['c', 'j'] },
  VII: { clef: 'c3', finalis: 'e', range: ['e', 'l'] },
  VIII: { clef: 'c4', finalis: 'g', range: ['d', 'k'] },
};

const STAFF_NOTE_LABELS: Record<ModeConfig['clef'], Record<StaffNote, string>> = {
  c2: {
    a: 'E',
    b: 'F',
    c: 'G',
    d: 'A',
    e: 'B',
    f: 'C',
    g: 'D',
    h: 'E',
    i: 'F',
    j: 'G',
    k: 'A',
    l: 'B',
    m: 'C',
  },
  c3: {
    a: 'C',
    b: 'D',
    c: 'E',
    d: 'F',
    e: 'G',
    f: 'A',
    g: 'B',
    h: 'C',
    i: 'D',
    j: 'E',
    k: 'F',
    l: 'G',
    m: 'A',
  },
  c4: {
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
    e: 'E',
    f: 'F',
    g: 'G',
    h: 'A',
    i: 'B',
    j: 'C',
    k: 'D',
    l: 'E',
    m: 'F',
  },
  f3: {
    a: 'F',
    b: 'G',
    c: 'A',
    d: 'B',
    e: 'C',
    f: 'D',
    g: 'E',
    h: 'F',
    i: 'G',
    j: 'A',
    k: 'B',
    l: 'C',
    m: 'D',
  },
};

const STAFF_NOTE_OFFSETS: Record<ModeConfig['clef'], Record<StaffNote, number>> = {
  c2: {
    a: -8,
    b: -7,
    c: -5,
    d: -3,
    e: -1,
    f: 0,
    g: 2,
    h: 4,
    i: 5,
    j: 7,
    k: 9,
    l: 11,
    m: 12,
  },
  c3: {
    a: -12,
    b: -10,
    c: -8,
    d: -7,
    e: -5,
    f: -3,
    g: -1,
    h: 0,
    i: 2,
    j: 4,
    k: 5,
    l: 7,
    m: 9,
  },
  c4: {
    a: -15,
    b: -13,
    c: -12,
    d: -10,
    e: -8,
    f: -7,
    g: -5,
    h: -3,
    i: -1,
    j: 0,
    k: 2,
    l: 4,
    m: 5,
  },
  f3: {
    a: -19,
    b: -17,
    c: -15,
    d: -13,
    e: -12,
    f: -10,
    g: -8,
    h: -7,
    i: -5,
    j: -3,
    k: -1,
    l: 0,
    m: 2,
  },
};

function getModeNotes(mode: ModeId) {
  const [low, high] = MODE_CONFIG[mode].range;
  const start = STAFF_NOTES.indexOf(low);
  const end = STAFF_NOTES.indexOf(high);

  return STAFF_NOTES.slice(start, end + 1);
}

function getSelectedRangeNotes(low: StaffNote, high: StaffNote) {
  const start = STAFF_NOTES.indexOf(low);
  const end = STAFF_NOTES.indexOf(high);

  return STAFF_NOTES.slice(start, end + 1);
}

function randomNote(notes: readonly StaffNote[], excluding?: StaffNote) {
  const options = excluding === undefined ? notes : notes.filter((note) => note !== excluding);

  if (options.length === 0) {
    return notes[0];
  }

  return options[Math.floor(Math.random() * options.length)];
}

function buildGabc(mode: ModeId, note: StaffNote) {
  return `(${MODE_CONFIG[mode].clef}${note})`;
}

function getNoteLabel(mode: ModeId, note: StaffNote) {
  return STAFF_NOTE_LABELS[MODE_CONFIG[mode].clef][note];
}

function toResponsiveSvg(svgMarkup: string, width: number, height: number) {
  return svgMarkup.replace(
    '<svg ',
    `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" `,
  );
}

function StopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" className="play-button-icon">
      <path fill="currentColor" d="M6 18V6h12v12z" />
    </svg>
  );
}

function getPianoNoteOptions() {
  const options: { value: string; label: string; frequency: number }[] = [];

  for (let octave = 3; octave <= 5; octave++) {
    for (const [index, pitchClass] of PITCH_CLASSES.entries()) {
      const midiNumber = 12 * (octave + 1) + index;
      const frequency = 440 * 2 ** ((midiNumber - 69) / 12);
      const label = `${pitchClass}${octave} (${frequency.toFixed(1)} Hz)`;
      options.push({ value: `${pitchClass}${octave}`, label, frequency });
    }
  }

  return options;
}

const PIANO_NOTE_OPTIONS = getPianoNoteOptions();

function parsePianoNote(note: string) {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);

  if (!match) {
    throw new Error(`Invalid piano note: ${note}`);
  }

  const [, pitchClass, octaveText] = match;
  const pitchIndex = PITCH_CLASSES.indexOf(pitchClass as (typeof PITCH_CLASSES)[number]);
  const octave = Number(octaveText);

  return 12 * (octave + 1) + pitchIndex;
}

function midiToPianoNote(midiNumber: number) {
  const pitchClass =
    PITCH_CLASSES[
      ((midiNumber % PITCH_CLASSES.length) + PITCH_CLASSES.length) % PITCH_CLASSES.length
    ];
  const octave = Math.floor(midiNumber / 12) - 1;

  return `${pitchClass}${octave}`;
}

function transposePianoNote(note: string, semitones: number) {
  return midiToPianoNote(parsePianoNote(note) + semitones);
}

function getDefaultDoReference(mode: ModeId) {
  return MODE_CONFIG[mode].clef === 'c3' || MODE_CONFIG[mode].clef === 'f3' ? 'G4' : 'A4';
}

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<ModeId>('I');
  const [activeNote, setActiveNote] = useState<StaffNote | null>(null);
  const [lowNote, setLowNote] = useState<StaffNote | null>(null);
  const [highNote, setHighNote] = useState<StaffNote | null>(null);
  const [doReference, setDoReference] = useState(() => getDefaultDoReference('I'));
  const [zoomIndex, setZoomIndex] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPianoLoading, setIsPianoLoading] = useState(false);
  const [activeDrone, setActiveDrone] = useState<DroneKind | null>(null);
  const [staffMarkup, setStaffMarkup] = useState('');
  const [staffWidth, setStaffWidth] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLibraryReady, setIsLibraryReady] = useState(false);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const exsurgeRef = useRef<ExsurgeModule | null>(null);
  const contextRef = useRef<any>(null);
  const toneRef = useRef<ToneModule | null>(null);
  const droneSynthRef = useRef<InstanceType<ToneModule['MonoSynth']> | null>(null);
  const droneTremoloRef = useRef<InstanceType<ToneModule['Tremolo']> | null>(null);
  const noteSynthRef = useRef<InstanceType<ToneModule['MonoSynth']> | null>(null);
  const noteTremoloRef = useRef<InstanceType<ToneModule['Tremolo']> | null>(null);
  const audioLoadPromiseRef = useRef<Promise<{
    Tone: ToneModule;
    droneSynth: InstanceType<ToneModule['MonoSynth']>;
    droneTremolo: InstanceType<ToneModule['Tremolo']>;
    noteSynth: InstanceType<ToneModule['MonoSynth']>;
    noteTremolo: InstanceType<ToneModule['Tremolo']>;
  }> | null>(null);
  const activeDroneNoteRef = useRef<string | null>(null);
  const renderSequenceRef = useRef(0);
  const modeNotes = getModeNotes(selectedMode);
  const [defaultLowNote, defaultHighNote] = MODE_CONFIG[selectedMode].range;
  const effectiveLowNote =
    lowNote !== null && modeNotes.includes(lowNote) ? lowNote : defaultLowNote;
  const effectiveHighNote =
    highNote !== null && modeNotes.includes(highNote) ? highNote : defaultHighNote;
  const lowIndex = modeNotes.indexOf(effectiveLowNote);
  const highIndex = modeNotes.indexOf(effectiveHighNote);
  const safeLowNote = lowIndex <= highIndex ? effectiveLowNote : defaultLowNote;
  const safeHighNote = lowIndex <= highIndex ? effectiveHighNote : defaultHighNote;
  const lowOptions = modeNotes.slice(0, modeNotes.indexOf(safeHighNote) + 1);
  const highOptions = modeNotes.slice(modeNotes.indexOf(safeLowNote));
  const rangeNotes = getSelectedRangeNotes(safeLowNote, safeHighNote);
  const effectiveActiveNote =
    activeNote !== null && rangeNotes.includes(activeNote) ? activeNote : rangeNotes[0];
  const zoomLevel = ZOOM_LEVELS[zoomIndex];
  const renderedZoomScale = BASE_ZOOM_SCALE * zoomLevel;
  const activeClef = MODE_CONFIG[selectedMode].clef;
  const modeFinalis = MODE_CONFIG[selectedMode].finalis;
  const activeConcertNote = transposePianoNote(
    doReference,
    STAFF_NOTE_OFFSETS[activeClef][effectiveActiveNote],
  );
  const finalisConcertNote = transposePianoNote(
    doReference,
    STAFF_NOTE_OFFSETS[activeClef][modeFinalis],
  );

  const ensureAudioEngines = async () => {
    if (
      toneRef.current &&
      droneSynthRef.current &&
      droneTremoloRef.current &&
      noteSynthRef.current &&
      noteTremoloRef.current
    ) {
      return {
        Tone: toneRef.current,
        droneSynth: droneSynthRef.current,
        droneTremolo: droneTremoloRef.current,
        noteSynth: noteSynthRef.current,
        noteTremolo: noteTremoloRef.current,
      };
    }

    if (audioLoadPromiseRef.current) {
      return audioLoadPromiseRef.current;
    }

    setIsPianoLoading(true);

    const loadPromise = import('tone')
      .then(async (Tone) => {
        const clarinetVoice = {
          oscillator: {
            type: 'pulse',
            width: 0.28,
          },
          filter: {
            type: 'lowpass',
            Q: 4,
          },
          envelope: {
            attack: 0.035,
            decay: 0.14,
            sustain: 0.8,
            release: 1.8,
          },
          filterEnvelope: {
            attack: 0.01,
            decay: 0.18,
            sustain: 0.22,
            release: 1.3,
            baseFrequency: 190,
            octaves: 2,
          },
          volume: -22,
        } as const;

        const droneSynth = new Tone.MonoSynth(clarinetVoice);
        const droneTremolo = new Tone.Tremolo({
          frequency: 0.08,
          depth: 0.12,
          spread: 0,
          type: 'sine',
        }).start();
        droneSynth.connect(droneTremolo);
        droneTremolo.toDestination();
        const noteSynth = new Tone.MonoSynth(clarinetVoice);
        const noteTremolo = new Tone.Tremolo({
          frequency: 0.08,
          depth: 0.12,
          spread: 0,
          type: 'sine',
        }).start();
        noteSynth.connect(noteTremolo);
        noteTremolo.toDestination();

        await Tone.loaded();

        toneRef.current = Tone;
        droneSynthRef.current = droneSynth;
        droneTremoloRef.current = droneTremolo;
        noteSynthRef.current = noteSynth;
        noteTremoloRef.current = noteTremolo;

        return { Tone, droneSynth, droneTremolo, noteSynth, noteTremolo };
      })
      .finally(() => {
        audioLoadPromiseRef.current = null;
        setIsPianoLoading(false);
      });

    audioLoadPromiseRef.current = loadPromise;

    return loadPromise;
  };

  useEffect(() => {
    let isMounted = true;

    void import('exsurge')
      .then((module) => {
        if (!isMounted) {
          return;
        }

        const context = new module.ChantContext() as any;
        context.drawDebuggingBounds = false;
        context.lyricTextFont = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif';
        context.annotationTextFont = context.lyricTextFont;
        context.dropCapTextFont = context.lyricTextFont;

        exsurgeRef.current = module;
        contextRef.current = context;
        setIsLibraryReady(true);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setIsLibraryReady(false);
        setErrorMessage('The chant staff could not be loaded in this browser.');
      });

    return () => {
      isMounted = false;
      contextRef.current?.svgTextMeasurer?.remove();
      droneSynthRef.current?.dispose();
      droneTremoloRef.current?.dispose();
      noteSynthRef.current?.dispose();
      noteTremoloRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    void ensureAudioEngines();
  }, []);

  useEffect(() => {
    if (!activeDrone) {
      activeDroneNoteRef.current = null;
      return;
    }

    const Tone = toneRef.current;
    const droneSynth = droneSynthRef.current;

    if (!Tone || !droneSynth) {
      return;
    }

    const nextNote = activeDrone === 'do' ? doReference : finalisConcertNote;

    if (activeDroneNoteRef.current === nextNote) {
      return;
    }

    droneSynth.triggerRelease(Tone.now());
    droneSynth.triggerAttack(nextNote, Tone.now() + 0.05);
    activeDroneNoteRef.current = nextNote;
  }, [activeDrone, doReference, finalisConcertNote]);

  useEffect(() => {
    const [modeLow, modeHigh] = MODE_CONFIG[selectedMode].range;
    setLowNote(modeLow);
    setHighNote(modeHigh);
    setActiveNote(MODE_CONFIG[selectedMode].finalis);
    setDoReference(getDefaultDoReference(selectedMode));
  }, [selectedMode]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen]);

  useEffect(() => {
    const node = frameRef.current;

    if (!node) {
      return;
    }

    const updateWidth = () => {
      setStaffWidth(Math.max(MINIMUM_STAFF_WIDTH, Math.floor(node.clientWidth)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const exsurge = exsurgeRef.current;
    const context = contextRef.current;

    if (!exsurge || !context || staffWidth === 0 || effectiveActiveNote === null) {
      return;
    }

    const renderId = ++renderSequenceRef.current;
    let isCancelled = false;

    const renderScore = async () => {
      try {
        setErrorMessage('');

        context.activeClef = null;
        context.defs = {};

        const score = exsurge.Gabc.loadChantScore(
          context,
          buildGabc(selectedMode, effectiveActiveNote),
          false,
        );

        await new Promise<void>((resolve) => {
          score.performLayout(context, () => resolve());
        });

        score.layoutChantLines(context, staffWidth, () => {});

        if (isCancelled || renderId !== renderSequenceRef.current) {
          return;
        }

        setStaffMarkup(
          toResponsiveSvg(score.createDrawable(context), score.bounds.width, score.bounds.height),
        );
      } catch {
        if (isCancelled || renderId !== renderSequenceRef.current) {
          return;
        }

        setStaffMarkup('');
        setErrorMessage('The chant staff could not be drawn for this exercise.');
      }
    };

    void renderScore();

    return () => {
      isCancelled = true;
    };
  }, [effectiveActiveNote, isLibraryReady, selectedMode, staffWidth]);

  return (
    <div className="chant-route">
      <main className="page-shell">
        <section className="page-panel" aria-label="Gregorian chant exercise">
          <div className="controls-row">
            <label className="mode-select-wrap">
              <span className="sr-only">Mode</span>
              <select
                className="mode-select"
                value={selectedMode}
                onChange={(event) => {
                  setSelectedMode(event.target.value as ModeId);
                }}
              >
                <option value="I">Mode I</option>
                <option value="II">Mode II</option>
                <option value="III">Mode III</option>
                <option value="IV">Mode IV</option>
                <option value="V">Mode V</option>
                <option value="VI">Mode VI</option>
                <option value="VII">Mode VII</option>
                <option value="VIII">Mode VIII</option>
              </select>
              <span className="mode-meta">
                Finalis: {getNoteLabel(selectedMode, MODE_CONFIG[selectedMode].finalis)}
              </span>
            </label>
          </div>

          <div className="staff-frame" ref={frameRef}>
            {errorMessage ? (
              <p className="staff-status">{errorMessage}</p>
            ) : staffMarkup ? (
              <div className="staff-scroll">
                <div
                  className="staff-markup"
                  style={{ transform: `scale(${renderedZoomScale})` }}
                  dangerouslySetInnerHTML={{ __html: staffMarkup }}
                />
              </div>
            ) : (
              <p className="staff-status">Drawing chant staff...</p>
            )}
          </div>

          <div className="play-controls" aria-label="Playback controls">
            <button
              className={`play-button ${activeDrone === 'do' ? 'is-droning' : ''}`}
              type="button"
              aria-pressed={activeDrone === 'do'}
              disabled={isPianoLoading || activeDrone === 'finalis'}
              onClick={async () => {
                if (activeDrone === 'do') {
                  const Tone = toneRef.current;
                  const droneSynth = droneSynthRef.current;

                  if (Tone && droneSynth) {
                    droneSynth.triggerRelease(Tone.now());
                  }

                  activeDroneNoteRef.current = null;
                  setActiveDrone(null);
                  return;
                }

                const { Tone, droneSynth } = await ensureAudioEngines();
                await Tone.start();
                droneSynth.triggerAttack(doReference, Tone.now());
                activeDroneNoteRef.current = doReference;
                setActiveDrone('do');
              }}
            >
              {activeDrone === 'do' ? (
                <>
                  <StopIcon />
                  <span className="sr-only">Stop drone Do</span>
                </>
              ) : (
                'Drone Do'
              )}
            </button>

            <button
              className={`play-button ${activeDrone === 'finalis' ? 'is-droning' : ''}`}
              type="button"
              aria-pressed={activeDrone === 'finalis'}
              disabled={isPianoLoading || activeDrone === 'do'}
              onClick={async () => {
                if (activeDrone === 'finalis') {
                  const Tone = toneRef.current;
                  const droneSynth = droneSynthRef.current;

                  if (Tone && droneSynth) {
                    droneSynth.triggerRelease(Tone.now());
                  }

                  activeDroneNoteRef.current = null;
                  setActiveDrone(null);
                  return;
                }

                const { Tone, droneSynth } = await ensureAudioEngines();
                await Tone.start();
                droneSynth.triggerAttack(finalisConcertNote, Tone.now());
                activeDroneNoteRef.current = finalisConcertNote;
                setActiveDrone('finalis');
              }}
            >
              {activeDrone === 'finalis' ? (
                <>
                  <StopIcon />
                  <span className="sr-only">Stop drone Finalis</span>
                </>
              ) : (
                'Drone Finalis'
              )}
            </button>

            <button
              className="play-button"
              type="button"
              disabled={isPianoLoading}
              onClick={async () => {
                const { Tone, noteSynth } = await ensureAudioEngines();
                await Tone.start();
                noteSynth.triggerAttackRelease(activeConcertNote, 1.5, Tone.now(), 0.9);
              }}
            >
              Play Note
            </button>

            <button
              className="randomize-button"
              type="button"
              disabled={activeNote === null}
              onClick={() => {
                startTransition(() => {
                  setActiveNote((current) => randomNote(rangeNotes, current ?? undefined));
                });
              }}
            >
              Randomize note
            </button>
          </div>
        </section>

        <button
          className="settings-fab"
          type="button"
          aria-label="Open settings"
          aria-expanded={isSettingsOpen}
          aria-controls="settings-popover"
          onClick={() => {
            setIsSettingsOpen((current) => !current);
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" className="settings-icon">
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083M12.5 15c1.67 0 3.023-1.343 3.023-3S14.169 9 12.5 9s-3.023 1.343-3.023 3s1.354 3 3.023 3"
            />
          </svg>
        </button>

        {isSettingsOpen ? (
          <div
            className="settings-backdrop"
            role="presentation"
            onClick={() => {
              setIsSettingsOpen(false);
            }}
          >
            <div
              id="settings-popover"
              className="settings-popover"
              role="dialog"
              aria-modal="true"
              aria-label="Exercise settings"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="settings-header">
                <h2 className="settings-title">Settings</h2>
                <button
                  className="settings-close"
                  type="button"
                  aria-label="Close settings"
                  onClick={() => {
                    setIsSettingsOpen(false);
                  }}
                >
                  ×
                </button>
              </div>

              <label className="mode-select-wrap">
                <span className="sr-only">Do reference pitch</span>
                <select
                  className="mode-select"
                  value={doReference}
                  onChange={(event) => {
                    setDoReference(event.target.value);
                  }}
                >
                  {PIANO_NOTE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      Do = {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mode-select-wrap">
                <span className="sr-only">Low note</span>
                <select
                  className="mode-select"
                  value={safeLowNote}
                  onChange={(event) => {
                    const nextLow = event.target.value as StaffNote;
                    setLowNote(nextLow);

                    if (STAFF_NOTES.indexOf(nextLow) > STAFF_NOTES.indexOf(safeHighNote)) {
                      setHighNote(nextLow);
                    }

                    if (
                      activeNote &&
                      STAFF_NOTES.indexOf(activeNote) < STAFF_NOTES.indexOf(nextLow)
                    ) {
                      setActiveNote(nextLow);
                    }
                  }}
                >
                  {lowOptions.map((note) => (
                    <option key={`low-${note}`} value={note}>
                      Low: {getNoteLabel(selectedMode, note)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mode-select-wrap">
                <span className="sr-only">High note</span>
                <select
                  className="mode-select"
                  value={safeHighNote}
                  onChange={(event) => {
                    const nextHigh = event.target.value as StaffNote;
                    setHighNote(nextHigh);

                    if (STAFF_NOTES.indexOf(nextHigh) < STAFF_NOTES.indexOf(safeLowNote)) {
                      setLowNote(nextHigh);
                    }

                    if (
                      activeNote &&
                      STAFF_NOTES.indexOf(activeNote) > STAFF_NOTES.indexOf(nextHigh)
                    ) {
                      setActiveNote(nextHigh);
                    }
                  }}
                >
                  {highOptions.map((note) => (
                    <option key={`high-${note}`} value={note}>
                      High: {getNoteLabel(selectedMode, note)}
                    </option>
                  ))}
                </select>
              </label>

              <div className="zoom-controls" aria-label="Zoom controls">
                <button
                  className="zoom-button"
                  type="button"
                  aria-label="Zoom out"
                  disabled={zoomIndex === 0}
                  onClick={() => {
                    setZoomIndex((current) => Math.max(0, current - 1));
                  }}
                >
                  -
                </button>

                <span className="zoom-readout">{Math.round(zoomLevel * 100)}%</span>

                <button
                  className="zoom-button"
                  type="button"
                  aria-label="Zoom in"
                  disabled={zoomIndex === ZOOM_LEVELS.length - 1}
                  onClick={() => {
                    setZoomIndex((current) => Math.min(ZOOM_LEVELS.length - 1, current + 1));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
