"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Chapter, Collection } from "@repo/core";

export function useChapters(
  versionId: number,
  book: string,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: chapters,
    loading,
    error,
    refetch,
  } = useApiData<Collection<Chapter>>(
    () => bibleClient.getChapters(versionId, book),
    [bibleClient, versionId, book],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { chapters, loading, error, refetch };
}
