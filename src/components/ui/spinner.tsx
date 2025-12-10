import {Loader} from "lucide-react";
import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

type SvgIconProps = ComponentProps<typeof Loader>

export function Spinner ({className,...props}:SvgIconProps){
    return (
        <Loader className={cn("animate-spin",className)} {...props} />
    )
}