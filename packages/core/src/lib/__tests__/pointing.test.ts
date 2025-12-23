// pointing.test.ts
import { describe, expect, test } from "@jest/globals";
import { pointText } from "../pointing";
import type { Tone } from "../tone";

function norm(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function countTag(html: string, tag: "b" | "i"): number {
  const re = new RegExp(`<${tag}>`, "g");
  return (html.match(re) || []).length;
}

describe("pointText", () => {
  test("type sanity: Tone accepts valid keys", () => {
    const t1: Tone = "7c2";
    const t2: Tone = "2";
    const t3: Tone = "per-alt";
    expect([t1, t2, t3]).toEqual(["7c2", "2", "per-alt"]);
  });

  test("type sanity: Tone rejects invalid keys (compile-time)", () => {
    // @ts-expect-error - invalid tone key
    const bad: Tone = "9z";
    expect(bad).toBeDefined();
  });

  test("points a single segment as termination when there is no mediant delimiter", () => {
    // Tone "2" => termination accents=1, preparatory=1
    const input = "a a a* a";
    const out = pointText(input, "2");

    // Expect: last accented syllable bolded; one preparatory syllable italicized immediately before it.
    expect(norm(out)).toBe("a <i>a</i> <b>a</b> a");
    expect(countTag(out, "b")).toBe(1);
    expect(countTag(out, "i")).toBe(1);
  });

  test("does not treat in-word '*' (accent marker) as a mediant split", () => {
    const input = "a* a a";
    const out = pointText(input, "2");

    // Still a single segment: one bold + one italic (tone 2 termination)
    expect(countTag(out, "b")).toBe(1);
    expect(countTag(out, "i")).toBe(1);

    // And importantly: there should be no leftover whitespace-delimited split artifact.
    // (The '*' used as accent marker is not preserved by syllabification in this mode.)
    expect(out.includes(" * ")).toBe(false);
  });

  test("splits on whitespace-delimited '*' and applies mediant on left + termination on right", () => {
    // Tone "7a" => mediant accents=2 prep=0; termination accents=2 prep=0
    const input = "a a* a* * a a* a*";
    const out = pointText(input, "7a");

    // Delimiter should be preserved exactly (including spaces around it from the input)
    expect(out.includes(" * ")).toBe(true);

    // Should have 4 bold accents total (2 left + 2 right)
    expect(countTag(out, "b")).toBe(4);

    // No preparatory italics for tone 7a in our meta
    expect(countTag(out, "i")).toBe(0);

    // Quick structural sanity: both halves remain in order around the delimiter
    const [left, right] = out.split(" * ");
    expect(left).toBeDefined();
    expect(right).toBeDefined();
    expect(countTag(left, "b")).toBe(2);
    expect(countTag(right, "b")).toBe(2);
  });

  test("preserves non-splitting punctuation and only injects <b>/<i> tags", () => {
    const input = 'a, a a*; a.';
    const out = pointText(input, "2");

    // punctuation should still be present somewhere
    expect(out.includes(",")).toBe(true);
    expect(out.includes(";")).toBe(true);
    expect(out.includes(".")).toBe(true);

    // only our tags (no other markup introduced)
    expect(out.replace(/<\/?(b|i)>/g, "").includes("<")).toBe(false);
  });

  test("handles empty string", () => {
    expect(pointText("", "2")).toBe("");
  });

  test("handles strings with no detectable syllables (returns original-ish)", () => {
    // No vowels => syllabifier likely yields no syllables; the implementation should return ""
    // (Since it rebuilds from syllables). This locks current behavior.
    const input = "— — —";
    const out = pointText(input, "2");
    expect(out).toBe("");
  });
});
