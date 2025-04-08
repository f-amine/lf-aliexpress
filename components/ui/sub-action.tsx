import React, { forwardRef } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconLinkVariants = cva(
  "flex items-center gap-2 text-sm font-medium leading-5",
  {
    variants: {
      variant: {
        default: "text-gray-500 hover:text-gray-900",
        destructive: "text-gray-600 hover:text-red-500",
      },
      size: {
        default: "text-sm",
        small: "text-xs",
      },
      state: {
        default: "cursor-pointer",
        disabled: "cursor-not-allowed opacity-50",
        spinning: "animate-spin",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default"
    }
  }
);

export interface IconLinkProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconLinkVariants> {
  icon: React.ReactNode;
  text?: React.ReactNode;
  spinning?: boolean;
  disabled?: boolean;
}

export const SubAction = forwardRef<HTMLDivElement, IconLinkProps>(({
  icon,
  text,
  spinning = false,
  disabled = false,
  variant,
  size,
  state,
  className,
  onClick,
  ...props
}, ref) => {
  // Determine the state variant based on props
  const stateVariant = disabled ? "disabled" : spinning ? "spinning" : state;
  
  return (
    <div
      ref={ref}
      className={cn(
        iconLinkVariants({
          variant,
          size,
          state: stateVariant,
          className
        })
      )}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      {text && <span className="text-nowrap">{text}</span>}
    </div>
  );
});

SubAction.displayName = 'SubAction';
