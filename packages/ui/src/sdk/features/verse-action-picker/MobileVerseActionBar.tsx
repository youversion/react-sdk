import { useVerseSelection } from "@youversion/bible-hooks";
import { HighlightsTray } from "./HighlightsTray";
import { CopyButton } from "./CopyButton";
import { ShareButton } from "./ShareButton";
import { formatVerseSelection } from "./utils";
import { useEffect, useState } from "react";
import { PlayVersesButton } from "./PlaySelectedButton";

type MobileBarPosition = "bottom" | "top";

interface MobileVerseActionBarProps {
  onClose?: () => void;
  position?: MobileBarPosition;
}

export const MobileVerseActionBar = ({
  onClose,
  position = "bottom",
}: MobileVerseActionBarProps) => {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const { selectedCount, clearSelection, selectedVerseUsfms } =
    useVerseSelection();

  useEffect(() => {
    if (selectedCount > 0) {
      setCurrentlyOpen(true);
    } else {
      setCurrentlyOpen(false);
    }
  }, [selectedCount]);

  const handleClose = () => {
    clearSelection();
    setCurrentlyOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // Get position-specific styles
  const getPositionStyles = () => {
    const baseStyles =
      "fixed left-0 w-full bg-white border border-border-primary shadow-lg transition-transform duration-300 ease-in-out z-1500";

    switch (position) {
      case "bottom":
        return {
          className: `${baseStyles} border-t rounded-t-2xl ${currentlyOpen ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"}`,
        };

      case "top":
        return {
          className: `${baseStyles} border-b rounded-b-2xl ${currentlyOpen ? "translate-y-0 top-0" : "-translate-y-full top-0"}`,
        };

      default:
        return {
          className: `${baseStyles} border-t rounded-t-2xl ${currentlyOpen ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"}`,
        };
    }
  };

  const { className } = getPositionStyles();

  // Format the verse selection for display
  const verseSelectionText = formatVerseSelection(
    Array.from(selectedVerseUsfms)
  );

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4 p-4">
        {/* Title with Exit Button */}
        <div className="relative w-full flex justify-center">
          <h3 className="text-md font-semibold text-gray-900">
            {verseSelectionText}
          </h3>
          <button
            onClick={handleClose}
            className="absolute right-[10px] top-1/3 -translate-y-1/2 p-1 px-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <div className="select-none text-[12px] font-bold opacity-10 active:opacity-30">
              CLEAR
            </div>
          </button>
        </div>

        {/* Copy and Share buttons side by side */}
        <div className="flex gap-4 w-full max-w-xs">
          <CopyButton
            type="regular"
            className="flex-1 justify-center py-3 px-4 rounded-lg font-medium"
          />
          <ShareButton
            type="regular"
            className="flex-1 justify-center py-3 px-4 rounded-lg font-medium"
          />
          <PlayVersesButton
            type="regular"
            className="flex-1 justify-center py-3 px-4 rounded-lg font-medium"
          />
        </div>

        {/* Horizontal Highlights Tray */}
        <div className="w-full flex justify-center mb-2">
          <HighlightsTray direction="horizontal" />
        </div>
      </div>
    </div>
  );
};
