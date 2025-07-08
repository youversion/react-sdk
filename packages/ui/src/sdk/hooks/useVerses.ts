"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Verse, Collection } from "@repo/core";

export function useVerses(
  versionId: number,
  usfm: string,
  chapter: number,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: verses,
    loading,
    error,
    refetch,
  } = useApiData<Collection<Verse>>(
    () => bibleClient.getVerses(versionId, usfm, chapter),
    [bibleClient, versionId, usfm, chapter],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { verses, loading, error, refetch };
}
