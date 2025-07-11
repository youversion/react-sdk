/**
 * Represents a loading placeholder component for a chapter, typically used while content is being fetched or processed.
 *
 * @return A JSX element containing animated placeholders resembling the chapter structure.
 */
export function ChapterLoading() {
  return (
    <div className="max-w-[512px] mx-auto px-6 animate-pulse">
      <div className="flex flex-col text-center items-center justify-center">
        <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse mt-12 mb-4"></div>
        <div className="h-12 w-12 bg-gray-200 rounded-md animate-pulse mb-6"></div>
      </div>
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
