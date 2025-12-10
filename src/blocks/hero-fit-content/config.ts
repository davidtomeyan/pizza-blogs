import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cmsLinks } from '@/fields/cms-link'
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks'

export const HeroFitContent: Block = {
  slug: 'heroContentHeight',
  interfaceName: 'IHeroFitContent',
  fields: [
    {
      type: 'row',
      fields: [
        bgVariant,
        blockSlug,
      ],
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'backgroundMedia',
    },
    richTextWithBlocksField,
    cmsLinks()
  ],
}