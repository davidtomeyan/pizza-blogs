import { Block } from 'payload';
import { blockSlug } from '@/fields/block-slug';

export const BlogSlider: Block = {
  slug: 'blogSlider',
  interfaceName: 'IBlogSlider',
  dbName: 'blogSlider',
  fields: [
    {
      type: 'text',
      name: 'title',
    },
    {
      type: 'row',
      fields: [
        blockSlug,
        {
          type: 'relationship',
          relationTo: 'blogs',
          name: 'blogs',
          hasMany: true,
        },
      ],
    },
  ],
};
