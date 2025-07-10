import { createContext, useContext } from "react";
import { HighlightColor, VerseHighlight } from "./highlights";

interface VerseHighlightContextData {
  highlights: VerseHighlight[];
  addHighlight: (usfm: string, colorId: number) => void;
  removeHighlight: (usfm: string) => void;
  getHighlight: (usfm: string) => VerseHighlight | undefined;
  hasHighlight: (usfm: string) => boolean;
  clearAllHighlights: () => void;
  colors: HighlightColor[];
}

export const VerseHighlightContext = createContext<
  VerseHighlightContextData | undefined
>(undefined);

export function useVerseHighlight() {
  const context = useContext(VerseHighlightContext);
  if (!context) {
    throw new Error(
      "useVerseHighlight must be used within a VerseHighlightProvider",
    );
  }
  return context;
}
