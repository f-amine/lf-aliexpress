import { cx as clsx, cva, type VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva(
  "text-gray-500", 
  {
    variants: {
      size: {
        large: "text-[20px]",
        regular: "text-base",
        small: "text-sm",
      },
      variant: {
        default: "leading-5",
        title: "!text-2xl leading-8 text-gray-900 font-medium",
      }
    },
    defaultVariants: {
      size: "small",
      variant: "default",
    }
  }
)

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & 
  VariantProps<typeof textVariants>;

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  function Text({ className, size, variant, ...props }, ref) {
    return (
      <p ref={ref} className={clsx(textVariants({ size, variant, className }))}>
        {props.children}
      </p>
    )
  }
)

Text.displayName = "Text";
