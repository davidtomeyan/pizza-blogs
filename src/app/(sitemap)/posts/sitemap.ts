import { envPublic } from '@/lib/env'
import type { MetadataRoute } from 'next'
import {getCachedGlobal} from "@/lib/utils/get-global";
import {getCachedCollection} from "@/lib/utils/get-collection";


export async function generateSitemaps() {
  const postsRes = await getCachedGlobal({slug:"home"})()
  return Array.from({ length: postsRes?.totalPages ?? 0 }).map((_, index) => ({ id: index + 1 }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const postsRes = await getCachedCollection({collection:"blogs"})()

  return postsRes?.docs.map((post) => ({
    priority: 0.8,
    url: `${envPublic.cmsUrl}/blogs/post/${post.id}`,
    lastModified: post.updatedAt ?? new Date().toISOString(),
  }))
}
