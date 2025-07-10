"use client";

import { useState } from "react";

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
  className = "",
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
    relative py-2.5 px-4 sm:px-6 
    font-bold text-[13px] 
    transition-all duration-150 ease-in-out
    select-none
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:shadow-sm"}
  `;

  const chapterButtonClasses = `
    ${baseButtonClasses}
    flex-grow
    ${
      isChapterPressed && !disabled
        ? "bg-[#e7e4e4] shadow-inner"
        : "bg-[#EDEBEB] hover:bg-gray-150 active:bg-[#e7e4e4]"
    }
  `;

  const versionButtonClasses = `
    ${baseButtonClasses}
    px-3
    uppercase
    ${
      isVersionPressed && !disabled
        ? "bg-[#e7e4e4] shadow-inner"
        : "bg-[#EDEBEB] hover:bg-gray-150 active:bg-[#e7e4e4]"
    }
  `;

  return (
    <div
      className={`
      flex gap-[2px] rounded-full bg-white overflow-hidden w-fit 
      drop-shadow-md hover:drop-shadow-lg transition-shadow duration-200
      ${className}
    `}
    >
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
        {version.slice(0, 4)}
      </button>
    </div>
  );
}
