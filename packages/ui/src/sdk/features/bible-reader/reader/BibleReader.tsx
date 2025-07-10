"use client";

import { ReaderProvider } from "../../../context";
import { useBook, useChapter, useVersion } from "../../../hooks";
import { BibleReaderNavigator } from "../navigation";
import { ChapterRenderer } from "./ChapterRenderer";
import { VerseSelectionProvider } from "../../verse-selection";

const DEFAULT_VERSION = 206;
const DEFAULT_BOOK = "GEN";
const DEFAULT_CHAPTER = 1;

interface Props {
  defaultVersion?: number;
  defaultBook?: string;
  defaultChapter?: number;
  navPlacement?: 'bottom' | 'top';
}

export function BibleReader({
  defaultVersion = DEFAULT_VERSION,
  defaultBook = DEFAULT_BOOK,
  defaultChapter = DEFAULT_CHAPTER,
  navPlacement = 'bottom',
}: Props) {
  const { version } = useVersion(defaultVersion);
  const { book } = useBook(defaultVersion, defaultBook);
  const { chapter } = useChapter(defaultVersion, defaultBook, defaultChapter);

  if (!version || !book || !chapter) {
    return <></>;
  }

  return (
    <ReaderProvider
      currentVersion={version}
      currentBook={book}
      currentChapter={chapter}
      currentVerse={null}
    >
      <VerseSelectionProvider>
        <div className="mb-20">
          <ChapterRenderer />
        </div>
        <BibleReaderNavigator placement={navPlacement} />
      </VerseSelectionProvider>
    </ReaderProvider>
  );
}
