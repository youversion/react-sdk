import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {ChevronDownIcon, ChevronUpIcon, CopyIcon, MagnifyingGlassIcon, ShareIcon} from "../sdk/components/shared";

const meta = {
  title: 'Design Components/Icons',
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
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl font-bold'>Available Icons</h1>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Copy Icon</h2>
        <div className='flex gap-4 items-center'>
          <CopyIcon size={24} />
          <CopyIcon size={32} />
          <CopyIcon size={48} />
        </div>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Share Icon</h2>
        <div className='flex gap-4 items-center'>
          <ShareIcon size={24} />
          <ShareIcon size={32} />
          <ShareIcon size={48} />
        </div>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Copy Icon</h2>
        <div className='flex gap-4 items-center'>
          <MagnifyingGlassIcon size={24} />
          <MagnifyingGlassIcon size={32} />
          <MagnifyingGlassIcon size={48} />
        </div>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Copy Icon</h2>
        <div className='flex gap-4 items-center'>
          <ChevronDownIcon size={24} />
          <ChevronDownIcon size={32} />
          <ChevronDownIcon size={48} />
        </div>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Copy Icon</h2>
        <div className='flex gap-4 items-center'>
          <ChevronUpIcon size={24} />
          <ChevronUpIcon size={32} />
          <ChevronUpIcon size={48} />
        </div>
      </section>
    </div>
  ),
};
