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

  const loading = versionLoading || bookLoading || chapterLoading;
  const error = versionError || bookError || chapterError;

  return (
    <>
      {loading && <p>Loading chapter data...</p>}

      {error && (
        <div style={{ color: "red" }}>
          <p>Error loading chapter data: {error.message}</p>
        </div>
      )}

      {version && book && chapter && (
        <ReaderProvider
          currentVersion={version}
          currentBook={book}
          currentChapter={chapter}
          currentVerse={null}
        >
          <BibleReaderNavigator />
          <ChapterRenderer />
        </ReaderProvider>
      )}
    </>
  );
}
