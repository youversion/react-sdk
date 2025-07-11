import { PropsWithChildren } from "react";
import { useTouchSwipe } from "../../../hooks";
import { useChapterNavigation } from "@youversion/bible-hooks";

/**
 * Component for handling swipe navigation between chapters.
 * It provides swipe-based navigation functionality to move to the next or previous chapter.
 *
 * @param {Object} props - The properties for the component.
 * @param props.children - Usually the ChapterRenderer. Swipe will be detected on this element.
 * @return A wrapper element that enables swipe gestures for chapter navigation.
 */
export function ChapterSwipeNavigation({ children }: PropsWithChildren) {
  const { navigateToNext, navigateToPrevious } = useChapterNavigation();

  const { swipeHandlers } = useTouchSwipe({
    onSwipeLeft: () => {
      navigateToNext();
    },
    onSwipeRight: () => {
      navigateToPrevious();
    },
  });

  return <div {...swipeHandlers}>{children}</div>;
}
