import { Block } from 'payload'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cmsLinks } from '@/fields/cms-link'
import { richTextWithBlocksField } from '@/fields/rich-text-with-blocks'

export const RichTextWithBlocks: Block = {
  slug: 'richTextWithBlocks',
  interfaceName: 'IRichTextWithBlocks',
  fields: [
    {
      type: 'row',
      fields: [
        bgVariant,
        blockSlug,
      ],
    },
    richTextWithBlocksField,
    cmsLinks({ maxRows: 2 }),
  ],
}