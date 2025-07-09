"use client";

import { useVerses } from "../../hooks";
import { useReaderContext } from "../../context/ReaderContext";

export function ChapterRenderer() {
  const { currentVersion, currentBook, currentChapter } = useReaderContext();

  const { verses, loading, error } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading verses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">
          Error loading verses: {error.message}
        </div>
      </div>
    );
  }

  if (!verses?.data || verses.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">No verses found</div>
      </div>
    );
  }

  return (
    <div
      className="bible-reader w-8/12 mx-auto my-0"
      style={{ width: "512px" }}
    >
      <div className="text-center">
        <h1>{currentBook.title}</h1>
        <h2>{currentChapter.title}</h2>
      </div>
      {verses.data.map((verse) => (
        <div
          key={verse.usfm}
          className="verse-content"
          dangerouslySetInnerHTML={{ __html: verse.content }}
        />
      ))}
    </div>
  );
}
