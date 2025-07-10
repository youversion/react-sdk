import { SlideInModal, ModalHeader } from "../../shared";
import {
  useSearch,
  useReaderContext,
  useBibleClient,
} from "@youversion/bible-hooks";
import { SearchResult } from "./SearchResult";
import { findVerseElement } from "../bible-reader";
import { useVerseSelection } from "../verse-selection";
import { SearchResultItem } from "@youversion/bible-core";
import { useState } from "react";
import { useBreakpoint } from "../../hooks";

interface Props {
  query: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchResults({ query, isOpen, onClose }: Props) {
  const { currentVersion, setBook, setChapter, setVerse } = useReaderContext();

  const { toggleVerse, clearSelection } = useVerseSelection();

  const bibleClient = useBibleClient();

  const breakpoint = useBreakpoint();

  const { results, loading, error } = useSearch(query, currentVersion.id, {
    enabled: isOpen && query.trim().length > 0,
  });

  const [isNavigating, setIsNavigating] = useState(false);

  // TODO: This is a hack to get the book, chapter, and verse data.
  const handleResultClicked = async (result: SearchResultItem) => {
    const [book, chapter, verseNumber] = result.usfm.split(".");
    if (book && chapter && verseNumber && !loading) {
      setIsNavigating(true);
      onClose();
      //clearSelection();
      const bookData = await bibleClient.getBook(currentVersion.id, book);
      const chapterData = await bibleClient.getChapter(
        currentVersion.id,
        book,
        parseInt(chapter),
      );
      const verseData = await bibleClient.getVerse(
        currentVersion.id,
        book,
        parseInt(chapter),
        parseInt(verseNumber),
      );
      setBook(bookData);
      setChapter(chapterData);
      setVerse(verseData);
      setIsNavigating(false);

      // Scroll to the verse after a brief delay to ensure DOM is updated
      setTimeout(() => {
        const verseElement = document.getElementById(result.usfm);
        if (verseElement) {
          toggleVerse(result.usfm);
          verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1000);
    }
  };

  if (isNavigating && !isOpen && !loading && !error) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full shadow-sm bg-canvas-secondary border-b border-gray-200 z-50">
          <div className="p-4 text-lg font-bold opacity-80 text-center animate-pulse">
            Finding your scripture...
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          className="z-40 inset-0 w-screen h-screen fixed"
        />
      </>
    );
  }

  return (
    <>
      <SlideInModal
        isOpen={!isNavigating && isOpen}
        onClose={onClose}
        position="top"
        distance={breakpoint === "xs" ? 0 : 130}
        closeOnClickOutside
        className="w-screen top-0 sm:w-[500px] sm:rounded-lg"
      >
        <ModalHeader title="Search Results" onCloseClicked={onClose} />

        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Searching...</div>
          </div>
        )}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">Error: {error.message}</div>
          </div>
        )}
        {!isNavigating && results && results.data.length > 0 && (
          <div className="space-y-2 px-4 mt-2">
            {results.data.map((result, index) => (
              <SearchResult
                onClick={handleResultClicked}
                key={index}
                result={result}
              />
            ))}
          </div>
        )}
        {!isNavigating && results && results.data.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          </div>
        )}
        {isNavigating && (
          <div className="h-full w-full flex justify-center items-center text-2xl opacity-50 font-bold">
            TAKING YOU THERE
          </div>
        )}
      </SlideInModal>
    </>
  );
}
