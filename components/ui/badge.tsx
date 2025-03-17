import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border text-sm leading-none gap-2",
  {
    variants: {
      variant: {
        primary: "bg-blue-200/10 border-blue-200/40",
        warning: "bg-yellow-500/10 border-yellow-500/40",
        success: "bg-teal-400/10 border-teal-400/40 ",
        outline: "bg-neutral-600/10 border-neutral-600/40",
        destructive: "bg-red-500/10 border-red-500/40",
      },
      borderRadius: {
        regular: "rounded",
        full: "rounded-full",
        max: "rounded-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      borderRadius: "max"
    }
  }
);

const dotVariants = {
  primary: "bg-blue-200",
  warning: "bg-yellow-500",
  success: "bg-teal-400",
  outline: "bg-neutral-600",
  destructive: "bg-red-500",
};

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  borderRadius,
  withDot,
  ...props
}) => {
  return (
    <span 
      className={cn(badgeVariants({ variant, borderRadius, className }),"px-3 py-1")} 
      {...props}
    >
      {withDot && (
        <div 
          className={cn(
            "w-2 h-2 rounded-full",
            dotVariants[variant as keyof typeof dotVariants]
          )} 
        />
      )}
      {props.children}
    </span>
  );
};

export { badgeVariants };
