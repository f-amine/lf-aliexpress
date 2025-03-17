import React from 'react';
import { Title } from './title';

type SectionProps = {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(({
  title,
  actions,
  children,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  noPaddingTop,
  noPaddingBottom,
}, ref) => (
  <div ref={ref} className={`flex flex-col items-start self-stretch ${className}`}>
    {(title || actions) && (
      <Title
        children={title}
        headingClassName={`${titleClassName} text-[20px] !leading-5 flex-grow`}
        className={`${noPaddingTop ? '!pt-0' : '!pt-4'} ${noPaddingBottom ? '!pb-0': '!pb-4'} w-full`}
        actions={actions}
      />
    )}
    <div className={`${bodyClassName} pt-2 pb-4 flex flex-col items-start gap-4.5 self-stretch`}>
      {children}
    </div>
  </div>
));
