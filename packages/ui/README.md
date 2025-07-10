# @youversion/bible-ui

A comprehensive React UI component library for building Bible applications. This package provides ready-to-use components, hooks, and providers for creating rich Bible reading experiences with features like verse selection, audio playback, search, and user authentication.

## =� Features

- **=� Complete Bible Reader** - Full-featured Bible reading component with navigation
- **<� Verse Selection** - Interactive verse selection with action menus
- **=
  Audio Playback** - Text-to-speech integration with ElevenLabs
- **=
  Search Functionality** - Powerful Bible search with result highlighting
- **= Authentication** - YouVersion login integration
- **<� Customizable UI** - Tailwind CSS styling with theming support
- **=� Responsive Design** - Mobile-first responsive components
- **� Performance Optimized** - Efficient data fetching and caching
- **=' TypeScript Support** - Full TypeScript definitions and type safety
- **=� Storybook Integration** - Comprehensive component documentation

## =� Installation

```bash
# npm
npm install @youversion/bible-ui @youversion/bible-core

# yarn
yarn add @youversion/bible-ui @youversion/bible-core

# pnpm
pnpm add @youversion/bible-ui @youversion/bible-core
```

### CSS Import

Import the required CSS file in your application:

```ts
import "@youversion/bible-ui/styles.css";
```

## Getting Started

Before using the components, you'll need to obtain an App ID from the [YouVersion Developer Portal](https://developers.youversion.com/).

## Quick Start

### Basic Bible Reader

```tsx
import { BibleSDKProvider, BibleReader } from "@youversion/bible-ui";

function App() {
  return (
    <BibleSDKProvider appId="YOUR_APP_ID">
      <BibleReader />
    </BibleSDKProvider>
  );
}
```

### Custom Bible Reading Experience

```tsx
import {
  BibleSDKProvider,
  ReaderProvider,
  ChapterRenderer,
  BibleReaderNavigator,
  VerseSelectionProvider,
  VerseActionModal,
} from "@youversion/bible-ui";

function CustomBibleReader() {
  return (
    <BibleSDKProvider appId="YOUR_APP_ID">
      <ReaderProvider
        currentVersion={version}
        currentBook={book}
        currentChapter={chapter}
        currentVerse={null}
      >
        <VerseSelectionProvider>
          <div className="bible-reader">
            <ChapterRenderer />
            <VerseActionModal />
            <BibleReaderNavigator placement="bottom" />
          </div>
        </VerseSelectionProvider>
      </ReaderProvider>
    </BibleSDKProvider>
  );
}
```

## Core Components

### BibleReader

The main component that provides a complete Bible reading experience.

```tsx
import { BibleReader } from "@youversion/bible-ui";

<BibleReader />;
```

### ChapterRenderer

Renders Bible chapter content with verse selection capabilities.

```tsx
import { ChapterRenderer } from "@youversion/bible-ui";

<ChapterRenderer />;
```

### BibleReaderNavigator

Navigation component for switching between books, chapters, and versions.

```tsx
import { BibleReaderNavigator } from "@youversion/bible-ui";

<BibleReaderNavigator placement="bottom" />;
```

### Search Components

Powerful search functionality with result highlighting.

```tsx
import { Search, SearchResults } from '@youversion/bible-ui';

<Search />
<SearchResults />
```

### Authentication

YouVersion login integration for personalized experiences.

```tsx
import { YouVersionLoginButton } from "@youversion/bible-ui";

<YouVersionLoginButton
  onSuccess={(user) => console.log("Logged in:", user)}
  onError={(error) => console.error("Login failed:", error)}
/>;
```

## Hooks

### Bible Data Hooks

```tsx
import {
  useVersion,
  useVersions,
  useBook,
  useBooks,
  useChapter,
  useChapters,
  useVerse,
  useVerses,
} from "@youversion/bible-ui";

// Get a specific version
const { version, loading, error } = useVersion(206);

// Get all versions with language filtering
const { versions } = useVersions("en*");

// Get book data
const { book } = useBook(206, "GEN");

// Get chapter content
const { chapter } = useChapter(206, "GEN", 1);

// Get individual verses
const { verses } = useVerses(206, "GEN", 1);
```

### Search Hooks

```tsx
import { useSearch, useSearchClient } from "@youversion/bible-ui";

const { searchResults, loading } = useSearch();
```

### Audio Hooks

```tsx
import { useTextToSpeech, useReaderTextToSpeech } from "@youversion/bible-ui";

const { speak, stop, isPlaying } = useTextToSpeech();

// Play text
speak("In the beginning, God created the heavens and the earth.");
```

### Authentication Hooks

```tsx
import { useYouVersionLogin } from "@youversion/bible-ui";

const { login, logout, user, isLoggedIn } = useYouVersionLogin();
```

## Providers

### BibleSDKProvider

Main provider that initializes the Bible SDK context.

```tsx
import { BibleSDKProvider } from "@youversion/bible-ui";

<BibleSDKProvider appId="YOUR_APP_ID">
  {/* Your app components */}
</BibleSDKProvider>;
```

### ReaderProvider

Provides reading context for Bible components.

```tsx
import { ReaderProvider } from "@youversion/bible-ui";

<ReaderProvider
  currentVersion={version}
  currentBook={book}
  currentChapter={chapter}
  currentVerse={verse}
>
  {/* Bible reading components */}
</ReaderProvider>;
```

### VerseSelectionProvider

Manages verse selection state across components.

```tsx
import { VerseSelectionProvider } from "@youversion/bible-ui";

<VerseSelectionProvider>
  {/* Components that need verse selection */}
</VerseSelectionProvider>;
```

### ElevenLabsProvider

Provides text-to-speech capabilities using ElevenLabs.

```tsx
import { ElevenLabsProvider } from "@youversion/bible-ui";

<ElevenLabsProvider apiKey="YOUR_ELEVENLABS_API_KEY">
  {/* Components that need audio */}
</ElevenLabsProvider>;
```

## <� Styling

This package uses Tailwind CSS for styling. The components are designed to be customizable and themeable.

## =� Responsive Design

All components are built with mobile-first responsive design principles:

- Touch-friendly interactions
- Optimized for various screen sizes
- Accessibility features built-in
- Smooth animations and transitions

## =' Configuration

### Advanced Configuration

```tsx
import { BibleSDKProvider } from "@youversion/bible-ui";

<BibleSDKProvider
  appId="YOUR_APP_ID"
  config={{
    baseUrl: "https://api.youversion.com",
    timeout: 10000,
    version: "v1",
  }}
>
  <App />
</BibleSDKProvider>;
```

## =� Component Categories

### Reading Components

- `BibleReader` - Complete Bible reading experience
- `ChapterRenderer` - Chapter content display
- `SelectableVerse` - Individual verse with selection
- `UnselectableVerse` - Read-only verse display

### Navigation Components

- `BibleReaderNavigator` - Main navigation bar
- `BibleChapterVersionMenuBar` - Chapter/version selector
- `ChapterNavigationButton` - Chapter navigation
- `BookSelectionList` - Book selection interface
- `ChapterGrid` - Chapter grid selector

### Selection Components

- `BibleChapterSelectionModal` - Chapter selection modal
- `BibleVersionSelectionModal` - Version selection modal
- `VersionSelectionList` - Version list interface
- `BibleVersionAcronymCard` - Version display card

### Action Components

- `VerseActionPicker` - Verse action menu
- `VerseActionModal` - Action modal dialog
- `ActionButton` - Individual action button

### Search Components

- `Search` - Main search interface
- `SearchResults` - Search results display
- `SearchResult` - Individual search result
- `SearchBar` - Search input component

### Audio Components

- `AudioButton` - Audio playback control

### Authentication Components

- `YouVersionLoginButton` - Login button

### Utility Components

- `Modal` - Generic modal component
- `SlideInModal` - Slide-in modal variant
- `ModalHeader` - Modal header component
- `Icons` - Icon components
- `Passage` - Passage display component

## =� Error Handling

The components include built-in error handling and loading states:

```tsx
import { BibleReader } from "@youversion/bible-ui";

<BibleReader
  defaultVersion={206}
  onError={(error) => console.error("Bible reader error:", error)}
/>;
```

## =� Performance

The library is optimized for performance with:

- Efficient data fetching and caching
- Lazy loading of components
- Virtualization for large lists
- Optimized re-renders
- Tree-shaking support

## =' Development

### Prerequisites

- Node.js 18+
- React 18+
- TypeScript 4.8+

### Building

```bash
# Install dependencies
yarn install

# Build the library
yarn run build

# Run Storybook
yarn run storybook

# Run tests
yarn test

# Run linting
yarn run lint
```

## =� Storybook

View component documentation and examples:

```bash
yarn run storybook
```

## =� Related Packages

- `@youversion/bible-core` - Core TypeScript library for Bible data
