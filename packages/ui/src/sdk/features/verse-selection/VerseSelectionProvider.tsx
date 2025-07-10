import { PropsWithChildren, useCallback, useState } from "react";
import { VerseSelectionContext } from ".";

export function VerseSelectionProvider({ children }: PropsWithChildren) {
  const [selectedVerseUsfms, setSelectedVerseUsfms] = useState<Set<string>>(new Set());
  const [shouldDim, setShouldDim] = useState(false);

  const toggleVerse = useCallback((usfm: string) => {
    setSelectedVerseUsfms(prev => {
      const newSet = new Set(prev); // Make a new set to trigger rerender
      if (newSet.has(usfm)) {
        newSet.delete(usfm);
      } else {
        newSet.add(usfm);
      }
      return newSet;
    });
  }, []);

  const isSelected = useCallback((usfm: string) => {
    return selectedVerseUsfms.has(usfm);
  }, [selectedVerseUsfms]);

  const clearSelection = useCallback(() => {
    setSelectedVerseUsfms(new Set());
  }, []);

  const value = {
    selectedVerseUsfms,
    toggleVerse,
    isSelected,
    clearSelection,
    selectedCount: selectedVerseUsfms.size,
    shouldDim: shouldDim,
    setShouldDim,
  };

  return (
    <VerseSelectionContext.Provider value={value}>
      {children}
    </VerseSelectionContext.Provider>
  );
}
