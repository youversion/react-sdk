"use client";

import { useBibleClient } from "./useBibleClient";
import { useApiData, UseApiDataOptions } from "./useApiData";
import { Version } from "@repo/core";

export function useVersion(versionId: number, options?: UseApiDataOptions) {
  const bibleClient = useBibleClient();

  const {
    data: version,
    loading,
    error,
    refetch,
  } = useApiData<Version>(
    () => bibleClient.getVersion(versionId),
    [bibleClient, versionId],
    {
      enabled: options?.enabled !== false,
    }
  );

  return { version, loading, error, refetch };
}
