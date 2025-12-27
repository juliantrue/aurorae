declare module 'exsurge' {
  export class ChantContext {
    defs: Record<string, string>;
    activeClef: unknown;
    staffInterval: number;
    svgTextMeasurer: SVGSVGElement;
    lyricTextFont: string;
    dropCapTextFont: string;
    annotationTextFont: string;
    lyricTextSize: number;
    dropCapTextSize: number;
    annotationTextSize: number;
    glyphScaling: number;
  }

  export class Annotation {
    constructor(ctxt: ChantContext, text: string);
  }

  export interface ChantScore {
    bounds: { width: number; height: number };
    compiled: boolean;
    annotation: Annotation | null;
    notations: Array<{
      lyric?: unknown;
      keepWithNext?: boolean;
      notes?: unknown[];
    }>;
    performLayout(ctxt: ChantContext, finishedCallback?: () => void): void;
    layoutChantLines(
      ctxt: ChantContext,
      width: number,
      finishedCallback?: (score: ChantScore) => void
    ): void;
    createDrawable(ctxt: ChantContext): string;
  }

  export const Gabc: {
    loadChantScore(
      ctxt: ChantContext,
      gabcNotations: string,
      createDropCap?: boolean
    ): ChantScore;
  };
}
