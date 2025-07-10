import { createContext } from "react";

type VerseSelectionContextData = {
  selectedVerseUsfms: Set<string>;
  toggleVerse: (usfm: string) => void;
  isSelected: (usfm: string) => boolean;
  clearSelection: () => void;
  selectedCount: number;
  shouldDim: boolean;
  setShouldDim: (shouldDim: boolean) => void;
};

export const VerseSelectionContext =
  createContext<VerseSelectionContextData | null>(null);
