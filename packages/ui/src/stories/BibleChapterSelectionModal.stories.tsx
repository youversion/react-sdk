import type { Meta } from "@storybook/react";
import { useState } from "react";
import { SlideInModal } from "../sdk/components/shared";
import {BibleChapterSelectionModal, BibleKitProvider, BookChapterSelection, ReaderProvider} from "../sdk/components";
import {Book, Chapter, Version} from "@youversion/bible-core";

const meta: Meta<typeof BibleChapterSelectionModal> = {
  title: 'Composite Components/Bible Chapter Selection Modal',
  component: BibleChapterSelectionModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export function Standard() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'top' | 'bottom'>('bottom');

  const [selectedBookAndChapter, setSelectedBookAndChapter] = useState<BookChapterSelection | null>(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen scrollbar-hidden">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Click a button to open the modal, and make a selection.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpenDirection('bottom')
              setIsOpen(true)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Select Book & Chapter - From Bottom
          </button>
          <button
            onClick={() => {
              setOpenDirection('top')
              setIsOpen(true)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Select Book & Chapter - From Top
          </button>
        </div>
        <div className='p-10 text-5xl opacity-75'>
          {selectedBookAndChapter ? `${books.find(b => b.id == selectedBookAndChapter.bookId).name} ${selectedBookAndChapter.chapter}` : 'No Selection' }
        </div>
      </div>

      <BibleKitProvider appId='V8lOX2LMfC6PGBawNiyywXbFTHafIvOjDIr9U82Zy5qGsrjv'>
        <ReaderProvider currentVersion={mockVersions[0]} currentChapter={mockChapters[0]} currentBook={mockBooks[0]} currentVerse={null}>
          <BibleChapterSelectionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            modalPlacement={openDirection}
            onSelect={selection => setSelectedBookAndChapter(selection)}
          />
        </ReaderProvider>
      </BibleKitProvider>
    </div>
  );
}

const books = [
  { id: '1', name: 'Genesis', chapters: Array.from({ length: 12 }, (_, i) => i + 1) },
  { id: '2', name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: '3', name: 'Leviticus', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
  { id: '4', name: 'Genesis', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
  { id: '5', name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: '6', name: 'Leviticus', chapters: Array.from({ length: 35 }, (_, i) => i + 1) },
  { id: '7', name: 'Genesis', chapters: Array.from({ length: 32 }, (_, i) => i + 1) },
  { id: '8', name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
];

// Mock data for testing
export const mockVersions: Version[] = [
  {
    id: 1,
    abbreviation: "ESV",
    copyright: "© 2001 by Crossway",
    language: { name: "English", iso_639_1: 'en', iso_639_3: 'en-US', local_name: 'English', text_direction: 'ltr' },
    local_abbreviation: "ESV",
    local_title: "English Standard Version",
    info: "English Standard Version",
    info_url: "https://www.esv.org/",
    title: "English Standard Version"
  },
  {
    id: 2,
    abbreviation: "NIV",
    copyright: "© 1973, 1978, 1984, 2011 by Biblica",
    language: { name: "English", iso_639_1: 'en', iso_639_3: 'en-US', local_name: 'English', text_direction: 'ltr' },
    local_abbreviation: "NIV",
    local_title: "New International Version",
    info: "New International Version",
    info_url: "https://www.biblica.com/",
    title: "New International Version"
  }
];

export const mockBooks: Book[] = [
  {
    usfm: "GEN",
    title: "Genesis",
    abbreviation: "Gen",
    canon: "OT"
  },
  {
    usfm: "EXO",
    title: "Exodus",
    abbreviation: "Exod",
    canon: "OT"
  },
  {
    usfm: "MAT",
    title: "Matthew",
    abbreviation: "Matt",
    canon: "NT"
  },
  {
    usfm: "JHN",
    title: "John",
    abbreviation: "John",
    canon: "NT"
  }
];

export const mockChapters: Chapter[] = [
  {
    usfm: "GEN.1",
    title: "Genesis 1"
  },
  {
    usfm: "GEN.2",
    title: "Genesis 2"
  },
  {
    usfm: "MAT.1",
    title: "Matthew 1"
  },
  {
    usfm: "JHN.3",
    title: "John 3"
  }
];
