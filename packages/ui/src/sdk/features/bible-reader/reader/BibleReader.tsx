"use client";

import {
  ReaderProvider,
  useBook,
  useChapter,
  useVersion,
  VerseSelectionProvider,
} from "@youversion/bible-hooks";
import { Search } from "../../search";
import {
  BibleReaderNavigator,
  ChapterSwipeNavigation,
  getBiblePositionFromStorage,
  PositionPersistence,
} from "../navigation";
import { ChapterRenderer } from "./ChapterRenderer";
import { DockedVerseActionBar } from "../../verse-action-picker";
import { useBreakpoint } from "../../../hooks";
import { MobileVerseActionBar } from "../../verse-action-picker/MobileVerseActionBar";
import { VerseHighlightProvider } from "../../highlights";
import { ToastProvider } from "../../../context";

const DEFAULT_VERSION = 206;
const DEFAULT_BOOK = "GEN";
const DEFAULT_CHAPTER = 1;

interface Props {
  defaultVersion?: number;
  defaultBook?: string;
  defaultChapter?: number;
  navPlacement?: "bottom" | "top";
  usePositionStorage?: boolean;
}

export function BibleReader({
  defaultVersion = DEFAULT_VERSION,
  defaultBook = DEFAULT_BOOK,
  defaultChapter = DEFAULT_CHAPTER,
  navPlacement = "bottom",
  usePositionStorage = false,
}: Props) {
  const loadedPosition = usePositionStorage
    ? getBiblePositionFromStorage()
    : null;

  const resolvedVersion = loadedPosition?.version ?? defaultVersion;
  const resolvedBook = loadedPosition?.book ?? defaultBook;
  const resolvedChapter = loadedPosition?.chapter ?? defaultChapter;

  const { version } = useVersion(resolvedVersion);
  const { book } = useBook(resolvedVersion, resolvedBook);
  const { chapter } = useChapter(
    resolvedVersion,
    resolvedBook,
    resolvedChapter,
  );
  const breakpoint = useBreakpoint();

  if (!version || !book || !chapter) {
    return <></>;
  }

  const actionBar =
    breakpoint === "xs" ? (
      <MobileVerseActionBar position="bottom" />
    ) : (
      <DockedVerseActionBar position="right" />
    );

  return (
    <ReaderProvider
      currentVersion={version}
      currentBook={book}
      currentChapter={chapter}
      currentVerse={null}
    >
      {usePositionStorage && <PositionPersistence />}
      <ToastProvider>
        <VerseHighlightProvider>
          <VerseSelectionProvider>
            <Search />
            <div className="mb-20">
              <ChapterSwipeNavigation>
                <ChapterRenderer highlights selectable />
              </ChapterSwipeNavigation>
            </div>
            {actionBar}
            <BibleReaderNavigator placement={navPlacement} />
          </VerseSelectionProvider>
        </VerseHighlightProvider>
      </ToastProvider>
    </ReaderProvider>
  );
}
