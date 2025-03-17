import React from "react";
import { cx as clsx, cva, type VariantProps } from "class-variance-authority";

const frameVariants = cva(
  "flex items-start self-stretch gap-5 rounded-xl", 
  {
    variants: {
      direction: {
        column: "flex-col",
        row: "",
      },
      size: {
        small: "p-3",
        medium: "p-4",
        large: "p-5",
      },
      variant: {
        default: "border-2 border-solid border-blue-200/20 bg-[#f7fafc]",
        white: "border-2 border-solid border-neutral-100 bg-white",
      }
    },
    defaultVariants: {
      direction: "column",
      size: "small",
      variant: "default",
    }
  }
);

export type FrameProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof frameVariants> & {
    dir?: "ltr" | "rtl";
    children: React.ReactNode;
  };

export const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  function Frame({ 
    className, 
    direction, 
    size, 
    variant, 
    dir, 
    children, 
    ...props 
  }, ref) {
    return (
      <div
        ref={ref}
        dir={dir}
        className={clsx(frameVariants({ direction, size, variant, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Frame.displayName = "Frame";
