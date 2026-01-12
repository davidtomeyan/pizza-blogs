import { CMSLink as ICMSLink } from '@/payload-types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export {
  cmsLinkVariantOptions,
  type LinkVariants,
} from '@/components/cms-link/options';
type CMSLinkProps = ICMSLink & {
  className?: string;
};

export function CMSLink({
  className,
  children,
  ...props
}: CMSLinkProps & React.ComponentProps<typeof Button>) {
  const { url = '#', newTab, variant, label } = props;
  const newTabProps = newTab
    ? {
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {};

  return (
    <Button
      asChild
      className={cn([
        variant === 'link'
          ? 'text-accent-foreground underline hover:no-underline'
          : '',
        className,
      ])}
      variant={variant}>
      <Link
        {...newTabProps}
        href={url}>
        {children ?? label}
      </Link>
    </Button>
  );
}
