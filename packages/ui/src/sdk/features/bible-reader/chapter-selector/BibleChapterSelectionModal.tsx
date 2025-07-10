import { useEffect, useMemo, useState } from "react";
import { BookSelectionList } from "./BookSelectionList";
import { useReaderContext, useBooks } from "@youversion/bible-hooks";
import { Chapter } from "@youversion/bible-core";
import { ModalHeader, SearchBar, SlideInModal } from "../../../shared";

export type BookOption = {
  id: string;
  name: string;
  chapters: number[];
};

export type BookChapterSelection = {
  bookId: string;
  chapter: Chapter;
};

interface Props {
  onSelect: (selection: BookChapterSelection) => void;
  modalPlacement?: "top" | "bottom";
  screenEdgeGap?: number;
  isOpen: boolean;
  onClose: () => void;
  remainOpenOnSelect?: boolean;
}

export function BibleChapterSelectionModal({
  modalPlacement,
  screenEdgeGap,
  isOpen,
  onSelect,
  onClose,
  remainOpenOnSelect,
}: Props) {
  const [filteredBooks, setFilteredBooks] = useState<Array<BookOption>>([]);
  const [booksSearch, setBooksSearch] = useState("");

  const { currentVersion } = useReaderContext();

  const { books, loading: loadingBooks } = useBooks(currentVersion.id);

  const bookOptions: BookOption[] = useMemo(() => {
    if (!books?.data) return [];
    return books.data.map((b) => ({ id: b.usfm, name: b.title, chapters: [] }));
  }, [books]);

  useEffect(() => {
    if ((bookOptions && booksSearch == "") || booksSearch == null) {
      setFilteredBooks(bookOptions);
      return;
    }
    setFilteredBooks(
      bookOptions.filter((b: BookOption) =>
        b.name.toLowerCase().includes(booksSearch.toLowerCase())
      )
    );
  }, [booksSearch, bookOptions]);

  function onChapterSelected(selection: BookChapterSelection) {
    onSelect(selection);

    if (!remainOpenOnSelect) {
      onClose();
    }
  }

  return (
    <SlideInModal
      isOpen={isOpen}
      onClose={onClose}
      position={modalPlacement ?? "bottom"}
      distance={screenEdgeGap ?? 100}
      backdrop={true}
      closeOnClickOutside={true}
      className="w-full sm:w-[500px] sm:rounded-lg"
    >
      <ModalHeader title="Books" onCloseClicked={onClose}>
        <SearchBar onChange={(v) => setBooksSearch(v)} debounceTime={50} />
      </ModalHeader>
      {!loadingBooks ? (
        <BookSelectionList
          className="px-4 mt-2"
          books={filteredBooks}
          versionId={currentVersion.id}
          onSelect={onChapterSelected}
        />
      ) : (
        <></>
      )}
    </SlideInModal>
  );
}
