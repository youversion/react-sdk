import type { Meta } from "@storybook/react";
import { useState } from "react";
import { SlideInModal } from "../sdk/components/shared";
import { BibleChapterSelectionModal, BookChapterSelection } from "../sdk/components";

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

      <BibleChapterSelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalPlacement={openDirection}
        books={books}
        onSelect={selection => setSelectedBookAndChapter(selection)}
      />
    </div>
  );
}

const books = [
  { id: 1, name: 'Genesis', chapters: Array.from({ length: 12 }, (_, i) => i + 1) },
  { id: 2, name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 3, name: 'Leviticus', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
  { id: 4, name: 'Genesis', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
  { id: 5, name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 6, name: 'Leviticus', chapters: Array.from({ length: 35 }, (_, i) => i + 1) },
  { id: 7, name: 'Genesis', chapters: Array.from({ length: 32 }, (_, i) => i + 1) },
  { id: 8, name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
];
