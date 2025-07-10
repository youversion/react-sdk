import { useContext } from "react";
import { ElevenLabsContext } from "../context/ElevenLabsContext";
import { ElevenLabsService } from "../features/bible-reader/audio/ElevenLabs";

export const useElevenLabsService = () => {
  const context = useContext(ElevenLabsContext);
  if (!context) return null;
  return new ElevenLabsService(context.elevenLabsApiKey);
};
