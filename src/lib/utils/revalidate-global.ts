import { GlobalAfterChangeHook } from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateGlobalHook: GlobalAfterChangeHook = (ctx) => {
  revalidateTag(`global_${ctx.global.slug}`);
};
