import { IRichTextWithBlocks } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { cn } from '@/lib/utils'
import { InViewSection } from '@/components/section'

export function RichTextWithBlocks(props: IRichTextWithBlocks) {

  return (
    <InViewSection
      id={props.slug ?? undefined}
      className={cn([
          props.bgVariant,
        ],
      )}>
      <div className={cn([
        'max-w-6xl mx-auto w-full px-6 lg:px-12 py-8 md:py-16',
      ])}>
        {
          props.content && (
            <RichText
              className={cn([
                "max-w-full  prose-lg lg:prose-2xl",
              ])}
              data={props.content} />
          )
        }
      </div>
    </InViewSection>
  )
}