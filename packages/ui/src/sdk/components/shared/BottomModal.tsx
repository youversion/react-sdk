import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState, useRef } from "react";

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'top' | 'bottom';
  distance?: number; // Distance from edge in pixels
  className?: string;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  animationDuration?: number; // In milliseconds
  maxHeight?: string;
  width?: string;
  backdrop?: boolean;
}

export function BottomModal({
                              isOpen,
                              onClose,
                              children,
                              position = 'bottom',
                              distance = 24,
                              className = '',
                              showCloseButton = true,
                              closeOnClickOutside = false,
                              closeOnEscape = true,
                              animationDuration = 300,
                              maxHeight = '80vh',
                              width = 'auto',
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
      width: width,
      maxHeight: maxHeight,
      zIndex: 1000,
    };

    if (position === 'bottom') {
      return {
        ...baseStyles,
        bottom: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? '0' : '100%'})`,
      };
    } else {
      return {
        ...baseStyles,
        top: `${distance}px`,
        transform: `translateX(-50%) translateY(${isAnimating ? '0' : '-100%'})`,
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
          bg-white rounded-lg shadow-xl border border-gray-200
          transition-transform duration-${animationDuration} ease-out
          ${className}
        `}
        style={getPositionStyles()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: maxHeight }}>
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}