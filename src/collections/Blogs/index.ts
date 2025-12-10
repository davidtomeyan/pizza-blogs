import type { CollectionConfig } from 'payload';
import { revalidateTag } from 'next/cache';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';
import {
  revalidateCollection,
  revalidateCollectionById,
} from '@/lib/utils/revalidate-collection';

export const Blogs: CollectionConfig<'blogs'> = {
  slug: 'blogs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    desc: true,
    image: true,
    details: true,
    location: true,
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
    group: 'Data',
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'updatedAt',
    ],
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
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'textarea',
      name: 'desc',
      label: 'Description',
      required: true,
    },
    {
      type: 'text',
      name: 'location',
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
