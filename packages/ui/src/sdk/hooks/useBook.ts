"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Book } from "@repo/core";

export function useBook(
  versionId: number,
  usfm: string,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const {
    data: book,
    loading,
    error,
    refetch,
  } = useApiData<Book>(
    () => bibleClient.getBook(versionId, usfm),
    [bibleClient, versionId, usfm],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { book, loading, error, refetch };
}
