import React from 'react';

type ContentProps = {
  children: React.ReactNode;
  className?: string;
 
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(({
  children,
  className = '',
}, ref) => (
  <div ref={ref} className={`flex items-start self-stretch gap-8 ${className}`}>
    {children}
  </div>
));
