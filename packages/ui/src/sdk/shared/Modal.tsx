import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Position {
  x: number;
  y: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?: Position;
  draggable?: boolean;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animation?: 'fade' | 'slide' | 'scale' | 'none';
}

export function Modal({
  isOpen,
  onClose,
  position,
  draggable = false,
  children,
  className = '',
  showCloseButton = true,
  closeOnEscape = true,
  title,
  size = 'md',
  animation = 'fade'
}: ModalProps) {
  const [currentPosition, setCurrentPosition] = useState<Position>(
    position || { x: 0, y: 0 }
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // --- NEW: Ref to track if the modal has been centered once ---
  const isCenteredRef = useRef(false);

  // --- NEW: Effect to reset centering flag when modal closes ---
  useEffect(() => {
    if (!isOpen) {
      isCenteredRef.current = false;
    }
  }, [isOpen]);

  // --- MODIFIED: Effect to center the modal only ONCE when it opens (if no position prop) ---
  useEffect(() => {
    // Only attempt to center if the modal is open, no position prop is provided,
    // the modal ref is available, and it hasn't been centered before.
    if (isOpen && !position && modalRef.current && !isCenteredRef.current) {
      const modal = modalRef.current;

      const centerModal = () => {
        const rect = modal.getBoundingClientRect();
        setCurrentPosition({
          x: (window.innerWidth - rect.width) / 2,
          y: (window.innerHeight - rect.height) / 2
        });
        isCenteredRef.current = true; // Mark as centered so it doesn't re-center on subsequent renders
      };

      // Use a timeout to ensure the modal is rendered and has its dimensions
      const timer = setTimeout(centerModal, 0);

      // Add resize listener only if initially centered and not explicitly positioned
      // This allows the modal to re-center if the viewport size changes
      const handleResize = () => {
        if (isOpen && !position && modalRef.current) { // Added modalRef.current check
          centerModal();
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, position]); // Depend only on isOpen and position to trigger initial centering

  // --- MODIFIED: Keep this effect for external position prop changes ---
  // This effect ensures that if the 'position' prop changes *while the modal is open*
  // (and not being dragged), its position updates.
  useEffect(() => {
    if (position && !isDragging) {
      setCurrentPosition(position);
    }
  }, [position, isDragging]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full w-full h-full'
  };

  // Animation classes
  const animationClasses = {
    fade: 'transition-opacity duration-300',
    slide: 'transition-transform duration-300',
    scale: 'transition-transform duration-300',
    none: ''
  };

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

  // Handle animation state
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable || !headerRef.current || !modalRef.current) return;
    
    // Ensure dragging only starts from the header
    if (!headerRef.current.contains(e.target as Node)) {
        return;
    }

    const modal = modalRef.current;
    const rect = modal.getBoundingClientRect();
    
    // Calculate offset from mouse to modal's top-left corner
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);

    // Prevent default browser drag behavior
    e.preventDefault(); 
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggable || !modalRef.current) return;
    
    const modal = modalRef.current;
    const rect = modal.getBoundingClientRect();

    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    // Keep modal within viewport bounds
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    
    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));
    
    setCurrentPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Optional: Add touch event listeners for mobile dragging
      document.addEventListener('touchmove', handleMouseMove as any); // Cast to any for touch events
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove as any);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  const getAnimationStyle = () => {
    if (animation === 'slide') {
      return isAnimating ? 'translate-y-4' : 'translate-y-0';
    }
    if (animation === 'scale') {
      return isAnimating ? 'scale-95' : 'scale-100';
    }
    return '';
  };

  // The outer div should just handle the overlay and flex centering (if not dragging)
  // The modalRef div will now handle its own fixed positioning.
  const modalContent = (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${animationClasses[animation]}
        ${animation === 'fade' ? (isAnimating ? 'opacity-0' : 'opacity-100') : ''}
      `}
      // This click handler is for closing the modal when clicking outside it
      // if you choose to implement that functionality.
      // For now, it just prevents clicks on the overlay from interfering.
      onClick={onClose} // Or a dedicated handler for backdrop click
    >      
      {/* Modal - This is the element that will be dragged */}
      <div
        ref={modalRef}
        className={`
          bg-white rounded-lg shadow-xl
          ${sizeClasses[size]}
          ${animationClasses[animation]}
          ${getAnimationStyle()}
          ${isDragging ? 'cursor-grabbing' : ''}
          ${className}
        `}
        // Crucial: Use currentPosition for 'left' and 'top'
        // Always position fixed relative to the viewport for dragging.
        style={{
          position: 'fixed', // Always fixed for drag functionality
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          // Ensure no conflicting transforms or margins when fixed positioning is used
          transform: 'none', 
          margin: '0', 
          // Set z-index higher than the overlay, if overlay has one
          zIndex: 51 // A bit higher than the backdrop's 50
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on modal content from closing backdrop
      >
        {/* Header */}
        {(title || showCloseButton || draggable) && (
          <div
            ref={headerRef}
            className={`
              flex items-center justify-between p-4 border-b border-gray-200
              ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
              ${draggable ? 'select-none' : ''} {/* Prevent text selection during drag */}
            `}
            onMouseDown={handleMouseDown}
          >
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 select-none">
                {title}
              </h3>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                onMouseDown={(e) => e.stopPropagation()} // Stop propagation for the close button
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`${title || showCloseButton || draggable ? 'p-4' : 'p-6'}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
 