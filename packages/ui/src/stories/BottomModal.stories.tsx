import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomModal } from "../sdk/components/shared/BottomModal";

const meta: Meta<typeof BottomModal> = {
  title: 'BottomModal',
  component: BottomModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export function Basic() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal
        </button>

        <BottomModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          distance={24}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Hello from Bottom Modal</h2>
            <p className="mb-4">This is a simple test modal.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </BottomModal>
      </div>
    );
}

export function WithBackdrop() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Page Content</h1>
        <p className="text-gray-600 mb-4">
          This content will be darkened when the modal opens with backdrop enabled.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Open Modal with Backdrop
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Feature 1</h3>
          <p className="text-sm text-gray-600">Some content that will be behind the backdrop</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Feature 2</h3>
          <p className="text-sm text-gray-600">More content that gets darkened</p>
        </div>
      </div>

      <BottomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        distance={24}
        backdrop={true}
        closeOnClickOutside={true}
        className="w-full max-w-md"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Modal with Backdrop</h2>
          <p className="text-gray-600">
            This modal has a dark backdrop that covers the entire screen.
            Click outside the modal or press ESC to close it.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Close
            </button>
            <button
              onClick={() => alert('Action performed!')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Action
            </button>
          </div>
        </div>
      </BottomModal>
    </div>
  );
}