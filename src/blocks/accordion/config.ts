import { Block } from 'payload'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cmsLinks } from '@/fields/cms-link'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'IAccordion',
  fields: [
    {
      type: 'row',
      fields: [
        bgVariant,
        blockSlug,
      ],
    },
    {
      type: 'richText',
      name: 'content',
      editor: lexicalEditor({ features: [...defaultFeatures] }),
    },
    {
      type: 'array',
      name: 'items',
      fields: [
        { type: 'text', name: 'title', required: true },
        {
          type: 'richText',
          name: 'content',
          editor: lexicalEditor({ features: [...defaultFeatures, HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] })] }),
        },
      ],
    },
    cmsLinks({ maxRows: 2 }),
  ],
}