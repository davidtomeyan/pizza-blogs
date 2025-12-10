import type { Plugin } from 'payload';
import { seoPlugin } from '@payloadcms/plugin-seo';

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
    ],
    interfaceName: 'ISeo',
    tabbedUI: true,
    uploadsCollection: 'media',
  }),
  // storage-adapter-placeholder
];
