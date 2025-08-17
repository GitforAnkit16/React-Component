import React from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500",
  outlined: "border border-gray-400 focus:ring-2 focus:ring-blue-500",
  ghost: "border-b border-gray-400 focus:ring-0",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        aria-disabled={disabled}
        className={clsx(
          "rounded-md focus:outline-none",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "bg-gray-200 cursor-not-allowed",
          invalid && "border-red-500 focus:ring-red-500"
        )}
      />
      {helperText && !errorMessage && <p className="text-xs text-gray-500">{helperText}</p>}
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
};
