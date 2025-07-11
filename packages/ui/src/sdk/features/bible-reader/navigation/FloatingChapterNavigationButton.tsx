import { useChapterNavigation } from "@youversion/bible-hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../shared";

interface FloatingChapterNavigationButtonProps {
  direction: "left" | "right";
  position?: "left" | "right";
  edgeDistance?: number;
  topOffset?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  hideOnDisabled?: boolean;
}

export function FloatingChapterNavigationButton({
  direction,
  position = direction, // Default position matches direction
  edgeDistance = 16,
  topOffset = "50%",
  className = "",
  size = "md",
  hideOnDisabled = false,
}: FloatingChapterNavigationButtonProps) {
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

  // Hide button if disabled and hideOnDisabled is true
  if (!canNavigate && hideOnDisabled) {
    return null;
  }

  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "p-3 sm:p-2",
    lg: "p-4 sm:p-3 text-lg",
  };

  const positionStyles = {
    [position]: `${edgeDistance}px`,
    top: topOffset,
    transform: topOffset === "50%" ? "translateY(-50%)" : undefined,
  };

  return (
    <button
      onClick={handleNavigation}
      disabled={!canNavigate}
      className={`
        fixed z-40 rounded-full transition-all duration-200
        bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl
        ${
          canNavigate
            ? "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95"
            : "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60"
        }
        ${sizeClasses[size]}
        ${className}
      `}
      style={positionStyles}
      aria-label={`Navigate to ${direction === "left" ? "previous" : "next"} chapter`}
    >
      {icon}
    </button>
  );
}
