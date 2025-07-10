import { SlideInModal } from "../../shared/slide-in-modal/SlideInModal";
import { useSearch, useReaderContext } from "@youversion/bible-hooks";
import { SearchResult } from "./SearchResult";
import { ModalHeader } from "../../shared";

interface Props {
  query: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchResults({ query, isOpen, onClose }: Props) {
  const { currentVersion } = useReaderContext();
  const { results, loading, error } = useSearch(query, currentVersion.id, {
    enabled: isOpen && query.trim().length > 0,
  });

  return (
    <SlideInModal
      isOpen={isOpen}
      onClose={onClose}
      position="top"
      distance={100}
      backdrop
      closeOnClickOutside
      className="w-screen sm:w-[500px] sm:rounded-lg"
    >
      <ModalHeader title="Search Results" onCloseClicked={onClose} />

      {loading && (
        <div className="text-center py-8">
          <div className="text-gray-500">Searching...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      )}

      {results && results.data.length > 0 && (
        <div className="space-y-2 px-4 mt-2">
          {results.data.map((result, index) => (
            <SearchResult key={index} result={result} onClose={onClose} />
          ))}
        </div>
      )}

      {results && results.data.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-500">
            No results found for &quot;{query}&quot;
          </div>
        </div>
      )}
    </SlideInModal>
  );
}
