"use client";

import { createContext } from "react";

type ElevenLabsContextData = {
  elevenLabsApiKey: string;
};

export const ElevenLabsContext = createContext<ElevenLabsContextData | null>(
  null
);
