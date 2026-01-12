import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';

export const PrivacyPolicy: GlobalConfig<'privacy-policy'> = {
  slug: 'privacy-policy',
  label: 'Privacy Policy',
  admin: {
    group: 'Pages',
  },
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      (ctx) => revalidateGlobal(ctx.global.slug),
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            richTextWithBlocksField,
          ],
        },
      ],
    },
  ],
};
