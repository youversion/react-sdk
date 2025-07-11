import { Verse } from "@youversion/bible-core";

interface UnselectableVerseProps {
  verse: Verse;
  className?: string;
}

export function UnselectableVerse({
  verse,
  className = "verse-content",
}: UnselectableVerseProps) {
  return (
    <div
      className={`${className}`}
      data-usfm={verse.usfm}
      dangerouslySetInnerHTML={{ __html: verse.content }}
    />
  );
}
