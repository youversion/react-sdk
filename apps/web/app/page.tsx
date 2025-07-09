"use client";

import {
  useVersion,
  useBook,
  useChapter,
  useVerse,
  ReaderProvider,
  ChapterRenderer,
} from "@repo/ui";

export default function Home() {
  return <HomeContent />;
}

function HomeContent() {
  const {
    version,
    loading: versionLoading,
    error: versionError,
  } = useVersion(206);
  const { book, loading: bookLoading, error: bookError } = useBook(206, "GEN");
  const {
    chapter,
    loading: chapterLoading,
    error: chapterError,
  } = useChapter(206, "GEN", 2);

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
          <ChapterRenderer />
        </ReaderProvider>
      )}
    </>
  );
}
