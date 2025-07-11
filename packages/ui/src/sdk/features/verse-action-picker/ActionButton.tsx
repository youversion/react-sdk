import { ReactNode } from "react";
import clsx from "clsx";

export type ActionButtonType = "circle" | "regular";

export interface BaseActionButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
}

export interface RegularActionButtonProps extends BaseActionButtonProps {
  type: "regular";
  icon: ReactNode;
  text: string;
}

export interface CircleActionButtonProps extends BaseActionButtonProps {
  type: "circle";
  icon: ReactNode;
}

export type ActionButtonProps =
  | RegularActionButtonProps
  | CircleActionButtonProps;

export function ActionButton(props: ActionButtonProps) {
  const { onClick, className = "", type, title } = props;

  const baseStyles = clsx(
    "flex items-center justify-center cursor-pointer hover:shadow-sm",
    { "bg-[#EDEBEB]": !className?.includes("bg-") },
  );

  if (type === "circle") {
    return (
      <button
        title={title}
        onClick={onClick}
        className={`${baseStyles} w-10 h-10 rounded-full ${className}`}
      >
        {props.icon}
      </button>
    );
  }

  // Regular type
  return (
    <button
      onClick={onClick}
      title={title}
      className={`${baseStyles} gap-1 p-2 flex-wrap text-xs ${className}`}
    >
      {props.icon}
      <p>{props.text}</p>
    </button>
  );
}
