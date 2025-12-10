import { Field } from 'payload'
import { v4 as uuidv4, validate as isUUID } from 'uuid'
import slugify from 'slugify'

export const blockSlug: Field = {
  name: 'slug',
  type: 'text',
  unique: true,
  admin: {
    width: '50%',
    description:
      'Anchor-friendly block identifier for in-[page] navigation (e.g., /[page]#slug). The value is normalized to a URL-safe, lowercase slug; if left empty, a UUID will be generated automatically.',
  },
  hooks: {
    beforeValidate: [
      ({ value }) => {
        if (typeof value === 'string') {
          const v = value.trim()
          if (isUUID(v)) return v

          const slug = slugify(v, {
            replacement: '-',
            locale: 'en',
            trim: true,
            lower: true,
            strict: true,
          })

          return slug || uuidv4()
        }

        return uuidv4()
      },
    ],
  },
}