import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"
import { Check } from "./icons"
 
type Props = React.HTMLAttributes<HTMLInputElement> & {
  checked: boolean
  label: React.ReactNode
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox(props: Props){
  return (
    <Label className={cn("flex items-start cursor-pointer gap-2", props.className)}>
      <input checked={props.checked} onChange={props.onChange} type="checkbox" className="hidden" />
      <div
        data-state={props.checked ? "checked" : "unchecked"}
        className={cn(
          "w-[18px] h-[18px] flex items-center justify-center shrink-0 rounded-md cursor-pointer",
          "border border-neutral-400 bg-white",
          "shadow-[0px_1px_4px_0px_rgba(9,39,83,0.12),0px_1px_4px_-2px_rgba(9,39,83,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props.checked && "bg-blue-100 text-white border-none shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)_inset,_0px_1px_4px_0px_rgba(9,39,83,0.12),_0px_1px_4px_-2px_rgba(9,39,83,0.08)]"
        )}
      >
        {props.checked && (
          <Check className="w-3 h-3 text-white" />
        )}
      </div>
      <span className="pt-[1px]">
        {props.label}
      </span>
    </Label>
  )
}
