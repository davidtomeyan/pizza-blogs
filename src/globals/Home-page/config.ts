import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobalHook } from '@/lib/utils/revalidate-global';
import {
  dynamicIcons,
  linkTypeRadio,
  linkTypes, newTab,
} from '@/fields/cms-link';

const admin = {
  condition: (_: any, siblingData: any) => siblingData.enable,
};

export const HomePage: GlobalConfig<'home'> = {
  slug: 'home',
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
          label: 'Blogs Carousel',
          name: 'blogsCarousel',
          fields: [
            {
              type: 'text',
              name: 'title',
              admin,
            },
            {
              admin,
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'blogs',
                  name: 'blogs',
                  hasMany: true,
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
          label: 'Restaurants',
          name: 'restaurants',
          fields: [
            {
              admin,
              type: 'text',
              name: 'title',
            },
            {
              admin,
              type: 'textarea',
              name: 'description',
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
              admin,
            },
            {
              type: 'text',
              name: 'title',
              admin,
            },
            {
              type: 'textarea',
              name: 'description',
              admin,
            },
            {
              required: true,
              name: 'link',
              type: 'group',
              label: 'CTA Link',
              interfaceName: 'ICTALink',
              admin: {
                ...admin,
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
              admin,
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
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Top Restaurants',
          name: 'topRestaurants',
          fields: [
            {
              admin,
              type: 'text',
              name: 'title',
            },
            {
              admin,
              type: 'textarea',
              name: 'description',
            },
            {
              admin,
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'blogs',
                  name: 'blogs',
                  hasMany: true,
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
          label: 'Contact us',
          name: 'contactUs',
          fields: [
            {
              admin,
              type: 'text',
              name: 'label',
            },
            {
              admin,
              type: 'text',
              name: 'title',
            },
            {
              admin,
              type: 'textarea',
              name: 'description',
            },
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: true,
            },
            {
              type: 'array',
              name: 'links',
              fields: [
                {
                  name: 'link',
                  type: 'group',
                  interfaceName: 'ContactLinks',
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'url',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'URL',
                          required: true,
                        },
                        {
                          name: 'ctaText',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'CTA Text',
                          required: true,
                        },
                        {
                          name: 'label',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'Label',
                          required: true,
                        },
                        dynamicIcons(),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
