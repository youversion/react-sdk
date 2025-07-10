import { HIGHLIGHT_COLORS, VerseHighlight } from "./highlights";
import { useEffect, useState } from "react";
import { VerseHighlightContext } from "./VerseHighlightContext";

const STORAGE_KEY = "verse-highlights";

export function VerseHighlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Load highlights from localStorage on mount
  useEffect(() => {
    try {
      setHighlights(LoadFromStorage() ?? []);
      setInitialLoadComplete(true);
    } catch (error) {
      console.error("Error loading highlights from localStorage:", error);
      setInitialLoadComplete(true);
    }
  }, []);

  // Save highlights to localStorage whenever they change
  useEffect(() => {
    if (!initialLoadComplete) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
    } catch (error) {
      console.error("Error saving highlights to localStorage:", error);
    }
  }, [highlights, initialLoadComplete]);

  const addHighlight = (usfm: string, colorId: number) => {
    const color = HIGHLIGHT_COLORS.find((c) => c.id === colorId);
    if (!color) return;

    const now = new Date();
    const existingIndex = highlights.findIndex((h) => h.usfm === usfm);

    if (existingIndex >= 0) {
      // Update existing highlight
      setHighlights((prev) =>
        prev.map((h, index) =>
          index === existingIndex
            ? { ...h, color: color.color, colorId, updatedAt: now }
            : h,
        ),
      );
    } else {
      // Add new highlight
      const newHighlight: VerseHighlight = {
        id: `${usfm}-${Date.now()}`,
        usfm,
        color: color.color,
        colorId,
        createdAt: now,
        updatedAt: now,
      };
      setHighlights((prev) => [...prev, newHighlight]);
    }
  };

  const removeHighlight = (usfm: string) => {
    setHighlights((prev) => prev.filter((h) => h.usfm !== usfm));
  };

  const getHighlight = (usfm: string) => {
    return highlights.find((h) => h.usfm === usfm);
  };

  const hasHighlight = (usfm: string) => {
    return highlights.some((h) => h.usfm === usfm);
  };

  const clearAllHighlights = () => {
    setHighlights([]);
  };

  const value = {
    highlights,
    addHighlight,
    removeHighlight,
    getHighlight,
    hasHighlight,
    clearAllHighlights,
    colors: HIGHLIGHT_COLORS,
  };

  return (
    <VerseHighlightContext.Provider value={value}>
      {children}
    </VerseHighlightContext.Provider>
  );
}

function LoadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    const highlightsWithDates: VerseHighlight[] = parsed.map((h: any) => ({
      ...h,
      createdAt: new Date(h.createdAt),
      updatedAt: new Date(h.updatedAt),
    }));

    return highlightsWithDates;
  }
}
