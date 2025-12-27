'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChantContext, ChantScore } from 'exsurge';

type ChantProps = {
  gabc: string;
  className?: string;
  caption?: string;
  dropCap?: boolean;
  annotation?: string;
  width?: number;
};

const BASE_CLASS = 'rounded-card bg-ivory p-5';
const DEFAULT_WIDTH = 640;
let exsurgePatched = false;

export function Chant({ gabc, caption, className, dropCap = false, annotation, width }: ChantProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(width ?? null);
  const [svgMarkup, setSvgMarkup] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const resolvedWidth = Math.max(0, width ?? containerWidth ?? 0);
  const { notation: baseNotation } = preprocessGabc(gabc);
  const resolvedAnnotation = annotation?.trim();
  const combinedClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  useEffect(() => {
    if (typeof width === 'number') {
      setContainerWidth(width);
      return;
    }

    const element = wrapperRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      setContainerWidth(DEFAULT_WIDTH);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === element) {
          const nextWidth = Math.floor(entry.contentRect.width);
          if (nextWidth > 0) {
            setContainerWidth(nextWidth);
          }
        }
      }
    });

    observer.observe(element);
    setContainerWidth(element.clientWidth || DEFAULT_WIDTH);

    return () => {
      observer.disconnect();
    };
  }, [width]);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (!baseNotation) {
      setSvgMarkup('');
      setRenderError(null);
      setIsRendering(false);
      return;
    }

    if (resolvedWidth <= 0) {
      return;
    }

    let cancelled = false;
    let context: ChantContext | null = null;

    async function renderChant() {
      setIsRendering(true);
      setRenderError(null);

      try {
        const exsurge = await import('exsurge');
        if (cancelled) {
          return;
        }
        patchExsurgeForEmptyLyrics(exsurge);

        const createContext = () => {
          const nextContext = new exsurge.ChantContext();
          setContextDefaults(nextContext);
          return nextContext;
        };

        context = createContext();

        let score: ChantScore | null = null;
        score = exsurge.Gabc.loadChantScore(context, baseNotation, dropCap);
        if (!score) {
          throw new Error('Unable to render chant notation.');
        }
        if (resolvedAnnotation) {
          score.annotation = new exsurge.Annotation(context, resolvedAnnotation);
        }
        await compileScore(score, context, resolvedWidth);

        if (cancelled) {
          return;
        }

        setSvgMarkup(sanitizeSvgMarkup(score.createDrawable(context)));
      } catch (error) {
        console.error('Failed to render chant', error);
        if (!cancelled) {
          setSvgMarkup('');
          setRenderError('Unable to render chant notation.');
        }
      } finally {
        if (!cancelled) {
          setIsRendering(false);
        }
        cleanupContext(context);
        context = null;
      }
    }

    renderChant();

    return () => {
      cancelled = true;
      cleanupContext(context);
      context = null;
    };
  }, [baseNotation, dropCap, resolvedAnnotation, resolvedWidth]);

  const statusMessage = renderError
    ? renderError
    : isRendering
      ? 'Rendering chant…'
      : 'No chant available.';

  return (
    <figure className={combinedClass}>
      {caption && (
        <figcaption className="mb-3 text-center font-display text-lg text-ink">
          {caption}
        </figcaption>
      )}
      <div
        ref={wrapperRef}
        className="chant-notation relative overflow-x-auto text-center"
        aria-busy={isRendering}
        aria-live="polite"
      >
        {svgMarkup ? (
          <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        ) : (
          <p className="text-sm text-muted">{statusMessage}</p>
        )}
      </div>
    </figure>
  );
}

function setContextDefaults(context: ChantContext) {
  context.lyricTextFont = 'Crimson Text, serif';
  context.dropCapTextFont = context.lyricTextFont;
  context.annotationTextFont = context.lyricTextFont;
  context.lyricTextSize = 18;
  context.annotationTextSize = 14;
  context.dropCapTextSize = 56;
  context.glyphScaling = 1.15 / 16;
}

function compileScore(score: ChantScore, context: ChantContext, width: number) {
  return new Promise<void>((resolve) => {
    score.performLayout(context, () => {
      score.layoutChantLines(context, width, () => resolve());
    });
  });
}

function cleanupContext(context: ChantContext | null) {
  if (context && context.svgTextMeasurer?.parentNode) {
    context.svgTextMeasurer.parentNode.removeChild(context.svgTextMeasurer);
  }
}

function patchExsurgeForEmptyLyrics(exsurge: typeof import('exsurge')) {
  if (exsurgePatched) {
    return;
  }

  exsurgePatched = true;
  const Lyric = (exsurge as typeof exsurge & { Lyric?: { prototype?: unknown } }).Lyric as
    | { prototype: { recalculateMetrics?: (ctxt: ChantContext) => void } }
    | undefined;
  const TextElement = (exsurge as typeof exsurge & { TextElement?: { prototype?: unknown } })
    .TextElement as
    | { prototype: { recalculateMetrics?: (ctxt: ChantContext) => void } }
    | undefined;

  if (!Lyric?.prototype?.recalculateMetrics || !TextElement?.prototype?.recalculateMetrics) {
    return;
  }

  const original = Lyric.prototype.recalculateMetrics;
  if ((original as unknown as { __auroraePatched?: boolean }).__auroraePatched) {
    return;
  }

  const fallback = function (
    this: {
      text?: string;
      bounds: { width: number; height: number; x: number; y: number };
      origin: { x: number };
      widthWithoutConnector?: number;
      widthWithConnector?: number;
      textWithConnector?: string;
    },
    ctxt: ChantContext,
  ) {
    TextElement.prototype.recalculateMetrics?.call(this, ctxt);

    const widthWithoutConnector = this.bounds.width;
    const connector =
      (ctxt as unknown as { syllableConnector?: string }).syllableConnector ?? '-';
    const hyphenWidth = (ctxt as unknown as { hyphenWidth?: number }).hyphenWidth ?? 0;

    this.widthWithoutConnector = widthWithoutConnector;
    this.textWithConnector = `${this.text ?? ''}${connector}`;
    this.widthWithConnector = widthWithoutConnector + hyphenWidth;

    const offset = widthWithoutConnector / 2;
    this.bounds.x = -offset;
    this.bounds.y = 0;
    this.origin.x = offset;
    this.bounds.width = widthWithoutConnector;
    this.bounds.height = ctxt.lyricTextSize ?? this.bounds.height;
  };

  const wrapped = function (this: { text?: string }, ctxt: ChantContext) {
    const node = ctxt.svgTextMeasurer?.firstChild as SVGTextContentElement | null;
    const hasChars = node?.getNumberOfChars ? node.getNumberOfChars() > 0 : false;
    if (!this.text || !hasChars) {
      fallback.call(this as never, ctxt);
      return;
    }

    try {
      original.call(this, ctxt);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'IndexSizeError') {
        fallback.call(this as never, ctxt);
        return;
      }
      throw error;
    }
  };

  (wrapped as unknown as { __auroraePatched?: boolean }).__auroraePatched = true;
  Lyric.prototype.recalculateMetrics = wrapped;
}

function sanitizeSvgMarkup(svgMarkup: string): string {
  return svgMarkup.replace(/<tspan([^>]*)>\s*_\s*<\/tspan>/g, '');
}

function preprocessGabc(gabc: string) {
  if (!gabc) {
    return { notation: '' };
  }

  const decoded = decodeUnicodeEscapes(gabc);
  const { notation } = splitGabcHeader(decoded);
  const cleanedNotation = notation
    // Strip <eu> wrappers so the "e u o u a e" renders as lyric text.
    .replace(/<\/?eu>/gi, '')
    // Ensure trailing neumes after <eu> inherit the melisma.
    .replace(/<\/eu>\s*\(/gi, '</eu>_(')
    // Guard empty neumes on the mediant marker (e.g. "*()").
    .replace(/\*\s*\(\)/g, '* _()')
    // Guard standalone empty neumes that create zero-length lyrics.
    .replace(/(^|\s)\(\)(?=\s|$)/g, '$1_()');

  return {
    notation: cleanedNotation.trim(),
  };
}

function splitGabcHeader(gabc: string) {
  const markerIndex = gabc.search(/^%%\s*$/m);
  if (markerIndex < 0) {
    return { notation: gabc };
  }

  const header = gabc.slice(0, markerIndex);
  const notation = gabc.slice(markerIndex).replace(/^%%\s*$/m, '').trimStart();
  void header;
  return { notation };
}

function decodeUnicodeEscapes(value: string) {
  return value
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_match, hex) => {
      const codePoint = Number.parseInt(hex, 16);
      if (!Number.isFinite(codePoint)) {
        return _match;
      }
      return String.fromCodePoint(codePoint);
    })
    .replace(/\\u([0-9a-fA-F]{4})/g, (_match, hex) => {
      const codePoint = Number.parseInt(hex, 16);
      if (!Number.isFinite(codePoint)) {
        return _match;
      }
      return String.fromCharCode(codePoint);
    });
}
