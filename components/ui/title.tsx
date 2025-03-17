import React from 'react';

type Title1Props = {
  className?: string;
  titleWrapperClassName?: string;
  subTitle?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  noMargin?: boolean;
  medium?: boolean;
  headingClassName?: string;
}

export function Title({
  className,
  titleWrapperClassName,
  subTitle,
  children,
  actions,
  noMargin,
  headingClassName
}: Title1Props) {
  return (
    <div className={`${className ?? ''} py-6 self-stretch`}>
      <div className={`flex items-start flex-col justify-between gap-6 [&>button]:flex-shrink-0 lg:flex-row lg:items-center ${titleWrapperClassName ?? ''}`}>
        <h2 className={`text-4xl self-stretch leading-12 font-medium text-gray-900 overflow-hidden text-ellipsis line-clamp-2 ${noMargin ? '' : 'mb-0'} ${headingClassName ?? ''}`}>
          {children}
        </h2>
        {actions}
      </div>
      {subTitle && (
        <div className="flex pt-4 text-neutral-800 gap-[10px] text-sm first-letter:uppercase flex-col sm:flex-row max-w-[420px]">
          {subTitle}
        </div>
      )}
    </div>
  );
}
