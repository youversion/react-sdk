import type { Meta } from "@storybook/react";
import { BookOption, BookSelectionList } from "../sdk";
import { useState } from "react";
import React from "react";

const meta = {
  title: "Bible Components/Book Selection List",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs h-screen w-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

const books = [
  {
    id: 1,
    name: "Genesis",
    chapters: Array.from({ length: 50 }, (_, i) => i + 1),
  },
  {
    id: 2,
    name: "Exodus",
    chapters: Array.from({ length: 20 }, (_, i) => i + 1),
  },
  {
    id: 3,
    name: "Leviticus",
    chapters: Array.from({ length: 50 }, (_, i) => i + 1),
  },
];

export function BasicRender() {
  const [selectedBook, setSelectedBook] = useState<{
    bookId: BookOption["id"];
    chapter: any;
  } | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full items-center text-center">
        <p>Basic Book & Chapter Selection List</p>
        {selectedBook ? (
          <p>
            Selection: {selectedBook.bookId} - {selectedBook.chapter}
          </p>
        ) : (
          <p>No Selection</p>
        )}
        <BookSelectionList
          closeOnSelect={true}
          books={books.map((book) => ({
            ...book,
            id: String(book.id),
          }))}
          onSelect={(selection) => setSelectedBook(selection)}
          versionId={0}
        />
      </div>
    </div>
  );
}
