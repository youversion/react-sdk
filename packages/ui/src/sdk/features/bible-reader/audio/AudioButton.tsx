"use client";

import { PlayIcon, StopIcon as PauseIcon, SpinnerIcon } from "../../../shared";
import { useReaderTextToSpeech } from "./useReaderTextToSpeech";
import { useVerseSelection } from "../../verse-selection";

interface AudioButtonProps {
  /** Optional additional className */
  className?: string;
}

export function AudioButton({ className }: AudioButtonProps) {
  const { isPlaying, isLoading, isAvailable, playChapter, playVerses, stop } = useReaderTextToSpeech({
    onPlay: () => console.log('Audio started'),
    onPause: () => console.log('Audio paused'),
    onEnd: () => console.log('Audio ended'),
    onError: (error: Error) => console.error('Audio error:', error),
  });

  const { selectedVerseUsfms } = useVerseSelection();

  function onClick() {
    if (isPlaying) {
      stop();
      return;
    }

    if (selectedVerseUsfms && selectedVerseUsfms.size > 0) {
      playVerses(Array.from(selectedVerseUsfms));
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
      className={`p-3 sm:p-2 rounded-full transition-colors bg-[#EDEBEB] hover:shadow-sm active:bg-[#e7e4e4] ${
        isPlaying ? "cursor-not-allowed text-gray-400" : "hover:cursor-pointer"
      } ${className ?? ""}`}
    >
      {isLoading ? <SpinnerIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
