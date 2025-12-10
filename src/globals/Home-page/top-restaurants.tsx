import { Section } from '@/components/section';
import React from 'react';
import { Home } from '@/payload-types';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { isObject } from '@/lib/utils';
import Link from 'next/link';
import { Media } from '@/components/media';

function TopRestaurants({
  topRestaurants,
}: {
  topRestaurants?: Home['topRestaurants'];
}) {
  if (!topRestaurants || !topRestaurants.enable) return null;
  return (
    <Section className='layout space-y-12 w-full mx-auto py-8 md:py-16 px-6'>
      <div className='grid gap-4 text-center'>
        <h2 className='max-w-lg mx-auto empty:hidden text-4xl font-semibold'>
          {topRestaurants?.title}
        </h2>
        <p className='max-w-3xl mx-auto text-muted-foreground empty:hidden'>
          {topRestaurants?.description}
        </p>
      </div>
      <ItemGroup className='grid md:grid-cols-2 gap-6'>
        {topRestaurants?.blogs?.map((blog, index) => {
          if (!isObject(blog)) return null;
          return (
            <Item
              asChild
              variant={'outline'}
              className='p-1.5 rounded-4xl gap-2 hover:shadow-2xl [a]:transition-all'
              key={blog.id}>
              <Link href={'#'}>
                <ItemHeader className='lg:hidden'>
                  <ItemMedia
                    className='size-full aspect-[1.5] rounded-3xl group-has-[[data-slot=item-description]]/item:translate-y-0'
                    variant='image'>
                    <Media media={blog.image} />
                  </ItemMedia>
                </ItemHeader>

                <ItemMedia
                  className='max-lg:hidden w-44 h-32 rounded-3xl group-has-[[data-slot=item-description]]/item:translate-y-0'
                  variant='image'>
                  <Media media={blog.image} />
                </ItemMedia>

                <ItemContent className='p-4'>
                  <ItemTitle className='text-xl font-semibold '>
                    #{index + 1} {blog.title}
                  </ItemTitle>
                  <ItemDescription className='line-clamp-none!'>
                    {blog.desc}
                  </ItemDescription>
                </ItemContent>
              </Link>
            </Item>
          );
        })}
      </ItemGroup>
    </Section>
  );
}

export { TopRestaurants };
