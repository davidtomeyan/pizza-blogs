import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobalHook } from '@/lib/utils/revalidate-global';
import { linkTypeRadio, linkTypes, newTab } from '@/fields/cms-link';
import { HeroSplit } from '@/blocks/hero-split/config';
import { RichTextWithBlocks } from '@/blocks/rich-text-with-media/config';

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
      revalidateGlobalHook,
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
            {
              required: true,
              name: 'link',
              type: 'group',
              label: 'CTA Link',
              interfaceName: 'ICTALink',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    linkTypeRadio({
                      defaultValue: 'custom',
                    }),
                    newTab({
                      defaultValue: true,
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    ...linkTypes,
                    {
                      required: true,
                      defaultValue: 'Get started',
                      name: 'label',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                      label: 'Label',
                    },
                  ],
                },
              ],
            },
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Content',
          name: 'content',
          fields: [
            {
              type: 'blocks',
              name: 'blocks',
              blocks: [
                HeroSplit,
                RichTextWithBlocks,
              ],
            },
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'CTA Section',
          name: 'ctaSection',
          fields: [
            {
              type: 'text',
              name: 'label',
            },
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
            {
              required: true,
              name: 'link',
              type: 'group',
              label: 'CTA Link',
              interfaceName: 'ICTALink',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    linkTypeRadio({
                      defaultValue: 'custom',
                    }),
                    newTab({
                      defaultValue: true,
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    ...linkTypes,
                    {
                      required: true,
                      defaultValue: 'Get started',
                      name: 'label',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                      label: 'Label',
                    },
                  ],
                },
              ],
            },
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
