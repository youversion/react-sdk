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
    <div style={{ width: "512px", margin: "0 auto" }}>
      <div className="text-center">
        <div
          className="text-center text-2xl leading-[125%] text-[#636161] font-[Untitled_Serif]"
          style={{ marginTop: "48px" }}
        >
          {currentBook.title}
        </div>
        <div
          className="text-center text-5xl leading-[125%] text-[#636161] font-[Untitled_Serif]"
          style={{ marginBottom: "24px" }}
        >
          {currentChapter.title}
        </div>
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
