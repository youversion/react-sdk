"use client";

import { BibleSDKProvider } from "@youversion/bible-ui";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BibleSDKProvider appId={process.env.NEXT_PUBLIC_BIBLE_SDK_APP_ID ?? ""}>
      {children}
    </BibleSDKProvider>
  );
}
