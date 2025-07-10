import { useVerseHighlight } from "./VerseHighlightContext";
import { useEffect, useRef } from "react";
import { useVerseSelection } from "@youversion/bible-hooks";
import { hexToRgba } from "./highlights";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Automatically finds and highlights all verses within its children.
 *
 * Scans all descendant elements for `data-usfm` attributes and applies highlights
 * to their `#content` child elements. Reapplies highlights after React re-renders.
 *
 * REQUIRES: Verse components must have `data-usfm` attribute and `#content` element
 *
 * @param children - React components containing verse elements with data-usfm attributes
 * @param className - Additional CSS classes for the container div
 *
 * @example
 * ```tsx
 * <ChapterHighlights>
 *   {verses.map(verse => (
 *     <SelectableVerse key={verse.usfm} verse={verse} />
 *   ))}
 * </ChapterHighlights>
 * ```
 */
export function ChapterHighlights({ children, className = "" }: Props) {
  const { highlights } = useVerseHighlight();
  const { selectedVerseUsfms } = useVerseSelection();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear all existing highlights
    const allVerseElements =
      containerRef.current.querySelectorAll("[data-usfm]");
    allVerseElements.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = "";
    });

    // Apply current highlights
    highlights.forEach((highlight) => {
      const element = containerRef.current?.querySelector(
        `[data-usfm="${highlight.usfm}"]`,
      ) as HTMLElement;
      if (element) {
        const contentElement = element.querySelector(".content") as HTMLElement;
        if (contentElement) {
          contentElement.style.backgroundColor = hexToRgba(
            highlight.color,
            0.35,
          );
        }
      }
    });
  }, [highlights, selectedVerseUsfms]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}
