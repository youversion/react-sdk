import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState, useRef } from "react";
import clsx from "clsx";

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "top" | "bottom";
  distance?: number; // Distance from edge in pixels
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  animationDuration?: number; // In milliseconds
  width?: string;
  backdrop?: boolean;
  background?: boolean; // Whether to show white background
}

export function SlideInModal({
  isOpen,
  onClose,
  children,
  position = "bottom",
  distance = 0,
  className = "",
  closeOnClickOutside = false,
  closeOnEscape = true,
  animationDuration = 300,
  backdrop = false,
  background = true,
}: BottomModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure DOM is updated before animation
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!modalRef.current) return;

      // THIS LOGIC SOLVES COMPETITION WITH BOTTOM OR TOP MENU BARS
      // Only close the modal if click is above the modal.
      const modalRect = modalRef.current.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Check if click is within modal bounds
      const isWithinModalBounds =
        clickX >= modalRect.left &&
        clickX <= modalRect.right &&
        clickY >= modalRect.top - (position === "top" ? distance : 0) &&
        clickY <= modalRect.bottom + (position === "bottom" ? distance : 0);

      if (isWithinModalBounds) return;

      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnClickOutside, onClose, distance, position]);

  // Handle backdrop click (only if backdrop is enabled)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (backdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const getPositionStyles = () => {
    const baseStyles = {
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 800,
      height: `calc(100vh - ${distance}px)`,
    };

    if (position === "bottom") {
      return {
        ...baseStyles,
        bottom: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? "0" : "125%"})`,
      };
    } else {
      return {
        ...baseStyles,
        top: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? "0" : "-125%"})`,
      };
    }
  };

  const modalContent = (
    <>
      {/* Backdrop - only render if backdrop is true */}
      {backdrop && (
        <div
          className={`
            fixed inset-0 z-40 bg-black transition-opacity duration-${animationDuration}
            ${isAnimating ? "opacity-30" : "opacity-0"}
          `}
          onClick={handleBackdropClick}
        />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className={clsx(
          "fixed inset-0 sm:max-h-[500px] sm:inset-auto overflow-hidden ease-out min-w-[200px] min-h-[150px] scrollbar-hidden",
          `transition-transform duration-${animationDuration}`,
          {
            "bg-white shadow-[0_0_3px_rgba(0,0,0,0.2)] border border-gray-200":
              background,
          },
          className,
        )}
        style={getPositionStyles()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="overflow-y-scroll scrollbar-hidden h-full">
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
