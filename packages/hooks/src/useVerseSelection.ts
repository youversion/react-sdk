import { useContext } from "react";
import { VerseSelectionContext } from "./context/VerseSelectionContext";

export function useVerseSelection() {
  const context = useContext(VerseSelectionContext);
  if (!context) {
    throw new Error(
      "useVerseSelection must be used within a VerseSelectionProvider"
    );
  }
  return context;
}
