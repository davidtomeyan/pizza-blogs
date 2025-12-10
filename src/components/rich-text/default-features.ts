import {
  defaultEditorFeatures,
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  TextStateFeature,
  UploadFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical';
import { colors } from './converters/colors';
import { Field } from 'payload';
import { inlineMediaBlock, mediaBlock } from '@/blocks/madia-block/config';

export type AlignMode = 'left' | 'center' | 'right';

export interface UploadNodeFields {
  constrainWidth?: boolean;
  maxWidth?: number;
  align?: AlignMode;
  rounded?: boolean;
}

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

export const defaultFeatures = [
  ...defaultEditorFeatures,
  HeadingFeature(),
  ParagraphFeature(),
  BoldFeature(),
  AlignFeature(),
  InlineCodeFeature(),
  SubscriptFeature(),
  SuperscriptFeature(),
  StrikethroughFeature(),
  UnderlineFeature(),
  ItalicFeature(),
  IndentFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  ChecklistFeature(),
  LinkFeature({
    enabledCollections: [
        "blogs"
    ],
  }),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  InlineToolbarFeature(),
  FixedToolbarFeature(),
  BoldFeature(),
  EXPERIMENTAL_TableFeature(),
  BlocksFeature({
    blocks: [
      mediaBlock,
    ],
    inlineBlocks: [
      inlineMediaBlock,
    ],
  }),
  UploadFeature({
    collections: {
      media: {
        fields: [
          {
            type: 'row',
            fields: [
              {
                type: 'checkbox',
                name: 'constrainWidth',
                label: 'Limit width',
                admin: {
                  description:
                    'Enable to set a maximum width for this block. (px)',
                },
              } as Field,
              {
                type: 'number',
                name: 'maxWidth',
                required: true,
                min: 1,
                admin: {
                  width: '50%',
                  condition: (_, siblingData) => siblingData?.constrainWidth,
                },
              } as Field,
            ],
          },
          {
            type: 'radio',
            name: 'align',
            label: 'Horizontal alignment',
            defaultValue: 'center',
            options: [
              {
                label: 'Left',
                value: 'left',
              },
              {
                label: 'Center',
                value: 'center',
              },
              {
                label: 'Right',
                value: 'right',
              },
            ],
            admin: {
              width: '50%',
              condition: (_, s) => s?.constrainWidth,
              description: 'Applied when width is limited.',
            },
          } as Field,
          {
            type: 'checkbox',
            name: 'rounded',
            label: 'Rounded corners',
            defaultValue: true,
          } as Field,
        ],
      },
    },
  }),
  TextStateFeature({
    state: {
      ...colors,
      size: textSizes,
    },
  }),
];
export const simpleEditorFeatures = [
  HeadingFeature(),
  ParagraphFeature(),
  BoldFeature(),
  AlignFeature(),
  InlineCodeFeature(),
  SubscriptFeature(),
  SuperscriptFeature(),
  StrikethroughFeature(),
  UnderlineFeature(),
  ItalicFeature(),
  IndentFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  ChecklistFeature(),
  LinkFeature({
    enabledCollections: [
        "blogs"
    ],
  }),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  InlineToolbarFeature(),
  FixedToolbarFeature(),
  BoldFeature(),
  TextStateFeature({
    state: {
      ...colors,
      size: textSizes,
    },
  }),
];
