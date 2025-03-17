import React, { Fragment, ReactNode } from 'react';

type ComponentDataItem = {
  name: string,
  icon: ReactNode,
  color: string,
  value: string | number,
  growth?: number | null,
  currency?: string
}

type Props = {
  componentData: ComponentDataItem | ComponentDataItem[],
  hasCompare?: boolean,
  noMargin?: boolean
}

export function StatsCard(props: Props) {
  const dataArray = Array.isArray(props.componentData) 
    ? props.componentData 
    : [props.componentData];
  
  return (
    <div className="flex items-center flex-col lg:flex-row self-stretch">
      {dataArray.map((item, index) => {
        const growth = item.growth;  
        const cond = growth != null && growth >= 0;
        const isLastItem = index === dataArray.length - 1;
        
        return (
          <Fragment key={index}>
            <div className="flex flex-col justify-center items-start gap-3 flex-1 flex-shrink-0 basis-0 self-stretch">
              <div className={`${item.color} flex items-center gap-3`}>
                <div className="w-5 h-5">
                  {item.icon}
                </div>
                <span className="font-medium uppercase text-[13px] leading-5 text-gray-900">
                  {item.name}
                </span>
              </div>
              <div className="flex items-end self-stretch justify-between">
                <span className="font-medium text-2xl capitalize text-gray-900">
                  {item.value}
                </span>
                {growth != null && (
                  <span className={`font-medium flex pb-1.5 leading-4 items-center ${cond ? 'text-teal-400' : 'text-red-400'}`}>
                    <Fragment>
                      {/* Arrow icon based on growth direction */}
                      {cond ? (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="m5 12 7-7 7 7"/>
                          <path d="M12 19V5"/>
                        </svg>
                      ) : (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M12 5v14"/>
                          <path d="m5 12 7 7 7-7"/>
                        </svg>
                      )}
                      {growth}%
                    </Fragment>
                  </span>
                )}
              </div>
            </div>
            {!isLastItem && (
              <div className="flex flex-col lg:flex-row py-4 px-6 items-center gap-1 self-stretch">
                <span className="w-full h-px lg:w-px lg:h-full bg-neutral-100"/>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
