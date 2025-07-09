import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState, useRef } from "react";

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'top' | 'bottom';
  distance?: number; // Distance from edge in pixels
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  animationDuration?: number; // In milliseconds
  maxHeight?: string;
  minHeight?: string;
  width?: string;
  backdrop?: boolean;
}

export function SlideInModal({
                              isOpen,
                              onClose,
                              children,
                              position = 'bottom',
                              distance = 24,
                              className = '',
                              closeOnClickOutside = false,
                              closeOnEscape = true,
                              animationDuration = 300,
                              maxHeight = '80vh',
                              minHeight,
                              backdrop = false
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
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, onClose]);

  // Handle backdrop click (only if backdrop is enabled)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (backdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      left: '50%',
      transform: 'translateX(-50%)',
      maxHeight: maxHeight,
      minHeight: minHeight ?? maxHeight,
      zIndex: 800,
    };

    if (position === 'bottom') {
      return {
        ...baseStyles,
        bottom: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? '0' : '125%'})`,
      };
    } else {
      return {
        ...baseStyles,
        top: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? '0' : '-125%'})`,
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
            ${isAnimating ? 'opacity-30' : 'opacity-0'}
          `}
          onClick={handleBackdropClick}
        />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          bg-white shadow-[0_0_3px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden
          transition-transform duration-${animationDuration} ease-out bg-white min-w-[200px] min-h-[150px]
          scrollbar-hidden
          ${className}
        `}
        style={getPositionStyles()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="overflow-y-scroll scrollbar-hidden" style={{ maxHeight: maxHeight }}>
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
