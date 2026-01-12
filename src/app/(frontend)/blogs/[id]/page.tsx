import { intlFormat } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { Media } from '@/components/media';
import { RichText } from '@/components/rich-text';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn, isObject } from '@/lib/utils';
import {
  getCollection,
  getCollectionById,
} from '@/lib/utils/get-collection';
import { Blog } from '@/payload-types';
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

  let blog: Blog | undefined;
  try {
    blog = await getCollectionById({
      id,
      collection: 'blogs',
    });
  } catch (e) {
    blog = undefined;
  }

  const ImageUrl =
    isObject(blog?.meta?.image) && blog?.meta?.image?.sizes?.og?.filename
      ? `/media/${blog?.meta?.image?.sizes?.og?.filename}`
      : isObject(blog?.image)
        ? `/media/${blog?.image.sizes?.og?.filename}`
        : '';

  return {
    metadataBase: new URL(getServerSideURL()),
    title: blog?.meta?.title ?? blog?.title ?? undefined,
    description: blog?.meta?.description ?? blog?.desc ?? undefined,
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

  let blog: Blog | undefined;
  try {
    blog = await getCollectionById({
      id,
      collection: 'blogs',
    });
  } catch (e) {
    blog = undefined;
  }
  if (!blog) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-y-6 lg:gap-y-20'>
      <div className='bg-accent px-4 flex flex-col gap-y-4 justify-center items-center py-8'>
        <h2 className='text-3xl font-semibold'>Blog Detail</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{blog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='prose prose-sm mx-auto max-w-layout w-full px-4 lg:px-8'>
        <h1>{blog.title}</h1>
        <p>{blog.desc}</p>
        <AspectRatio
          className='overflow-hidden rounded-2xl max-w-layout relative mt-4'
          ratio={1.6}>
          <Media
            className={'m-0!'}
            fill
            media={blog.image}
          />
        </AspectRatio>
      </div>

      {blog.content && (
        <div className='max-w-layout mx-auto w-full px-4 lg:px-8'>
          <RichText
            className='max-w-3xl prose-sm'
            data={blog.content}
          />
        </div>
      )}
      <div className='bg-accent'>
        <div className='max-w-layout mx-auto w-full px-4 lg:px-8 py-6 lg:py-24'>
          <Suspense>
            <MoreBlogsCarousel id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function MoreBlogsCarousel({ id }: { id: string }) {
  const blogs = await getCollection({
    collection: 'blogs',
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
            More Blogs For you
          </h2>
          <div className='hidden md:flex gap-2'>
            <CarouselPrevious className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
            <CarouselNext className='static pointer-events-auto top-auto -right-0 -translate-y-0' />
          </div>
        </div>
        <CarouselContent className='max-w-layout mx-auto'>
          {blogs?.docs.map((blog, index) =>
            isObject(blog) ? (
              <CarouselItem
                className={cn([
                  'md:basis-1/3 py-2 px-6 md:px-4',
                ])}
                key={`carousel-item-${index}`}>
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
                      <CardTitle className='text-xl'>{blog.title}</CardTitle>
                      <CardDescription>{blog.desc}</CardDescription>
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
                  <CardTitle className='text-xl'>{blog.title}</CardTitle>
                  <CardDescription>{blog.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ) : null,
        )}
      </div>
    </>
  );
}
