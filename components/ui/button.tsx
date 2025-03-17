import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";
import LoadingSpinner from "./loading-spinner";

const buttonVariants = cva(
  "inline-flex justify-center border-solid items-center rounded-lg text-[0.938rem] py-[7px] px-4 font-medium leading-[1.3333em] align-middle cursor-pointer text-center gap-2 border disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-[0_1px_4px_0_rgba(9,39,83,0.12),0_0_0_4px_rgba(var(--button-color-rgb),0.4)] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-200 border-blue-200 text-white shadow-[0px_0px_0px_1px_rgba(255,255,255,0.3)_inset,0px_1px_4px_0px_rgba(9,39,83,0.12)] hover:bg-blue-300",
        destructive: "bg-red-500 border-red-500 text-white shadow-[0px_0px_0px_1px_rgba(255,255,255,0.30)_inset,0px_1px_4px_0px_rgba(9,39,83,0.12)] hover:bg-red-600",
        secondary: "bg-white border-neutral-500 text-gray-900 shadow-[0px_0px_0px_1px_#E6EAEF_inset,0px_1px_4px_0px_rgba(9,39,83,0.12)] hover:bg-interaction-200",
      },
      size: {
        default: "text-[0.938rem]",
        small: "text-[0.813rem]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, loading, size, children, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className) }
        ref={ref}
        disabled={props.disabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button , buttonVariants };
