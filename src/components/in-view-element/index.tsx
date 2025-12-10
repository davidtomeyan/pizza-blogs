'use client'
import { useIntersectionObserver } from 'usehooks-ts'
import { ComponentProps, Ref } from 'react'
import mergeRefs from 'merge-refs'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

type ObserverElementProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  onIntersecting?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
  threshold?: number
  freezeOnceVisible?:boolean
} & ComponentProps<'div'>

export function InViewElement(
  {
    asChild = false,
    ref,
    threshold = 0,
    onIntersecting,
    freezeOnceVisible = true,
    ...props
  }: ObserverElementProps) {
  const Component = asChild ? Slot : 'div'
  const id = React.useId()
  const [refObserver, isIntersecting] = useIntersectionObserver({
    threshold: threshold,
    onChange: onIntersecting,
    freezeOnceVisible: freezeOnceVisible,
  })

  return (
    <Component
      id={id}
      data-inview={`${isIntersecting}`}
      ref={mergeRefs(ref, refObserver as Ref<HTMLDivElement>)}
      {...props}
    />
  )
}
