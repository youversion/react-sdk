import { useCallback, useRef, useState } from "react";
import { useElevenLabsService } from "./useElevenLabsService";
import { speak } from "../features/bible-reader/audio";

interface TextToSpeechOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useTextToSpeech(options: TextToSpeechOptions = {}) {
  const { onPlay, onPause, onEnd, onError } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const elevenLabsService = useElevenLabsService();

  const playText = useCallback(async (text: string) => {
    if (isLoading || !elevenLabsService || !text.trim()) return;

    // If audio already exists, stop it first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      setIsLoading(true);
      const audio = await speak(text, {}, elevenLabsService);
      setIsLoading(false);

      if (!audio) return;

      audioRef.current = audio;
      setIsPlaying(true);
      onPlay?.();

      // When audio ends, reset state
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        audioRef.current = null;
        onEnd?.();
      });

      audio.addEventListener("error", () => {
        setIsPlaying(false);
        setIsLoading(false);
        onError?.(new Error('Audio playback failed'));
      });

    } catch (error) {
      setIsLoading(false);
      setIsPlaying(false);
      onError?.(error as Error);
    }
  }, [isLoading, elevenLabsService, onPlay, onEnd, onError]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  }, [onPause]);

  const resume = useCallback(async () => {
    if (audioRef.current && audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  }, [onPlay]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      audioRef.current = null;
      onPause?.();
    }
  }, [onPause]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else if (audioRef.current) {
      await resume();
    }
    // Note: For toggle to work with new text, you'd need to call playText directly
  }, [isPlaying, pause, resume]);

  return {
    isPlaying,
    isLoading,
    isAvailable: !!elevenLabsService,
    playText,
    pause,
    resume,
    stop,
    toggle,
    currentTime: audioRef.current?.currentTime || 0,
    duration: audioRef.current?.duration || 0,
  };
}
