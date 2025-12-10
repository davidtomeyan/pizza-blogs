import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  let href

  switch (relationTo) {
    case 'pages': {
      href = value.slug == 'home' ? '/' : `/${value.slug}`
      break
    }
    case 'posts': {
      href = `/${relationTo}/post/${value.id}`
      break
    }
    case 'blogs': {
      href = `/${relationTo}/blog/${value.id}`
      break
    }
    default: {
      href = null
    }
  }
  return href ?? "#"
}
