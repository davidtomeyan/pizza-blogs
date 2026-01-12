import type { MetadataRoute } from 'next';
import { getCachedCollection } from '@/lib/utils/get-collection';
import { getServerSideURL } from '@/lib/utils/get-url';

export async function generateSitemaps() {
  const blogs = await getCachedCollection({
    collection: 'blogs',
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
    collection: 'blogs',
    page,
    limit: 10,
  })();

  return postsRes?.docs.map((post) => ({
    priority: 0.8,
    url: `${getServerSideURL()}/blogs/${post.id}`,
    lastModified: post.updatedAt ?? post.createdAt ?? new Date(),
    changeFrequency: 'weekly',
  }));
}
