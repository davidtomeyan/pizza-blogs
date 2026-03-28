import type { Plugin } from 'payload';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { s3Storage } from '@payloadcms/storage-s3'

export const plugins: Plugin[] = [
  seoPlugin({
    collections: [
      'blogs',
      'restaurants',
    ],
    globals: [
      'home',
      'about-us',
      'posts-page',
      'privacy-policy',
      'terms-of-service',
      'cookies-settings',
    ],
    interfaceName: 'ISeo',
    tabbedUI: true,
    uploadsCollection: 'media',
  }),

  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.S3_BUCKET!,
    config: {
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.S3_REGION || 'auto',
      forcePathStyle: true,
    },
  }),

];
