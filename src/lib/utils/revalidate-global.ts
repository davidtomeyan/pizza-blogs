import {GlobalAfterChangeHook, GlobalSlug} from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateGlobal = (slug:GlobalSlug) => {
  revalidateTag(`global-${slug}`);
};
