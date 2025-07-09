"use client";

import { BibleSDKProvider } from "@youversion/bible-ui";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BibleSDKProvider appId="V8lOX2LMfC6PGBawNiyywXbFTHafIvOjDIr9U82Zy5qGsrjv">
      {children}
    </BibleSDKProvider>
  );
}
