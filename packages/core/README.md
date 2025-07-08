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

// Initialize the API client (provide your App ID)
const apiClient = new ApiClient({ appId: "" });

// Create a BibleClient instance
const bible = new BibleClient(apiClient);

async function fetchGenesis1() {
  // Get the ESV version (example ID: 1)
  const version = await bible.getVersion(1);
  // Get all books in this version
  const books = await bible.getBooks(version.id);
  // Find Genesis by USFM code (usually "GEN")
  const genesis = books.find((b) => b.usfm === "GEN");
  if (!genesis) throw new Error("Genesis not found");
  // Get chapters in Genesis
  const chapters = await bible.getChapters(version.id, genesis.usfm);
  // Get the first chapter
  const chapter1 = await bible.getChapter(version.id, genesis.usfm, 1);
  // Get verses in the first chapter
  const verses = await bible.getVerses(version.id, genesis.usfm, 1);
  console.log(verses);
}

fetchGenesis1();
```
