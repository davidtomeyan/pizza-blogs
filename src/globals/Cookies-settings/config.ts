import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';

export const CookiesSettings: GlobalConfig = {
  slug: 'cookies-settings',
  label: 'Cookies Settings',
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
