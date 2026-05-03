import 'server-only';
import { loadDefaultJapaneseParser } from 'budoux';

/**
 * Server-side BudouX segmentation.
 *
 * Splits Japanese strings at phrase boundaries and joins them with a zero-width
 * space sentinel (U+200B). Client-side `JpText` splits on the sentinel and
 * emits `<wbr>` between parts — no client-side BudouX import.
 *
 * `import 'server-only'` makes this a build-time error if any client module
 * (or transitively-included client code) imports this file.
 */

const SENTINEL = '​';
// Hiragana, katakana (incl. half-width), CJK unified + extended ranges.
const CJK_RE = /[぀-ヿ㐀-鿿ｦ-ﾟ]/;

let parser: ReturnType<typeof loadDefaultJapaneseParser> | null = null;
const getParser = () => (parser ??= loadDefaultJapaneseParser());

/**
 * Segment a single string. No-op for non-strings, empty strings, EN-only
 * strings, or strings already containing the sentinel (idempotent).
 */
export function segmentJp(text: string): string {
  if (typeof text !== 'string' || !text || !CJK_RE.test(text) || text.includes(SENTINEL)) {
    return text;
  }
  return getParser().parse(text).join(SENTINEL);
}

/**
 * Recursively segment all string leaves in a content tree. Preserves shape
 * and non-string values. Use at server boundaries to pre-segment payloads
 * before they reach the client.
 */
export function segmentJpDeep<T>(value: T): T {
  if (typeof value === 'string') return segmentJp(value) as T;
  if (Array.isArray(value)) return value.map((item) => segmentJpDeep(item)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = segmentJpDeep(v);
    }
    return out as T;
  }
  return value;
}

export { SENTINEL };
