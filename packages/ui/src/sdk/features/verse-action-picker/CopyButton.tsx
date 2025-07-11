import { BoxStackIcon } from "../../shared";
import {
  useBibleClient,
  useReaderContext,
  useVerseSelection,
} from "@youversion/bible-hooks";
import { ActionButton, ActionButtonType } from "./ActionButton";
import { getVerseText } from "./utils";
import { useToast } from "../../context";

interface CopyButtonProps {
  className?: string;
  type: ActionButtonType;
}

export const CopyButton = ({ className, type }: CopyButtonProps) => {
  const { selectedVerseUsfms } = useVerseSelection();
  const bibleClient = useBibleClient();
  const { currentVersion, currentBook } = useReaderContext();
  const { showToast } = useToast();

  const handleCopy = async () => {
    const usfms = Array.from(selectedVerseUsfms);

    const text = await getVerseText(
      usfms,
      bibleClient,
      currentVersion.id,
      currentBook.usfm,
    );

    await navigator.clipboard.writeText(text);
    showToast("Verses copied to clipboard", 2000);
  };

  if (type === "regular") {
    return (
      <ActionButton
        type={type}
        title="Copy To Clipboard"
        text={"Copy"}
        icon={<BoxStackIcon />}
        className={className}
        onClick={handleCopy}
      />
    );
  }
  if (type == "circle") {
    return (
      <ActionButton
        type={type}
        title="Copy To Clipboard"
        icon={<BoxStackIcon />}
        className={className}
        onClick={handleCopy}
      />
    );
  }
};
