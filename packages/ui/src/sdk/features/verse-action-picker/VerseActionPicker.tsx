import { useState } from "react";
import { BoxArrowUpIcon, BoxStackIcon, XIcon } from "../../shared";
import { useVerseSelection } from "../verse-selection";
import { ActionButton, ActionButtonType } from "./ActionButton";
import { useBibleClient } from "../../hooks/useBibleClient";
import { useReaderContext, useToast } from "../../context";
import { extractTextFromHtml } from "../../utils/extractTextFromHTML";
import { BibleClient } from "@youversion/bible-core";

interface VerseActionPickerProps {
  hideHighlights?: boolean;
  hideVerse?: boolean;
  actionButtonType?: ActionButtonType;
}

async function getVerseText(
  usfms: string[],
  bibleClient: BibleClient,
  versionId: number,
  bookId: string
) {
  const versesPromises = [];

  for (const usfm of usfms) {
    const [, chapter, verseNumber] = usfm.split(".");

    if (!chapter || !verseNumber) {
      continue;
    }

    versesPromises.push(
      bibleClient.getVerse(
        versionId,
        bookId,
        parseInt(chapter),
        parseInt(verseNumber)
      )
    );
  }

  const verses = await Promise.all(versesPromises);

  return verses
    .map(
      (verse) => extractTextFromHtml(verse.content) + ` - ${verse.reference}`
    )
    .join("\n");
}

export const VerseActionPicker = ({
  hideHighlights = false,
  hideVerse = false,
  actionButtonType = ActionButtonType.default,
}: VerseActionPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const { selectedVerseUsfms } = useVerseSelection();
  const bibleClient = useBibleClient();
  const { currentVersion, currentBook } = useReaderContext();
  const { showToast } = useToast();

  const colorOptions = [
    { id: 0, color: "#fffe00", label: "Yellow" },
    { id: 1, color: "#5dff79", label: "Green" },
    { id: 2, color: "#00d6ff", label: "Blue" },
    { id: 3, color: "#ffc66f", label: "Orange" },
    { id: 4, color: "#ff95ef", label: "Pink" },
  ];

  const handleCopy = async () => {
    const usfms = Array.from(selectedVerseUsfms);

    const text = await getVerseText(
      usfms,
      bibleClient,
      currentVersion.id,
      currentBook.usfm
    );

    await navigator.clipboard.writeText(text);
    showToast("Verses copied to clipboard", 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const usfms = Array.from(selectedVerseUsfms);

        const text = await getVerseText(
          usfms,
          bibleClient,
          currentVersion.id,
          currentBook.usfm
        );

        navigator.share({
          title: "YouBible",
          text: text,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleColorSelect = (colorId: number) => {
    setSelectedColor(colorId);
  };

  return (
    <div className="p-6 rounded-2xl bg-white flex items-center flex-col shadow-lg w-fit">
      {!hideVerse && (
        <div
          className="mb-4 font-bold text-[17px] leading-[1.25] text-[#121212] font-['aktiv-grotesk']"
          style={{
            fontFeatureSettings: "'liga' off, 'clig' off",
          }}
        >
          {Array.from(selectedVerseUsfms).join(", ")}
        </div>
      )}
      <div className="flex flex-row gap-2 mb-4">
        <ActionButton onClick={handleCopy} type={actionButtonType}>
          <BoxStackIcon className="mb-1" />
          Copy
        </ActionButton>
        <ActionButton onClick={handleShare} type={actionButtonType}>
          <BoxArrowUpIcon className="mb-1" />
          Share
        </ActionButton>
      </div>
      {!hideHighlights && (
        <div className="flex flex-row gap-3">
          {colorOptions.map((color) => (
            <div
              onClick={() => handleColorSelect(color.id)}
              key={color.id}
              className="rounded-full w-[32px] h-[32px] flex items-center justify-center"
              style={{
                backgroundColor: color.color,
              }}
            >
              {selectedColor === color.id && <XIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
