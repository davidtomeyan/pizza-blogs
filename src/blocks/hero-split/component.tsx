import { IHeroSplit } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { Media } from '@/components/media'
import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/cms-link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InViewSection } from '@/components/section'

export function HeroSplit(props: IHeroSplit) {

  return (
    <InViewSection
      id={props.slug ?? undefined}
      className={cn([
          props.bgVariant,
        ],
      )}>
      <div className={cn([
        'mx-auto max-w-9xl flex flex-col-reverse px-6 lg:px-12 py-8 md:py-16 gap-12 justify-center items-center',
        props.mediaSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row',
      ])}>
        <div className="w-full min-w-0 lg:w-1/2 flex flex-col items-center justify-center">
          {
            props.content && (
              <RichText
                className={cn([
                  'text-center lg:text-start',
                ])}
                data={props.content} />
            )
          }
          <div className={cn([
            'flex w-full flex-wrap gap-y-6 gap-x-4 mt-10 lg:mt-12 justify-center lg:justify-start',
            props.mediaSide === 'right' ? 'animate-from-l' : 'animate-from-r',
          ])}>
            {
              (
                props.links?.length ?? 0) > 0 && props.links?.map((item, i) => (
                  <CMSLink {...item.link}
                           size="lg"
                           className={cn([
                             'grow min-w-52 md:max-w-sm',
                           ])
                           } key={`link-${i}`} />
                ),
              )
            }
          </div>
        </div>

        <div className={cn([
          'z-0 w-full lg:w-1/2 rounded-lg overflow-hidden',
          props.mediaSide === 'left' ? 'animate-from-l' : 'animate-from-r',
        ])}>
          {
            props.aspect === 'auto' ? (
              <Media className="rounded-lg overflow-hidden"
                     media={props.media} />
            ) : (
              <AspectRatio className="relative rounded-lg overflow-hidden"
                           ratio={props.aspectRatio ?? 1}>
                <Media fill
                       media={props.media} />
              </AspectRatio>
            )
          }
        </div>
      </div>
    </InViewSection>
  )
}