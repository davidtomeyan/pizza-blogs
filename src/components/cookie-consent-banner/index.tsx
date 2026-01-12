'use client'

import { Button } from '@/components/ui/button'
import { useIsClient, useSessionStorage } from 'usehooks-ts'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import React from 'react'

interface CookieConsentBannerProps {
  acceptButtonLabel?: string | null
  rejectButtonLabel?: string | null
  children?: React.ReactNode
}

export function CookieConsentBanner({
  children,
  acceptButtonLabel,
  rejectButtonLabel,
}: CookieConsentBannerProps) {
  const isClient = useIsClient()
  const [consent, setConsent] = useSessionStorage<'accepted' | 'rejected' | null>(
    'cookie-consent',
    null,
  )

  const handleAccept = () => setConsent('accepted')
  const handleReject = () => setConsent('rejected')

  if (!isClient) return null
  if (consent) {
    return null
  }
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="max-w-9xl mx-auto flex flex-col gap-4 px-6 lg:gap-8 lg:flex-row lg:px-16 py-4">
          <div className="grow">{children}</div>
          <div className="flex gap-4 justify-end">
            <Button size={'sm'} variant="outline" onClick={handleAccept}>
              {acceptButtonLabel}
            </Button>
            <Button size={'sm'} variant="destructive" onClick={handleReject}>
              {rejectButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function CookieScripts({
  googleAnalyticsID,
  googleTagManagerId,
  cookieConsentBannerEnabled,
}: {
  googleAnalyticsID?: string | null
  googleTagManagerId?: string | null
  cookieConsentBannerEnabled?: boolean | null
}) {
  const isClient = useIsClient()
  const [consent] = useSessionStorage<'accepted' | 'rejected' | null>('cookie-consent', null)
  if (isClient && cookieConsentBannerEnabled && consent === 'accepted') {
    return (
      <>
        {googleAnalyticsID && <GoogleAnalytics gaId={googleAnalyticsID} />}
        {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
      </>
    )
  }
  if (!cookieConsentBannerEnabled)
  return (
    <>
      {googleAnalyticsID && <GoogleAnalytics gaId={googleAnalyticsID} />}
      {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
    </>
  )
  return null
}
