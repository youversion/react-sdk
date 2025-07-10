import { useReaderContext } from "../../../context";
import { useState } from "react";
import { useBook, useBooks, useChapters } from "../../../hooks";
import {
  BibleChapterSelectionModal,
  BookChapterSelection,
} from "../chapter-selector";
import { BibleChapterVersionMenuBar } from "./BibleChapterVersionMenuBar";
import { ChapterNavigationButton } from "./ChapterNavigationButton";
import { BibleVersionSelectionModal } from "../version-selector";
import { AudioButton } from "../audio/AudioButton";
import { Version } from "@youversion/bible-core";
import { useBibleClient } from "../../../hooks/useBibleClient";

interface Props {
  placement?: "top" | "bottom";
}

export function BibleReaderNavigator({ placement = "bottom" }: Props) {
  const bibleClient = useBibleClient();

  const [isChapterSelectionOpen, setIsChapterSelectionOpen] = useState(false);
  const [isVersionSelectionOpen, setIsVersionSelectionOpen] = useState(false);

  const {
    setBook,
    setChapter,
    setVersion,
    currentVersion,
    currentBook,
    currentChapter,
  } = useReaderContext();

  const { books } = useBooks(currentVersion.id);
  const { chapters } = useChapters(currentVersion.id, currentBook.usfm);

  function onSelection(selection: BookChapterSelection) {
    const book = books?.data.find((b) => b.usfm === selection.bookId);
    if (book) {
      setBook(book);
      setChapter(selection.chapter);
      setIsChapterSelectionOpen(false);
    }
  }

  async function findMatchingBookAndChapter(newVersion: Version) {
    const books = await bibleClient.getBooks(newVersion.id);
    const matchedBook = books.data.find((x) => x.usfm === currentBook.usfm);

    if (matchedBook) {
      setBook(matchedBook);

      const chapter = await bibleClient.getChapter(
        newVersion.id,
        matchedBook.usfm,
        parseInt(currentChapter.title)
      );

      if (chapter) {
        setChapter(chapter);
      }

      return true;
    }

    return false;
  }

  async function selectFirstBookAndChapter(newVersion: Version) {
    const books = await bibleClient.getBooks(newVersion.id);
    const firstBook = books?.data[0];

    if (firstBook) {
      setBook(firstBook);

      const chapters = await bibleClient.getChapters(
        newVersion.id,
        firstBook.usfm
      );
      const firstChapter = chapters?.data[0];

      if (firstChapter) {
        setChapter(firstChapter);
      }
    }
  }

  async function onVersionSelection(newVersion: Version) {
    setVersion(newVersion);
    const found = await findMatchingBookAndChapter(newVersion);
    if (!found) {
      await selectFirstBookAndChapter(newVersion);
    }
    setIsVersionSelectionOpen(false);
  }

  if (!chapters || !books) return <></>;

  const topClasses = `top-0 border-b pt-6 sm:pt-5`;
  const bottomClasses = `bottom-0 border-t pb-6.5 sm:pb-5`;

  return (
    <div>
      <BibleChapterSelectionModal
        onSelect={onSelection}
        isOpen={isChapterSelectionOpen}
        onClose={() => setIsChapterSelectionOpen(false)}
        screenEdgeGap={87}
        modalPlacement={placement}
      />
      <BibleVersionSelectionModal
        onSelect={onVersionSelection}
        isOpen={isVersionSelectionOpen}
        onClose={() => setIsVersionSelectionOpen(false)}
        screenEdgeGap={87}
        modalPlacement={placement}
      />
      <div
        className={`fixed p-5 left-0 right-0 z-900 bg-white border-border-primary ${placement === "bottom" ? bottomClasses : topClasses}`}
      >
        <div className="flex justify-between px-2 sm:justify-center sm:px-0 sm:gap-4">
          <ChapterNavigationButton direction="left" />
          <BibleChapterVersionMenuBar
            className="min-w-[215px]"
            chapter={`${currentBook.title} ${currentChapter.title}`}
            version={`${currentVersion.abbreviation}`}
            onChapterButtonClicked={() => {
              setIsChapterSelectionOpen((prev) => !prev);
              setIsVersionSelectionOpen(false);
            }}
            onVersionButtonClicked={() => {
              setIsVersionSelectionOpen((prev) => !prev);
              setIsChapterSelectionOpen(false);
            }}
          />
          <ChapterNavigationButton direction="right" />
          <AudioButton />
        </div>
      </div>
    </div>
  );
}
