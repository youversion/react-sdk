import React, { useState, useRef, useEffect } from 'react';

interface DraggableModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  title?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function DraggableModal({
                                 isOpen,
                                 onClose,
                                 children,
                                 initialPosition = { x: 100, y: 100 },
                                 title,
                                 className = '',
                                 width = 400,
                                 height = 300,
                               }: DraggableModalProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition(initialPosition);
    }
  }, [isOpen, initialPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;

    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep modal within viewport bounds
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className={`absolute bg-white rounded-lg shadow-xl border ${className}`}
        style={{
          left: position.x,
          top: position.y,
          width: width,
          height: height,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {title || 'Modal'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10 hover:cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
