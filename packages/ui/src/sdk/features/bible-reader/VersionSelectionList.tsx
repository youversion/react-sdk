import { Version } from "@youversion/bible-core";
import { useVersions } from "../../hooks";
import { VersionOption } from "./BibleVersionSelectionModal";

interface VersionSelectionListProps {
  className?: string;
  versions: VersionOption[];
  currentVersionId: number;
  onSelect: (version: Version) => void;
}

export function VersionSelectionList({
                                className,
                                versions,
                                currentVersionId,
                                onSelect,
                              }: VersionSelectionListProps) {
  const { versions: fullVersions } = useVersions();

  function handleVersionClick(versionId: number) {
    const fullVersion = fullVersions?.data.find(v => v.id === versionId);
    if (fullVersion) {
      onSelect(fullVersion);
    }
  }

  return (
    <div className={`min-w-[300px] overflow-y-auto ${className || ''}`}>
      {versions.map((version) => {
        const isSelected = currentVersionId === version.id;
        return (
          <button
            key={version.id}
            onClick={() => handleVersionClick(version.id)}
            className={`w-full text-left p-3 border-b border-border-primary hover:cursor-pointer transition-colors`}
          >
            <div className="flex justify-between px-2 items-center">
              <div className="flex gap-3 items-center">
                <BibleVersionAcronymCard version={version.abbreviation} />
                <p className={`text-sm ${isSelected ? 'text-blue-500' : 'text-gray-600'} overflow-hidden`}>
                  {version.name}
                </p>
              </div>
              <div className='flex justify-center items-center ms-4'>
                {isSelected ?
                  <div className="w-3 h-3 -translate-x-[2px] bg-utility-info rounded-full ring ring-utility-info ring-offset-2" /> :
                  <div className="w-4 h-4 border-1 border-border-secondary rounded-full" />
                }
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function BibleVersionAcronymCard({ version }: { version: string }) {
  const truncatedVersion = version.slice(0, 4);

  const getFontSize = (text: string) => {
    const length = text.length;
    if (length >= 4) return 'text-[11px]';
    if (length === 3) return 'text-[12px]';
    if (length === 2) return 'text-[14px]';
    return 'text-[16px]'; // for 1 character or less
  };

  return (
    <div className={`p-2 w-[48px] h-[48px] font-bold rounded-md bg-canvas-secondary flex items-center justify-center uppercase ${getFontSize(truncatedVersion)}`}>
      {truncatedVersion}
    </div>
  );
}