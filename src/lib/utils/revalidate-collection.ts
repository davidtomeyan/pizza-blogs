import { CollectionSlug } from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateCollection = (collectionSlug: CollectionSlug) => {
  revalidateTag(`collection-${collectionSlug}`);
};

export const revalidateCollectionById = (
  collectionSlug: CollectionSlug,
  id: string | number,
) => {
  revalidateTag(`collection-${collectionSlug}-${id}`);
};
