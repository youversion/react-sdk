import { useEffect } from "react";
import { useChapters } from "../../../hooks";
import { Chapter } from "@youversion/bible-core";

interface ChapterGridProps {
  book: string;
  versionId: number;
  onChapterClicked: (chapter: Chapter) => void;
  visible: boolean;
}

export function ChapterGrid({
  book,
  versionId,
  onChapterClicked,
  visible,
}: ChapterGridProps) {
  const { chapters, loading, refetch } = useChapters(versionId, book, {
    enabled: visible,
  });

  useEffect(() => {
    // Enabled on the hook only works on initial render, and will not trigger a load when changed.
    // This effect will trigger a load when the component is made visible.
    if (!chapters && !loading && visible) {
      refetch();
    }
  }, [visible, chapters, loading, refetch]);

  const containerClass = `overflow-y-scroll scrollbar-hidden transition-all ease-in-out ${
    visible ? "duration-300 max-h-[1000px]" : "duration-100 max-h-[0px]"
  }`;

  if (loading) {
    return (
      <div className={containerClass}>
        <></>
      </div>
    );
  }

  if (!chapters?.data || chapters.data.length === 0) {
    return (
      <div className={containerClass}>
        <div>No chapters</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,3fr))] sm:grid-cols-[repeat(auto-fill,minmax(45px,3fr))] gap-2 mt-2">
        {chapters.data.map((chapter) => (
          <button
            key={chapter.usfm}
            className="w-16 h-16 sm:w-12 sm:h-12 font-bold bg-[#EDEBEB] rounded flex items-center justify-center hover:cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => onChapterClicked(chapter)}
          >
            {chapter.title}
          </button>
        ))}
      </div>
    </div>
  );
}
