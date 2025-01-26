import * as React from "react";
import { ToggleButtonProps } from "@/types/index";

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  text,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-center items-center px-4 py-1 rounded ${
        isActive
          ? "text-black bg-white border-solid border-[0.5px] border-neutral-200"
          : "text-stone-500"
      }`}
    >
      <div className="gap-2 self-stretch">{text}</div>
    </button>
  );
};
