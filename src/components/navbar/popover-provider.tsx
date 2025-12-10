'use client'

import { createContext, useContext, useState } from 'react'
import { Popover } from '@/components/ui/popover'

type PopoverContextType = {
  open: boolean
  setOpen: (value: boolean) => void
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider')
  }
  return context
}

function PopoverProvider({ children, ...props }: React.ComponentProps<typeof Popover>) {
  const [open, setOpen] = useState(false)

  return (
    <PopoverContext value={{ open, setOpen }}>
      <Popover {...props} onOpenChange={setOpen} open={open}>
        {children}
      </Popover>
    </PopoverContext>
  )
}

export {PopoverProvider}
