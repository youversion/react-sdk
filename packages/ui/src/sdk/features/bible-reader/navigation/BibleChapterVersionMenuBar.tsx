"use client";

import { useState, MouseEvent } from "react";

interface BibleChapterVersionSelectorProps {
  chapter?: string;
  version?: string;
  onChapterButtonClicked?: () => void;
  onVersionButtonClicked?: () => void;
  chapterButtonDisabled?: boolean;
  versionButtonDisabled?: boolean;
  className?: string;
}

export function BibleChapterVersionMenuBar({
  chapter = "James 1",
  version = "NIV",
  onChapterButtonClicked,
  onVersionButtonClicked,
  chapterButtonDisabled = false,
  versionButtonDisabled = false,
  className = "",
}: BibleChapterVersionSelectorProps) {
  const [isChapterPressed, setIsChapterPressed] = useState(false);
  const [isVersionPressed, setIsVersionPressed] = useState(false);

  const handleChapterClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!chapterButtonDisabled && onChapterButtonClicked) {
      onChapterButtonClicked();
    }
  };

  const handleVersionClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!versionButtonDisabled && onVersionButtonClicked) {
      onVersionButtonClicked();
    }
  };

  const baseButtonClasses = `
    relative py-2.5 px-4 sm:px-6 
    font-bold text-[13px] 
    transition-all duration-150 ease-in-out
    select-none
    cursor-pointer
  `;

  const chapterButtonClasses = `
    ${baseButtonClasses}
    flex-grow
    ${
      isChapterPressed && !chapterButtonDisabled
        ? "bg-[#e7e4e4] shadow-inner"
        : "bg-[#EDEBEB] hover:bg-gray-150 active:bg-[#e7e4e4]"
    }
  `;

  const versionButtonClasses = `
    ${baseButtonClasses}
    px-3
    uppercase
    ${
      isVersionPressed && !versionButtonDisabled
        ? "bg-[#e7e4e4] shadow-inner"
        : "bg-[#EDEBEB] hover:bg-gray-150 active:bg-[#e7e4e4]"
    }
  `;

  return (
    <div
      className={`
      flex gap-[2px] rounded-full bg-white overflow-hidden w-fit
      ${className}
    `}
    >
      <button
        className={chapterButtonClasses}
        onClick={handleChapterClick}
        onMouseDown={() => !chapterButtonDisabled && setIsChapterPressed(true)}
        onMouseUp={() => setIsChapterPressed(false)}
        onMouseLeave={() => setIsChapterPressed(false)}
        aria-label={`Select chapter: ${chapter}`}
      >
        {chapter}
      </button>

      <button
        className={versionButtonClasses}
        onClick={handleVersionClick}
        onMouseDown={() => !versionButtonDisabled && setIsVersionPressed(true)}
        onMouseUp={() => setIsVersionPressed(false)}
        onMouseLeave={() => setIsVersionPressed(false)}
        aria-label={`Select version: ${version}`}
      >
        {version.slice(0, 4)}
      </button>
    </div>
  );
}
