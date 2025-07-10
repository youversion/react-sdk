import { useReaderContext } from "../../../context";
import { useChapters } from "../../../hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../shared";

interface ChapterNavigationButtonProps {
  direction: "left" | "right";
}

export function ChapterNavigationButton({
  direction,
}: ChapterNavigationButtonProps) {
  const { currentChapter, currentVersion, currentBook, setChapter } =
    useReaderContext();

  const { chapters, loading: chaptersLoading } = useChapters(
    currentVersion.id,
    currentBook.usfm
  );

  const currentChapterIndex =
    chapters?.data.findIndex((c) => c.title === currentChapter.title) ?? -1;
  const nextChapterIndex =
    direction === "left" ? currentChapterIndex - 1 : currentChapterIndex + 1;

  const icon =
    direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />;

  // Check if navigation is possible
  const canNavigate =
    !chaptersLoading &&
    chapters?.data &&
    currentChapterIndex !== -1 &&
    nextChapterIndex >= 0 &&
    nextChapterIndex < chapters.data.length;

  const handleNavigation = () => {
    if (canNavigate) {
      const nextChapter = chapters.data[nextChapterIndex];
      if (nextChapter) {
        setChapter(nextChapter);
      }
    }
  };

  return (
    <button
      onClick={handleNavigation}
      disabled={!canNavigate}
      className={`
       p-3 sm:p-2 rounded-full transition-colors bg-[#EDEBEB] hover:shadow-sm
       text-gray-400 cursor-not-allowed hover:cursor-pointer active:bg-[#e7e4e4]`}
    >
      {icon}
    </button>
  );
}
