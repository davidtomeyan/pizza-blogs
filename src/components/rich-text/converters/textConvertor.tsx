import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { NodeFormat, SerializedTextNode } from '@payloadcms/richtext-lexical'
import { colors } from '@/components/rich-text/converters/colors'

export const textConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }) => {
    let text: React.ReactNode = node.text
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const textStyle = node?.$?.text ? colors.text[node?.$?.text]?.css : {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const decoration = node?.$?.underline ? colors.underline[node?.$?.underline]?.css : {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const backgroundStyle = node?.$?.background ? colors.background[node?.$?.background]?.css : {}
    const textSize = typeof node?.$?.size === 'string' ? node?.$?.size : undefined
    const styles = { ...textStyle, ...backgroundStyle, ...decoration }

    if (node.format & NodeFormat.IS_BOLD) {
      text = <strong style={styles}>{text}</strong>
    }
    if (node.format & NodeFormat.IS_ITALIC) {
      text = <em style={styles}>{text}</em>
    }
    if (node.format & NodeFormat.IS_STRIKETHROUGH) {
      text = <span style={{ textDecoration: 'line-through', ...styles }}>{text}</span>
    }
    if (node.format & NodeFormat.IS_UNDERLINE) {
      text = <span style={{ textDecoration: 'underline', ...styles }}>{text}</span>
    }
    if (node.format & NodeFormat.IS_CODE) {
      text = <code style={styles}>{text}</code>
    }
    if (node.format & NodeFormat.IS_SUBSCRIPT) {
      text = <sub style={styles}>{text}</sub>
    }
    if (node.format & NodeFormat.IS_SUPERSCRIPT) {
      text = <sup style={styles}>{text}</sup>
    }
    if (NodeFormat.IS_HIGHLIGHT) {
      text = <span className={textSize} style={styles}>{text}</span>
    }
    return text
  },
}
