# Verse Highlight System

A React-based system for highlighting Bible verses with color-coded backgrounds, stored in localStorage.

## Setup

Wrap your app with the `VerseHighlightProvider`:

```tsx
import { VerseHighlightProvider } from './context/VerseHighlightContext';

function App() {
  return (
    <VerseHighlightProvider>
      <YourAppContent />
    </VerseHighlightProvider>
  );
}
```

## Components

### ChapterHighlights (Recommended)

Automatically finds and highlights all verses within its children. Use this when you have multiple verses in a container.

```tsx
import { ChapterHighlights } from './components/ChapterHighlights';

function ChapterView() {
  return (
    <ChapterHighlights>
      {verses.map((verse) => (
        <SelectableVerse key={verse.usfm} verse={verse} />
      ))}
    </ChapterHighlights>
  );
}
```

### Highlightable (Individual)

Wraps a single verse component to apply highlights. Use when you need granular control.

```tsx
import { Highlightable } from './components/Highlightable';

function SingleVerse({ verse }) {
  return (
    <Highlightable usfm={verse.usfm}>
      <SelectableVerse verse={verse} />
    </Highlightable>
  );
}
```

## Required Element Structure

Your verse components must have:
- `data-usfm` attribute on the container element
- `id="content"` on the element that should receive the highlight

```tsx
function SelectableVerse({ verse }) {
  return (
    <div data-usfm={verse.usfm} onClick={handleClick}>
      <div id="content" dangerouslySetInnerHTML={{ __html: verse.content }} />
    </div>
  );
}
```

## HighlightsTray Integration

Your existing `HighlightsTray` component works automatically with the context:

```tsx
import { HighlightsTray } from './components/HighlightsTray';

function ActionBar() {
  return (
    <div>
      <HighlightsTray direction="horizontal" />
      <CopyButton />
      <ShareButton />
    </div>
  );
}
```

## Context Hook

Access highlight functions directly:

```tsx
import { useVerseHighlight } from './context/VerseHighlightContext';

function MyComponent() {
  const { 
    addHighlight, 
    removeHighlight, 
    getHighlight, 
    hasHighlight,
    colors 
  } = useVerseHighlight();

  const handleHighlight = (usfm: string, colorId: number) => {
    addHighlight(usfm, colorId);
  };
}
```

## Available Colors

```typescript
const HIGHLIGHT_COLORS = [
  { id: 0, color: "#fffe00", label: "Yellow" },
  { id: 1, color: "#5dff79", label: "Green" },
  { id: 2, color: "#00d6ff", label: "Blue" },
  { id: 3, color: "#ffc66f", label: "Orange" },
  { id: 4, color: "#ff95ef", label: "Pink" },
];
```

## Important Notes

- **Re-render Compatibility**: `ChapterHighlights` automatically reapplies highlights after React re-renders
- **Performance**: For large chapters (50+ verses), use `ChapterHighlightsDOMBased` variant
- **Storage**: Highlights persist in localStorage automatically
- **Selection Integration**: Works seamlessly with verse selection systems

## Troubleshooting

**Highlights disappear after selection:**
- Ensure you're using `ChapterHighlights` wrapper
- Check that verse components have the required `data-usfm` and `id="content"` structure

**Performance issues:**
- Use `ChapterHighlightsDOMBased` for large chapters
- Consider virtualization for very long chapters

**Highlights not applying:**
- Verify `VerseHighlightProvider` wraps your app
- Check browser console for DOM query errors
- Ensure verse components render `id="content"` element