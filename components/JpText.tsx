'use client';

import {
  Fragment,
  useMemo,
  createElement,
  type ElementType,
  type ReactNode,
} from 'react';
import { loadDefaultJapaneseParser } from 'budoux';
import { useContent } from '@/context/ContentContext';

/**
 * Wraps Japanese strings with BudouX phrase-aware `<wbr>` breakpoints
 * so lines break at meaningful phrase boundaries (e.g. between particles
 * and the next phrase) rather than at arbitrary characters.
 *
 * Paired with `word-break: keep-all; overflow-wrap: anywhere; line-break: strict`
 * (set globally on `html:lang(ja)` in `globals.css`).
 *
 * Behaviour:
 * - JP + plain string children: emits `<span>` (or `as`) with `<wbr>` elements
 *   between phrase chunks. Text is React-escaped — no `dangerouslySetInnerHTML`.
 * - EN, or non-string children: renders children as-is (Fragment when no
 *   `className`/`as` override is given) — no extra DOM in the EN path.
 *
 * For mixed JSX (e.g. `<JpText>こんにちは <strong>世界</strong></JpText>`),
 * BudouX is skipped on that element — wrap each string segment individually
 * if you need phrase-aware breaks.
 */

let cachedParser: ReturnType<typeof loadDefaultJapaneseParser> | null = null;
const getParser = () => {
  if (!cachedParser) cachedParser = loadDefaultJapaneseParser();
  return cachedParser;
};

interface JpTextProps {
  children: ReactNode;
  /** Tag to render when wrapping is needed. Defaults to `span`. */
  as?: ElementType;
  className?: string;
}

export function JpText({ children, as: Tag = 'span', className }: JpTextProps) {
  const { lang } = useContent();
  const text = typeof children === 'string' ? children : null;

  const chunks = useMemo(() => {
    if (lang !== 'jp' || text === null) return null;
    return getParser().parse(text);
  }, [lang, text]);

  if (chunks) {
    const nodes: ReactNode[] = [];
    chunks.forEach((chunk, i) => {
      if (i > 0) nodes.push(<wbr key={`wbr-${i}`} />);
      nodes.push(<Fragment key={`c-${i}`}>{chunk}</Fragment>);
    });
    return createElement(Tag, { className }, nodes);
  }
  if (className) {
    return createElement(Tag, { className }, children);
  }
  return <>{children}</>;
}
