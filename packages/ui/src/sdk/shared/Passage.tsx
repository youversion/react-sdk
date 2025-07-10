import { Verse } from "@youversion/bible-core";

interface Props {
  verse: Verse;
  className?: string;
}

export function Passage({ verse, className = "" }: Props) {
  return (
    <div className={`flex ${className}`}>
      <div className="w-[4px] self-stretch rounded-sm bg-gray-300 mr-4" />
      <div>
        <div
          className="text-[16px] font-bold leading-[1.25] mb-2"
          style={{
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "aktiv-grotesk",
          }}
        >
          {verse.reference}
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: verse.content }}
        />
      </div>
    </div>
  );
}
