import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';
import { cmsLink } from '@/fields/cms-link';
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks';

export const AboutUsPage: GlobalConfig<'about-us'> = {
  slug: 'about-us',
  label: 'About Us',
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
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              type: 'text',
              name: 'title',
            },
            {
              type: 'textarea',
              name: 'description',
            },
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
            cmsLink({
              name: 'ctaLink',
              label:"CTA Link",
            }),
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            richTextWithBlocksField,
          ],
        },
        {
          label: 'CTA Section',
          name: 'ctaSection',
          fields: [
            {
              type: 'text',
              name: 'label',
              admin: {
                condition: (_, siblingData) => !!siblingData.enable,
              },
            },
            {
              type: 'text',
              name: 'title',
              admin: {
                condition: (_, siblingData) => !!siblingData.enable,
              },
            },
            {
              type: 'textarea',
              name: 'description',
              admin: {
                condition: (_, siblingData) => !!siblingData.enable,
              },
            },
            {
              type: 'upload',
              name: 'image',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  contains: 'image',
                },
              },
              admin: {
                condition: (_, siblingData) => !!siblingData.enable,
              },
            },
            cmsLink({
              name: 'link',
              label:"CTA Link",
            }),
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
};
