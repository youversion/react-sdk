"use client";

import { PropsWithChildren, ReactNode } from 'react';
import { ReaderContext } from "../context/ReaderContext";
import { Book, Chapter, Verse, Version } from "@youversion/bible-core";

type ReaderProviderProps = {
  children: ReactNode;
  currentVersion: Version;
  currentChapter: Chapter;
  currentBook: Book;
  currentVerse: Verse | null;
}

export function ReaderProvider({ 
  children, 
  currentVersion, 
  currentChapter, 
  currentBook, 
  currentVerse 
}: PropsWithChildren<ReaderProviderProps>) {
  return (
    <ReaderContext.Provider value={{
      currentVersion,
      currentChapter,
      currentBook,
      currentVerse
    }}>
      {children}
    </ReaderContext.Provider>
  )
}
