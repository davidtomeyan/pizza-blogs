import type { Plugin } from 'payload';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
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
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];
