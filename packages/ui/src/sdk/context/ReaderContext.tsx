"use client";

import { createContext } from "react";
import { Book, Chapter, Verse, Version } from "@youversion/bible-core";

type ReaderContextData = {
  currentVersion: Version;
  currentChapter: Chapter;
  currentBook: Book;
  currentVerse: Verse | null;
};

export const ReaderContext = createContext<ReaderContextData | null>(null);
