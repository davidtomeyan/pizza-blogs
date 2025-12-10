import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

const className = ""
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    switch (node.tag) {
      case 'h1':
        return (
            <h1 className={className}>{...children}</h1>
        )
      case 'h2':
        return (
            <h2 className={className}>{...children}</h2>
        )
      case 'h3':
        return (
            <h3 className={className}>{...children}</h3>
        )
      case 'h4':
        return (
            <h4 className={className}>{...children}</h4>
        )
      case 'h5':
        return (
            <h5 className={className}>{...children}</h5>
        )
      case 'h6':
        return (
            <h6 className={className}>{...children}</h6>
        )
      default:
        return (
            <h1 className={className}>{...children}</h1>
        )
    }
  },
}
