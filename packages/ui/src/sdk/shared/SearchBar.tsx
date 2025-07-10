import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "./Icons";
import { useDebounce } from "../hooks/utility/useDebounce";

interface Props {
  onChange: (query: string) => void;
  debounceTime?: number;
  placeholder?: string;
}

export function SearchBar({
  onChange,
  debounceTime = 300,
  placeholder = "Search",
}: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceTime);

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery, onChange]);

  return (
    <div className="flex items-center w-full p-1 bg-white rounded-full border-[1px] border-[#EDEBEB]">
      <div className="p-2">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-md placeholder-[#636161]"
      />
    </div>
  );
}
