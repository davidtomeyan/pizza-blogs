import { GlobalConfig } from 'payload';
import { cmsLinks } from '@/fields/cms-link';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';
import { revalidateGlobalHook } from '@/lib/utils/revalidate-global';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      revalidateGlobalHook,
    ],
  },
  fields: [
    {
      type: 'blocks',
      name: 'footerBlocks',
      maxRows: 5,
      blocks: [
        {
          slug: 'richTextWithBlocksField',
          fields: [
            richTextWithBlocksField,
          ],
        },
        {
          slug: 'links',
          interfaceName: 'IFooterLinks',
          labels: {
            plural: 'links',
            singular: 'link',
          },
          fields: [
            cmsLinks(),
          ],
        },
        {
          slug: 'icon-links',
          interfaceName: 'IFooterIconLinks',
          labels: {
            plural: 'Icon links',
            singular: 'Icon link',
          },
          fields: [
            cmsLinks(),
          ],
        },
      ],
    },
  ],
};
