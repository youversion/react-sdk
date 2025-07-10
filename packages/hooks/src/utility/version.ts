import { Version } from "@youversion/bible-core";

export function getISOFromVersion(version: Version): string {
  return version.language.iso_639_1 || version.language.iso_639_3 || "unknown";
}
