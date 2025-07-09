import { BibleChapterSelectionModal, BibleChapterVersionMenuBar, BookChapterSelection } from "../components";
import { useReaderContext } from "../context/ReaderContext";
import { useBooks, useChapters } from "../hooks";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/shared";

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
      <div className="fixed p-4 bottom-0 left-0 right-0 z-900 bg-white" style={{ borderTop: 'solid 1px #DDDBDB'}}>
        <div className="flex gap-4 justify-center">
          <ChapterNavigationButton direction="left" />
          <BibleChapterVersionMenuBar
            className='min-w-[215px]'
            chapter={`${currentBook.title} ${currentChapter.title}`}
            onChapterButtonClicked={() => !isChapterSelectionOpen && setIsChapterSelectionOpen(true)} />
          <ChapterNavigationButton direction="right" />
        </div>
      </div>
    </div>
  )
}

interface ChapterNavigationButtonProps {
  direction: 'left' | 'right';
}

export function ChapterNavigationButton({ direction }: ChapterNavigationButtonProps) {

  const { currentChapter, currentVersion, currentBook, setChapter } = useReaderContext();

  const { chapters, loading: chaptersLoading } = useChapters(currentVersion.id, currentBook.usfm);

  const currentChapterIndex = chapters?.data.findIndex(c => c.title === currentChapter.title) ?? -1;
  const nextChapterIndex = direction === 'left' ? currentChapterIndex - 1 : currentChapterIndex + 1;

  const icon = direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />;

  // Check if navigation is possible
  const canNavigate = !chaptersLoading &&
    chapters?.data &&
    currentChapterIndex !== -1 &&
    nextChapterIndex >= 0 &&
    nextChapterIndex < chapters.data.length;

  const handleNavigation = () => {
    if (canNavigate) {
      const nextChapter = chapters.data[nextChapterIndex];
      if (nextChapter) {
        setChapter(nextChapter);
      }
    }
  };

  return (
    <button
      onClick={handleNavigation}
      disabled={!canNavigate}
      className={`
       p-2 rounded-full transition-colors bg-[#EDEBEB] hover:shadow-sm
       text-gray-400 cursor-not-allowed hover:cursor-pointer active:bg-[#e7e4e4]`}
    >
      {icon}
    </button>
  );
}