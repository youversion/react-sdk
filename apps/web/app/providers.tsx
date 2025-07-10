"use client";

import { ElevenLabsProvider } from "@youversion/bible-hooks";
import { BibleSDKProvider, ToastProvider } from "@youversion/bible-ui";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  appId: string;
  elevenLabsApiKey: string;
}

export function Providers({
  children,
  appId,
  elevenLabsApiKey,
}: ProvidersProps) {
  return (
    <BibleSDKProvider appId={appId}>
      <ElevenLabsProvider elevenLabsApiKey={elevenLabsApiKey}>
        <ToastProvider>{children}</ToastProvider>
      </ElevenLabsProvider>
    </BibleSDKProvider>
  );
}
