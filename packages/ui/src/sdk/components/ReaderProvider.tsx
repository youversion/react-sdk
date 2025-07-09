"use client";

import { PropsWithChildren, useState } from 'react';
import { ReaderContext } from "../context/ReaderContext";
import { Book, Chapter, Verse, Version } from "@youversion/bible-core";

type ReaderProviderProps = {
  currentVersion: Version;
  currentChapter: Chapter;
  currentBook: Book;
  currentVerse: Verse | null;
}

export function ReaderProvider(props: PropsWithChildren<ReaderProviderProps>) {
  const [currentVersion, setCurrentVersion] = useState<Version>(props.currentVersion);
  const [currentBook, setCurrentBook] = useState<Book>(props.currentBook);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(props.currentChapter);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(props.currentVerse);

  return (
    <ReaderContext.Provider value={{
      currentVersion,
      currentBook,
      currentChapter,
      currentVerse,
      setVersion: setCurrentVersion,
      setChapter: setCurrentChapter,
      setBook: setCurrentBook,
      setVerse: setCurrentVerse,
    }}>
      {props.children}
    </ReaderContext.Provider>
  );
}
