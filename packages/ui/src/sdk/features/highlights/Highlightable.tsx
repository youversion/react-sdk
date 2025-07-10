import React from "react";
import { useVerseHighlight } from "./VerseHighlightContext";

interface HighlightableProps {
  usfm: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Applies highlight background to a single verse component.
 *
 * Wraps children in a div with highlight background color if the verse has a highlight.
 * Returns children unchanged if no highlight exists.
 *
 * @param usfm - USFM identifier for the verse (e.g., "GEN.1.1")
 * @param children - React components to wrap
 * @param className - Additional CSS classes for the wrapper div
 *
 * @example
 * ```tsx
 * <Highlightable usfm="GEN.1.1">
 *   <SelectableVerse verse={verse} />
 * </Highlightable>
 * ```
 */
export function Highlightable({
  usfm,
  children,
  className = "",
}: HighlightableProps) {
  const { getHighlight } = useVerseHighlight();
  const highlight = getHighlight(usfm);

  if (!highlight) {
    return <>{children}</>;
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: highlight.color }}
    >
      {children}
    </div>
  );
}
