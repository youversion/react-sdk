import { useState } from "react";
import {
  useReaderContext,
  useBooks,
  useChapters,
  useBibleClient,
} from "@youversion/bible-hooks";
import {
  BibleChapterSelectionModal,
  BookChapterSelection,
} from "../chapter-selector";
import { BibleChapterVersionMenuBar } from "./BibleChapterVersionMenuBar";
import { ChapterNavigationButton } from "./ChapterNavigationButton";
import { BibleVersionSelectionModal } from "../version-selector";
import { AudioButton } from "../audio";
import { Version } from "@youversion/bible-core";
import { useBreakpoint } from "../../../hooks";

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

  const breakpoint = useBreakpoint();

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
        parseInt(currentChapter.title),
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
        firstBook.usfm,
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
      {breakpoint === "xs" && (
        <div
          className="fixed bottom-0 flex items-center justify-center"
          style={{
            transform: "translateY(-100px) translateX(calc(50vw - 50%))",
            zIndex: 100,
          }}
        >
          <AudioButton />
        </div>
      )}
      <div
        className={`fixed p-4 left-0 right-0 z-900 bg-white border-border-primary ${placement === "bottom" ? bottomClasses : topClasses}`}
      >
        <div className="flex justify-center w-full">
          <div className="flex w-full sm:w-fit sm:justify-center justify-between gap-2 sm:gap-8 grow items-center">
            <ChapterNavigationButton direction="left" />
            <BibleChapterVersionMenuBar
              className="min-w-[190px] sm:min-w-[215px]"
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
          </div>
          {breakpoint !== "xs" ? (
            <div
              className="fixed right-0 flex h-fit"
              style={{
                justifyContent: "flex-end",
                translate: "-25px",
              }}
            >
              <AudioButton iconSize={20}>
                <span className="text-xs text-center items-center">Listen</span>
              </AudioButton>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
