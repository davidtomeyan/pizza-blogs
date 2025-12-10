import type { Metadata, ResolvingMetadata } from 'next'
import { envPublic } from '@/lib/env'
import {getCachedGlobal} from "@/lib/utils/get-global";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const page = await getCachedGlobal({slug:"home"})()

  const previousImages = (await parent).openGraph?.images || []
  const ImageUrl =
    typeof page?.meta?.image === 'object' && page?.meta?.image?.sizes?.og?.filename
      ? `/media/${page.meta.image.sizes.og.filename}`
      : ''

  const images = [ImageUrl, ...previousImages].filter(Boolean) as string[]
  return {
    metadataBase:new URL(envPublic.cmsUrl),
    title: page?.meta?.title ?? '',
    description: page?.meta?.description ?? '',
    openGraph: {
      images: images,
    },
  }
}
