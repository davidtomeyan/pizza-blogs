import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultFeatures } from '@/components/rich-text/default-features'
import { blockSlug } from '@/fields/block-slug'
import { bgVariant } from '@/fields/bg-variant'
import { cmsLinks } from '@/fields/cms-link'
import { aspectRatio } from '@/fields/aspect-ratio'

export const HeroSplit: Block = {
  slug: 'heroSplit',
  interfaceName: 'IHeroSplit',
  fields: [
    {
      type: 'row',
      fields: [
        bgVariant,
        blockSlug,
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'radio',
          name: 'mediaSide',
          label: 'Media side',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'right',
          required: true,
          admin: { width: '50%' },
        },
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
          }),
      ],
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'media',
    },
    {
      type: 'richText',
      name: 'content',
      editor: lexicalEditor({ features: [...defaultFeatures] }),
    },
    cmsLinks({ maxRows: 2 }),
  ],
}