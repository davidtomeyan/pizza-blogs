import { RichText } from '@/components/rich-text';
import { getCachedGlobal } from '@/lib/utils/get-global';
import { Section } from '@/components/section';
import { CMSLink } from '@/components/cms-link';
import { Media } from '@/components/media';
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export async function AboutUsPage() {
  const data = await getCachedGlobal({
    slug: 'about-us',
  })();
  const { hero, ctaSection } = data;
  return (
    <div className='md:pb-16'>
      {hero && (
        <Section
          className={cn([
            'w-full flex justify-center min-w-0 items-center overflow-hidden relative',
          ])}>
          <div className='max-w-6xl w-full flex min-w-0 flex-col justify-center items-center md:items-start px-6 lg:px-8 py-12 md:pt-28 md:pb-16 z-20'>
            <div
              className={cn([
                hero.image && 'text-white',
                'flex flex-col text-center md:text-start items-center md:items-start gap-y-6 max-w-sm',
              ])}>
              {hero.title && (
                <h1 className='text-4xl font-bold'>{hero.title}</h1>
              )}
              {hero.description && (
                <p className='text-sm'>{hero.description}</p>
              )}
              {hero.ctaLink && (
                <CMSLink
                  {...hero.ctaLink}
                  size='lg'
                  className={cn([
                    'grow md:max-w-sm',
                  ])}
                />
              )}
            </div>
          </div>
          {hero.image && (
            <>
              <div
                className={cn([
                  'absolute inset-0 z-10',
                  'bg-gradient-to-tr',
                  'from-black/80',
                  'via-black/35',
                  'to-transparent',
                ])}
              />
              <div className='absolute inset-0 z-0'>
                <Media
                  fill
                  className='object-cover'
                  media={hero.image}
                />
              </div>
            </>
          )}
        </Section>
      )}
      {data.content && (
        <RichText
          className='max-w-6xl px-6 lg:px-8 mx-auto'
          data={data.content}
        />
      )}
      {ctaSection?.enable && (
        <Section className='max-w-layout mx-auto w-full px-0 md:px-6 lg:px-8'>
          <div className='text-center md:text-start bg-primary text-primary-foreground md:rounded-4xl grid max-md:pt-8 gap-15 md:grid-cols-2 overflow-hidden'>
            <div className='px-6 md:ps-16 py-16 '>
              <div className='grid gap-4'>
                {ctaSection?.label && (
                  <span className='text-sm text-muted'>
                    {ctaSection?.label}
                  </span>
                )}
                {ctaSection?.title && (
                  <h2 className='empty:hidden text-4xl font-semibold'>
                    {ctaSection?.title}
                  </h2>
                )}
              </div>
              <div className='flex flex-col items-center md:items-start gap-6 mt-6 md:mt-28'>
                {ctaSection?.description && (
                  <p className='text-muted'>{ctaSection?.description}</p>
                )}
                <CMSLink
                  {...ctaSection.link}
                  variant='secondary'
                  size='sm'>
                  {ctaSection?.link?.label}
                  <ArrowRight />
                </CMSLink>
              </div>
            </div>
            <div className='max-md:ps-10 md:pt-16'>
              <div className='relative max-md:aspect-[1.28] size-full rounded-tl-4xl overflow-hidden'>
                <Media
                  fill
                  media={ctaSection.image}
                />
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
