import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Section({
  children,
  className,
  ...props
}: ComponentProps<'section'>) {
  return (
    <section
      className={cn([
        className,
      ])}
      {...props}>
      {children}
    </section>
  );
}
