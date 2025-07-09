import { useState } from "react";
import { BoxStackIcon } from "../../shared";

const X = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const VerseActionPicker = () => {
  const [selectedColor, setSelectedColor] = useState(2);

  const colorOptions = [
    { id: 0, color: "#fffe00", label: "Yellow" },
    { id: 1, color: "#5dff79", label: "Green" },
    { id: 2, color: "#00d6ff", label: "Blue" },
    { id: 3, color: "#ffc66f", label: "Orange" },
    { id: 4, color: "#ff95ef", label: "Pink" },
  ];

  // const handleCopy = () => {
  //   navigator.clipboard.writeText("Proverbs 1:7");
  // };

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: "Proverbs 1:7",
  //       text: "Proverbs 1:7",
  //     });
  //   }
  // };

  // const handleColorSelect = (colorId: number) => {
  //   setSelectedColor(colorId);
  // };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-2xl">
      <div>Proverbs 1:7</div>
    </div>
  );
};
