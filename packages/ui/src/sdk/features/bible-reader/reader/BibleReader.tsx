"use client";

import {
  ReaderProvider,
  useInitData,
  VerseSelectionProvider,
} from "@youversion/bible-hooks";
import { Search } from "../../search";
import {
  BibleReaderNavigator,
  ChapterSwipeNavigation,
  clearPositionStorage,
  getBiblePositionFromStorage,
  PositionPersistence,
} from "../navigation";
import { ChapterRenderer } from "./ChapterRenderer";
import { DockedVerseActionBar } from "../../verse-action-picker";
import { useBreakpoint } from "../../../hooks";
import { MobileVerseActionBar } from "../../verse-action-picker/MobileVerseActionBar";
import { VerseHighlightProvider } from "../../highlights";
import { ToastProvider } from "../../../context";
import { ChapterLoading } from "./ChapterLoading";

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
  const breakpoint = useBreakpoint();

  const positionFromStorage = usePositionStorage
    ? getBiblePositionFromStorage()
    : null;

  const { data, loading, error } = useInitData(
    positionFromStorage ?? {
      version: defaultVersion,
      book: defaultBook,
      chapter: defaultChapter,
    },
  );

  if (loading) {
    return <ChapterLoading />;
  }

  if (error || !data) {
    if (positionFromStorage) {
      clearPositionStorage(); // In case LocalStorage was invalid.
    }
    return (
      <div className="w-screen h-screen flex gap-4 flex-col text-center justify-center items-center text-5xl opacity-60">
        <p>Oh no, Something went wrong</p>
        <p>Try refreshing!</p>
      </div>
    );
  }

  const actionBar =
    breakpoint === "xs" ? (
      <MobileVerseActionBar position="bottom" />
    ) : (
      <DockedVerseActionBar position="right" />
    );

  return (
    <ReaderProvider
      currentVersion={data.version}
      currentBook={data.book}
      currentChapter={data.chapter}
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
