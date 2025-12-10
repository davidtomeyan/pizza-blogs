import type { CollectionConfig } from 'payload';

import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';
import {revalidateCollection, revalidateCollectionById} from '@/lib/utils/revalidate-collection';

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    shortTitle: true,
    shortDescription: true,
  },
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
  admin: {
    useAsTitle: 'shortTitle',
    defaultColumns: [
      'shortTitle',
      'updatedAt',
    ],
    group: 'Data',
  },
  fields: [
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      type: 'text',
      name: 'shortTitle',
      label: 'Title',
      maxLength: 80,
      required: true,
      admin: {
        description: 'Maximum length: 80 characters',
      },
    },
    {
      type: 'textarea',
      name: 'shortDescription',
      label: 'Description',
      maxLength: 200,
      required: true,
      admin: {
        description: 'Maximum length: 200 characters',
      },
    },
    richTextWithBlocksField,
  ],
};
