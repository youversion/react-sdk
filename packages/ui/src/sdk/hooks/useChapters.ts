"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Chapter, Collection } from "@repo/core";

export function useChapters(
  versionId: number,
  usfm: string,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: chapters,
    loading,
    error,
    refetch,
  } = useApiData<Collection<Chapter>>(
    () => bibleClient.getChapters(versionId, usfm),
    [bibleClient, versionId, usfm],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { chapters, loading, error, refetch };
}
