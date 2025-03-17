import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {wrapperClassName?: string}
>(({ className, wrapperClassName, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-lg">
    <table className={`w-full ${className || ''}`} {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead className={`relative ${className || ''}`} {...props}>
      <tr>
        <th>
          <div className="absolute inset-0 bg-[#f3f7fb] border border-neutral-100 rounded-lg" />
        </th>
      </tr>
      {props.children}
    </thead>
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr]:border-b [&_tr]:border-neutral-100 text-gray-900 [&_tr:last-child]:border-0 ${className || ''}`}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "[&_td:first-child]:pl-4 [&_td:last-child]:pr-4 [&_th:first-child]:pl-4 [&_th:last-child]:pr-4 [&_td:first-child]:text-left [&_th:first-child]:text-left",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn('h-[42px] p-3 text-left text-neutral-800 font-medium text-[13px] tracking-[0.26px] leading-4.5 uppercase relative z-[1]',className )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-3 overflow-hidden text-sm truncate relative", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
}
