import { envPublic } from '@/lib/env'

import type { MetadataRoute } from 'next'
import {getCachedCollection} from "@/lib/utils/get-collection";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const postsRes = await getCachedCollection({collection:"blogs"})()

  const urls: MetadataRoute.Sitemap = []

  Array.from({ length: postsRes?.totalPages ?? 1 }).map((_, index) => {
    urls.push({
      priority: 0.8,
      url: `${envPublic.cmsUrl}/posts/${index + 1}`,
      lastModified: new Date().toISOString(),
    })
  })
  return urls
}
