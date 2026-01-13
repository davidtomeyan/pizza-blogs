'use client';
import { usePopover } from '@/components/navbar/popover-provider';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import {PopoverContent} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function HideScrollBody() {
  const open = usePopover();
  return open ? <RemoveScrollBar /> : null;
}

export function LinksMobile() {
  const {setOpen} = usePopover()
  const handleClose = () => {
    setOpen(false);
  }
  return (
      <PopoverContent
          className={cn([
            'h-[calc(var(--radix-popover-content-available-height))]',
            'w-[calc(var(--radix-popover-content-available-width))]',
            'origin-(--radix-popover-content-transform-origin)',
            'z-50 flex min-h-0 flex-col outline-hidden bg-background no-scrollbar overflow-y-auto rounded-none border-none p-0 shadow-none duration-100',
          ])}
          sideOffset={0}
          alignOffset={0}
          side={'top'}
          align={'center'}>
        <div className='flex min-h-full max-h-full h-full w-full flex-col '>
          <div className='min-h-0 flex w-full flex-1 overflow-hidden'>
            <ScrollArea className='flex-1'>
              <nav className='flex flex-col gap-4 w-full max-w-lg mx-auto py-8 px-6'>
                <Button
                    variant='link'
                    asChild>
                  <Link onNavigate={handleClose} href={'/'}>Home</Link>
                </Button>
                <Button
                    variant='link'
                    asChild>
                  <Link onNavigate={handleClose} href={'/about-us'}>About Us</Link>
                </Button>
                <Button
                    className='mt-4'
                    asChild>
                  <Link onNavigate={handleClose} href={'/#contact-us'}>contact-us</Link>
                </Button>
              </nav>
              <HideScrollBody />
              <ScrollBar />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
  );
}
