import { useState } from "react";
import { Chapter } from "@youversion/bible-core";
import { ChevronDownIcon, ChevronUpIcon } from "../../../shared";
import { BookOption } from "./BibleChapterSelectionModal";
import { ChapterGrid } from "./ChapterGrid";

interface BookSelectionListProps {
  className?: string;
  books: BookOption[];
  versionId: number;
  onSelect: (book: { bookId: BookOption["id"]; chapter: Chapter }) => void;
  closeOnSelect?: boolean;
}

export function BookSelectionList({
  className,
  closeOnSelect,
  books,
  onSelect,
  versionId,
}: BookSelectionListProps) {
  const [openBook, setOpenBook] = useState<BookOption["id"] | null>(null);

  const toggleBook = (id: BookOption["id"]) => {
    setOpenBook(openBook === id ? null : id);
  };

  function onChapterClicked(chapter: Chapter) {
    if (!chapter || !openBook) return;

    onSelect({ bookId: openBook, chapter });

    if (closeOnSelect) {
      setOpenBook(null);
    }
  }

  return (
    <div className={`min-w-[300px] ${className || ""}`}>
      {books.map((book) => {
        const isSelectedBook = openBook === book.id;
        return (
          <div key={book.id} className="mb-2">
            <button
              onClick={() => toggleBook(book.id)}
              className={`${isSelectedBook ? "border-b-0" : "border-b-1"} w-full text-left py-2 px-3 border-[#DDDBDB] rounded-t-md flex justify-between items-center hover:cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              <h2 className={`${isSelectedBook ? "font-semibold" : ""}`}>
                {book.name}
              </h2>{" "}
              <span>
                {isSelectedBook ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </span>
            </button>
            <ChapterGrid
              book={book.id as string}
              versionId={versionId}
              visible={isSelectedBook}
              onChapterClicked={onChapterClicked}
            />
          </div>
        );
      })}
    </div>
  );
}
