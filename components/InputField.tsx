import * as React from "react";
import { InputFieldProps } from "@/types/index";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  showIcon = false,
  iconSrc,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={`input-${label}`}
        className="flex-1 shrink px-4 w-full text-xs tracking-wide leading-none whitespace-nowrap text-zinc-800"
      >
        {label}
      </label>
      <div className="flex flex-col mt-2 w-full">
        <div className="flex overflow-hidden flex-col w-full rounded-md border-solid bg-zinc-100 border-[0.5px] border-neutral-200">
          <div className="flex gap-10 justify-between items-center py-2 pr-2 pl-4 w-full rounded-md">
            <input
              type={type}
              id={`input-${label}`}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-base leading-none outline-none"
              aria-label={label}
            />
            {showIcon && iconSrc && (
              <div className="flex gap-4 items-start self-stretch p-2 my-auto w-8">
                <img
                  loading="lazy"
                  src={iconSrc}
                  alt=""
                  className="object-contain w-4 aspect-square"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
