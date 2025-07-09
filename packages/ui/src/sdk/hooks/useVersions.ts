"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Collection, Version } from "@youversion/bible-core";

export function useVersions(languageRanges: string = 'en', options?: UseApiDataOptions) {
  const bibleClient = useBibleClient();

  const {
    data: versions,
    loading,
    error,
    refetch,
  } = useApiData<Collection<Version>>(
    () => bibleClient.getVersions(languageRanges),
    [bibleClient, languageRanges],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { versions, loading, error, refetch };
}
