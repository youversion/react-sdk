import { useCallback, useRef, useState } from "react";
import { useElevenLabsService } from "./useElevenLabsService";

interface TextToSpeechOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// Constants
// ============================================================================

// TODO: Read from env in future, but for now we follow the design doc and hard-code.
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const DEFAULT_MODEL_ID = "eleven_multilingual_v2";
const FAST_MODEL_ID = "eleven_turbo_v2";

// ============================================================================
// Types
// ============================================================================

// ============================================================================
// ElevenLabsService
// ============================================================================

// TODO: This will live on the server in the future.

/**
 * A lightweight client for the ElevenLabs Text-to-Speech API.
 * Handles audio generation and playback in the browser.
 */
export class ElevenLabsService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.elevenlabs.io/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Converts text to speech using the ElevenLabs API.
   * @returns Raw audio data as an ArrayBuffer
   */
  async generateSpeech(
    text: string,
    voiceId: string,
    modelId: string = FAST_MODEL_ID
  ): Promise<ArrayBuffer> {
    const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": this.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Speech generation failed (${response.status}): ${error}`
      );
    }

    return response.arrayBuffer();
  }

  /**
   * Converts text to speech and plays it in the browser.
   * @returns The HTMLAudioElement that's playing the speech
   */
  async playText(
    text: string,
    voiceId: string,
    modelId: string = FAST_MODEL_ID
  ): Promise<HTMLAudioElement> {
    const audioBuffer = await this.generateSpeech(text, voiceId, modelId);
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);

    // Clean up the object URL when audio ends
    const onEnded = () => {
      URL.revokeObjectURL(audioUrl);
      audio.removeEventListener("ended", onEnded);
    };
    audio.addEventListener("ended", onEnded);

    await audio.play();
    return audio;
  }
}

// ============================================================================
// Public API
// ============================================================================

/** Options for controlling speech generation. */
export interface SpeakOptions {
  /** Voice model identifier – see ElevenLabs dashboard. */
  modelId?: string;
}

/**
 * Converts text to speech using ElevenLabs TTS and plays the audio.
 *
 * @param text - The text to convert to speech
 * @param opts - Optional settings for speech generation
 * @returns The HTMLAudioElement playing the speech, or null if there was an error
 */
export async function speak(
  text: string,
  opts: SpeakOptions = {},
  elevenLabsService: ElevenLabsService
): Promise<HTMLAudioElement | null> {
  if (!text?.trim()) return null;

  const { modelId } = opts;
  const effectiveModelId = modelId ?? FAST_MODEL_ID;

  try {
    return await elevenLabsService.playText(text, VOICE_ID, effectiveModelId);
  } catch (error) {
    console.error("ElevenLabs TTS error:", error);
    return null;
  }
}

export function useTextToSpeech(options: TextToSpeechOptions = {}) {
  const { onPlay, onPause, onEnd, onError } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const elevenLabsService = useElevenLabsService();

  const playText = useCallback(
    async (text: string) => {
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
          onError?.(new Error("Audio playback failed"));
        });
      } catch (error) {
        setIsLoading(false);
        setIsPlaying(false);
        onError?.(error as Error);
      }
    },
    [isLoading, elevenLabsService, onPlay, onEnd, onError]
  );

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
