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

  // Update position when prop changes
  useEffect(() => {
    if (position) {
      setCurrentPosition(position);
    }
  }, [position]);

  // Center modal if no position provided
  useEffect(() => {
    if (isOpen && !position && modalRef.current) {
      const modal = modalRef.current;
      const rect = modal.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;
      console.log('centering');
      //setCurrentPosition({ x: centerX, y: centerY });
    }
  }, [isOpen, position]);

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
    if (!draggable) return;
    
    const modal = modalRef.current;
    if (!modal) return;

    const rect = modal.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggable) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };

    // Keep modal within viewport bounds
    const modal = modalRef.current;
    if (modal) {
      const rect = modal.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      
      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y));
    }

    console.log(newPosition)
    console.log(currentPosition)
    setCurrentPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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

  const modalContent = (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${animationClasses[animation]}
      `}
    >      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative bg-white rounded-lg shadow-xl
          ${sizeClasses[size]}
          ${animationClasses[animation]}
          ${getAnimationStyle()}
          ${isDragging ? 'cursor-grabbing' : ''}
          ${animation === 'fade' ? (isAnimating ? 'opacity-0' : 'opacity-100') : ''}
          ${className}
        `}
        style={{
          position: position ? 'fixed' : 'relative',
          left: position ? `${currentPosition.x}px` : 'auto',
          top: position ? `${currentPosition.y}px` : 'auto',
          transform: position ? 'none' : 'translate(-50%, -50%)',
          margin: position ? '0' : 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton || draggable) && (
          <div
            ref={headerRef}
            className={`
              flex items-center justify-between p-4 border-b border-gray-200
              ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
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
                onMouseDown={(e) => e.stopPropagation()}
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
 