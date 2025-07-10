import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "./Icons";
import { useDebounce } from "../hooks/utility/useDebounce";

interface Props {
  onChange: (query: string) => void;
  onSearch?: (query: string) => void;
  debounceTime?: number;
  placeholder?: string;
}

export function SearchBar({
  onChange,
  onSearch,
  debounceTime = 300,
  placeholder = "Search",
}: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceTime);

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim() && onSearch) {
      setQuery("");
      onSearch(query.trim());
    }
  };

  const handleSearchClick = () => {
    if (query.trim() && onSearch) {
      setQuery("");
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex items-center w-full p-1 bg-white rounded-full border-[1px] border-[#EDEBEB]">
      <div
        className={`p-2 ${onSearch ? "cursor-pointer" : ""}`}
        onClick={handleSearchClick}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-md placeholder-[#636161]"
      />
    </div>
  );
}
