import { RichText } from '@/components/rich-text';
import { getCachedGlobal } from '@/lib/utils/get-global';
import React from 'react';
export async function CookiesSettings() {
  const data = await getCachedGlobal({
    slug: 'cookies-settings',
  })();

  return (
      <div className='py-8 max-w-4xl md:py-16 px-6 lg:px-8 mx-auto'>
        {data.content && (
            <RichText
                className='max-w-full'
                data={data.content}
            />
        )}
      </div>
  );
}
