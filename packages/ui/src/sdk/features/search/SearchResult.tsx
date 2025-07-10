import { SearchResultItem } from "@youversion/bible-core";
import { useVerse, useReaderContext } from "@youversion/bible-hooks";
import { Passage } from "../../shared/Passage";

interface Props {
  result: SearchResultItem;
  onClick: (item: SearchResultItem) => void;
}

export function SearchResult({ result, onClick }: Props) {
  const { currentVersion } = useReaderContext();

  const [book, chapter, verseNumber] = result.usfm.split(".");

  const { verse } = useVerse(
    currentVersion.id,
    book ?? "",
    parseInt(chapter ?? "0"),
    parseInt(verseNumber ?? "0"),
  );

  if (!verse) {
    return null;
  }

  return (
    <div
      onClick={() => onClick(result)}
      className="p-3 bg-gray-50 rounded-lg border border-gray-200 select-none hover:cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <Passage verse={verse} />
    </div>
  );
}
