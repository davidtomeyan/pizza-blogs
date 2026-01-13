import type { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  revalidateCollection,
  revalidateCollectionById,
} from '@/lib/utils/revalidate-collection';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = !!process.env.VERCEL;

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, collection }) => {
        revalidateCollection(collection.slug);
        revalidateCollectionById(collection.slug, doc.id);
      },
    ],
    afterDelete: [
      ({ doc, collection }) => {
        revalidateCollection(collection.slug);
        revalidateCollectionById(collection.slug, doc.id);
      },
    ],
  },
  upload: {
    ...(isVercel
      ? {}
      : {
          staticDir: path.resolve(dirname, '../../public'),
        }),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
};
