"use client";

import { BibleKitProvider } from "@repo/ui";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BibleKitProvider appId="V8lOX2LMfC6PGBawNiyywXbFTHafIvOjDIr9U82Zy5qGsrjv">
      {children}
    </BibleKitProvider>
  );
}