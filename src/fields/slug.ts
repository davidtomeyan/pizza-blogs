import { Field } from 'payload'
import slugify from 'slugify'

export const slug: Field = {
  required: true,
  unique: true,
  type: 'text',
  name: 'slug',
  label: 'Slug',
  index: true,
  admin: {
    width: '50%',
    description:
      'Use "home" for the homepage slug. All other slugs will be generated automatically.',
  },
  hooks: {
    beforeValidate: [
      ({ data, value, operation }) => {

        if (value && typeof value === 'string') {
          return slugify(value, {
            replacement: '-',
            locale: 'en',
            trim: true,
            lower: true,
            strict: true,
          })
        }

        if (operation === 'create' || !data?.slug) {
          const label = data?.label
          if (label && typeof label === 'string') {
            return slugify(label, {
              replacement: '-',
              locale: 'en',
              trim: true,
              lower: true,
              strict: true,
            })
          }
        }
        return value
      },
    ],
  }
}
