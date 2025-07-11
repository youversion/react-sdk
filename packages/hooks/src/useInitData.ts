import { useVersion } from "./useVersion";
import { useBook } from "./useBook";
import { useChapter } from "./useChapter";

export const DEFAULT = {
  VERSION: 206,
  BOOK: "GEN",
  CHAPTER: 1,
} as const;

interface Props {
  version: number;
  book: string;
  chapter: number;
}

export function useInitData(
  { version, book, chapter }: Props = {
    version: DEFAULT.VERSION,
    book: DEFAULT.BOOK,
    chapter: DEFAULT.CHAPTER,
  },
) {
  const {
    version: versionData,
    loading: versionLoading,
    error: versionError,
  } = useVersion(version);
  const {
    book: bookData,
    loading: bookLoading,
    error: bookError,
  } = useBook(version, book);
  const {
    chapter: chapterData,
    loading: chapterLoading,
    error: chapterError,
  } = useChapter(version, book, chapter);

  const allDataAvailable = versionData && bookData && chapterData;

  return {
    loading: versionLoading || bookLoading || chapterLoading,
    error: [versionError, bookError, chapterError].filter(Boolean).join(" "),
    data: allDataAvailable
      ? { version: versionData, book: bookData, chapter: chapterData }
      : null,
  };
}
