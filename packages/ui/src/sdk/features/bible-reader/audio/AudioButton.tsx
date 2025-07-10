"use client";

import { useState, useCallback, useRef } from "react";
import { speak, extractTextFromHtml } from "./ElevenLabs";
import { useReaderContext } from "../../../context";
import { useElevenLabsService, useVerses } from "../../../hooks";
import { PlayIcon, StopIcon as PauseIcon, SpinnerIcon } from "../../../shared";

interface AudioButtonProps {
  /** Optional additional className */
  className?: string;
}

export function AudioButton({ className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentVersion, currentBook, currentChapter } = useReaderContext();
  const elevenLabsService = useElevenLabsService();

  const { verses } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title)
  );

  const handleToggle = useCallback(async () => {
    // Toggle play / pause behaviour
    if (isLoading || !elevenLabsService) return; // ignore until loaded
    if (audioRef.current) {
      if (audioRef.current.paused) {
        // Resume playback
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        // Pause playback but keep position
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (!verses?.data?.length) return;

    const text = verses.data
      .map((v) => extractTextFromHtml(v.content))
      .join(" ");

    try {
      setIsLoading(true);
      const audio = await speak(text, {}, elevenLabsService);
      setIsLoading(false);
      if (!audio) return;

      audioRef.current = audio;
      setIsPlaying(true);

      // When audio ends, reset state
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        audioRef.current = null;
      });
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [verses, isLoading, elevenLabsService]);

  if (!elevenLabsService) return <></>;

  return (
    <button
      type="button"
      onClick={handleToggle}
      title="Play chapter audio"
      className={`p-3 sm:p-2 rounded-full transition-colors bg-[#EDEBEB] hover:shadow-sm active:bg-[#e7e4e4] ${
        isPlaying ? "cursor-not-allowed text-gray-400" : "hover:cursor-pointer"
      } ${className ?? ""}`}
    >
      {isLoading ? <SpinnerIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
