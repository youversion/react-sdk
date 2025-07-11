"use client";

import { useReaderContext, useVerses } from "@youversion/bible-hooks";
import { SelectableVerse } from "../../verse-selection";
import { ChapterHighlights } from "../../highlights";
import { UnselectableVerse } from "./UnselectableVerse";
import { useMemo } from "react";
import { ChapterLoading } from "./ChapterLoading";

interface Props {
  highlights?: boolean;
  selectable?: boolean;
}

/**
 * Renders the chapter content for the current book and chapter in the reader context.
 * Supports optional highlighting of verses.
 *
 * @param highlights - If true, component requires a VerseHighlightProvider and
 * will display highlights. If false or undefined, highlights will be disabled.
 *
 * @param selectable - If true, component requires a VerseSelectionProvider and
 * If false none is needed and verses are not clickable.
 *
 * @return The rendered chapter content, including loading, error, and empty state handling,
 * or the list of verses for the chapter with or without highlighting enabled.
 */
export function ChapterRenderer({ highlights, selectable }: Props) {
  const { currentVersion, currentBook, currentChapter } = useReaderContext();

  const { verses, loading, error } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title),
  );

  const VerseComponent = useMemo(
    () => (selectable ? SelectableVerse : UnselectableVerse),
    [selectable],
  );

  if (loading) {
    return <ChapterLoading />;
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
      {highlights ? (
        <ChapterHighlights>
          {verses.data.map((verse) => (
            <VerseComponent key={verse.usfm} verse={verse} />
          ))}
        </ChapterHighlights>
      ) : (
        verses.data.map((verse) => (
          <VerseComponent key={verse.usfm} verse={verse} />
        ))
      )}
    </div>
  );
}
