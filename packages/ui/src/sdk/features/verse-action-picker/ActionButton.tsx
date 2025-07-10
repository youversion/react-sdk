import React from "react";

export type ActionButtonType = "circle" | "regular";

interface BaseActionButtonProps {
  onClick: () => void;
  className?: string;
}

interface RegularActionButtonProps extends BaseActionButtonProps {
  type: "regular";
  icon: React.ReactNode;
  text: string;
}

interface CircleActionButtonProps extends BaseActionButtonProps {
  type: "circle";
  icon: React.ReactNode;
}

type ActionButtonProps = RegularActionButtonProps | CircleActionButtonProps;

export function ActionButton(props: ActionButtonProps) {
  const { onClick, className = "", type } = props;

  const baseStyles = "flex items-center justify-center cursor-pointer";
  const backgroundColor = "#EDEBEB";

  if (type === "circle") {
    return (
      <div
        onClick={onClick}
        className={`${baseStyles} w-10 h-10 rounded-full ${className}`}
        style={{ backgroundColor }}
      >
        {props.icon}
      </div>
    );
  }

  // Regular type
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} gap-1 p-2 flex-wrap text-xs ${className}`}
      style={{ backgroundColor }}
    >
      {props.icon}
      <span>{props.text}</span>
    </div>
  );
}
