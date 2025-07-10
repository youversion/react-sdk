"use client";

import { createContext, useContext } from "react";
import { Book, Chapter, Verse, Version } from "@youversion/bible-core";

type ReaderContextData = {
  currentVersion: Version;
  currentChapter: Chapter;
  currentBook: Book;
  currentVerse: Verse | null;
  setVersion: (version: Version) => void;
  setChapter: (chapter: Chapter) => void;
  setBook: (book: Book) => void;
  setVerse: (verse: Verse | null) => void;
};

export const ReaderContext = createContext<ReaderContextData | null>(null);

export function useReaderContext() {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error("useReaderContext() must be used within a ReaderProvider");
  }

  return context;
}
