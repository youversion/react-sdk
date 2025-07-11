import type { Meta } from "@storybook/react";
import { BibleChapterVersionMenuBar } from "../sdk";

const meta = {
  title: "Bible Components/Chapter & Version Menu Bar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs h-screen w-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

export function BasicRender() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full items-center text-center">
        <h2 className="font-bold text-lg">Normal</h2>
        <BibleChapterVersionMenuBar />
        <BibleChapterVersionMenuBar chapter={"1 Corinthians 1"} />
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-full justify-between items-center text-center">
          <h1 className="font-bold text-lg">Disabled</h1>
          <BibleChapterVersionMenuBar className="w-[400px]" />
        </div>
      </div>
    </div>
  );
}
