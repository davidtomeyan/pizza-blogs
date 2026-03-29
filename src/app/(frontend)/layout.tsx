import './global.css';
import { Navbar } from '@/components/navbar/component';
import { Footer } from '@/globals/Footer/component';
import type { Viewport, Metadata } from 'next';
import { RichText } from '@/components/rich-text';
import {
  CookieConsentBanner,
  CookieScripts,
} from '@/components/cookie-consent-banner';
import { fonts } from './fonts';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getCachedGlobal } from '@/lib/utils/get-global';
import { getServerSideURL } from '@/lib/utils/get-url';
import { Toaster } from '@/components/ui/sonner';

export async function generateMetadata(): Promise<Metadata> {
  const verification: Metadata['verification'] = {};
  const icons: Metadata['icons'] = {};
  const result = await getCachedGlobal({
    slug: 'site',
  })();
  if (result.googleVerificationCode) {
    verification.google = result.googleVerificationCode;
  }
  icons.icon = [
    { url: '/favicon.ico', sizes: '48x48' },
    { url: '/favicon.svg', type: 'image/svg+xml' },
    { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
  ];
  icons.apple = '/apple-touch-icon.png';
  const home = await getCachedGlobal({
    slug: 'home',
  })();

  const ImageUrl =
    typeof home?.meta?.image === 'object'
    && home?.meta?.image?.sizes?.og?.url
      ? `${home?.meta?.image?.sizes?.og?.url}`
      : '';

  return {
    metadataBase: new URL(getServerSideURL()),
    title: home?.meta?.title ?? '',
    description: home?.meta?.description ?? '',
    appleWebApp: {
      title: 'pizza-MT',
    },
    manifest: '/manifest.json',
    openGraph: {
      images: [
        ImageUrl,
      ],
    },
    icons: icons,
    verification,
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#f8fafc',
    },
  ],
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const {
    cookieConsentBannerEnabled,
    cookieConsentBannerContent,
    rejectButtonLabel,
    acceptButtonLabel,
    googleTagManagerId,
    googleAnalyticsId,
  } = await getCachedGlobal({
    slug: 'site',
  })();

  return (
    <html
      lang='en'
      className={fonts}>
      <body
        data-theme={'light'}
        className='flex flex-col min-h-screen [--header-height:calc(--spacing(17))]'>
        <NuqsAdapter>
          <Navbar />
          <main className='flex flex-col grow'>{children}</main>
          <Footer />
          <Toaster />
          {cookieConsentBannerEnabled && (
            <CookieConsentBanner
              rejectButtonLabel={rejectButtonLabel}
              acceptButtonLabel={acceptButtonLabel}>
              {cookieConsentBannerContent && (
                <RichText
                  className='prose-base! lg:prose-base max-w-full'
                  data={cookieConsentBannerContent}
                />
              )}
            </CookieConsentBanner>
          )}
        </NuqsAdapter>
      </body>
      <CookieScripts
        cookieConsentBannerEnabled={cookieConsentBannerEnabled}
        googleTagManagerId={googleTagManagerId}
        googleAnalyticsID={googleAnalyticsId}
      />
    </html>
  );
}
