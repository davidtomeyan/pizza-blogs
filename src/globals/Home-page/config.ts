import { GlobalConfig } from 'payload';
import {
  authenticated,
  authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import { revalidateGlobal } from '@/lib/utils/revalidate-global';
import { cmsLink } from '@/fields/cms-link';

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
      (ctx) => revalidateGlobal(ctx.global.slug),
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Restaurants Carousel',
          name: 'restaurantsCarousel',
          fields: [
            {
              type: 'text',
              name: 'title',
              admin,
            },
            {
              admin,
              type: 'relationship',
              relationTo: 'restaurants',
              name: 'restaurants',
              hasMany: true,
            },
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Blogs',
          name: 'blogs',
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
              defaultValue: false,
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
            cmsLink({
              name: 'ctaLink',
            }),
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
              defaultValue: false,
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
                  relationTo: 'restaurants',
                  name: 'list',
                  hasMany: true,
                },
              ],
            },
            {
              type: 'checkbox',
              name: 'enable',
              defaultValue: false,
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
              defaultValue: false,
            },
            {
              type: 'group',
              name: 'contacts',
              label: 'contacts',
              admin,
              fields: [
                {
                  name: 'phone',
                  label: 'Phone Number',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'ctaText',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'CTA Text',
                          defaultValue: 'Call us',
                        },
                        {
                          name: 'number',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          defaultValue: '+1 400 500 600',
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'emailAddress',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'ctaText',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'CTA Text',
                          defaultValue: 'Write an email',
                        },
                        {
                          name: 'email',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          defaultValue: 'hello@example.com',
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'location',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'ctaText',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'CTA Text',
                          defaultValue: 'Visit our office',
                        },
                        {
                          name: 'url',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          defaultValue: '/',
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          defaultValue: '192 Griffin Street, Gilbert, AZ 32521',
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
    },
  ],
};
