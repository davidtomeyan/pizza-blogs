import { Block } from 'payload'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cmsLinks } from '@/fields/cms-link'
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks'

export const HeroFullScreen: Block = {
  slug: 'heroFullScreen',
  interfaceName: 'IHeroFullScreen',
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
    cmsLinks({maxRows:2})
  ],
}