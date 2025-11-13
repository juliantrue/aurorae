export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ToDiscoUnion<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends any[]
    ? Prettify<
        {
          [P in K]: T[K];
        } & { type: K }
      >
    : Prettify<
        {
          [P in keyof T[K]]: T[K][P];
        } & { type: K }
      >;
}[keyof T];

export type Ordo = {
  title: string;
  colour: string;
  body: ToDiscoUnion<{
    missal: Prettify<OrdoElement>[];
    office: Prettify<OrdoElement>[];
  }>;
};

export type OrdoElement = ToDiscoUnion<{
  text: { heading: string; body: string };
  psalm: { heading: string; antiphon: string; body: Prettify<Verse>[] };
  canticle: { heading: string; antiphon: string; body: Prettify<Verse>[] };
  hymn: { heading: string; body: string };
  responsory: Prettify<ResponsePart>[];
}>;

export type Verse = {
  index: number;
  content: string;
};

export type ResponsePart = {
  label: string;
  content: string;
};
