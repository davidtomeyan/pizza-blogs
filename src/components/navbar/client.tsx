"use client"
import {usePopover} from "@/components/navbar/popover-provider";
import {RemoveScrollBar} from "react-remove-scroll-bar";

export function HideScrollBody() {
    const open = usePopover();
    return open ? <RemoveScrollBar /> : null;
}