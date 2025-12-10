import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { cmsLink, cmsLinks } from '@/fields/cms-link'
import { ArrayField, Field } from 'payload'
import { aspectRatio } from '@/fields/aspect-ratio'

export const cardOptions: Field = {
  type: 'group',
  label: 'Card Options',
  name: 'cardOptions',
  interfaceName: 'ICardOptions',
  required: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'enabledMedia',
          label: 'Enable media',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          type: 'checkbox',
          name: 'enabledHeader',
          label: 'Enable Header',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          type: 'checkbox',
          name: 'enabledHeaderLink',
          label: 'Enable Header Link',
          defaultValue: false,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledHeader,
          },
        },
        {
          type: 'checkbox',
          name: 'enabledHeaderRightText',
          label: 'Enable Header Right Text',
          defaultValue: false,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledHeader,
          },
        },
        {
          type: 'checkbox',
          name: 'enabledOverlay',
          label: 'Enable Overlay',
          defaultValue: false,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData.cardOptions?.enabledMedia,
          },
        },
        {
          type: 'checkbox',
          name: 'enabledOverlayLink',
          label: 'Enable Overlay Link',
          defaultValue: false,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledOverlay && !!blockData.cardOptions?.enabledMedia,
          },
        },
        {
          type: 'checkbox',
          name: 'enabledContent',
          label: 'Enable Content',
          defaultValue: false,
          admin: {
            width: '25%',
          },
        },
        {
          type: 'checkbox',
          name: 'enabledLink',
          label: 'Enable Bottom Links',
          defaultValue: false,
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        aspectRatio({
          required: true,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData.cardOptions?.enabledMedia,
          },
        }),
        {
          name: 'overlayPosition',
          type: 'select',
          options: ['top', 'bottom'],
          defaultValue: 'bottom',
          required: true,
          admin: {
            width: '25%',
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledOverlay && !!blockData.cardOptions?.enabledMedia,
          },
        },
        {
          name: 'maxColumns',
          type: 'select',
          label: 'Max columns',
          required: true,
          defaultValue: '3',
          admin: { width: '25%' },
          options: [
            '1', '2', '3', '4',
          ],
        },
      ],
    },

  ],
}

export const cardList: ArrayField = {
  type: 'array',
  name: 'cards',
  interfaceName: 'ICardList',
  fields: [
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, __,
                    { blockData },
        ) => !!blockData?.cardOptions?.enabledMedia,
      },
    },
    {
      type: 'group',
      name: 'cardHeader',
      admin: {
        condition: (_, __,
                    { blockData },
        ) => !!blockData?.cardOptions?.enabledHeader,
      },
      fields: [
        {
          type: 'text',
          name: 'title',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
        },
        {
          type: 'text',
          name: 'rightText',
          required: true,
          admin: {
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledHeader && !!blockData.cardOptions?.enabledHeaderRightText,
          },
        },
        cmsLink({
          admin: {
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledHeader && !!blockData.cardOptions?.enabledHeaderLink,
          },
        }),
      ],
    },
    {
      type: 'group',
      name: 'cardOverlay',
      admin: {
        condition: (_, __,
                    { blockData },
        ) => !!blockData?.cardOptions?.enabledOverlay && !!blockData.cardOptions?.enabledMedia,
      },
      fields: [
        {
          type: 'text',
          name: 'title',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
        },
        cmsLink({
          admin: {
            condition: (_, __,
                        { blockData },
            ) => !!blockData?.cardOptions?.enabledOverlay && !!blockData.cardOptions?.enabledMedia && !!blockData.cardOptions?.enabledOverlayLink,
          },
        }),
      ],
    },
    {
      admin: {
        condition: (_, __,
                    { blockData },
        ) => !!blockData?.cardOptions?.enabledContent,
      },
      type: 'richText',
      name: 'cardContent',
      editor: lexicalEditor(
        {
          features: [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] })],
        },
      ),
    },
    {
      type: 'collapsible',
      label: 'Card link',
      admin: {
        condition: (_, __,
                    { blockData },
        ) => !!blockData?.cardOptions?.enabledLink,
      },
      fields: [
        {
          type: 'row', fields: [
            {
              type: 'select',
              name: 'linkItemsAlign',
              label: 'Vertical align',
              defaultValue: 'start',
              options: [
                { label: 'Start', value: 'start' },
                { label: 'Center', value: 'center' },
              ],
              admin: { width: '50%' },
            },
            {
              type: 'select',
              name: 'linkItemsSizing',
              label: 'Item sizing',
              defaultValue: 'default',
              admin: { width: '50%' },
              options: [
                {
                  label: 'Default',
                  value: 'default',
                },
                {
                  label: 'Grow',
                  value: 'grow',
                },
                {
                  label: 'Flex 1',
                  value: 'flex1',
                },
              ],
            },
          ],
        },
        cmsLinks({
          label: 'Card link',
        }),
      ],
    },
  ],
}
