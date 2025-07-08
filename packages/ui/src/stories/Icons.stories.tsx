import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CopyIcon, ShareIcon } from "../sdk/components/shared";

const meta = {
  title: 'Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-screen max-w-xs p-2'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className='w-full grid grid-cols-3 gap-5 p-8'>
      <div className='flex flex-col items-center gap-1'>
        <CopyIcon size={24} />
        <span>Copy Icon (24px)</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <CopyIcon size={32} />
        <span>Copy Icon (32px)</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <CopyIcon size={48} />
        <span>Copy Icon (48px)</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <ShareIcon size={24} />
        <span>Share Icon (24px)</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <ShareIcon size={32} />
        <span>Share Icon (32px)</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <ShareIcon size={48} />
        <span>Share Icon (48px)</span>
      </div>
    </div>
  ),
};

// Individual icon stories
export const CopyIconStory: Story = {
  name: 'Copy Icon',
  render: () => <CopyIcon size={24} />,
};

export const ShareIconStory: Story = {
  name: 'Share Icon',
  render: () => <ShareIcon size={24} />,
};
