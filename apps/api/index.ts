import { ApiClient, BibleClient } from "@youversion/bible-core";

async function main() {
  const apiClient = new ApiClient({
    appId: "V8lOX2LMfC6PGBawNiyywXbFTHafIvOjDIr9U82Zy5qGsrjv",
  });
  const bibleClient = new BibleClient(apiClient);

  try {
    const versionId = 206;
    const version = await bibleClient.getVersion(versionId);
    console.log("Version:", version);

    const books = await bibleClient.getBooks(versionId);
    console.log("Books:", books.data);
    const genesis = books.data.find((b) => b.usfm === "GEN");
    if (!genesis) {
      throw new Error("Genesis not found");
    }

    const chapter = await bibleClient.getChapter(versionId, genesis.usfm, 1);
    console.log("Chapter:", chapter);
    const verses = await bibleClient.getVerses(versionId, genesis.usfm, 1);
    console.log("Verses:", verses.data);
    const verse = await bibleClient.getVerse(versionId, genesis.usfm, 1, 1);
    console.log("Verse:", verse);
  } catch (error) {
    console.error("Error fetching Bible version:", error);
  }
}

main();
