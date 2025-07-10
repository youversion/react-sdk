import { Verse } from "@youversion/bible-core";
import { useVerseSelection } from "./useVerseSelection";
import clsx from "clsx";

interface SelectableVerseProps {
  verse: Verse;
  className?: string;
  selectedClassName?: string;
}

export function SelectableVerse({
  verse,
  className = "verse-content cursor-pointer",
  selectedClassName = "underline decoration-dotted underline-offset-4 decoration-gray-400",
}: SelectableVerseProps) {
  const { toggleVerse, isSelected, shouldDim, setShouldDim, selectedCount } =
    useVerseSelection();

  const styles = clsx(className, {
    [selectedClassName]: isSelected(verse.usfm),
    "opacity-70": shouldDim && !isSelected(verse.usfm),
  });

  return (
    <div
      id={verse.usfm}
      onClick={() => {
        toggleVerse(verse.usfm);
        setShouldDim(selectedCount == 1 ? false : true);
      }}
      className={styles}
      dangerouslySetInnerHTML={{ __html: verse.content }}
    />
  );
}
