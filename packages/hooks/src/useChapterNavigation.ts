import { useReaderContext, useChapters } from "@youversion/bible-hooks";

interface UseChapterNavigationResult {
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  navigateToPrevious: () => void;
  navigateToNext: () => void;
  currentChapterIndex: number;
  isLoading: boolean;
}

/**
 * Provides navigation functionality for chapters within a book, allowing the user to move
 * to the previous or next chapter, as well as access additional chapter navigation metadata.
 *
 * @return {UseChapterNavigationResult} An object containing properties and methods for chapter navigation:
 * - `canNavigatePrevious` (boolean): Indicates whether navigating to the previous chapter is possible.
 * - `canNavigateNext` (boolean): Indicates whether navigating to the next chapter is possible.
 * - `navigateToPrevious` (function): Moves to the previous chapter if possible.
 * - `navigateToNext` (function): Moves to the next chapter if possible.
 * - `currentChapterIndex` (number): The index of the current chapter within the list of chapters.
 * - `isLoading` (boolean): Whether the chapter data is still loading.
 */
export function useChapterNavigation(): UseChapterNavigationResult {
  const { currentChapter, currentVersion, currentBook, setChapter } =
    useReaderContext();

  const { chapters, loading: chaptersLoading } = useChapters(
    currentVersion.id,
    currentBook.usfm
  );

  const currentChapterIndex =
    chapters?.data.findIndex((c) => c.title === currentChapter.title) ?? -1;

  const canNavigatePrevious =
    Boolean(!chaptersLoading &&
    chapters?.data &&
    currentChapterIndex !== -1 &&
    currentChapterIndex > 0);

  const canNavigateNext =
    Boolean(!chaptersLoading &&
    chapters?.data &&
    currentChapterIndex !== -1 &&
    currentChapterIndex < chapters.data.length - 1);

  const navigateToPrevious = () => {
    if (canNavigatePrevious && chapters?.data) {
      const previousChapter = chapters.data[currentChapterIndex - 1];
      if (previousChapter) {
        setChapter(previousChapter);
      }
    }
  };

  const navigateToNext = () => {
    if (canNavigateNext && chapters?.data) {
      const nextChapter = chapters.data[currentChapterIndex + 1];
      if (nextChapter) {
        setChapter(nextChapter);
      }
    }
  };

  return {
    canNavigatePrevious,
    canNavigateNext,
    navigateToPrevious,
    navigateToNext,
    currentChapterIndex,
    isLoading: chaptersLoading,
  };
}
