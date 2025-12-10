'use client'
import { ComponentProps, useCallback, useEffect, useRef } from 'react'
import { InViewElement } from '@/components/in-view-element'

type Props = ComponentProps<'video'> & {
  autoPlayInView?: boolean
}

export function InViewVideoElement(
  {
    controls = true,
    autoPlayInView = true,
    muted = true,
    playsInline = true,
    preload = 'metadata',
    ...props
  }: Props) {

  const ref = useRef<HTMLVideoElement | null>(null)

  const handleIntersect = useCallback(async (isIntersecting: boolean) => {
    const el = ref.current
    if (!el) return
    if (autoPlayInView && isIntersecting) {
      try {
        await el.play()
      } catch {
        el.controls = true
      }
    } else {
      el.pause()
    }
  }, [autoPlayInView])


  useEffect(() => {
    const el = ref.current
    return () => {
      try {
        el?.pause()
      } catch {
      }
    }
  }, [])

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) ref.current?.pause()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <InViewElement
      freezeOnceVisible={!autoPlayInView}
      asChild
      onIntersecting={handleIntersect}>
      <video
        ref={ref}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
        controls={controls}
        {...props}
      />
    </InViewElement>
  )
}