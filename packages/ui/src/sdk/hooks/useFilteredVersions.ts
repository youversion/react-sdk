"use client";

import { Version } from "@youversion/bible-core";
import { useMemo } from "react";

/**
 * Custom hook to filter versions based on search term
 */
export function useFilteredVersions(
  versions: Version[],
  searchTerm: string,
  selectedLanguage: string
): Version[] {
  return useMemo(() => {
    let result = [...versions];

    // Language filter
    if (selectedLanguage && selectedLanguage !== "*") {
      result = result.filter(
        (v) =>
          (
            v.language.iso_639_1 ||
            v.language.iso_639_3 ||
            "unknown"
          ).toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (version) =>
          version.title.toLowerCase().includes(searchLower) ||
          version.abbreviation.toLowerCase().includes(searchLower) ||
          version.language.iso_639_1.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [versions, searchTerm, selectedLanguage]);
}
