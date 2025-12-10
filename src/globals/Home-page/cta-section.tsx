import { Section } from '@/components/section';
import { CMSLink } from '@/components/cms-link';
import { Media } from '@/components/media';
import React from 'react';
import { Home } from '@/payload-types';

function CtaSection({ ctaSection }: { ctaSection?: Home['ctaSection'] }) {
  if (!ctaSection || !ctaSection.enable) return null;
  return (
    <Section className='layout mx-auto w-full md:px-6'>
      <div className='text-center md:text-start bg-primary text-primary-foreground md:rounded-4xl grid max-md:pt-8 gap-15 md:grid-cols-2 overflow-hidden'>
        <div className='px-6 md:ps-16 py-16 '>
          <div className='grid gap-4'>
            {ctaSection?.label && (
              <span className='text-sm text-muted'>{ctaSection?.label}</span>
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
              size='sm'
              iconRight
              icon={'arrow-right'}
            />
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
  );
}
export { CtaSection };
