import { BoxArrowUpIcon } from "../../shared";
import { ActionButton, ActionButtonType } from "./ActionButton";
import { useVerseSelection } from "../verse-selection";
import { useBibleClient } from "../../hooks/useBibleClient";
import { useReaderContext } from "../../context";
import { getVerseText } from "./utils";

interface ShareButtonProps {
  hideText?: boolean;
  className?: string;
  type: ActionButtonType;
}

export const ShareButton = ({ type, className }: ShareButtonProps) => {
  const { selectedVerseUsfms } = useVerseSelection();
  const bibleClient = useBibleClient();
  const { currentVersion, currentBook } = useReaderContext();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const usfms = Array.from(selectedVerseUsfms);

        const text = await getVerseText(
          usfms,
          bibleClient,
          currentVersion.id,
          currentBook.usfm,
        );

        await navigator.share({
          title: "YouBible",
          text: text,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (type === "regular") {
    return (
      <ActionButton
        type={type}
        text={"Share"}
        icon={<BoxArrowUpIcon />}
        className={className}
        onClick={handleShare}
      />
    );
  }
  if (type == "circle") {
    return (
      <ActionButton
        type={type}
        icon={<BoxArrowUpIcon />}
        className={className}
        onClick={handleShare}
      />
    );
  }
};
