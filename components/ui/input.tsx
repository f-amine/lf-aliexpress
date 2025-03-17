import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: React.ReactNode;
  inputClassName?: string;
  className?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  inputContainerClassName?: string;
  hint?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, hint, ...props }, ref) => {
    return (
      <label
        data-state={props.disabled ? "disabled" : undefined}
        className={cn("relative flex flex-col gap-2", className)}
      >
        <InputWrapper {...props} ref={ref} />
        {error && <InputError message={error} />}
        {hint && <p className="text-sm text-neutral-600">{hint}</p>}
      </label>
    );
  }
);

export const InputWrapper = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputClassName, type, error, icon, leftIcon, inputContainerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-9 w-full items-center gap-2.5 rounded-md border border-neutral-300 bg-white px-2.5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] transition-all",
          "focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300",
          {
            "border-red-300 focus-within:border-red-300 focus-within:ring-red-300": Boolean(error),
            "cursor-not-allowed opacity-50": props.disabled
          },
          inputContainerClassName
        )}
      >
        {leftIcon}
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(
            "h-full w-full bg-transparent text-sm outline-none placeholder:text-neutral-500",
            inputClassName
          )}
        />
        {icon}
      </div>
    );
  }
);

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: React.ReactNode;
  inputClassName?: string;
  className?: string;
  inputContainerClassName?: string;
  hint?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, inputClassName, error, inputContainerClassName, hint, ...props }, ref) => {
    return (
      <label
        data-state={props.disabled ? "disabled" : undefined}
        className={cn("relative flex flex-col gap-2", className)}
      >
        <div
          className={cn(
            "flex w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2.5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] transition-all",
            "focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300",
            {
              "border-red-300 focus-within:border-red-300 focus-within:ring-red-300": Boolean(error)
            },
            inputContainerClassName
          )}
        >
          <textarea
            className={cn(
              "min-h-24 w-full resize-y bg-transparent text-sm outline-none placeholder:text-neutral-500",
              inputClassName
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <InputError message={error} />}
        {hint && <p className="text-sm text-neutral-600">{hint}</p>}
      </label>
    );
  }
);

Input.displayName = "Input";

export function InputError({ message, className }: { message: React.ReactNode; className?: string }) {
  return <div className={cn("text-xs text-red-500", className)}>{message}</div>;
}

export type NumberInputProps = Omit<InputProps, "onChange" | "value" | "min" | "max" | "step"> & {
  decimals?: number;
  currency?: boolean;
  onChange: (value: number | null) => void;
  value: number | null;
  min?: number;
  max?: number;
  step?: number;
  inputClassName?: string;
  className?: string;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    className, 
    decimals = 0, 
    currency = false, 
    onChange, 
    value, 
    min, 
    max, 
    step, 
    inputClassName, 
    error, 
    hint, 
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(
      value !== null ? value.toString() : ""
    );

    React.useEffect(() => {
      if (value === null) {
        setInputValue("");
      } else if (!isNaN(value)) {
        if (currency) {
          setInputValue(formatCurrency(value, decimals));
        } else if (decimals > 0) {
          setInputValue(value.toFixed(decimals));
        } else {
          setInputValue(Math.floor(value).toString());
        }
      }
    }, [value, decimals, currency]);

    const formatCurrency = (val: number, decimalPlaces: number): string => {
      return val.toLocaleString('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      setInputValue(inputVal);

      // Allow for empty input (null value)
      if (inputVal === "") {
        onChange(null);
        return;
      }

      // Remove currency formatting for parsing
      const cleanedValue = inputVal.replace(/[^\d.-]/g, "");
      const numericValue = parseFloat(cleanedValue);

      if (!isNaN(numericValue)) {
        // Handle min/max constraints
        let constrainedValue = numericValue;
        if (min !== undefined && numericValue < min) {
          constrainedValue = Number(min);
        }
        if (max !== undefined && numericValue > max) {
          constrainedValue = Number(max);
        }
        
        onChange(constrainedValue);
      }
    };

    const handleBlur = () => {
      // Format on blur for better UX
      if (value !== null) {
        if (currency) {
          setInputValue(formatCurrency(value, decimals));
        } else if (decimals > 0) {
          setInputValue(value.toFixed(decimals));
        } else {
          setInputValue(Math.floor(value).toString());
        }
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Optional: Select all text when focused
      e.target.select();
    };

    return (
      <label
        data-state={props.disabled ? "disabled" : undefined}
        className={cn("relative flex flex-col gap-2", className)}
      >
        <InputWrapper
          ref={ref}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          error={error}
          min={min}
          max={max}
          step={step}
          inputClassName={inputClassName}
          {...props}
        />
        {error && <InputError message={error} />}
        {hint && <p className="text-sm text-neutral-600">{hint}</p>}
      </label>
    );
  }
);

NumberInput.displayName = "NumberInput";
