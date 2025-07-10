/**
 * Formats an array of USFM (Unified Standard Format Marker) strings into a compact range format.
 *
 * Consecutive verses are grouped into ranges (e.g., "GEN.1.1-GEN.1.3"), while
 * non-consecutive verses are separated by commas. The function automatically sorts
 * the input USFMs to ensure proper ordering.
 *
 * @param usfms - Array of USFM strings in the format "BOOK.CHAPTER.VERSE"
 * @returns A formatted string with ranges and individual verses separated by commas
 *
 * @example
 * ```typescript
 * formatVerseSelection(['GEN.1.1', 'GEN.1.2', 'GEN.1.3', 'GEN.1.5']);
 * // Returns: "GEN.1.1-GEN.1.3,GEN.1.5"
 *
 * formatVerseSelection(['GEN.1.1', 'GEN.1.3', 'GEN.1.5']);
 * // Returns: "GEN.1.1,GEN.1.3,GEN.1.5"
 *
 * formatVerseSelection(['GEN.1.1']);
 * // Returns: "GEN.1.1"
 * ```
 */
export function formatVerseSelection(usfms: string[]): string {
  if (usfms.length === 0) return "";

  // Sort USFMs to ensure proper ordering
  const sortedUsfms = usfms.filter(isValidVerse).sort((a, b) => {
    const [bookA, chapterA, verseA] = a.split(".");
    const [bookB, chapterB, verseB] = b.split(".");

    if (!bookA || !chapterA || !verseA) return 0;

    if (bookA !== bookB) return bookA.localeCompare(bookB!);
    if (chapterA !== chapterB) return parseInt(chapterA) - parseInt(chapterB!);
    return parseInt(verseA) - parseInt(verseB!);
  });

  const groups: string[][] = [];
  let currentGroup: string[] = [];

  for (let i = 0; i < sortedUsfms.length; i++) {
    const current = sortedUsfms[i] as string;
    const [book, chapter, verse] = current.split(".");

    if (currentGroup.length === 0) {
      currentGroup.push(current);
    } else {
      const lastInGroup = currentGroup[currentGroup.length - 1]!;
      const [lastBook, lastChapter, lastVerse] = lastInGroup.split(".");

      // Check if current verse is consecutive to the last verse in the group
      const isConsecutive =
        book === lastBook &&
        chapter === lastChapter &&
        parseInt(verse!) === parseInt(lastVerse!) + 1;

      if (isConsecutive) {
        currentGroup.push(current);
      } else {
        // Start a new group
        groups.push([...currentGroup]);
        currentGroup = [current];
      }
    }
  }

  // Add the last group
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Format each group
  const formattedGroups = groups.map((group) => {
    if (group.length === 1) {
      return group[0];
    } else {
      return `${group[0]}-${group[group.length - 1]}`;
    }
  });

  return formattedGroups.join(",");
}

function isValidVerse(v: string | undefined): v is string {
  if (!v) return false;
  const parts = v.split(".");
  return parts.length === 3 && parts.every((part) => part.length > 0);
}
