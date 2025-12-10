import { IBlogSlider } from '@/payload-types';
import { cn, isObject } from '@/lib/utils';
import { Section } from '@/components/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from '@/components/carousel';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Item,
  ItemGroup,
  ItemTitle,
  ItemContent,
  ItemDescription,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Media } from '@/components/media';

export function BlogSlider(props: IBlogSlider) {
  if (!Array.isArray(props.blogs)) return null;

  return (
    <Section
      id={props.slug ?? undefined}
      className={cn([
        'overflow-hidden bg-secondary',
      ])}>
      <div className='max-w-full mx-auto space-y-8 lg:gap-12 py-8 md:py-16'>
        {(props.blogs.length ?? 0) > 0 && (
          <Carousel
            opts={{
              align: 'center',
              loop: false,
            }}>
            <div className='flex flex-row items-center justify-between pb-12 gap-x-2 layout px-4 lg:px-6 mx-auto'>
              <div className='text-4xl font-semibold max-w-md'>
                {props.title}
              </div>
              <div className='flex gap-2'>
                <CarouselPrevious className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
                <CarouselNext className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
              </div>
            </div>
            <CarouselContent className='layout px-2 lg:mx-auto'>
              {props.blogs?.map((blog, index) =>
                isObject(blog) ? (
                  <CarouselItem
                    className={cn([
                      'lg:basis-[94%]',
                    ])}
                    key={`carousel-item-${index}`}>
                    <div className='grid md:grid-cols-2 gap-4 p-4 lg:p-6 bg-background rounded-3xl'>
                      <Card className='shadow-none border-none bg-secondary'>
                        <CardHeader>
                          <CardTitle className='text-4xl'>
                            {blog.title}
                          </CardTitle>
                          <CardDescription>{blog.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ItemGroup className='grid lg:grid-cols-2 gap-4 rounded-lg'>
                            {blog.details?.map((detail, index) => (
                              <Item
                                className='bg-background '
                                size={'sm'}
                                key={String(detail.id) + String(index)}
                                variant={'default'}>
                                <ItemContent>
                                  <ItemTitle>
                                    {detail.title}{' '}
                                    <span className='empty:hidden text-muted-foreground'>
                                      {detail.value}
                                    </span>
                                  </ItemTitle>
                                  <ItemDescription>
                                    {detail.desc}
                                  </ItemDescription>
                                </ItemContent>
                              </Item>
                            ))}
                          </ItemGroup>
                        </CardContent>
                        <CardFooter className='max-lg:flex-col gap-2 items-stretch lg:items-center lg:gap-4'>
                          {blog.location && (
                            <Button
                              asChild
                              className={'flex-1'}>
                              <Link
                                {...{
                                  rel: 'noopener noreferrer',
                                  target: '_blank',
                                }}
                                href={blog.location}>
                                <MapPin /> Get Directions
                              </Link>
                            </Button>
                          )}
                          <Button
                            asChild
                            className={'flex-1'}
                            variant={'outline'}>
                            <Link href={`/blogs/${blog.id}`}>Read More</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                      <div className='max-md:row-start-1 max-md:aspect-video relative rounded-xl overflow-hidden'>
                        <Media
                          fill
                          className='max-w-full'
                          media={blog.image}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ) : null,
              )}
            </CarouselContent>
            <div className='hover:cursor-pointer pt-6'>
              <CarouselPagination
                length={props.blogs.length}
                opts={{
                  loop: true,
                }}
                withMask={true}
                classNameDots='bg-muted-foreground/50 data-[active=true]:bg-accent-foreground'
                className='mx-auto'
              />
            </div>
          </Carousel>
        )}
      </div>
    </Section>
  );
}
