"use client";

import { PlayIcon, StopIcon as PauseIcon, SpinnerIcon } from "../../../shared";
import { useReaderTextToSpeech } from "@youversion/bible-hooks";
import { ReactNode } from "react";

interface AudioButtonProps {
  className?: string;
  children?: ReactNode;
  iconSize?: number;
}

export function AudioButton({
  className,
  children,
  iconSize = 24,
}: AudioButtonProps) {
  const { isPlaying, isLoading, isAvailable, playChapter, stop } =
    useReaderTextToSpeech();

  function onClick() {
    if (isPlaying) {
      stop();
      return;
    }

    playChapter();
  }

  if (!isAvailable) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      title="Play chapter audio"
      className={`p-3 sm:p-2 flex items-center gap-1 rounded-full transition-colors shadow-sm bg-white hover:bg-border-primary active:bg-[#e7e4e4] ${
        isPlaying ? "cursor-not-allowed text-gray-400" : "hover:cursor-pointer "
      } ${className ?? ""}`}
    >
      {isLoading ? (
        <SpinnerIcon style={{ width: iconSize }} />
      ) : isPlaying ? (
        <PauseIcon style={{ width: iconSize }} />
      ) : (
        <PlayIcon style={{ width: iconSize }} />
      )}
      {children}
    </button>
  );
}
