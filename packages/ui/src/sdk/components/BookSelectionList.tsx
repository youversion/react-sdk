import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "./shared";

interface ChapterGridProps {
  chapters: number[];
  onChapterClicked: (chapter: number) => void;
  visible: boolean;
}

function ChapterGrid({ chapters, onChapterClicked, visible }: ChapterGridProps) {
  return (
    <div className={`overflow-y-scroll scrollbar-hidden transition-all ease-in-out ${visible ? 'duration-300 max-h-[1000px]' : 'duration-100 max-h-[0px]'}`}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,3fr))] sm:grid-cols-[repeat(auto-fill,minmax(45px,3fr))] gap-2 mt-2">
        {chapters.map((chapter: number) => (
          <button
            key={chapter}
            className="w-16 h-16 sm:w-12 sm:h-12 font-bold bg-[#EDEBEB] rounded flex items-center justify-center hover:cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => onChapterClicked(chapter)}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
}

interface BookSelectionListProps {
  className?: string;
  books: {
    id: number;
    name: string;
    chapters: number[];
  }[];
  onSelect: (book: { bookId: number; chapter: number; }) => void;
  closeOnSelect?: boolean;
}

export function BookSelectionList({ className, closeOnSelect, books, onSelect }: BookSelectionListProps) {
  const [openBook, setOpenBook] = useState<number | null>(null);

  const toggleBook = (id: number) => {
    setOpenBook(openBook === id ? null : id);
  };

  function onChapterClicked(chapter: number) {
    if (!chapter || !openBook) return;
    onSelect({ bookId: openBook, chapter })

    if (closeOnSelect) {
      setOpenBook(null);
    }
  }

  return (
    <div className={`min-w-[300px] ${className || ''}`}>
      {books.map((book) => {
        const isSelectedBook = openBook === book.id;
        return (
          <div key={book.id} className="mb-2">
            <button
              onClick={() => toggleBook(book.id)}
              className={`${isSelectedBook ? 'border-b-0' : 'border-b-1'} w-full text-left py-2 px-3 border-[#DDDBDB] rounded-t-md flex justify-between items-center hover:cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              <h2 className={`${isSelectedBook ? 'font-semibold' : ''}`}>{book.name}</h2> <span>{isSelectedBook ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
            </button>
            <ChapterGrid chapters={book.chapters} visible={isSelectedBook} onChapterClicked={onChapterClicked}/>
          </div>
        )}
      )}
    </div>
  );
}
