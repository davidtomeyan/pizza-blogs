import {
  ArrayField,
  GroupField,
  SelectField,
} from 'payload';
import { mergeFieldsSafely } from '@/lib/utils';
import { lucideIconNames } from '@/components/lucide-icon-names';
import { socialIconNames } from '@/components/social-icons';

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
        },
        {
          type: 'row',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Label',
            },
          ],
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
