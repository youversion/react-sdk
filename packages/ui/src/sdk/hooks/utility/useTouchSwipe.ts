import { useCallback, useRef, TouchEvent, Touch, MouseEvent } from "react";

// TypeScript types for the hook
type SwipeCallback = () => void;

type UseTouchSwipeOptions = {
  onSwipeLeft?: SwipeCallback;
  onSwipeRight?: SwipeCallback;
  onSwipeUp?: SwipeCallback;
  onSwipeDown?: SwipeCallback;
  minSwipeDistance?: number;
  preventDefaultTouchmove?: boolean;
  trackMouse?: boolean;
};

type Point = {
  x: number | null;
  y: number | null;
};

type SwipeHandlers = {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
};

type UseTouchSwipeReturn = {
  swipeHandlers: SwipeHandlers;
};

type TouchMoveEvent = TouchEvent | MouseEvent;

export function useTouchSwipe(
  options: UseTouchSwipeOptions,
): UseTouchSwipeReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance = 50,
    preventDefaultTouchmove = true,
    trackMouse = false,
  } = options;

  // Use refs instead of state for better performance
  const touchStart = useRef<Point>({ x: null, y: null });
  const touchEnd = useRef<Point>({ x: null, y: null });
  const isSwiping = useRef<boolean>(false);

  // Memoize callbacks only if they change
  const callbacks = useRef({
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  });
  callbacks.current = { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown };

  const handleStart = useCallback((clientX: number, clientY: number): void => {
    touchStart.current = { x: clientX, y: clientY };
    touchEnd.current = { x: clientX, y: clientY };
    isSwiping.current = true;
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number, e: TouchMoveEvent): void => {
      console.log("Moving");
      if (!isSwiping.current) return;

      if (preventDefaultTouchmove && e.cancelable) {
        e.preventDefault();
      }

      touchEnd.current = { x: clientX, y: clientY };
    },
    [preventDefaultTouchmove],
  );

  const handleEnd = useCallback((): void => {
    if (!isSwiping.current) return;

    const { x: startX, y: startY } = touchStart.current;
    const { x: endX, y: endY } = touchEnd.current;

    if (startX === null || startY === null || endX === null || endY === null) {
      isSwiping.current = false;
      return;
    }

    const distanceX: number = startX - endX;
    const distanceY: number = startY - endY;
    const absDistanceX: number = Math.abs(distanceX);
    const absDistanceY: number = Math.abs(distanceY);

    // Determine if it's a horizontal or vertical swipe
    const isHorizontalSwipe: boolean = absDistanceX > absDistanceY;

    if (isHorizontalSwipe && absDistanceX > minSwipeDistance) {
      if (distanceX > 0 && callbacks.current.onSwipeLeft) {
        callbacks.current.onSwipeLeft();
      } else if (distanceX < 0 && callbacks.current.onSwipeRight) {
        callbacks.current.onSwipeRight();
      }
    } else if (!isHorizontalSwipe && absDistanceY > minSwipeDistance) {
      if (distanceY > 0 && callbacks.current.onSwipeUp) {
        callbacks.current.onSwipeUp();
      } else if (distanceY < 0 && callbacks.current.onSwipeDown) {
        callbacks.current.onSwipeDown();
      }
    }

    // Reset
    isSwiping.current = false;
    touchStart.current = { x: null, y: null };
    touchEnd.current = { x: null, y: null };
  }, [minSwipeDistance]);

  // Touch event handlers
  const onTouchStart = useCallback(
    (e: TouchEvent): void => {
      if (!e.touches[0]) return;
      const touch: Touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart],
  );

  const onTouchMove = useCallback(
    (e: TouchEvent): void => {
      if (!e.touches[0]) return;
      const touch: Touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY, e);
    },
    [handleMove],
  );

  const onTouchEnd = useCallback((): void => handleEnd(), [handleEnd]);

  // Mouse event handlers (optional, for testing)
  const onMouseDown = useCallback(
    (e: MouseEvent): void => {
      console.log("MouseDown");
      if (trackMouse) handleStart(e.clientX, e.clientY);
    },
    [trackMouse, handleStart],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (trackMouse) handleMove(e.clientX, e.clientY, e);
    },
    [trackMouse, handleMove],
  );

  const onMouseUp = useCallback((): void => {
    if (trackMouse) handleEnd();
  }, [trackMouse, handleEnd]);

  const onMouseLeave = useCallback((): void => {
    if (trackMouse && isSwiping.current) handleEnd();
  }, [trackMouse, handleEnd]);

  const swipeHandlers: SwipeHandlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...(trackMouse && {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    }),
  };

  return { swipeHandlers };
}
