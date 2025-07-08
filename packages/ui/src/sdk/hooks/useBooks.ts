"use client";
import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Book, Collection } from "@repo/core";

export function useBooks(versionId: number, options?: UseApiDataOptions) {
  const bibleClient = useBibleClient();

  const {
    data: books,
    loading,
    error,
    refetch,
  } = useApiData<Collection<Book>>(
    () => bibleClient.getBooks(versionId),
    [bibleClient, versionId],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { books, loading, error, refetch };
}
