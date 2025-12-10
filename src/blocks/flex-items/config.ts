import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cardList, cardOptions } from '@/fields/card-list'

export const FlexItems: Block = {
  slug: 'flexItems',
  interfaceName: 'IFlexItems',
  dbName:"flexItems",
  labels:{
    plural:"Flex Box",
    singular:"Flex Box"
  },
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
    cardOptions,
    cardList,
  ],
}

