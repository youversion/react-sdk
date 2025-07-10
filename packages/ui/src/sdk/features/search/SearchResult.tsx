import { SearchResultItem } from "@youversion/bible-core";
import { useVerse } from "../../hooks";
import { useReaderContext } from "../../context";
import { Passage } from "../../shared/Passage";
import { useBibleClient } from "../../hooks/useBibleClient";
import { useState } from "react";

interface Props {
  result: SearchResultItem;
  onClose: () => void;
}

export function SearchResult({ result, onClose }: Props) {
  const { currentVersion, setBook, setChapter, setVerse } = useReaderContext();
  const bibleClient = useBibleClient();
  const [book, chapter, verseNumber] = result.usfm.split(".");
  const [loading, setLoading] = useState(false);
  const { verse } = useVerse(
    currentVersion.id,
    book ?? "",
    parseInt(chapter ?? "0"),
    parseInt(verseNumber ?? "0")
  );

  if (!verse) {
    return null;
  }

  // TODO: This is a hack to get the book, chapter, and verse data.
  const handleClick = async () => {
    if (book && chapter && verseNumber && !loading) {
      setLoading(true);
      const bookData = await bibleClient.getBook(currentVersion.id, book);
      const chapterData = await bibleClient.getChapter(
        currentVersion.id,
        book,
        parseInt(chapter)
      );
      const verseData = await bibleClient.getVerse(
        currentVersion.id,
        book,
        parseInt(chapter),
        parseInt(verseNumber)
      );
      setBook(bookData);
      setChapter(chapterData);
      setVerse(verseData);
      setLoading(false);
      onClose();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
    >
      <Passage verse={verse} />
    </div>
  );
}
