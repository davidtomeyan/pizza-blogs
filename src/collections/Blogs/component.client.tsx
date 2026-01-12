'use client';
import { PayloadSDK } from '@payloadcms/sdk';

import { usePagination } from '@/lib/search-params/hooks/use-pagination';
import { PaginationSearchParams } from '@/components/pagination-search-params';
import { Config } from '@/payload-types';
import useSWR from 'swr';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Media } from '@/components/media';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { intlFormat } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { isNumber } from '@/lib/utils/is-number';
import { getClientSideURL } from '@/lib/utils/get-url';

const sdk = new PayloadSDK<Config>({
  baseInit: {
    headers: {
      'content-type': 'application/json',
    },
  },
  baseURL: `${getClientSideURL()}/api`,
});

const RATIO = 373 / 245;
const LIMIT = 6;

export function BlogListPagination() {
  const [totalPages, setTotalPages] = useState<number>(0);

  const [state] = usePagination({
    defaultLimit: LIMIT,
    scroll: false,
    shallow: true,
  });

  const { data, isLoading } = useSWR(
    [
      'blogs',
      state.page,
      state.limit,
    ] as const,

    async ([collection, page, limit]) => {
      return await sdk.find({
        collection,
        page,
        limit,
      });
    },
  );

  useEffect(() => {
    if (isLoading) return;
    setTotalPages(isNumber(data?.totalPages) ? data?.totalPages : 1);
  }, [
    data?.totalPages,
    isLoading,
  ]);
  if (!data?.docs.length) return null;
  return (
    <div
      id={'blog-list'}
      className={'grid gap-8 md:gap-14'}>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {isLoading ? (
          <SkeletonList />
        ) : (
          data?.docs.map((doc) => (
            <Link
              key={doc.id}
              href={`/blogs/${doc.id}`}>
              <Card className='p-2 rounded-3xl hover:shadow-2xl transition-all'>
                <AspectRatio
                  className='relative overflow-hidden rounded-2xl'
                  ratio={RATIO}>
                  <Media
                    fill
                    media={doc.image}
                  />
                  <Badge
                    variant='secondary'
                    className='absolute rounded-sm top-4 left-4'>
                    {intlFormat(doc.updatedAt ?? doc.createdAt, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Badge>
                </AspectRatio>
                <CardHeader className='px-4 pb-4'>
                  <CardTitle className='text-xl'>{doc.title}</CardTitle>
                  <CardDescription>{doc.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        )}
      </div>
      <PaginationSearchParams
        defaultLimit={LIMIT}
        totalPages={totalPages}
      />
    </div>
  );
}

const SkeletonList = () =>
  Array.from({
    length: LIMIT,
  }).map((_, idx) => (
    <Card
      key={`skl-${idx}`}
      className='p-2 rounded-3xl'>
      <AspectRatio
        className='relative overflow-hidden rounded-2xl'
        ratio={RATIO}>
        <Skeleton className='absolute inset-0' />
      </AspectRatio>
      <CardHeader className='px-4 pb-4'>
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-12 h-6' />
        <Skeleton className='w-full mt-4 h-3' />
        <Skeleton className='w-18 h-3' />
      </CardHeader>
    </Card>
  ));
