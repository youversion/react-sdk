import { useEffect, useState } from "react";
import { ModalHeader, SearchBar, SlideInModal } from "./shared";
import { BookSelectionList } from "./BookSelectionList";

export type BookOption = {
  id: number | string;
  name: string;
  chapters: number[];
}

export type BookChapterSelection = {
  bookId: number | string;
  chapter: number;
}

interface Props {
  books: Array<BookOption>;
  onSelect: (selection: BookChapterSelection) => void;
  modalPlacement?: 'top' | 'bottom';
  screenEdgeGap?: number;
  isOpen: boolean;
  onClose: () => void;
  remainOpenOnSelect?: boolean;
}

export function BibleChapterSelectionModal({ books, modalPlacement, screenEdgeGap, isOpen, onSelect, onClose, remainOpenOnSelect }: Props) {
  const [filteredBooks, setFilteredBooks] = useState<Array<BookOption>>(books);
  const [booksSearch, setBooksSearch] = useState('');

  useEffect(() => {
    if (booksSearch == '' || booksSearch == null) {
      setFilteredBooks(books)
      return;
    }
    setFilteredBooks(books.filter(book => book.name.toLowerCase().includes(booksSearch.toLowerCase())))
  }, [booksSearch, books])

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
      position={modalPlacement ?? 'bottom'}
      distance={screenEdgeGap ?? 100}
      backdrop={true}
      closeOnClickOutside={true}
      className='w-screen sm:w-[500px] sm:rounded-lg'
    >
      <ModalHeader title='Books' onCloseClicked={onClose}>
        <SearchBar onChange={(v) => setBooksSearch(v)} debounceTime={50} />
      </ModalHeader>
      <BookSelectionList className='px-4 mt-2' books={filteredBooks} onSelect={onChapterSelected} />
    </SlideInModal>
  );
}
