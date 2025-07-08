"use client";
import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Chapter } from "@repo/core";

export function useChapter(
  versionId: number,
  book: string,
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
    () => bibleClient.getChapter(versionId, book, chapter),
    [bibleClient, versionId, book, chapter],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { chapter: chapterData, loading, error, refetch };
}
