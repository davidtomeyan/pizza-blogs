import { IFlexItems } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { cn } from '@/lib/utils'
import { InViewSection } from '@/components/section'
import { CardItem } from 'src/components/card-item'
import { clampCols } from '@/lib/utils/clamp-cols'


export function FlexItems(props: IFlexItems) {
  const maxColumns = props.cardOptions.maxColumns
  const cols = clampCols(maxColumns)

  return (
    <InViewSection
      id={props.slug ?? undefined}
      className={cn([
          props.bgVariant,
        ],
      )}>
      <div
        className="max-w-9xl w-full space-y-8 lg:space-y-12 mx-auto px-6 lg:px-12 py-8 md:py-16">
        {
          props.content && <RichText className="mx-auto" data={props.content} />
        }
        {(props.cards?.length ?? 0) > 0 && (
          <div className="w-full flex flex-wrap gap-4 justify-center">
            {props.cards && props.cards.map((card, index) => (
              <CardItem
                key={`flex-item-${index}`}
                className={cn([
                  'animate-from-r overflow-hidden basis-full',
                  {
                    'md:basis-[calc(50%-calc(--spacing(4)/2))]': (cols >= 2),
                    'lg:basis-[calc(100%/3-calc(--spacing(4)*2/3))]': (cols >= 3),
                    'xl:basis-[calc(100%/4-calc(--spacing(4)*3/4))]': (cols >= 4),
                  },
                ])}
                cardOptions={props.cardOptions}
                cardData={card} />
            ))}
          </div>
        )}
      </div>
    </InViewSection>
  )
}