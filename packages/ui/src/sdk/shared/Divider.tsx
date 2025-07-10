interface Props {
  direction: "horizontal" | "vertical";
  className?: string;
}

export function Divider({ direction, className = "" }: Props) {
  if (direction == "horizontal") {
    return (
      <div className={`w-full h-[1px] bg-border-secondary ${className}`} />
    );
  } else {
    return (
      <div className={`h-full w-[1px] bg-border-secondary ${className}`} />
    );
  }
}
