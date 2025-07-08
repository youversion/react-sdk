"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Book } from "@youversion/bible-core";

export function useBook(
  versionId: number,
  book: string,
  options?: UseApiDataOptions
) {
  const bibleClient = useBibleClient();

  const { data, loading, error, refetch } = useApiData<Book>(
    () => bibleClient.getBook(versionId, book),
    [bibleClient, versionId, book],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { book: data, loading, error, refetch };
}
