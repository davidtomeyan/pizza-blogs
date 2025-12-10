import type { MetadataRoute } from 'next';
import { envPublic } from '@/lib/env';
import { getCachedCollection } from '@/lib/utils/get-collection';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const postsRes = await getCachedCollection({
    collection: 'blogs',
  })();
  const sitemaps = Array.from({
    length: postsRes?.totalPages ?? 0,
  }).map((_, index) => `${envPublic.cmsUrl}/posts/sitemap/${index + 1}.xml`);
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
      ],
    },
    sitemap: [
      `${envPublic.cmsUrl}/sitemap.xml`,
      ...sitemaps,
    ].filter(Boolean),
  };
}
