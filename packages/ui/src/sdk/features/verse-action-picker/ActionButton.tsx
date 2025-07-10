import clsx from "clsx";

export enum ActionButtonType {
  pill = "pill",
  default = "default",
  circle = "circle",
}

export function ActionButton({
  children,
  onClick,
  type = ActionButtonType.default,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type?: ActionButtonType;
}) {
  const className = clsx("cursor-pointer", {
    "rounded-xl w-fit px-6 py-2 flex flex-col items-center":
      type === ActionButtonType.default,
    "rounded-3xl w-fit p-2 flex flex items-center":
      type === ActionButtonType.pill,
    "rounded-full w-[40px] h-[40px] p-2 flex flex items-center":
      type === ActionButtonType.circle,
  });

  return (
    <div
      onClick={onClick}
      className={className}
      style={{ backgroundColor: "#EDEBEB" }}
    >
      {children}
    </div>
  );
}
