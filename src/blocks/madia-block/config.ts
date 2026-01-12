import { Block } from 'payload';
import {
  lexicalEditor,
  BlocksFeature,
  HeadingFeature,
  ParagraphFeature,
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  TextStateFeature,
} from '@payloadcms/richtext-lexical';
import { dynamicIcons } from '@/fields/cms-link';
export const textSizes = {
  'text-xs': {
    label: 'XS',
    css: {
      'font-size': '0.75rem',
      'line-height': '1rem',
    },
  },
  'text-sm': {
    label: 'SM',
    css: {
      'font-size': '0.875rem',
      'line-height': '1.25rem',
    },
  },
  'text-base': {
    label: 'Base',
    css: {
      'font-size': '1rem',
      'line-height': '1.5rem',
    },
  },
  'text-lg': {
    label: 'LG',
    css: {
      'font-size': '1.125rem',
      'line-height': '1.75rem',
    },
  },
  'text-xl': {
    label: 'XL',
    css: {
      'font-size': '1.25rem',
      'line-height': '1.75rem',
    },
  },
  'text-2xl': {
    label: '2XL',
    css: {
      'font-size': '1.5rem',
      'line-height': '2rem',
    },
  },
  'text-3xl': {
    label: '3XL',
    css: {
      'font-size': '1.875rem',
      'line-height': '2.25rem',
    },
  },
  'text-4xl': {
    label: '4XL',
    css: {
      'font-size': '2.25rem',
      'line-height': '2.5rem',
    },
  },
  'text-5xl': {
    label: '5XL',
    css: {
      'font-size': '3rem',
      'line-height': '1',
    },
  },
  'text-6xl': {
    label: '6XL',
    css: {
      'font-size': '3.75rem',
      'line-height': '1',
    },
  },
  'text-7xl': {
    label: '7XL',
    css: {
      'font-size': '4.5rem',
      'line-height': '1',
    },
  },
  'text-8xl': {
    label: '8XL',
    css: {
      'font-size': '6rem',
      'line-height': '1',
    },
  },
  'text-9xl': {
    label: '9XL',
    css: {
      'font-size': '8rem',
      'line-height': '1',
    },
  },
};

export const mediaBlock: Block = {
  slug: 'media-block',
  interfaceName: 'IRichTextMediaBlock',
  fields: [
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'align',
      label: 'Horizontal alignment',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      type: 'richText',
      name: 'caption',
      editor: lexicalEditor({
        features: [
          HeadingFeature(),
          TextStateFeature({
            state: {
              size: textSizes,
            },
          }),
          ParagraphFeature(),
          BoldFeature(),
          UnderlineFeature(),
          ItalicFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          LinkFeature({
            enabledCollections: [
              'blogs',
            ],
          }),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
          BoldFeature(),
          BlocksFeature({
            blocks: [
              {
                slug: 'list-items',
                interfaceName: 'IListItemsBlock',
                fields: [
                  {
                    type: 'array',
                    name: 'listItems',
                    fields: [
                      dynamicIcons(),
                      {
                        type: 'text',
                        name: 'title',
                      },
                      {
                        type: 'textarea',
                        name: 'description',
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },
  ],
};
