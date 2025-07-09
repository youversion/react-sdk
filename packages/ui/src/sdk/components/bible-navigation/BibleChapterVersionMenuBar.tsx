"use client"

import React, { useState } from 'react';

interface BibleChapterVersionSelectorProps {
  chapter?: string;
  version?: string;
  onChapterButtonClicked?: () => void;
  onVersionButtonClicked?: () => void;
  disabled?: boolean;
  className?: string;
}

export function BibleChapterVersionMenuBar({
                                              chapter = "James 1",
                                              version = "NIV",
                                              onChapterButtonClicked,
                                              onVersionButtonClicked,
                                              disabled = false,
                                              className = ""
                                            }: BibleChapterVersionSelectorProps) {
  const [isChapterPressed, setIsChapterPressed] = useState(false);
  const [isVersionPressed, setIsVersionPressed] = useState(false);

  const handleChapterClick = () => {
    if (!disabled && onChapterButtonClicked) {
      onChapterButtonClicked();
    }
  };

  const handleVersionClick = () => {
    if (!disabled && onVersionButtonClicked) {
      onVersionButtonClicked();
    }
  };

  const baseButtonClasses = `
    relative py-2.5 px-6 
    font-bold text-[13px] 
    transition-all duration-150 ease-in-out
    select-none
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-sm'}
  `;

  const chapterButtonClasses = `
    ${baseButtonClasses}
    ${isChapterPressed && !disabled
    ? 'bg-gray-200 shadow-inner'
    : 'bg-gray-100 hover:bg-gray-150 active:bg-gray-200 active:scale-95'
    }
  `;

  const versionButtonClasses = `
    ${baseButtonClasses}
    px-3
    ${isVersionPressed && !disabled
    ? 'bg-gray-200 shadow-inner'
    : 'bg-gray-100 hover:bg-gray-150 active:bg-gray-200 active:scale-95'
    }
  `;

  return (
    <div className={`
      flex gap-1 rounded-2xl bg-white overflow-hidden w-fit 
      drop-shadow-md hover:drop-shadow-lg transition-shadow duration-200
      ${className}
    `}>
      <button
        className={chapterButtonClasses}
        onClick={handleChapterClick}
        onMouseDown={() => !disabled && setIsChapterPressed(true)}
        onMouseUp={() => setIsChapterPressed(false)}
        onMouseLeave={() => setIsChapterPressed(false)}
        disabled={disabled}
        aria-label={`Select chapter: ${chapter}`}
      >
        {chapter}
      </button>

      <button
        className={versionButtonClasses}
        onClick={handleVersionClick}
        onMouseDown={() => !disabled && setIsVersionPressed(true)}
        onMouseUp={() => setIsVersionPressed(false)}
        onMouseLeave={() => setIsVersionPressed(false)}
        disabled={disabled}
        aria-label={`Select version: ${version}`}
      >
        {version}
      </button>
    </div>
  );
}
