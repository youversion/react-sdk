import { useChapterNavigation } from "@youversion/bible-hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../shared";

interface ChapterNavigationButtonProps {
  direction: "left" | "right";
}

export function ChapterNavigationButton({
  direction,
}: ChapterNavigationButtonProps) {
  const {
    canNavigatePrevious,
    canNavigateNext,
    navigateToPrevious,
    navigateToNext,
  } = useChapterNavigation();

  const icon =
    direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />;

  const canNavigate =
    direction === "left" ? canNavigatePrevious : canNavigateNext;
  const handleNavigation =
    direction === "left" ? navigateToPrevious : navigateToNext;

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
