import type { MetadataRoute } from 'next';
import { getServerSideURL } from '@/lib/utils/get-url';
import { generateSitemaps as generateBlogSitemaps } from '@/app/(sitemap)/blogs/sitemap';
import { generateSitemaps as generateRestaurantSitemaps } from '@/app/(sitemap)/restaurants/sitemap';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const blogsIds = await generateBlogSitemaps();
  const RestaurantIds = await generateRestaurantSitemaps();
  const blogSitemaps = blogsIds.map(
    ({id}) => `${getServerSideURL()}/blogs/sitemap/${id}.xml`,
  );
  const restaurantSitemaps = RestaurantIds.map(
    ({id}) => `${getServerSideURL()}/restaurants/sitemap/${id}.xml`,
  );

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
      `${getServerSideURL()}/sitemap.xml`,
      ...blogSitemaps,
      ...restaurantSitemaps,
    ].filter(Boolean),
  };
}
