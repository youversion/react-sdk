import { BibleClient } from "@youversion/bible-core";
import { extractTextFromHtml } from "../../../utils/extractTextFromHTML";

export async function getVerseText(
  usfms: string[],
  bibleClient: BibleClient,
  versionId: number,
  bookId: string,
) {
  const versesPromises = [];

  for (const usfm of usfms) {
    const [, chapter, verseNumber] = usfm.split(".");

    if (!chapter || !verseNumber) {
      continue;
    }

    versesPromises.push(
      bibleClient.getVerse(
        versionId,
        bookId,
        parseInt(chapter),
        parseInt(verseNumber),
      ),
    );
  }

  const verses = await Promise.all(versesPromises);

  return verses
    .map(
      (verse) => extractTextFromHtml(verse.content) + ` - ${verse.reference}`,
    )
    .join("\n");
}
