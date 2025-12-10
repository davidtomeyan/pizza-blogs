import Image from 'next/image';
import { cn, isObject } from '@/lib/utils';
import { getCachedGlobal } from '@/lib/utils/get-global';

async function Logo({ className }: { className?: string }) {
  const { logo } = await getCachedGlobal({
    slug: 'site',
  })();

  if (!(logo && isObject(logo))) return null;
  return (
    <Image
      sizes='auto'
      className={cn('h-full w-fit  object-contain max-w-32', className)}
      width={logo.width ?? 100}
      height={logo.height ?? 100}
      src={`/media/${logo.filename}`}
      alt={logo.alt}
    />
  );
}
export { Logo };
