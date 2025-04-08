import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";

// The solution is to move size classes to the end so they take precedence
const textVariants = cva(
  "text-gray-500", 
  {
    variants: {
      variant: {
        default: "leading-5",
        title: "text-2xl leading-8 text-gray-900 font-medium",
      },
      size: {
        large: "text-[20px]",
        regular: "text-base",
        small: "text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    }
  }
)

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & 
  VariantProps<typeof textVariants>;

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  function Text({ className, size, variant, ...props }, ref) {
    return (
      <p ref={ref} className={clsx(textVariants({ variant, size, className }))}>
        {props.children}
      </p>
    )
  }
)

Text.displayName = "Text";
