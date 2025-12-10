import { CMSLink as ICMSLink } from '@/payload-types';
import Link from 'next/link';
import { getCMSLinkProps } from '@/lib/utils/get-cms-llnk-props';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';

export {
  cmsLinkVariantOptions,
  type LinkVariants,
} from '@/components/cms-link/options';
type CMSLinkProps = ICMSLink & {
  className?: string;
};

export function CMSLink({
  className,
  size,
  icon,
  iconRight,
  ...props
}: CMSLinkProps) {
  const cmsLinkProps = getCMSLinkProps(props);
  if (!cmsLinkProps) return null;
  const { href, newTabProps, variant, label } = cmsLinkProps;
  const isOnlyIcon = !!icon && size?.startsWith('icon');
  return (
    <Button
      asChild
      size={size ?? 'default'}
      className={cn([
        variant === 'link'
          ? 'text-accent-foreground underline hover:no-underline'
          : '',
        {
          'flex-row-reverse': iconRight && icon,
        },
        className,
      ])}
      variant={variant}>
      <Link
        {...newTabProps}
        href={href}>
        <Icon iconName={icon} />
        {!isOnlyIcon && label}
      </Link>
    </Button>
  );
}
