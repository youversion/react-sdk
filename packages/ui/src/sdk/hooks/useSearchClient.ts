"use client";

import { useContext, useMemo } from "react";
import { BibleSDKContext } from "../context";
import { SearchClient, ApiClient } from "@youversion/bible-core";

export function useSearchClient(): SearchClient {
  const context = useContext(BibleSDKContext);
  return useMemo(() => {
    if (!context?.appId) {
      throw new Error(
        "BibleSDK context not found. Make sure your component is wrapped with BibleSDKProvider and an API key is provided."
      );
    }
    return new SearchClient(new ApiClient({ appId: context.appId }));
  }, [context?.appId]);
}
