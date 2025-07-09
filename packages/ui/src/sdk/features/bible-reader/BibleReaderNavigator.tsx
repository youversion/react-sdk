import { useReaderContext } from "../../context";
import { useState } from "react";
import { useBooks, useChapters } from "../../hooks";
import {
  BibleChapterSelectionModal,
  BookChapterSelection,
} from "./BibleChapterSelectionModal";
import { BibleChapterVersionMenuBar } from "./BibleChapterVersionMenuBar";
import { ChapterNavigationButton } from "./ChapterNavigationButton";
import { BibleVersionSelectionModal } from "./BibleVersionSelectionModal";
import { Version } from "@youversion/bible-core";

export function BibleReaderNavigator() {
  const [isChapterSelectionOpen, setIsChapterSelectionOpen] = useState(false);
  const [isVersionSelectionOpen, setIsVersionSelectionOpen] = useState(false);

  const { setBook, setChapter, setVersion, currentVersion, currentBook, currentChapter } =
    useReaderContext();

  const { books } = useBooks(currentVersion.id);
  const { chapters } = useChapters(currentVersion.id, currentBook.usfm);

  function onSelection(selection: BookChapterSelection) {
    const book = books?.data.find((b) => b.usfm === selection.bookId);
    if (book) {
      setBook(book);
      setChapter(selection.chapter);
    }
  }

  function onVersionSelection(version: Version) {
    setVersion(version);
  }

  if (!chapters || !books) return <></>;

  return (
    <div>
      <BibleChapterSelectionModal
        onSelect={onSelection}
        isOpen={isChapterSelectionOpen}
        onClose={() => setIsChapterSelectionOpen(false)}
        screenEdgeGap={90}
      />
      <BibleVersionSelectionModal
        onSelect={onVersionSelection}
        isOpen={isVersionSelectionOpen}
        onClose={() => setIsVersionSelectionOpen(false)}
        screenEdgeGap={90}
        remainOpenOnSelect={true}
      />
      <div
        className="fixed p-4 bottom-0 left-0 right-0 z-900 bg-white"
        style={{ borderTop: "solid 1px #DDDBDB" }}
      >
        <div className="flex gap-4 justify-center">
          <ChapterNavigationButton direction="left" />
          <BibleChapterVersionMenuBar
            className="min-w-[215px]"
            chapter={`${currentBook.title} ${currentChapter.title}`}
            version={`${currentVersion.abbreviation}`}
            onChapterButtonClicked={() =>
              setIsChapterSelectionOpen(prev => !prev)
            }
            onVersionButtonClicked={() =>
              setIsVersionSelectionOpen(prev => !prev)
            }
          />
          <ChapterNavigationButton direction="right" />
        </div>
      </div>
    </div>
  );
}
