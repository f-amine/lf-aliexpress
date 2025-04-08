import React, {LinkHTMLAttributes} from "react";
import { cn } from '@/lib/utils';
import Link from "next/link";

type Props = LinkHTMLAttributes<HTMLAnchorElement> & {
	children: React.ReactNode
	className?: string
	href: string
	target?: string
}

export function NativeLink(props: Props){
	return <Link {...props} className={cn("underline cursor-pointer text-blue-300 font-medium text-sm leading-5", props.className)} />
}
export function LinkText(props: LinkHTMLAttributes<HTMLElement>){
	return <span {...props} className={cn("underline cursor-pointer text-blue-300 text-sm leading-5", props.className)} />
}
