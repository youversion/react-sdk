import { XIcon } from "../../shared";
import { useState } from "react";

interface HighlightsTrayProps {
  direction: "horizontal" | "vertical";
}

export const HighlightsTray = ({
  direction = "horizontal",
}: HighlightsTrayProps) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const colorOptions = [
    { id: 0, color: "#fffe00", label: "Yellow" },
    { id: 1, color: "#5dff79", label: "Green" },
    { id: 2, color: "#00d6ff", label: "Blue" },
    { id: 3, color: "#ffc66f", label: "Orange" },
    { id: 4, color: "#ff95ef", label: "Pink" },
  ];

  const flexDirection = direction === "horizontal" ? "flex-row" : "flex-col";

  return (
    <div className={`flex gap-3 ${flexDirection}`}>
      {colorOptions.map((color) => (
        <div
          onClick={() => setSelectedColor(color.id)}
          key={color.id}
          className="rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: color.color,
          }}
        >
          {selectedColor === color.id && <XIcon />}
        </div>
      ))}
    </div>
  );
};
