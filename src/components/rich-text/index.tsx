import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/rich-text/converters'
import { cn } from '@/lib/utils'
import { hasText } from '@payloadcms/richtext-lexical/shared'

type Props = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>

export function RichText({ ...props }: Props) {
  const { className, ...rest } = props
  if (!hasText(rest.data)) return null
  return (
      <RichTextConverter
        className={cn([
          'prose',
          className,
        ])}
        converters={jsxConverter}
        {...rest}
      />
  )
}
