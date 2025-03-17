'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  items: {
    label: React.ReactNode
    icon?: string
    link: string
    exact?: boolean
    disabled?: boolean
  }[]
}

export function Tabs(props: Props) {
  const pathname = usePathname()
  
  const isLinkActive = (link: string, exact?: boolean) => {
    if (exact) {
      return pathname === link
    }
    return pathname.startsWith(link)
  }
  
  return (
    <div className={cn("flex relative items-center gap-2.5 w-full border-b border-neutral-200 overflow-auto", props.className)}>
      {props.items.map(item => (
        <Fragment key={item.link}>
          <div className="flex flex-col items-start gap-[5px] font-medium text-sm-1 leading-5 relative">
            <Link
              href={item.link}
              className={cn(
                "flex items-center py-2 px-3 gap-2 rounded-xl",
                item.disabled && "pointer-events-none opacity-50",
                isLinkActive(item.link, item.exact) 
                  ? "text-blue-300 bg-blue-300/10 shadow-[inset_0px_0px_0px_1px_rgba(0,97,244,0.10)]" 
                  : "text-gray-900"
              )}
            >
              {item.icon && <i className={`icon text-[20px] ${item.icon}`} />}
              <span className="capitalize max-w-max overflow-hidden text-ellipsis">
                {item.label}
              </span>
            </Link>
            <span className={cn(
              "h-[3px] w-full items-stretch rounded-md",
              isLinkActive(item.link, item.exact) ? "bg-blue-300" : "bg-transparent"
            )} />
          </div>
        </Fragment>
      ))}
    </div>
  )
}
