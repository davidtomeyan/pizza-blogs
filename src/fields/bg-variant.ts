import { SelectField } from 'payload'

export const bgVariant: SelectField = {
  type: 'select',
  name: 'bgVariant',
  label: 'Background Variant',
  admin: { width: '50%' },
  options: [
    {
      label: 'Defaults',
      value: 'bg-background',
    },
    {
      label: 'Secondary',
      value: 'bg-secondary',
    },
  ],
}