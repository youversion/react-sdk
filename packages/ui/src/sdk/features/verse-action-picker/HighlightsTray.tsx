import { XIcon } from "../../shared";
import { useVerseSelection } from "@youversion/bible-hooks";
import { HIGHLIGHT_COLORS, useVerseHighlight } from "../highlights";

interface HighlightsTrayProps {
  direction: "horizontal" | "vertical";
}

export const HighlightsTray = ({
  direction = "horizontal",
}: HighlightsTrayProps) => {
  const { selectedVerseUsfms, toggleVerse } = useVerseSelection();
  const { addHighlight, removeHighlight, getHighlight } = useVerseHighlight();

  const colorOptions = HIGHLIGHT_COLORS;
  const flexDirection = direction === "horizontal" ? "flex-row" : "flex-col";

  // Get the current highlight for the first selected verse (if any)
  const firstSelectedUsfm = Array.from(selectedVerseUsfms)[0];
  const currentHighlight = firstSelectedUsfm
    ? getHighlight(firstSelectedUsfm)
    : null;

  const handleColorSelect = (colorId: number) => {
    if (selectedVerseUsfms.size === 0) return;

    // Apply to all selected verses
    selectedVerseUsfms.forEach((usfm) => {
      const existingHighlight = getHighlight(usfm);

      if (existingHighlight && existingHighlight.colorId === colorId) {
        // If same color is selected, remove highlight
        toggleVerse(usfm);
        removeHighlight(usfm);
      } else {
        // Add or update highlight
        addHighlight(usfm, colorId);
        toggleVerse(usfm);
      }
    });
  };

  return (
    <div className={`flex gap-3 ${flexDirection}`}>
      {colorOptions.map((color) => (
        <div
          onClick={() => handleColorSelect(color.id)}
          key={color.id}
          className="rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          style={{
            backgroundColor: color.color,
          }}
        >
          {currentHighlight?.colorId === color.id && <XIcon />}
        </div>
      ))}
    </div>
  );
};
