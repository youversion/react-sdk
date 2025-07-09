import { useEffect, useState } from "react";
import { BookOption } from "./BibleChapterSelectionModal";
import { useChapters } from "../../hooks";
import { Chapter } from "@youversion/bible-core";
import { ChevronDownIcon, ChevronUpIcon } from "../../shared/Icons";

interface ChapterGridProps {
  book: string;
  versionId: number;
  onChapterClicked: (chapter: Chapter) => void;
  visible: boolean;
}

function ChapterGrid({
  book,
  versionId,
  onChapterClicked,
  visible,
}: ChapterGridProps) {
  const { chapters, loading, refetch } = useChapters(versionId, book, {
    enabled: visible,
  });

  useEffect(() => {
    // Enabled on the hook only works on initial render, and will not trigger a load when changed.
    // This effect will trigger a load when the component is made visible.
    if (!chapters && !loading && visible) {
      refetch();
    }
  }, [visible, chapters, loading, refetch]);

  const containerClass = `overflow-y-scroll scrollbar-hidden transition-all ease-in-out ${
    visible ? "duration-300 max-h-[1000px]" : "duration-100 max-h-[0px]"
  }`;

  if (loading) {
    return (
      <div className={containerClass}>
        <></>
      </div>
    );
  }

  if (!chapters?.data || chapters.data.length === 0) {
    return (
      <div className={containerClass}>
        <div>No chapters</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,3fr))] sm:grid-cols-[repeat(auto-fill,minmax(45px,3fr))] gap-2 mt-2">
        {chapters.data.map((chapter) => (
          <button
            key={chapter.usfm}
            className="w-16 h-16 sm:w-12 sm:h-12 font-bold bg-[#EDEBEB] rounded flex items-center justify-center hover:cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => onChapterClicked(chapter)}
          >
            {chapter.title}
          </button>
        ))}
      </div>
    </div>
  );
}

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
