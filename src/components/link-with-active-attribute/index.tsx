'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function LinkWithActiveAttribute(
  {
    href,
    children,
    onIsActive,
    className,
    ...props
  }: Omit<React.ComponentProps<typeof Link>, 'href'> & {
    href: string,
    onIsActive?: (isActive: boolean) => void
  }) {

  const pathname = usePathname()
  let isActive: boolean

  try {
    const parsedHref = new URL(href, 'http://localhost').pathname
    isActive = parsedHref !== '' && pathname === parsedHref
  } catch {
    isActive = false
  }

  useEffect(() => {
    onIsActive?.(isActive)
  }, [pathname, onIsActive,isActive])

  return (
    <Link
      data-state={isActive ? 'active' : 'inactive'}
      className={cn([
        'data-[state=active]:text-accent-foreground',
        className,
      ])}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
