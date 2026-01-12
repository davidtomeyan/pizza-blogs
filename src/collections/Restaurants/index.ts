import type { CollectionConfig } from 'payload';

import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';
import {
  revalidateCollection,
  revalidateCollectionById,
} from '@/lib/utils/revalidate-collection';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';

export const Restaurants: CollectionConfig<'restaurants'> = {
  slug: 'restaurants',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    image: true,
    description: true,
    details: true,
    location: true,
    meta: true,
    createdAt: true,
    updatedAt: true,
  },
  hooks: {
    afterChange: [
      ({ doc, collection }) => {
        revalidateCollection(collection.slug);
        revalidateGlobal('home');
        revalidateCollectionById(collection.slug, doc.id);
      },
    ],
    afterDelete: [
      ({ doc, collection }) => {
        revalidateCollection(collection.slug);
        revalidateGlobal('home');
        revalidateCollectionById(collection.slug, doc.id);
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
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
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      required: false,
    },
    {
      type: 'text',
      label: 'Location url',
      name: 'location',
      required: false,
    },
    {
      type: 'text',
      label: 'Phone number',
      name: 'phone',
      required: false,
    },
    {
      type: 'array',
      name: 'details',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'title',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              type: 'text',
              name: 'value',
              label: 'Value (optional)',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'textarea',
          name: 'desc',
          label: 'Description',
          admin: {
            description: 'Optional — short text shown under title/value pair',
          },
        },
      ],
    },
    richTextWithBlocksField,
  ],
};
