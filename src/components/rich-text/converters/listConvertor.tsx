import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedListItemNode, SerializedListNode } from '@payloadcms/richtext-lexical'
import { Circle, CircleCheckBig } from 'lucide-react'
import { cn } from '@/lib/utils'

const listStyleOl = (level: number) => {
  switch (level % 3) {
    case 0:
      return 'list-decimal'
    case 1:
      return 'list-[lower-alpha]'
    case 2:
      return 'list-[upper-roman]'
    default:
      return 'list-decimal'
  }
}
const listStyleUl = (level: number) => {
  switch (level % 3) {
    case 0:
      return 'list-disc'
    case 1:
      return 'list-[circle]'
    case 2:
      return 'list-[square]'
    default:
      return 'list-disc'
  }
}

export const listConverter: JSXConverters<SerializedListItemNode | SerializedListNode> = {
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const NodeTag = node.tag

    return (
        <NodeTag className={cn([`list-${node?.listType}`, 'list-inside'])}>{children}</NodeTag>
    )
  },
  listitem: ({ node, nodesToJSX, parent }) => {
    const hasSubLists = node.children.some((child) => child.type === 'list')

    const children = nodesToJSX({
      nodes: node.children,
    })

    if ('listType' in parent && parent?.listType === 'check') {
      return (
        <li
          aria-checked={node.checked ? 'true' : 'false'}
          className={`list-item-checkbox${node.checked ? ' list-item-checkbox-checked' : ' list-item-checkbox-unchecked'}${hasSubLists ? ' nestedListItem' : ''}`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="checkbox"
          style={{ listStyleType: 'none' }}
          tabIndex={-1}
          value={node?.value}
        >
          {hasSubLists ? (
            children
          ) : (
            <>
              {node.checked ? (
                <CircleCheckBig strokeWidth="2.5" className="inline size-4.5 text-success me-2!" />
              ) : (
                <Circle strokeWidth="2.5" className="inline size-4.5 text-warning me-2!" />
              )}
              {children}
              <br />
            </>
          )}
        </li>
      )
    } else {
      const level = node.indent
      let classes: string = ''
      if ('listType' in parent) {
        if (parent?.listType === 'number') classes = listStyleOl(level)
        if (parent?.listType === 'bullet') classes = listStyleUl(level)
      }
      return (
        <li
          className={cn([hasSubLists && 'nestedListItem', classes])}
          style={hasSubLists ? { listStyleType: 'none' } : undefined}
          value={node?.value}
        >
          {children}
        </li>
      )
    }
  },
}
