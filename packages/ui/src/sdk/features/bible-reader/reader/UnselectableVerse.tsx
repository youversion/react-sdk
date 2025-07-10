import { Verse } from "@youversion/bible-core";

interface UnselectableVerseProps {
  verse: Verse;
  className?: string;
}

export function UnselectableVerse({
                                  verse,
                                  className = 'verse-content cursor-pointer',
                                }: UnselectableVerseProps) {
  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: verse.content }}
    />
  );
}
