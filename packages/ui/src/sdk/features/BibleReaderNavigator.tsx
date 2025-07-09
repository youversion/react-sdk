import {BibleChapterSelectionModal, BibleChapterVersionMenuBar, BookChapterSelection} from "../components";
import { useReaderContext } from "../context/ReaderContext";
import { useBooks, useChapters } from "../hooks";
import { useState } from "react";

export function BibleReaderNavigator() {
  const [isChapterSelectionOpen, setIsChapterSelectionOpen] = useState(false);

  const { setBook, setChapter, currentVersion, currentBook, currentChapter } = useReaderContext();

  const { books, loading } = useBooks(currentVersion.id);

  const { chapters, loading: chaptersIsLoading } = useChapters(currentVersion.id, currentBook.usfm);

  function onSelection(selection: BookChapterSelection) {
    const book = books?.data.find(b => b.usfm === selection.bookId);
    if (book) {
      setBook(book);
      setChapter(selection.chapter);
    }
  }

  if (!chapters || !books) return (
    <div>Loading...</div>
  )

  return (
    <div>
      <BibleChapterSelectionModal
        onSelect={onSelection}
        isOpen={isChapterSelectionOpen}
        onClose={() => setIsChapterSelectionOpen(false)}
        screenEdgeGap={90}
      />
      <div className="fixed bottom-[30px] left-0 right-0 z-900">
        <div className="flex justify-center">
          <BibleChapterVersionMenuBar
            chapter={`${currentBook.title} ${currentChapter.title}`}
            onChapterButtonClicked={() => setIsChapterSelectionOpen(true)} />
        </div>
      </div>
    </div>
  )
}
