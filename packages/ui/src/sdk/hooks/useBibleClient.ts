"use client";

import { useContext, useMemo } from "react";
import { BibleKitContext } from "../context/BibleKitContext";
import { BibleClient, ApiClient } from "@youversion/bible-core";

export function useBibleClient(): BibleClient {
  const context = useContext(BibleKitContext);
  return useMemo(() => {
    if (!context?.appId) {
      throw new Error(
        "BibleKit context not found. Make sure your component is wrapped with BibleKitProvider and an API key is provided."
      );
    }
    return new BibleClient(new ApiClient({ appId: context.appId }));
  }, [context?.appId]);
}
