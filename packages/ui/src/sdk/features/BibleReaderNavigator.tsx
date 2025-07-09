import { BibleChapterSelectionModal, BookChapterSelection, BookOption } from "../components";
import { useReaderContext } from "../context/ReaderContext";
import { useBooks, useChapters } from "../hooks";
import { useState } from "react";

export function BibleReaderNavigator() {
  const [isChapterSelectionOpen, setIsChapterSelectionOpen] = useState(false);

  const { setBook, setChapter, currentVersion, currentBook } = useReaderContext();

  const { books, loading } = useBooks(currentVersion.id);

  const { chapters, loading: chaptersIsLoading } = useChapters(currentVersion.id, currentBook.usfm);

  function onSelection(selection: BookChapterSelection) {
    const book = books?.data.find(b => b.usfm);
    if (book) {
      setBook(book);
    }
  }

  if (!chapters || !books) return (
    <div>Loading...</div>
  )

  const bookChapters = chapters.data.map(c => Number(c.usfm));
  const bookOptions: Array<BookOption> = books.data.map(b => ({ id: b.usfm, name: b.title, chapters: bookChapters })) ?? [];

  return (
    <div>
      <BibleChapterSelectionModal
        books={bookOptions}
        onSelect={onSelection}
        isOpen={isChapterSelectionOpen}
        onClose={() => setIsChapterSelectionOpen(false)}
      />
    </div>
  )
}
