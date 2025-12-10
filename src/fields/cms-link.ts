import {
  ArrayField,
  Field,
  GroupField,
  RowField,
  SelectField,
  RadioField,
  CheckboxField,
} from 'payload';
import { cmsLinkVariantOptions } from '@/components/cms-link';
import { mergeFieldsSafely } from '@/lib/utils';
import { lucideIconNames } from '@/components/lucide-icon-names';
import { socialIconNames } from '@/components/social-icons';

const variantOptions = Object.values(cmsLinkVariantOptions);

export const linkTypes: Field[] = [
  {
    name: 'reference',
    type: 'relationship',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'reference',
    },
    label: 'Document to link to',
    relationTo: [
        "blogs"
    ],
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
    },
    label: 'Custom URL',
    required: true,
  },
];

export const linkSizes = (props: Partial<SelectField> = {}): SelectField =>
  mergeFieldsSafely(
    {
      type: 'select',
      name: 'size',
      options: [
        'default',
        'sm',
        'lg',
        'icon',
        'icon-sm',
        'icon-lg',
      ],
      defaultValue: 'default',
      hasMany: false,
    } satisfies SelectField,
    props,
  );

export const linkVariant = (props: Partial<SelectField> = {}): SelectField =>
  mergeFieldsSafely(
    {
      name: 'variant',
      type: 'select',
      dbName: 'link_variant',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      hasMany: false,
      defaultValue: 'default',
      options: variantOptions,
    } satisfies SelectField,
    props,
  );

export const linkTypeRadio = (props: Partial<RadioField> = {}): RadioField =>
  mergeFieldsSafely(
    {
      name: 'type',
      type: 'radio',
      dbName: 'link_type',
      admin: {
        layout: 'horizontal',
        width: '50%',
      },
      defaultValue: 'reference',
      options: [
        {
          label: 'Internal link',
          value: 'reference',
        },
        {
          label: 'Custom URL',
          value: 'custom',
        },
      ],
    } satisfies RadioField,
    props,
  );

export const newTab = (props: Partial<CheckboxField> = {}): CheckboxField =>
  mergeFieldsSafely(
    {
      name: 'newTab',
      type: 'checkbox',
      admin: {
        style: {
          alignSelf: 'flex-end',
        },
        width: '50%',
      },
      label: 'Open in new tab',
    } satisfies CheckboxField,
    props,
  );

export const linkSettings = (): RowField => ({
  type: 'row',
  fields: [
    linkTypeRadio(),
    newTab(),
  ],
});
export const dynamicIcons = (props: Partial<SelectField> = {}): SelectField =>
  mergeFieldsSafely(
    {
      interfaceName: 'IDynamicIcon',
      type: 'select',
      name: 'icon',
      options: [
        ...socialIconNames,
        ...lucideIconNames,
      ] as unknown as string[],
      admin: {
        width: '50%',
      },
      hasMany: false,
    } satisfies SelectField,
    props,
  );

export const cmsLink = (props: Partial<GroupField> = {}): GroupField =>
  mergeFieldsSafely(
    {
      name: 'link',
      type: 'group',
      interfaceName: 'CMSLink',
      admin: {
        hideGutter: true,
      },
      fields: [
        linkSettings(),
        linkVariant(),
        {
          type: 'row',
          fields: [
            ...linkTypes,
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Label',
            },
            dynamicIcons(),
            linkSizes(),
          ],
        },
        {
          type: 'checkbox',
          name: 'iconRight',
        },
      ],
    } satisfies GroupField,
    props,
  );

export const cmsLinks = (props: Partial<ArrayField> = {}): ArrayField =>
  mergeFieldsSafely(
    {
      type: 'array',
      name: 'links',
      label: 'Links',
      interfaceName: 'ICMSLinks',
      admin: {
        initCollapsed: true,
      },
      fields: [
        cmsLink(),
      ],
    } satisfies ArrayField,
    props,
  );
