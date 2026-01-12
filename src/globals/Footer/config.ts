import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';
import { socialIconNames } from '@/components/social-icons';

export const Footer: GlobalConfig = {
  slug: 'footer',
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
      type: 'text',
      name: 'copyrightText',
      defaultValue: 'Copyright 2025 © Best Pizza Malta',
    },
    {
      type: 'array',
      name: 'socialMediaLinks',
      fields: [
        {
          interfaceName: 'SocialMedia',
          required: true,
          type: 'select',
          name: 'socialMedia',
          options: socialIconNames,
        },
        {
          type: 'text',
          required: true,
          name: 'url',
        },
      ],
    },
  ],
};
