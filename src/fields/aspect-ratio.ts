import { NumberField } from 'payload'
import { mergeFieldsSafely } from '@/lib/utils'

export const aspectRatio = (props: Partial<NumberField> = {}): NumberField => mergeFieldsSafely({
  type: 'number',
  name: 'aspectRatio',
  label: 'Aspect ratio (W/H)',
  admin: {
    width: '50%',
    description: 'e.g., 1.777 for 16:9, 1.333 for 4:3',
  },
  defaultValue: 1,
  min: 0.1,
  max: 10,
  required: true,
  hasMany:false
} satisfies NumberField, {...props})