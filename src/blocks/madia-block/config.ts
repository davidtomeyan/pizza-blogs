import { Block } from 'payload'
import { aspectRatio } from '@/fields/aspect-ratio'

export const mediaBlock: Block = {
  slug: 'media-block',
  interfaceName: 'IRichTextMediaBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'radio',
          name: 'aspect',
          label: 'Aspect',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Custom ratio', value: 'ratio' },
          ],
          defaultValue: 'auto',
          required: true,
          admin: { width: '50%' },
        },
        aspectRatio(
          {
            admin: {
              condition: (_, siblingData) => (
                siblingData?.aspect === 'ratio'
              ),
            },
          },
        ),
        {
          type: 'checkbox',
          name: 'constrainWidth',
          label: 'Limit width',
          admin: {
            description: 'Enable to set a maximum width for this block. (px)',
          },
        },
        {
          type: 'number',
          name: 'maxWidth',
          required: true,
          min:1,
          admin: {
            width: '50%', condition: (_, siblingData) => (
              siblingData?.constrainWidth
            ),
          },
        },
      ],
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'align',
      label: 'Horizontal alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        width: '50%',
        condition: (_, s) => s?.constrainWidth,
        description: 'Applied when width is limited.',
      },
    },
  ],
}
export const inlineMediaBlock: Block = {
  slug: 'inline-media-block',
  interfaceName: 'IRichTextInlineMediaBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'constrainWidth',
          label: 'Limit width',
          admin: {
            description: 'Enable to set a maximum width for this block. (px)',
          },
        },
        {
          type: 'number',
          name: 'maxWidth',
          required: true,
          admin: {
            width: '50%', condition: (_, siblingData) => (
              siblingData?.constrainWidth
            ),
          },
        },
      ],
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'align',
      label: 'Horizontal alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        width: '50%',
        condition: (_, s) => s?.constrainWidth,
        description: 'Applied when width is limited.',
      },
    },
  ],
}
