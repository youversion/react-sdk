"use client";
import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Chapter } from "@repo/core";

export function useChapter(
  versionId: number,
  usfm: string,
  chapter: number,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: chapterData,
    loading,
    error,
    refetch,
  } = useApiData<Chapter>(
    () => bibleClient.getChapter(versionId, usfm, chapter),
    [bibleClient, versionId, usfm, chapter],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { chapter: chapterData, loading, error, refetch };
}
