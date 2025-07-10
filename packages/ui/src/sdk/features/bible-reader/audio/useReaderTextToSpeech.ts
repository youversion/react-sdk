import { useCallback } from "react";
import { extractTextFromHtml } from "./ElevenLabs";
import { useVerses } from "../../../hooks";
import { useReaderContext } from "../../../context";
import { useTextToSpeech } from "../../../hooks/useTextToSpeech";

interface Props {
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useReaderTextToSpeech(options: Props = {}) {
  const { currentVersion, currentBook, currentChapter } = useReaderContext();
  const textToSpeech = useTextToSpeech(options);

  const { verses } = useVerses(
    currentVersion.id,
    currentBook.usfm,
    parseInt(currentChapter.title)
  );

  const playChapter = useCallback(async () => {
    if (!verses?.data?.length) return;

    const text = verses.data
      .map((v) => extractTextFromHtml(v.content))
      .join(" ");

    await textToSpeech.playText(text);
  }, [verses, textToSpeech]);

  const playVerses = useCallback(async (verseUsfms: string[]) => {
    if (!verses?.data?.length) return;

    const selectedVerses = verses.data.filter(v => verseUsfms.includes(v.usfm));
    if (!selectedVerses.length) return;

    const text = selectedVerses
      .map((v) => extractTextFromHtml(v.content))
      .join(" ");

    await textToSpeech.playText(text);
  }, [verses, textToSpeech]);

  return {
    ...textToSpeech,
    playChapter,
    playVerses,
  };
}
