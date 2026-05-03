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
 *
 * Author-supplied literal `<wbr>` markers in JP source strings count as forced
 * break opportunities — the string is split on those, each segment is parsed
 * with BudouX, and everything is rejoined with SENTINEL. The literal marker
 * text never reaches the client, only its position becomes a sentinel boundary.
 */
const WBR_MARKER_RE = /<wbr\s*\/?>/gi;

export function segmentJp(text: string): string {
  if (typeof text !== 'string' || !text || !CJK_RE.test(text) || text.includes(SENTINEL)) {
    return text;
  }
  if (!WBR_MARKER_RE.test(text)) {
    return getParser().parse(text).join(SENTINEL);
  }
  // Strip literal markers and merge them as additional sentinel boundaries.
  const parts = text.split(WBR_MARKER_RE);
  const parser = getParser();
  return parts
    .flatMap((part) => (part ? parser.parse(part) : []))
    .join(SENTINEL);
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
