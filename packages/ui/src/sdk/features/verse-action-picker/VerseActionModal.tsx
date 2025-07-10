import { SlideInModal, XIcon } from "../../shared";
import { VerseActionPicker } from "./VerseActionPicker";
import { ActionButtonType } from "./ActionButton";
import { useVerseSelection } from "../verse-selection";

interface VerseActionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  hideHighlights?: boolean;
  hideVerse?: boolean;
  actionButtonType?: ActionButtonType;
  modalPlacement?: "top" | "bottom";
  screenEdgeGap?: number;
}

export const VerseActionModal = ({
  isOpen = false,
  onClose,
  hideHighlights = false,
  hideVerse = false,
  actionButtonType = ActionButtonType.default,
  modalPlacement = "bottom",
  screenEdgeGap = 24,
}: VerseActionModalProps) => {
  const { selectedCount, clearSelection } = useVerseSelection();

  const handleClose = () => {
    clearSelection();
    if (onClose) {
      onClose();
    }
  };

  return (
    <SlideInModal
      isOpen={selectedCount > 0 || isOpen}
      onClose={handleClose}
      position={modalPlacement}
      distance={screenEdgeGap}
      background={false}
      className="w-full sm:w-fit sm:rounded-lg"
    >
      <div className="relative p-4">
        <button onClick={handleClose} className="absolute top-3 right-3 p-2">
          <XIcon />
        </button>
        <VerseActionPicker
          hideHighlights={hideHighlights}
          hideVerse={hideVerse}
          actionButtonType={actionButtonType}
        />
      </div>
    </SlideInModal>
  );
};
