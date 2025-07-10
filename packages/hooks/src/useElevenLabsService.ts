import { useContext } from "react";
import { ElevenLabsContext } from "./context/ElevenLabsContext";
import { ElevenLabsService } from "./useTextToSpeech";

export const useElevenLabsService = () => {
  const context = useContext(ElevenLabsContext);
  if (!context) return null;
  return new ElevenLabsService(context.elevenLabsApiKey);
};
