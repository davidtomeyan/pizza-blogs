import { JSXConverters } from '@payloadcms/richtext-lexical/react';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { IRichTextMediaBlock, IListItemsBlock } from '@/payload-types';
import { Media } from '@/components/media';
import { cn } from '@/lib/utils';
import { RichText } from '@/components/rich-text';
import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemContent,
  ItemMedia,
} from '@/components/ui/item';
import { Icon } from '@/components/icon';

export const blocksJSXConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    'list-items': ({
      node,
    }: {
      node: {
        fields: IListItemsBlock;
      };
    }) => {
      return (
        <ul className='flex flex-col gap-y-4 md:gap-y-8 mt-8! p-0!'>
          {node.fields.listItems?.map((i) => (
            <Item
              asChild
              size={'sm'}
              key={i.id}>
              <li className='m-0! p-0!'>
                {i.icon && (
                  <ItemMedia
                    className='bg-background'
                    variant='icon'>
                    <Icon iconName={i.icon} />
                  </ItemMedia>
                )}
                <ItemContent>
                  <ItemTitle className='m-0!'>{i.title}</ItemTitle>
                  <ItemDescription className='m-0! text-sm line-clamp-none text-wrap'>
                    {i.description}
                  </ItemDescription>
                </ItemContent>
              </li>
            </Item>
          ))}
        </ul>
      );
    },

    'media-block': ({
      node,
    }: {
      node: {
        fields: IRichTextMediaBlock;
      };
    }) => {
      if (!node.fields) return null;
      const { fields } = node;
      return (
        <div className='grid grid-cols-1 pt-16 md:py-16 gap-x-8 md:grid-cols-2'>
          <div
            className={cn([
              'hidden md:block relative overflow-hidden',
              node.fields.align === 'right' && 'md:order-2',
            ])}>
            <Media
              placeholderEnabled={false}
              fill={true}
              className='rounded-lg max-w-full m-0!'
              media={fields.media}
            />
          </div>
          <div className='block md:hidden'>
            <Media
              placeholderEnabled={false}
              className='rounded-lg max-w-full m-0!'
              media={fields.media}
            />
          </div>
          <div className='pt-8 md:py-20'>
            {fields.caption && (
              <RichText
                className='prose-sm max-w-5xl m-0! p-0! [&_p]:text-muted-foreground'
                data={fields.caption}
              />
            )}
          </div>
        </div>
      );
    },
  },
};
