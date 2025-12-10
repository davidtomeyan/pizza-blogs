import React from 'react';
import { HomePage } from '@/globals/Home-page/component';
import { SWRConfig, unstable_serialize } from 'swr';
import { CollectionSlug } from 'payload';
import { getCachedCollection } from '@/lib/utils/get-collection';

const fallback: [
  CollectionSlug,
  page: number,
  limit: number,
] = [
  'restaurants',
  1,
  6,
];

export default async function Page() {
  const data = await getCachedCollection({
    collection: 'restaurants',
    page: 1,
    limit: 6,
  })();

  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(fallback)]: data,
        },
      }}>
      <HomePage />
    </SWRConfig>
  );
}
