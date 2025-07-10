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
  const { toggleVerse, isSelected, selectedCount } =
    useVerseSelection();

  const isCurrentVerseSelected = isSelected(verse.usfm);
  const shouldDim = selectedCount > 0 && !isCurrentVerseSelected;

  const styles = clsx(className, {
    [selectedClassName]: isCurrentVerseSelected,
    "opacity-70": shouldDim,
  });

  return (
    <div
      id={verse.usfm}
      data-usfm={verse.usfm}
      onClick={() => {
        toggleVerse(verse.usfm);
      }}
      className={styles}
      dangerouslySetInnerHTML={{ __html: verse.content }}
    />
  );
}
