import { BibleChapterSelectionModal, BookChapterSelection } from "../components";
import { useReaderContext } from "../context/ReaderContext";
import { useBooks, useChapters } from "../hooks";
import { useState } from "react";

export function BibleReaderNavigator() {
  const [isChapterSelectionOpen, setIsChapterSelectionOpen] = useState(false);

  const { setBook, setChapter, currentVersion, currentBook } = useReaderContext();

  const { books, loading } = useBooks(currentVersion.id);

  const { chapters, loading: chaptersIsLoading } = useChapters(currentVersion.id, currentBook.usfm);

  function onSelection(selection: BookChapterSelection) {
    const book = books?.data.find(b => b.usfm === selection.bookId);
    console.log(book);
    console.log(selection.chapter);
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
      />
      <button onClick={() => setIsChapterSelectionOpen(!isChapterSelectionOpen)}>Select Chapter</button>
    </div>
  )
}
