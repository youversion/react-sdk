"use client";

import {
  useVersion,
  useBook,
  useChapter,
  ReaderProvider,
  ChapterRenderer,
  BibleReaderNavigator,
} from "@youversion/bible-ui";

export default function Home() {
  return <HomeContent />;
}

const DEFAULT_VERSION = 206;
const DEFAULT_BOOK = "GEN";
const DEFAULT_CHAPTER = 1;

function HomeContent() {
  const {
    version,
    loading: versionLoading,
    error: versionError,
  } = useVersion(DEFAULT_VERSION);
  const {
    book,
    loading: bookLoading,
    error: bookError,
  } = useBook(DEFAULT_VERSION, DEFAULT_BOOK);
  const {
    chapter,
    loading: chapterLoading,
    error: chapterError,
  } = useChapter(DEFAULT_VERSION, DEFAULT_BOOK, DEFAULT_CHAPTER);

  if (!version || !book || !chapter) {
    return <></>;
  }

  return (
    <>
      <ReaderProvider
        currentVersion={version}
        currentBook={book}
        currentChapter={chapter}
        currentVerse={null}
      >
        <BibleReaderNavigator />
        <ChapterRenderer />
      </ReaderProvider>
    </>
  );
}
