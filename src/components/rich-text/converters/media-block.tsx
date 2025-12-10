import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { IRichTextMediaBlock, IRichTextInlineMediaBlock } from '@/payload-types'
import { Media } from '@/components/media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

export const blocksJSXConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    'media-block': ({ node }: { node: { fields: IRichTextMediaBlock } }) => {
      if (!node.fields) return null
      const { fields } = node
      const limited = !!fields.constrainWidth

      const style = limited && fields.maxWidth
        ? { maxWidth: fields.maxWidth }
        : undefined

      const alignClass =
        limited
          ? fields.align === 'right'
            ? 'ml-auto'
            : fields.align === 'center'
              ? 'mx-auto'
              : '' // left
          : ''

      return (
        <div className="mt-10">
          <div className={cn([
            'mb-10', alignClass,
          ])} style={style}>
            {fields.aspect === 'ratio' ? (
              <AspectRatio
                className={'rounded-lg bg-accent relative overflow-hidden'}
                ratio={fields.aspectRatio ?? 1}
              >
                <Media
                  placeholderEnabled={false}
                  priority
                  className={'mt-0!'}
                  fill
                  media={fields.media}
                />
              </AspectRatio>
            ) : (
              <Media priority
                     placeholderEnabled={false}
                     className="rounded-lg overflow-hidden max-w-full m-0!"
                     media={fields.media} />
            )}
          </div>
        </div>
      )
    },
  },
  inlineBlocks: {
    'inline-media-block': ({ node }: { node: { fields: IRichTextInlineMediaBlock } }) => {
      if (!node.fields) return null
      const { fields } = node
      const limited = !!fields.constrainWidth

      const style = limited && fields.maxWidth
        ? { maxWidth: `${fields.maxWidth}px` }
        : undefined

      const floatClass =
        fields.constrainWidth
          ? fields.align === 'right'
            ? 'lg:float-right ml-6 mb-2'
            : fields.align === 'center'
              ? 'block mx-auto'
              : 'lg:float-left mr-6 mb-2'
          : ''

      return (
        <Media
          placeholderEnabled={false}
          priority
          className={cn([
            'align-top  w-full rounded-lg overflow-hidden my-4!', floatClass,
            limited ? 'inline' : 'block',
          ])}
          style={style}
          media={fields.media} />
      )
    },
  },

}
