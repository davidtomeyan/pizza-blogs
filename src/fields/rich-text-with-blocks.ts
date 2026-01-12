import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { RichTextField } from 'payload'

export const richTextWithBlocksField: RichTextField = {
  type: 'richText',
  name: 'content',
  editor: lexicalEditor({
    features: [
      ...defaultFeatures,
    ],
  }),
}

