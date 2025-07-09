import React, { useState } from "react";
// import BoxStackIcon from "../../../assets/box-stack.svg";
// import BoxArrowUpIcon from "../../../assets/box-arrow-up.svg";

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

  const handleCopy = () => {
    navigator.clipboard.writeText("Proverbs 1:7");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Proverbs 1:7",
        text: "Proverbs 1:7",
      });
    }
  };

  const handleColorSelect = (colorId: number) => {
    setSelectedColor(colorId);
  };

  return (
    <article className="inline-flex flex-col items-center justify-center gap-[15px] p-6 relative bg-white rounded-2xl overflow-hidden">
      <header className="inline-flex flex-col gap-1 items-start relative flex-[0_0_auto]">
        <h1 className="relative w-fit mt-[-1.00px] font-header-XS-desktop font-[number:var(--header-XS-desktop-font-weight)] text-ui-lighttext text-[length:var(--header-XS-desktop-font-size)] tracking-[var(--header-XS-desktop-letter-spacing)] leading-[var(--header-XS-desktop-line-height)] whitespace-nowrap [font-style:var(--header-XS-desktop-font-style)]">
          Proverbs 1:7
        </h1>
      </header>

      <section
        className="flex gap-2.5 self-stretch w-full items-start relative flex-[0_0_auto]"
        role="toolbar"
        aria-label="Actions"
      >
        <div className="flex items-start gap-2.5 relative flex-1 grow">
          <button
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 relative flex-1 grow bg-color-mode-surface-tertiary rounded-xl overflow-hidden hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-opacity"
            onClick={handleCopy}
            aria-label="Copy verse text"
          >
            {/* <BoxStackIcon /> */}
            <span className="relative w-fit font-label-m font-[number:var(--label-m-font-weight)] text-color-mode-text-primary text-[length:var(--label-m-font-size)] text-center tracking-[var(--label-m-letter-spacing)] leading-[var(--label-m-line-height)] whitespace-nowrap [font-style:var(--label-m-font-style)]">
              Copy
            </span>
          </button>
        </div>

        <button
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 relative flex-1 grow bg-color-mode-surface-tertiary rounded-xl overflow-hidden hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-opacity"
          onClick={handleShare}
          aria-label="Share verse"
        >
          {/* <BoxArrowUpIcon /> */}
          <span className="relative w-fit font-label-m font-[number:var(--label-m-font-weight)] text-color-mode-text-primary text-[length:var(--label-m-font-size)] text-center tracking-[var(--label-m-letter-spacing)] leading-[var(--label-m-line-height)] whitespace-nowrap [font-style:var(--label-m-font-style)]">
            Share
          </span>
        </button>
      </section>

      <section
        className="inline-flex items-start gap-3 relative flex-[0_0_auto]"
        role="radiogroup"
        aria-label="Color selection"
      >
        {colorOptions.map((colorOption) => (
          <button
            key={colorOption.id}
            className="relative w-8 h-8 rounded-2xl border border-solid border-[#12121233] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform"
            style={{ backgroundColor: colorOption.color }}
            onClick={() => handleColorSelect(colorOption.id)}
            role="radio"
            aria-checked={selectedColor === colorOption.id}
            aria-label={`Select ${colorOption.label} color`}
          >
            {selectedColor === colorOption.id && (
              <X
                className="!absolute !w-6 !h-6 !top-[3px] !left-[3px]"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </section>
    </article>
  );
};
