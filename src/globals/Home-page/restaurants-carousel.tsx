import { Section } from '@/components/section';
import { cn, isObject } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Media } from '@/components/media';
import { CarouselPagination } from '@/components/carousel';
import React from 'react';
import { Home } from '@/payload-types';
function RestaurantsCarousel({ data }: { data?: Home['restaurantsCarousel'] }) {
  if (!data?.restaurants?.length || !data.enable) return null;
  return (
    <Section
      className={cn([
        'bg-secondary w-full max-w-full mx-auto space-y-8 lg:gap-12 py-8 md:py-16',
      ])}>
      {data?.enable && (data?.restaurants?.length ?? 0) > 0 && (
        <Carousel
          opts={{
            align: 'center',
            loop: false,
          }}>
          <div className='max-w-layout flex flex-row items-end justify-center md:justify-between pb-12 gap-x-2 px-6 mx-auto'>
            <h2 className='text-4xl text-center md:text-start font-semibold max-w-md'>
              {data?.title}
            </h2>
            <div className='hidden md:flex gap-2'>
              <CarouselPrevious className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
              <CarouselNext className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
            </div>
          </div>
          <CarouselContent className='max-w-layout mx-auto'>
            {data?.restaurants?.map((restaurant, index) =>
              isObject(restaurant) ? (
                <CarouselItem
                  className={cn([
                    'md:basis-[95%] px-6 md:px-4',
                  ])}
                  key={`carousel-item-${index}`}>
                  <div className='grid md:grid-cols-2 gap-4 p-4 lg:p-4 bg-background rounded-4xl'>
                    <Card className='shadow-none border-none bg-secondary rounded-xl'>
                      <CardHeader>
                        <CardTitle className='text-3xl lg:text-4xl'>
                          #{index + 1} {restaurant.name}
                        </CardTitle>
                        <CardDescription>
                          {restaurant.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ItemGroup className='grid lg:grid-cols-2 gap-4'>
                          {restaurant.details?.map((detail, index) => (
                            <Item
                              className='bg-background rounded-xl'
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
                                <ItemDescription>{detail.desc}</ItemDescription>
                              </ItemContent>
                            </Item>
                          ))}
                        </ItemGroup>
                      </CardContent>
                      <CardFooter className='max-lg:flex-col gap-2 items-stretch lg:items-center lg:gap-4'>
                        {restaurant.location && (
                          <Button
                            asChild
                            className={'flex-1'}>
                            <Link
                              {...{
                                rel: 'noopener noreferrer',
                                target: '_blank',
                              }}
                              href={restaurant.location}>
                              <MapPin /> Get Directions
                            </Link>
                          </Button>
                        )}
                        <Button
                          asChild
                          className={'flex-1'}
                          variant={'outline'}>
                          <Link href={`/restaurants/${restaurant.id}`}>
                            Read More
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    <div className='max-md:row-start-1 max-md:aspect-video relative rounded-xl overflow-hidden'>
                      <Media
                        fill
                        className='max-w-full'
                        media={restaurant.image}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ) : null,
            )}
          </CarouselContent>
          <div className='hover:cursor-pointer pt-12 md:pt-6'>
            <CarouselPagination
              length={data?.restaurants?.length}
              opts={{
                loop: false,
              }}
              withMask={false}
              classNameDots='bg-muted-foreground/50 data-[active=true]:bg-accent-foreground'
              className='mx-auto max-w-52 w-52'
            />
          </div>
        </Carousel>
      )}
    </Section>
  );
}

export { RestaurantsCarousel };
