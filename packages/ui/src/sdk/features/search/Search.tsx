import { useState } from "react";
import { SearchBar } from "../../shared/SearchBar";
import { SearchResults } from "./SearchResults";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[512px] mx-auto px-6">
      <SearchBar
        onChange={() => {}}
        onSearch={handleSearch}
        placeholder="Search..."
      />
      <SearchResults
        query={searchQuery}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
