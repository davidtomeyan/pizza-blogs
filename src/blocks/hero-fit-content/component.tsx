import { IHeroFitContent } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/media'
import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/cms-link'
import { InViewSection } from '@/components/section'

export function HeroFitContent(props: IHeroFitContent) {
  const hasBg = !!props.backgroundMedia && typeof props.backgroundMedia === 'object'

  return (
    <InViewSection
      id={props.slug ?? undefined}
      className={cn([
          'w-full flex justify-center min-w-0 items-center overflow-hidden relative',
          props.bgVariant,
        ],
      )}>
      <div className="max-w-6xl flex min-w-0 flex-col justify-center items-center px-6 lg:px-12 py-8 md:py-16 z-20">
        {
          props.content && <RichText className={cn([
            hasBg && 'prose-invert',
          ])} data={props.content} />
        }
        {
          (props.links?.length ?? 0) > 0 && (
            <div className="flex flex-wrap w-full gap-y-6 gap-x-4 mt-10 lg:mt-12 justify-center animate-from-l">
              {
                props.links?.map((item, i) => (
                  <CMSLink {...item.link} size="lg" className={cn(
                    [
                      'grow md:max-w-sm',
                    ])} key={`link-${i}`} />
                ))
              }
            </div>
          )
        }
      </div>
      {
        props.backgroundMedia && (
          <>
            <div className="backdrop-blur-[1.2px] bg-black/50 absolute inset-0 z-10" />
            <div className="absolute inset-0 z-0">
              <Media fill
                     className="object-cover"
                     media={props.backgroundMedia} />
            </div>
          </>
        )
      }
    </InViewSection>
  )
}