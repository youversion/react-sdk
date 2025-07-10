"use client";

import { PropsWithChildren, ReactNode } from "react";
import { ElevenLabsContext } from "./ElevenLabsContext";

type ElevenLabsProviderProps = {
  children: ReactNode;
  elevenLabsApiKey: string;
};

export function ElevenLabsProvider({
  elevenLabsApiKey,
  children,
}: PropsWithChildren<ElevenLabsProviderProps>) {
  return (
    <ElevenLabsContext.Provider value={{ elevenLabsApiKey }}>
      {children}
    </ElevenLabsContext.Provider>
  );
}
