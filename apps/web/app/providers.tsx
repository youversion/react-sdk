"use client";

import { BibleSDKProvider } from "@youversion/bible-ui";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  appId: string;
}

export function Providers({ children, appId }: ProvidersProps) {
  return (
    <BibleSDKProvider appId={appId}>
      {children}
    </BibleSDKProvider>
  );
}
