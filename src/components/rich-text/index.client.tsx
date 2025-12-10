import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/rich-text/converters/index.client'
import { cn } from '@/lib/utils'
import { hasText } from '@payloadcms/richtext-lexical/shared'

type Props = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>

export function RichTextClient({...props }: Props) {
  const { className, ...rest } = props
  if (!hasText(rest.data)) return null
  return (
      <RichTextConverter
        className={cn([
            'prose prose-neutral prose-lg lg:prose-2xl',
            className,
        ])}
        converters={jsxConverter}
        {...rest}
      />
  )
}
