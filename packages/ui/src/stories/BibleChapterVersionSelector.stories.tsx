import type { Meta } from "@storybook/react-webpack5";
import { BibleChapterVersionSelector } from "../sdk/components";

const meta = {
  title: 'Bible Chapter Version Selector',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='max-w-xs h-screen w-screen'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

export function BasicRender() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2 w-full items-center text-center'>
        <h2 className='font-bold text-lg'>Normal</h2>
        <BibleChapterVersionSelector />
        <BibleChapterVersionSelector chapter={'1 Corinthians 1'} />
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col gap-2 w-full justify-between items-center text-center'>
          <h1 className='font-bold text-lg'>Disabled</h1>
          <BibleChapterVersionSelector className='w-[600px]' disabled={true} />
        </div>
      </div>
    </div>
  )
}
