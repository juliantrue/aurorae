export function normalizeChantSearchKey(raw: string): string {
  const withoutVowelAccents = raw
    .normalize('NFKD')
    .replace(/([AEIOUYaeiouy])\p{M}+/gu, '$1')
    .normalize('NFC');

  return withoutVowelAccents
    .replace(/[Ææ]/g, 'ae')
    .replace(/[Œœ]/g, 'oe')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
