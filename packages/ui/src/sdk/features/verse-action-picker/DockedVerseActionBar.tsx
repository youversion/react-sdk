import { useVerseSelection } from "../verse-selection";
import { HighlightsTray } from "./HighlightsTray";
import { CopyButton } from "./CopyButton";
import { ShareButton } from "./ShareButton";
import { Divider } from "../../shared/Divider";
import { useEffect, useState } from "react";

type BarPosition = "left" | "right" | "top" | "bottom";

interface DockedVerseActionBarProps {
  position?: BarPosition;
}

export const DockedVerseActionBar = ({
  position = "right",
}: DockedVerseActionBarProps) => {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const { selectedCount, clearSelection } = useVerseSelection();

  useEffect(() => {
    if (selectedCount > 0) {
      setCurrentlyOpen(true);
    } else {
      setCurrentlyOpen(false);
    }
  }, [selectedCount]);

  // Get position-specific styles
  const getPositionStyles = () => {
    const baseStyles =
      "fixed flex gap-2 bg-white border border-border-primary shadow-sm transition-transform duration-300 ease-in-out z-1500";

    switch (position) {
      case "right":
        return {
          className: `${baseStyles} flex-col items-center justify-center py-3 px-1 top-1/2 -translate-y-1/2 max-h-1/2 min-h-[150px] w-[50px] rounded-l-xl ${currentlyOpen ? "translate-x-0 right-0" : "translate-x-full right-0"}`,
          highlightDirection: "vertical" as const,
          dividerDirection: "horizontal" as const,
        };

      case "left":
        return {
          className: `${baseStyles} flex-col items-center justify-center py-3 px-1 top-1/2 -translate-y-1/2 max-h-1/2 min-h-[150px] w-[50px] rounded-r-xl ${currentlyOpen ? "translate-x-0 left-0" : "-translate-x-full left-0"}`,
          highlightDirection: "vertical" as const,
          dividerDirection: "horizontal" as const,
        };

      case "top":
        return {
          className: `${baseStyles} flex-row items-center justify-center px-3 py-1 left-1/2 -translate-x-1/2 max-w-1/2 min-w-[150px] h-[50px] rounded-b-xl ${currentlyOpen ? "translate-y-0 top-0" : "-translate-y-full top-0"}`,
          highlightDirection: "horizontal" as const,
          dividerDirection: "vertical" as const,
        };

      case "bottom":
        return {
          className: `${baseStyles} flex-row items-center justify-center px-3 py-1 left-1/2 -translate-x-1/2 max-w-1/2 min-w-[150px] h-[50px] rounded-t-xl ${currentlyOpen ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"}`,
          highlightDirection: "horizontal" as const,
          dividerDirection: "vertical" as const,
        };

      default:
        return {
          className: `${baseStyles} flex-col items-center justify-center py-3 px-1 top-1/2 -translate-y-1/2 max-h-1/2 min-h-[150px] w-[50px] rounded-l-xl ${currentlyOpen ? "translate-x-0 right-0" : "translate-x-full right-0"}`,
          highlightDirection: "vertical" as const,
          dividerDirection: "horizontal" as const,
        };
    }
  };

  const { className, highlightDirection, dividerDirection } =
    getPositionStyles();

  return (
    <div className={className}>
      <HighlightsTray direction={highlightDirection} />
      <Divider direction={dividerDirection} />
      <CopyButton type="circle" className="rounded-xl" />
      <ShareButton type="circle" className="rounded-xl" />
    </div>
  );
};
