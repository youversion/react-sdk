import { useEffect } from "react";
import { useReaderContext } from "@youversion/bible-hooks";

interface PositionPersistenceProps {
  storageKey?: string;
  enabled?: boolean;
  debounceMs?: number;
}

interface SavedPosition {
  version: number;
  book: string;
  chapter: number;
}

const STORAGE_KEY = "bible-reader-position";

/**
 * Manages and persists the current position within a reading context by saving
 * the state (version, book, and chapter) to storage with debouncing.
 *
 * @param params - The parameters for configuring position persistence.
 * @param [params.enabled=true] - Flag to enable or disable position persistence.
 */
export function PositionPersistence({
  enabled = true,
}: PositionPersistenceProps) {
  const { currentVersion, currentBook, currentChapter } = useReaderContext();

  // Save position with debouncing
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (!currentVersion || !currentBook || !currentChapter) return;

    saveBiblePositionToStorage(
      currentVersion.id,
      currentBook.usfm,
      parseInt(currentChapter.title),
    );
  }, [currentVersion, currentBook, currentChapter, enabled]);

  return null;
}

/**
 * Saves the current Bible position (version, book, chapter) to local storage.
 *
 * @param version - The version of the Bible.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number in the specified book.
 */
export function saveBiblePositionToStorage(
  version: number,
  book: string,
  chapter: number,
) {
  try {
    const position: SavedPosition = { version, book, chapter };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  } catch (error) {
    console.error("Error saving position:", error);
  }
}

/**
 * Retrieves the saved Bible position from local storage.
 * The method attempts to load and parse stored data corresponding to the key defined by STORAGE_KEY.
 * If the data exists and contains valid properties (version, book, chapter), it returns the position object.
 * Otherwise, it returns null.
 *
 * @return The saved Bible position object if available and valid, or null if no valid data is found.
 */
export function getBiblePositionFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const position: SavedPosition = JSON.parse(saved);
      // Basic validation
      if (position?.version && position?.book && position?.chapter) {
        return position;
      }
    }
  } catch (error) {
    console.error("Error loading position:", error);
  }

  return null;
}
