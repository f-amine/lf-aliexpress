import React, {Fragment} from "react";
import {createPortal} from "react-dom";
import { cn } from '@/lib/utils';

type Props = {
  header?: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
  bodyClassName?: string
  headerClassName?: string
  close: () => void
  variant?: 'center' | 'right'
}

export function Modal(props: Props){
  const variant = props.variant || 'center';
  
  // Get position classes based on variant
  const getPositionClasses = () => {
    switch (variant) {
      case 'right':
        return 'ml-auto';
      default:
        return 'mx-auto';
    }
  };
  
  const getContentClasses = () => {
    return variant === 'right' 
      ? 'w-full sm:w-[90%] md:w-[75%] lg:w-[55%] rounded-l-md animate-slide-in-from-right h-full'
      : 'rounded-md max-h-frame-height';
  };
  
  const getWrapperClasses = () => {
    return variant === 'right' 
      ? 'fixed inset-0 flex p-4 sm:pr-0 z-10'
      : 'fixed inset-0 flex items-center justify-center px-4 z-10';
  };

  return (
    <Fragment>
      {
        createPortal(
          <div className={getWrapperClasses()}>
            <div onClick={() => props.close()} className="inset-0 z-0 bg-gray-900 opacity-50 absolute flex"></div>
            <div className={cn(
              "bg-white  relative flex flex-col max-w-full",
              getContentClasses(),
              getPositionClasses(),
              props.bodyClassName
            )}>
              {
                props.header && (
                  <div className={`p-4 ${props.headerClassName ?? ""}`}>{props.header}</div>
                )
              }
              <div
                className={
                  "p-4 grow overflow-y-auto "
                  + (props.header ? "pt-0" : "")
                  + (props.footer ? "pb-0" : "") 
                }
              >
                {props.body}
              </div>
              {
                props.footer && (
                  <div className={"p-4 flex gap-4 justify-end"}>{props.footer}</div>
                )
              }
            </div>
          </div>,
          document.getElementById("modals")!
        )
      }
    </Fragment>
  )
}

export function ModalBody(){
  return (
    <div></div>
  )
}
