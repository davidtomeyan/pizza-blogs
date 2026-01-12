import type { MetadataRoute } from 'next';
import { getCachedCollection } from '@/lib/utils/get-collection';
import { getServerSideURL } from '@/lib/utils/get-url';

export async function generateSitemaps() {
  const blogs = await getCachedCollection({
    collection: 'restaurants',
    page: 1,
    limit: 10,
  })();
  return Array.from({
    length: blogs?.totalPages ?? 0,
  }).map((_, index) => ({
    id: index + 1,
  }));
}

export default async function sitemap({
  id: page,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const postsRes = await getCachedCollection({
    collection: 'restaurants',
    page,
    limit: 10,
  })();
  return postsRes?.docs.map((restaurant) => ({
    priority: 0.8,
    url: `${getServerSideURL()}/restaurants/${restaurant.id}`,
    lastModified: restaurant.updatedAt ?? restaurant.createdAt ?? new Date(),
    changeFrequency: 'weekly',
  }));
}
