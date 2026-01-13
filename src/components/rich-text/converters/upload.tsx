import type { FileData, TypeWithID } from 'payload'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import {
  UploadDataImproved,
} from 'node_modules/@payloadcms/richtext-lexical/dist/features/upload/server/nodes/UploadNode'
import Link from 'next/link'
import { InViewVideoElement } from '@/components/in-view-video-element'
import { cssVariables } from '@/components/media'
import Image from 'next/image'
import { UploadNodeFields } from '@/components/rich-text/default-features'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export const uploadJSXConverter: JSXConverters<SerializedUploadNode> = {
  upload: ({ node }) => {
    // TO-DO (v4): SerializedUploadNode should use UploadData_P4
    const uploadNode = node as unknown as Omit<UploadDataImproved, 'fields'> & { fields: UploadNodeFields }
    if (typeof uploadNode.value !== 'object') {
      return null
    }

    const uploadDoc = uploadNode.value as FileData & TypeWithID

    const url = uploadDoc.url

    /**
     * If the upload is a video
     */
    const fields = uploadNode.fields
    const mime = uploadDoc?.mimeType?.toLowerCase() ?? ''
    const limited = !!fields?.constrainWidth
    const maxWidth = fields?.maxWidth

    const style = {
      maxWidth: '100%',
      width: '100%',
      height: 'auto',
    } as CSSProperties

    const className = [
      fields?.rounded ? 'rounded-lg' : '',
      fields?.align === 'left' ? '' : '',
      fields?.align === 'right' ? 'ms-auto' : '',
      fields?.align === 'center' ? 'mx-auto' : '',
    ]

    if (limited) {
      style.maxWidth = maxWidth ? `${maxWidth}px` : '100%'
    }

    if (mime.includes('video')) {

      return (
        <InViewVideoElement
          loop
          className={cn(className)}
          src={`/${uploadDoc.url}`}
          style={style}
        />)
    }
    /**
     * If the upload is not an image, return a link to the upload
     */
    const isImage = mime.startsWith('image')
    if (!isImage && url) {
      return (
        <Link href={url} rel="noopener noreferrer" target="_blank">
          {uploadDoc.url}
        </Link>
      )
    }

    const sizes = Object.entries(cssVariables.breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
      .join(', ')

    /**
     * If the upload is a image, return a simple img tag
     */
    const placeholderBlur =
      'data:image/png;base64,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'

    return (
      <Image placeholder={'blur'}
             style={style}
             className={cn(className,"align-top")}
             blurDataURL={placeholderBlur}
             src={`/${uploadDoc.url}`}
             quality={100}
             sizes={sizes}
             alt={'alt' in uploadDoc ? (uploadDoc.alt as string ?? '') : ''}
             height={uploadDoc.height ?? 500}
             width={uploadDoc.width ?? 500} />
    )
  },
}