'use client';

import {
  Fragment,
  createElement,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
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
 *   between phrase chunks. Text is React-escaped — no raw-HTML injection.
 * - EN, or non-string children: renders children as-is (Fragment when no
 *   `className`/`as` override is given) — no extra DOM in the EN path.
 *
 * For mixed JSX (e.g. `<JpText>こんにちは <strong>世界</strong></JpText>`),
 * BudouX is skipped on that element — wrap each string segment individually
 * if you need phrase-aware breaks.
 *
 * Authors can also embed literal `<wbr>` in JP source strings to mark a
 * preferred break point. Useful for katakana compounds (e.g. "アルコール<wbr>インク")
 * that BudouX returns as a single chunk because there's no particle to break on.
 * Each `<wbr>` becomes an additional break opportunity layered on top of BudouX's.
 *
 * BudouX (parser + JP model, ~10 KB gz) is loaded dynamically the first time JP
 * text needs parsing. On EN-only sessions the chunk never loads. On JP, the first
 * render before the parser resolves emits plain text (no wbr); a single re-render
 * fills in wbr boundaries once the import completes.
 */

type Parser = { parse: (text: string) => string[] };
let parserPromise: Promise<Parser> | null = null;
let cachedParser: Parser | null = null;
const getParser = (): Promise<Parser> => {
  if (cachedParser) return Promise.resolve(cachedParser);
  if (!parserPromise) {
    parserPromise = import('budoux').then((mod) => {
      cachedParser = mod.loadDefaultJapaneseParser();
      return cachedParser;
    });
  }
  return parserPromise;
};

const parseWithMarkers = (parser: Parser, text: string): string[] => {
  // Author-supplied <wbr> markers split the string into segments; each segment
  // also runs through BudouX. The flatMap join becomes the wbr boundaries.
  const segments = text.split(/<wbr\s*\/?>/i);
  if (segments.length === 1) return parser.parse(text);
  return segments.flatMap((seg) => (seg ? parser.parse(seg) : []));
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
  const shouldParse = lang === 'jp' && text !== null;

  const [, forceRender] = useState(0);

  useEffect(() => {
    if (shouldParse && !cachedParser) {
      let cancelled = false;
      getParser().then(() => {
        if (!cancelled) forceRender((n) => n + 1);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [shouldParse]);

  // Derived from current props — never stale w.r.t. text/lang changes.
  const chunks = shouldParse && cachedParser ? parseWithMarkers(cachedParser, text) : null;

  if (chunks) {
    const nodes: ReactNode[] = [];
    chunks.forEach((chunk, i) => {
      if (i > 0) nodes.push(<wbr key={`wbr-${i}`} />);
      nodes.push(<Fragment key={`c-${i}`}>{chunk}</Fragment>);
    });
    return createElement(Tag, { className }, nodes);
  }
  if (className || Tag !== 'span') {
    return createElement(Tag, { className }, children);
  }
  return <>{children}</>;
}
