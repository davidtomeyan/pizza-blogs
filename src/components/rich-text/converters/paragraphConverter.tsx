import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedParagraphNode } from '@payloadcms/richtext-lexical'

const className = ""
export const paragraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (!children?.length) {
      return (
        <p className={className}>
          <br />
        </p>
      )
    }
    return (
        <p className={className}>{...children}</p>
    )
  },
}
