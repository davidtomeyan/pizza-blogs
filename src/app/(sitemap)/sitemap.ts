import type { MetadataRoute } from 'next';
import { getServerSideURL } from '@/lib/utils/get-url';
import { getCachedGlobal } from '@/lib/utils/get-global';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = await getCachedGlobal({
    slug: 'home',
  })();
  const aboutUs = await getCachedGlobal({
    slug: 'about-us',
  })();
  const privacyPolicy = await getCachedGlobal({
    slug: 'privacy-policy',
  })();
  const termsOfService = await getCachedGlobal({
    slug: 'terms-of-service',
  })();
  const cookiesSettings = await getCachedGlobal({
    slug: 'cookies-settings',
  })();

  const url = getServerSideURL();
  const urls: MetadataRoute.Sitemap = [
    {
      priority: 1,
      url: url,
      lastModified: home.updatedAt ?? new Date(),
    },
    {
      priority: 0.9,
      url: `${url}/about-us`,
      lastModified: aboutUs.updatedAt ?? new Date(),
    },
    {
      priority: 0.5,
      url: `${url}/privacy-policy`,
      lastModified: privacyPolicy.updatedAt ?? new Date(),
    },
    {
      priority: 0.5,
      url: `${url}/terms-of-service`,
      lastModified: termsOfService.updatedAt ?? new Date(),
    },
    {
      priority: 0.5,
      url: `${url}/cookies-settings`,
      lastModified: cookiesSettings.updatedAt ?? new Date(),
    },
  ];

  return urls;
}
