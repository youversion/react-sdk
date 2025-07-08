import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Modal } from "../sdk/components/shared";
import { ReactNode, useRef, useState } from 'react';

const meta = {
  title: 'Modal',
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

export function VerseContainer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl font-bold'>Verse</h1>
ß
      <section className='flex flex-col gap-2'>
        <div className='flex flex-col gap-4 items-center'>

          <Modal
            isOpen={modalOpen} // Modal is open if 'paragraph1' is the active one
            onClose={() => setModalOpen(false)}
            draggable={true}
          >
            <p>This is modal content</p>
          </Modal>

          <p
            onClick={(e) => {
              console.log(e.target)
              setModalOpen(true)
            }}
            className='cursor-pointer bg-gray-50 p-2 rounded-sm'
          >
            Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
          </p>

            <p
              onClick={(e) => setModalOpen(true)}
              className='cursor-pointer bg-gray-50 p-2 rounded-sm mt-4'
            >
              "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16
            </p>
        </div>
      </section>
    </div>
  );
}