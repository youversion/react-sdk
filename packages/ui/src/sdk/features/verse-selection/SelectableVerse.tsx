import { Verse } from "@youversion/bible-core";
import { useVerseSelection } from "./useVerseSelection";

interface SelectableVerseProps {
  verse: Verse;
  className?: string;
  selectedClassName?: string;
}

export function SelectableVerse({
                           verse,
                           className = 'verse-content cursor-pointer',
                           selectedClassName = 'underline decoration-dotted underline-offset-4 decoration-gray-400'
                         }: SelectableVerseProps) {
  const { toggleVerse, isSelected } = useVerseSelection();

  return (
    <div
      onClick={() => toggleVerse(verse.usfm)}
      className={`${className} ${isSelected(verse.usfm) ? selectedClassName : ''}`}
      dangerouslySetInnerHTML={{ __html: verse.content }}
    />
  );
}
