/**
 * Finds a specific verse element by its USFM identifier.
 *
 * @param usfm - The USFM (Unified Standard Format Marker) identifier for the verse
 * @returns The DOM element with the matching data-usfm attribute, or null if not found
 *
 * @example
 * ```typescript
 * const verse = findVerseElement('GEN.1.1');
 * if (verse) {
 *   verse.scrollIntoView();
 * }
 * ```
 */
export function findVerseElement(usfm: string) {
  return document.querySelector(`[data-usfm="${usfm}"]`);
}

/**
 * Finds all verse elements on the page.
 *
 * @returns A NodeList of all DOM elements with data-usfm attributes
 *
 * @example
 * ```typescript
 * const allVerses = findAllVerseElements();
 * allVerses.forEach(verse => {
 *   console.log(verse.getAttribute('data-usfm'));
 * });
 * ```
 */
export function findAllVerseElements() {
  return document.querySelectorAll("[data-usfm]");
}
