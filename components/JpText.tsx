'use client';

import {
  Fragment,
  createElement,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Renders a string with `<wbr>` between server-pre-segmented phrase chunks.
 *
 * BudouX runs server-side (`lib/jp-segment.ts`) and joins phrase chunks with a
 * zero-width space sentinel (U+200B). This component splits on the sentinel and
 * inserts `<wbr>` between parts. EN strings and non-string children render
 * unchanged — no extra DOM, no language detection here.
 *
 * Authors can also embed literal `<wbr>` in JP source strings, but the segmenter
 * does not currently honor those — to mark a manual breakpoint, add a U+200B
 * directly in source. Most copy goes through the segmenter, which handles this
 * automatically.
 *
 * Pairs with `word-break: keep-all; overflow-wrap: anywhere; line-break: strict`
 * (set globally on `html:lang(ja)` in `globals.css`).
 */

const SENTINEL = '​';

interface JpTextProps {
  children: ReactNode;
  /** Tag to render when wrapping is needed. Defaults to `span`. */
  as?: ElementType;
  className?: string;
}

export function JpText({ children, as: Tag = 'span', className }: JpTextProps) {
  if (typeof children !== 'string' || !children.includes(SENTINEL)) {
    if (className || Tag !== 'span') return createElement(Tag, { className }, children);
    return <>{children}</>;
  }

  const parts = children.split(SENTINEL);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) nodes.push(<wbr key={`w-${i}`} />);
    nodes.push(<Fragment key={`p-${i}`}>{part}</Fragment>);
  });
  return createElement(Tag, { className }, nodes);
}
