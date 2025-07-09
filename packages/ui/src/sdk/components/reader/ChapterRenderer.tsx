"use client";

import { useContext, useMemo } from "react";
import { ReaderContext } from "../../context/ReaderContext";
import { useVerses } from "../../hooks/useVerses";

export function ChapterRenderer() {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error("ChapterRenderer must be used within a ReaderProvider");
  }

  const { currentVersion, currentBook, currentChapter } = context;

  const { verses, loading, error } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title)
  );

  const preprocessHTML = (html: string) => {
    // Replace empty paragraph divs with line breaks
    let processedHTML = html;
    
    // Find all <div class="p"> elements that contain only whitespace
    processedHTML = processedHTML.replace(
      /<div class="p"><span class="verse[^"]*"[^>]*><span class="content">\s*<\/span><\/span><\/div>/g,
      '<div class="line-break"></div>'
    );
    
    return processedHTML;
  };

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
    <div className="bible-reader">
      <h1>{currentBook.title}</h1>
      <h2>{currentChapter.title}</h2>
      {verses.data.map((verse) => (
        <span
          key={verse.usfm}
          className="verse-container"
          data-usfm={verse.usfm}
          data-reference={verse.reference}
        >
          <span
            className="verse-content"
            dangerouslySetInnerHTML={{ __html: preprocessHTML(verse.content) }}
          />
        </span>
      ))}
    </div>
  );
}
