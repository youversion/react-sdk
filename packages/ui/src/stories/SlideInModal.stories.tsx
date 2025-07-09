import type { Meta } from "@storybook/react";
import {useEffect, useState} from "react";
import {ModalHeader, SearchBar, SlideInModal} from "../sdk/components/shared";
import {BookSelector} from "../sdk/components";

const meta: Meta<typeof SlideInModal> = {
  title: 'Design Components/Slide In Modal',
  component: SlideInModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export function Basic() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <p className="text-gray-600 mb-4">
          This modal remains open and allows clicking outside of it.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal
        </button>

        <SlideInModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          distance={24}
          className='w-[500px]'
        >
          <ModalHeader title='Books' onCloseClicked={() => setIsOpen(false)}>
            <SearchBar onChange={(v) => console.log(v)} />
          </ModalHeader>
        </SlideInModal>
      </div>
    );
}

export function WithBackdrop() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'top' | 'bottom'>('bottom');

  const [filteredBooks, setFilteredBooks] = useState<typeof books>(books);
  const [booksSearch, setBooksSearch] = useState('');

  useEffect(() => {
    console.log(booksSearch)
    if (booksSearch == '' || booksSearch == null) {
      setFilteredBooks(books)
      return;
    }
    setFilteredBooks(books.filter(book => book.name.toLowerCase().includes(booksSearch.toLowerCase())))
  }, [booksSearch])

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Modal With Backdrop</h1>
        <p className="text-gray-600 mb-4">
          This content will be darkened when the modal opens with backdrop enabled.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpenDirection('bottom')
              setIsOpen(true)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Open Modal with Backdrop From Bottom
          </button>
          <button
            onClick={() => {
              setOpenDirection('top')
              setIsOpen(true)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Open Modal with Backdrop From Top
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Feature 1</h3>
          <p className="text-sm text-gray-600">Some content that will be behind the backdrop</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Feature 2</h3>
          <p className="text-sm text-gray-600">Can be opened from the top or bottom of the screen</p>
        </div>
      </div>

      <SlideInModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={openDirection}
        distance={24}
        backdrop={true}
        closeOnClickOutside={true}
        className='w-[500px]'
      >
        <ModalHeader title='Books' onCloseClicked={() => setIsOpen(false)}>
          <SearchBar onChange={(v) => setBooksSearch(v)} debounceTime={50} />
        </ModalHeader>
        <BookSelector className='px-4 mt-2' books={filteredBooks} onSelect={(selection) => console.log(selection)} />
      </SlideInModal>
    </div>
  );
}

const books = [
  { id: 1, name: 'Genesis', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
  { id: 2, name: 'Exodus', chapters: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 3, name: 'Leviticus', chapters: Array.from({ length: 50 }, (_, i) => i + 1) },
];
