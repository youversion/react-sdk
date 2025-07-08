"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Verse } from "@repo/core";

export function useVerse(
  versionId: number,
  book: string,
  chapter: number,
  verse: number,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: verseData,
    loading,
    error,
    refetch,
  } = useApiData<Verse>(
    () => bibleClient.getVerse(versionId, book, chapter, verse),
    [bibleClient, versionId, book, chapter, verse],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { verse: verseData, loading, error, refetch };
}
