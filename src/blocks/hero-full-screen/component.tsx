import { IHeroFullScreen } from '@/payload-types';
import { RichText } from '@/components/rich-text';
import { Media } from '@/components/media';
import { cn } from '@/lib/utils';
import { CMSLink } from '@/components/cms-link';
import { Section } from '@/components/section';

export function HeroFullScreen(props: IHeroFullScreen) {
  return (
    <Section
      id={props.slug ?? undefined}
      className={cn([
        'w-full min-w-0 flex justify-center items-center min-h-screen relative overflow-hidden',
        props.bgVariant,
      ])}>
      <div className='max-w-6xl min-w-0 w-full flex flex-col justify-center items-center px-6 lg:px-12 py-8 md:py-16 z-20'>
        {props.content && (
          <RichText
            className={cn([
              props.backgroundMedia && 'prose-invert',
            ])}
            data={props.content}
          />
        )}
        <div className='flex flex-wrap w-full gap-y-6 gap-x-4 mt-10 lg:mt-12 justify-center'>
          {(props.links?.length ?? 0) > 0
            && props.links?.map((item, i) => (
              <CMSLink
                {...item.link}
                size='lg'
                className={cn([
                  'grow md:max-w-sm',
                ])}
                key={`link-${i}`}
              />
            ))}
        </div>
      </div>
      {props.backgroundMedia && (
        <>
          <div className='backdrop-blur-[1.2px] bg-black/50 absolute inset-0 z-10' />
          <div className='absolute inset-0 z-0'>
            <Media
              fill
              className='object-cover'
              media={props.backgroundMedia}
            />
          </div>
        </>
      )}
    </Section>
  );
}
