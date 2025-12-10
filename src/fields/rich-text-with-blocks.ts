import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { RichTextField } from 'payload'
import { inlineMediaBlock, mediaBlock } from '@/blocks/madia-block/config'

export const richTextWithBlocksField: RichTextField = {
  type: 'richText',
  name: 'content',
  editor: lexicalEditor({
    features: [
      ...defaultFeatures,
      BlocksFeature(
        {
          blocks: [
            mediaBlock,
          ],
          inlineBlocks: [
            inlineMediaBlock,
          ],
        },
      ),
    ],
  }),
}

