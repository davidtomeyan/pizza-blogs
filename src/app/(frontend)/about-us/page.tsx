import type { Metadata } from 'next';
import { getCachedGlobal } from '@/lib/utils/get-global';
import { getServerSideURL } from '@/lib/utils/get-url';
import { AboutUsPage } from '@/globals/About-us-page/component';
export default AboutUsPage;

export async function generateMetadata(): Promise<Metadata> {
  const verification: Metadata['verification'] = {};
  const icons: Metadata['icons'] = {};

  const page = await getCachedGlobal({
    slug: 'about-us',
  })();

  const ImageUrl =
    typeof page?.meta?.image === 'object'
    && page?.meta?.image?.sizes?.og?.url
      ? `${page?.meta?.image?.sizes?.og?.url}`
      : '';

  return {
    metadataBase: new URL(getServerSideURL()),
    title: page?.meta?.title ?? undefined,
    description: page?.meta?.description ?? undefined,
    openGraph: {
      images: [
        ImageUrl,
      ],
    },
    icons: icons,
    verification,
  };
}
