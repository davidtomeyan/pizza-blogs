import { revalidateTag } from 'next/cache';

export const revalidateAll = () => {
  revalidateTag('all');
};
