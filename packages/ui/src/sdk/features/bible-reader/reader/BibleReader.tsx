"use client";

import {
  ReaderProvider,
  useBook,
  useChapter,
  useVersion,
  VerseSelectionProvider,
} from "@youversion/bible-hooks";
import { Search } from "../../search";
import { BibleReaderNavigator } from "../navigation";
import { ChapterRenderer } from "./ChapterRenderer";
import { DockedVerseActionBar } from "../../verse-action-picker";
import { useBreakpoint } from "../../../hooks";
import { MobileVerseActionBar } from "../../verse-action-picker/MobileVerseActionBar";
import { VerseHighlightProvider } from "../../highlights";
import { ToastProvider } from "../../../context/ToastContext";

const DEFAULT_VERSION = 206;
const DEFAULT_BOOK = "GEN";
const DEFAULT_CHAPTER = 1;

interface Props {
  defaultVersion?: number;
  defaultBook?: string;
  defaultChapter?: number;
  navPlacement?: "bottom" | "top";
}

export function BibleReader({
  defaultVersion = DEFAULT_VERSION,
  defaultBook = DEFAULT_BOOK,
  defaultChapter = DEFAULT_CHAPTER,
  navPlacement = "bottom",
}: Props) {
  const { version } = useVersion(defaultVersion);
  const { book } = useBook(defaultVersion, defaultBook);
  const { chapter } = useChapter(defaultVersion, defaultBook, defaultChapter);
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
      <ToastProvider>
        <VerseHighlightProvider>
          <VerseSelectionProvider>
            <Search />
            <div className="mb-20">
              <ChapterRenderer />
            </div>
            {actionBar}
            <BibleReaderNavigator placement={navPlacement} />
          </VerseSelectionProvider>
        </VerseHighlightProvider>
      </ToastProvider>
    </ReaderProvider>
  );
}
