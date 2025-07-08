# @react-sdk/core

Core logic and API client for the React SDK Bible project. This package provides TypeScript interfaces, API client utilities, and the main `BibleClient` class for interacting with Bible data.

## Features

- TypeScript types for Bible data (books, chapters, verses, versions, etc.)
- API client for fetching Bible content
- Simple, idiomatic interface for use in apps and libraries

## Installation

```bash
yarn add @react-sdk/core
# or
npm install @react-sdk/core
```

## Usage Example

```ts
import { ApiClient, BibleClient } from "@react-sdk/core";

async function main() {
  const apiClient = new ApiClient({
    appId: "YOUR_APP_ID",
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
    console.error("Error fetching:", error);
  }
}

main();
```
