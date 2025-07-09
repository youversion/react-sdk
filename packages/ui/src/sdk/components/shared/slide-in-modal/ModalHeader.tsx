import { PropsWithChildren } from "react";

interface ModalHeaderProps {
  onCloseClicked?: () => void;
  title: string;
}

export function ModalHeader({ children, onCloseClicked, title }: PropsWithChildren<ModalHeaderProps>) {
  return (
    <div className='bg-[#F6F4F4] w-full min-h-[50px] border-b-[#DDDBDB] sticky top-0 border-b-1 flex flex-col gap-2 p-4'>
      <div className='flex w-full justify-between'>
        <h2 className='text-md font-bold'>{title}</h2>
        {onCloseClicked && (
          <button
            onClick={onCloseClicked}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
