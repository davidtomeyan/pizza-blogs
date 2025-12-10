'use client'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import React, { ComponentProps, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'

export function RefreshButtonClient({ action,...props }: { action?: () => Promise<void> } & ComponentProps<typeof Button>) {
  const router = useRouter()
  const [isPadding, startTransition] = useTransition()
  const handleRefresh = async () => {
    startTransition(async () => {
      await action?.()
      router.refresh()
    })
  }
  return (
    <Button onClick={handleRefresh} {...props}>
      {isPadding ? <Spinner /> : <RefreshCcw />}
      Refresh Page
    </Button>
  )
}
