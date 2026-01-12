import { SerializedLinkNode } from '@payloadcms/richtext-lexical';

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode;
}) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  let href;

  switch (relationTo) {
    case 'blogs': {
      href = `/blogs/${value.id}`;
      break;
    }
    case 'restaurants': {
      href = `/restaurants/${value.id}`;
      break;
    }
    default: {
      href = null;
    }
  }
  return href ?? '#';
};
