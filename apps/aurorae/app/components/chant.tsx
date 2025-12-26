'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChantContext, ChantScore } from 'exsurge';

type ChantProps = {
  gabc: string;
  className?: string;
  caption?: string;
  dropCap?: boolean;
  width?: number;
};

const BASE_CLASS = 'rounded-card border border-border bg-parchment p-5 shadow-pressed';
const DEFAULT_WIDTH = 640;

export function Chant({ gabc, caption, className, dropCap = false, width }: ChantProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(width ?? null);
  const [svgMarkup, setSvgMarkup] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const resolvedWidth = Math.max(0, width ?? containerWidth ?? 0);
  const trimmedNotation = preprocessGabc(gabc).trim();
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

    if (!trimmedNotation) {
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

        context = new exsurge.ChantContext();
        setContextDefaults(context);

        const score = exsurge.Gabc.loadChantScore(context, trimmedNotation, dropCap);
        await compileScore(score, context, resolvedWidth);

        if (cancelled) {
          return;
        }

        setSvgMarkup(score.createDrawable(context));
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
  }, [dropCap, resolvedWidth, trimmedNotation]);

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
  context.dropCapTextSize = 72;
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

function preprocessGabc(gabc: string) {
  if (!gabc) {
    return '';
  }

  return (
    decodeUnicodeEscapes(gabc)
      // Ensure trailing neumes after <eu> inherit the melisma.
      .replace(/<\/eu>\s*\(/gi, '</eu>_(')
      // Guard empty neumes on the mediant marker (e.g. "*()").
      .replace(/\*\s*\(\)/g, '* _()')
      // Guard standalone empty neumes that create zero-length lyrics.
      .replace(/(^|\s)\(\)(?=\s|$)/g, '$1_()')
  );
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
