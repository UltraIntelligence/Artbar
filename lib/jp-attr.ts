/**
 * Client-safe helpers for JP strings used in HTML attribute values
 * (`alt`, `aria-label`, `title`, etc.) where `<JpText>` cannot wrap them.
 *
 * The server segmenter (`lib/jp-segment.ts`) joins BudouX phrase chunks with
 * U+200B sentinels so client `JpText` can split and emit `<wbr>`. Attributes
 * have no equivalent splitter — leaving sentinels there would clutter screen
 * reader output and copy-paste. Strip them at the attribute boundary.
 */

const SENTINEL_RE = /​/g;

export function stripJpSentinel(value: string): string {
  return value.includes('​') ? value.replace(SENTINEL_RE, '') : value;
}
