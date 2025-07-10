import { createContext } from "react";

type VerseSelectionContextData = {
  selectedVerseUsfms: Set<string>;
  toggleVerse: (usfm: string) => void;
  isSelected: (usfm: string) => boolean;
  clearSelection: () => void;
  selectedCount: number;
};

export const VerseSelectionContext =
  createContext<VerseSelectionContextData | null>(null);
