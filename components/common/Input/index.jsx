import React from "react";

const Input = React.forwardRef(
  (
    { icon: Icon, label, error, errorMessage, disabled, className, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col justify-center">
        {/* Display label if any */}
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm ml-1 mb-[6px] font-medium text-gray-700"
          >
            {label} <span className="text-red-500">*</span>
          </label>
        )}

        {/* input field */}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Icon className="size-5 text-gray-500" />
            </div>
          )}
          <input
            {...props}
            ref={ref}
            disabled={disabled}
            className={`${className} ${
              error && errorMessage && "border border-red-500"
            } w-full pl-3 py-[7px] text-sm text-gray-500 bg-opacity-50 rounded-md border
            border-gray-400 placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 
            focus:outline-none transition duration-200 ${
              Icon ? "pr-10" : "pr-3"
            } ${disabled && "cursor-not-allowed"}`}
          />
        </div>

        {/* Display error if any */}
        {error && errorMessage && (
          <p className="text-red-500 text-[11px] ml-1 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default Input;
