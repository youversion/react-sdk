import { PlayIcon, StopIcon } from "../../shared";
import { ActionButton, ActionButtonType } from "./ActionButton";
import {
  useReaderTextToSpeech,
  useVerseSelection,
} from "@youversion/bible-hooks";

interface Props {
  className?: string;
  type: ActionButtonType;
}

export const PlayVersesButton = ({ type, className }: Props) => {
  const { isPlaying, isAvailable, playVerses, stop } = useReaderTextToSpeech();

  const { selectedVerseUsfms } = useVerseSelection();

  if (!isAvailable) return null;

  const handlePlay = async () => {
    if (selectedVerseUsfms.size <= 0) return;

    if (isPlaying) {
      stop();
      return;
    }
    await playVerses(Array.from(selectedVerseUsfms));
  };

  const icon = isPlaying ? <StopIcon /> : <PlayIcon />;

  if (type === "regular") {
    return (
      <ActionButton
        type={type}
        text={"Play"}
        icon={icon}
        className={className}
        onClick={handlePlay}
      />
    );
  }
  if (type == "circle") {
    return (
      <ActionButton
        type={type}
        icon={icon}
        className={className}
        onClick={handlePlay}
      />
    );
  }
};
