"use client";

import { PropsWithChildren, ReactNode } from 'react';
import { ReaderContext } from "../context/ReaderContext";
import { Book, Chapter, Verse, Version } from "@repo/core";

type ReaderProviderProps = {
  children: ReactNode;
  currentVersion: Version;
  currentChapter: Chapter;
  currentBook: Book;
  currentVerse: Verse;
}

export function ReaderProvider({ children }: PropsWithChildren<ReaderProviderProps>) {
  return (
    <ReaderContext.Provider value={{}}>
      {children}
    </ReaderContext.Provider>
  )
}
