import { cn } from "@/lib/utils"; 
import { Label } from "./label";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	label?: React.ReactNode
}

export function FormGroup({ label, className, ...props }: Props) {
	return (
		<div className={cn("self-stretch", className)} {...props}>
			{
				label &&
				<Label className="mb-2">
					{label}
				</Label>
			}
			{props.children}
		</div>
	)
}

FormGroup.displayName = "FormGroup";
