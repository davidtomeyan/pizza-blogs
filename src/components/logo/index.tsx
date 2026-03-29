import Image from 'next/image';
import { cn } from '@/lib/utils';

async function Logo({ className }: { className?: string }) {

  return (
    <Image
      sizes='auto'
      className={cn('h-full w-fit object-contain max-w-36', className)}
      width={2624}
      height={1898}
      src={"/logo.png"}
      alt={"Logo"}
    />
  );
}
export { Logo };
