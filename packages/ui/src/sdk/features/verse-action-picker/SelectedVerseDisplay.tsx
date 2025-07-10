import { useVerseSelection } from "@youversion/bible-hooks";
import { formatVerseSelection } from "./utils";

interface SelectedVerseDisplayProps {
  className?: string;
}

export const SelectedVerseDisplay = ({
  className,
}: SelectedVerseDisplayProps) => {
  const { selectedVerseUsfms } = useVerseSelection();

  return (
    <div
      className={`mb-4 font-bold text-[17px] leading-[1.25] text-[#121212] font-['aktiv-grotesk'] ${className || ""}`}
      style={{
        fontFeatureSettings: "'liga' off, 'clig' off",
      }}
    >
      {formatVerseSelection(Array.from(selectedVerseUsfms))}
    </div>
  );
};
