import { SerializedLineBreakNode} from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'

export const linebreakJSXConverter: JSXConverters<SerializedLineBreakNode> = {
  linebreak: <br />,
}