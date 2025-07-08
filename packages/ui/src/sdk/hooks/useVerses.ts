"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Verse, Collection } from "@youversion/bible-core";

export function useVerses(
  versionId: number,
  book: string,
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
    () => bibleClient.getVerses(versionId, book, chapter),
    [bibleClient, versionId, book, chapter],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { verses, loading, error, refetch };
}
