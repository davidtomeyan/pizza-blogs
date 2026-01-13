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
import { MapPin, UtensilsCrossed } from 'lucide-react';
import { Media } from '@/components/media';
import React, { Suspense } from 'react';
import { getCollection, getCollectionById } from '@/lib/utils/get-collection';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/rich-text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn, isObject } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { intlFormat } from 'date-fns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Blog, Restaurant } from '@/payload-types';
import type { Metadata } from 'next';
import { getServerSideURL } from '@/lib/utils/get-url';
const RATIO = 373 / 245;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;

  let restaurant: Restaurant | undefined;
  try {
    restaurant = await getCollectionById({
      id,
      collection: 'restaurants',
    });
  } catch (e) {
    restaurant = undefined;
  }

  const ImageUrl =
    isObject(restaurant?.meta?.image)
    && restaurant?.meta?.image?.sizes?.og?.url
      ? `${restaurant?.meta?.image?.sizes?.og?.url}`
      : isObject(restaurant?.image)
        ? `${restaurant?.image.sizes?.og?.url}`
        : '';

  return {
    metadataBase: new URL(getServerSideURL()),
    title: restaurant?.meta?.title ?? restaurant?.name ?? undefined,
    description:
      restaurant?.meta?.description ?? restaurant?.description ?? undefined,
    openGraph: {
      images: [
        ImageUrl,
      ],
    },
  };
}
export const revalidate = 3600

export async function generateStaticParams() {
  return []
}
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  let data: Restaurant | undefined = undefined;

  try {
    data = await getCollectionById({
      id,
      collection: 'restaurants',
    });
  } catch {
    data = undefined;
  }
  if (!data) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-y-6 lg:gap-y-20'>
      <div className='bg-accent px-4 flex flex-col gap-y-4 justify-center items-center py-8'>
        <h2 className='text-3xl font-semibold'>Profile Detail</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='max-w-layout mx-auto w-full px-4 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-6 bg-background rounded-4xl'>
          <Card className='shadow-none border-none bg-secondary rounded-xl'>
            <CardHeader>
              <CardTitle className='text-3xl lg:text-4xl'>
                <h1>{data.name}</h1>
              </CardTitle>
              <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ItemGroup className='grid lg:grid-cols-2 gap-4'>
                {data.details?.map((detail, index) => (
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
              {data.location && (
                <Button
                  asChild
                  className={'flex-1'}>
                  <Link
                    {...{
                      rel: 'noopener noreferrer',
                      target: '_blank',
                    }}
                    href={data.location}>
                    <MapPin /> Get Directions
                  </Link>
                </Button>
              )}
              {data.phone && (
                <Button
                  asChild
                  className={'flex-1'}
                  variant={'outline'}>
                  <Link href={`tel:${data.phone}`}>
                    <UtensilsCrossed />
                    Call Resturant
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
          <div className='max-md:row-start-1 max-md:aspect-video relative rounded-xl overflow-hidden'>
            <Media
              fill
              className='max-w-full'
              media={data.image}
            />
          </div>
        </div>
      </div>
      {data.content && (
        <div className='max-w-layout mx-auto w-full px-4 lg:px-8'>
          <RichText
            className='max-w-3xl prose-sm'
            data={data.content}
          />
        </div>
      )}
      <div className='bg-accent'>
        <div className='max-w-layout mx-auto w-full px-4 lg:px-8 py-6 lg:py-24'>
          <Suspense>
            <MoreRestaurantsCarousel id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function MoreRestaurantsCarousel({ id }: { id: string }) {
  const blogs = await getCollection({
    collection: 'restaurants',
    limit: 9,
    where: {
      id: {
        not_equals: id,
      },
    },
  });

  return (
    <>
      <Carousel
        className={'hidden md:block'}
        opts={{
          align: 'center',
          loop: false,
        }}>
        <div className='max-w-layout flex flex-row items-end justify-center md:justify-between pb-4 lg:pb-12 gap-x-2 px-6 mx-auto'>
          <h2 className='text-3xl font-bold text-center md:text-start max-w-md'>
            Discover More Restaurants
          </h2>
          <div className='hidden md:flex gap-2'>
            <CarouselPrevious className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
            <CarouselNext className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
          </div>
        </div>
        <CarouselContent className='max-w-layout mx-auto'>
          {blogs?.docs.map((restaurant, index) =>
            isObject(restaurant) ? (
              <CarouselItem
                className={cn([
                  'md:basis-1/3 py-2 px-6 md:px-4',
                ])}
                key={`carousel-item-${index}`}>
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}>
                  <Card className='p-2 shadow-none rounded-3xl hover:shadow-md transition-all'>
                    <AspectRatio
                      className='relative overflow-hidden rounded-2xl'
                      ratio={RATIO}>
                      <Media
                        fill
                        media={restaurant.image}
                      />
                      <Badge
                        variant='secondary'
                        className='absolute rounded-sm top-4 left-4'>
                        {intlFormat(
                          restaurant.updatedAt ?? restaurant.createdAt,
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                      </Badge>
                    </AspectRatio>
                    <CardHeader className='px-4 pb-4'>
                      <CardTitle className='text-xl'>
                        {restaurant.name}
                      </CardTitle>
                      <CardDescription>
                        {restaurant.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </CarouselItem>
            ) : null,
          )}
        </CarouselContent>
      </Carousel>
      <div className='flex flex-col gap-y-6 md:hidden'>
        <h2 className='text-2xl font-bold text-center'>More Blogs For you</h2>
        {blogs?.docs.map((blog) =>
          isObject(blog) ? (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}>
              <Card className='p-2 shadow-none rounded-3xl hover:shadow-md transition-all'>
                <AspectRatio
                  className='relative overflow-hidden rounded-2xl'
                  ratio={RATIO}>
                  <Media
                    fill
                    media={blog.image}
                  />
                  <Badge
                    variant='secondary'
                    className='absolute rounded-sm top-4 left-4'>
                    {intlFormat(blog.updatedAt ?? blog.createdAt, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Badge>
                </AspectRatio>
                <CardHeader className='px-4 pb-4'>
                  <CardTitle className='text-xl'>{blog.name}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ) : null,
        )}
      </div>
    </>
  );
}
