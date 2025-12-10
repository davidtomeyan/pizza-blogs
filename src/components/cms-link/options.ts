export type LinkVariants =
  | 'default'
  | 'outline'
  | 'ghost'
  | 'secondary'
  | 'link'
  | 'destructive';

export const cmsLinkVariantOptions: Record<
  LinkVariants,
  {
    label: string;
    value: LinkVariants;
  }
> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
  destructive: {
    label: 'Destructive',
    value: 'destructive',
  },
};
