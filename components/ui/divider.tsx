import React from 'react'

type DividerProps = {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  padding?: string;
}

export function Divider({ className = '', variant = 'horizontal', padding }: DividerProps) {
  const baseClasses = 'bg-neutral-200 rounded-[100px]';
  const variantClasses = variant === 'horizontal' 
    ? 'w-full h-px' 
    : 'h-full w-px mx-auto';

  return (
    <div className={`${variant === 'vertical' ? 'flex h-full' : 'w-full'} ${padding || ''} ${className}`}>
      <div className={`${baseClasses} ${variantClasses}`} />
    </div>
  )
}
