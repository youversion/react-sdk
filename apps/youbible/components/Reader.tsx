import {
  ReaderProvider,
  useBook,
  useChapter,
  useVersion,
  VerseSelectionProvider,
} from "@youversion/bible-hooks";
import { ChapterRenderer } from "@youversion/bible-native";

const DEFAULT_VERSION = 206;
const DEFAULT_BOOK = "GEN";
const DEFAULT_CHAPTER = 1;

export function Reader() {
  const { version } = useVersion(DEFAULT_VERSION);
  const { book } = useBook(DEFAULT_VERSION, DEFAULT_BOOK);
  const { chapter } = useChapter(
    DEFAULT_VERSION,
    DEFAULT_BOOK,
    DEFAULT_CHAPTER
  );

  if (!version || !book || !chapter) {
    return <></>;
  }

  return (
    <ReaderProvider
      currentVersion={version}
      currentBook={book}
      currentChapter={chapter}
      currentVerse={null}
    >
      <VerseSelectionProvider>
        <ChapterRenderer />
      </VerseSelectionProvider>
    </ReaderProvider>
  );
}
