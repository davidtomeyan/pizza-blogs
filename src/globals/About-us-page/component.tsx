import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { CMSLink } from '@/components/cms-link';
import { Separator } from '@/components/ui/separator';
import { RichText } from '@/components/rich-text';
import { getCachedGlobal } from '@/lib/utils/get-global';

export function chunkArray<T>(
  array: readonly T[] | T[],
  chunkSize: number,
): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize) as T[]);
  }
  return result;
}

export async function Footer() {
  const res = await getCachedGlobal({
    slug: 'footer',
  })();

  const footerBlocks = res?.footerBlocks?.length
    ? ([
        {
          blockType: 'jsx',
          element: (
            <Link href='/'>
              <Logo />
            </Link>
          ),
        },
        ...res.footerBlocks,
      ] as const)
    : ([
        {
          blockType: 'jsx',
          element: (
            <Link href='/'>
              <Logo />
            </Link>
          ),
        },
      ] as const);

  const footerGroups = chunkArray(footerBlocks, 3);
  return (
    <footer className='flex justify-center items-center'>
      <div
        className={cn([
          'flex max-w-9xl flex-1 flex-col px-4 md:px-8 lg:px-12 py-14 xl:py-20 min-w-0 gap-y-14',
        ])}>
        {footerGroups.map((group, gIdx) => (
          <Fragment key={`group-${gIdx}`}>
            <div
              className={cn([
                'flex-1 flex flex-col justify-center  lg:flex-row  lg:justify-between  gap-y-12',
                gIdx === 1 && 'flex-col-reverse',
              ])}>
              {group.map((block, idx, array) => (
                <div
                  className={cn([
                    'flex flex-col items-center gap-x-4 gap-y-4 justify-center flex-1 px-2 lg:flex-row lg:justify-start',
                    block.blockType === 'icon-links' && 'flex-row',
                    idx === 1 && 'lg:justify-center',
                    idx === 2 && 'lg:justify-end',
                    array.length === 2 && idx === 1 && 'lg:justify-end',
                  ])}
                  key={`footer-block-${idx}`}>
                  {block.blockType === 'jsx' && block.element}
                  {block.blockType === 'richTextWithBlocksField'
                    && block.content && (
                      <RichText
                        className='text-muted-foreground'
                        data={block.content}
                      />
                    )}
                  {block.blockType === 'links'
                    && block.links?.map((i, index) => {
                      return (
                        <CMSLink
                          className={cn(
                            (i.link?.variant === 'link'
                              || i.link?.variant === 'ghost')
                              && 'no-underline hover:underline text-muted-foreground!  hover:text-foreground ',
                          )}
                          {...i.link}
                          key={`footer-link-${index}`}
                        />
                      );
                    })}
                  {block.blockType === 'icon-links'
                    && block.links?.map((i, index) => {
                      return (
                        <CMSLink
                          className={cn(
                            i.link?.variant === 'link'
                              && 'no-underline hover:underline text-muted-foreground  hover:text-foreground ',
                            "[&_svg:not([class*='size-'])]:size-5",
                          )}
                          {...i.link}
                          key={`footer-link-${index}`}
                        />
                      );
                    })}
                </div>
              ))}
            </div>
            <Separator className={'last:hidden'} />
          </Fragment>
        ))}
      </div>
    </footer>
  );
}
