export function BibleVersionAcronymCard({ version }: { version: string }) {
  const truncatedVersion = version.slice(0, 4);

  const getFontSize = (text: string) => {
    const length = text.length;
    if (length >= 4) return "text-[11px]";
    if (length === 3) return "text-[12px]";
    if (length === 2) return "text-[14px]";
    return "text-[16px]"; // for 1 character or less
  };

  return (
    <div
      className={`p-2 w-[48px] h-[48px] font-bold rounded-md bg-canvas-secondary flex items-center justify-center uppercase ${getFontSize(truncatedVersion)}`}
    >
      {truncatedVersion}
    </div>
  );
}
