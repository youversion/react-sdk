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
      <div className="max-w-[512px] mx-auto px-6 animate-pulse">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse mt-12 mb-4"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-md animate-pulse mb-6"></div>
        </div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
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
    <div className="max-w-[512px] mx-auto px-6">
      <div className="text-center">
        <div className="text-center text-2xl leading-[125%] mt-12 text-[#636161] font-[Untitled_Serif]">
          {currentBook.title}
        </div>
        <div className="text-center text-5xl leading-[125%] mb-6 text-[#636161] font-[Untitled_Serif]">
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
