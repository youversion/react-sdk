import { Verse } from "@youversion/bible-core";

interface Props {
  verse: Verse;
}

export function Passage({ verse }: Props) {
  return (
    <div className="flex">
      <div className="w-[4px] self-stretch rounded-sm bg-gray-300 mr-4" />
      <div>
        <div
          className="text-[20px] font-bold leading-[1.25] mb-2"
          style={{
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "aktiv-grotesk",
          }}
        >
          {verse.reference}
        </div>
        <div dangerouslySetInnerHTML={{ __html: verse.content }} />
      </div>
    </div>
  );
}
