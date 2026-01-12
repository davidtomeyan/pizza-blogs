import { BlogListPagination } from '@/collections/Blogs/component.client';
import { Section } from '@/components/section';
import React from 'react';
import { Home } from '@/payload-types';

function BlogList({ blog }: { blog?: Home['blogs'] }) {
  if (!blog || !blog.enable) return null;
  return (
    <Section className='max-w-layout space-y-8 w-full mx-auto py-8 md:py-16 px-6'>
      {(blog?.title || blog?.description) && (
        <div className='grid gap-4 text-center'>
          <h2 className='max-w-lg mx-auto empty:hidden text-4xl font-semibold'>
            {blog?.title}
          </h2>
          <p className='max-w-3xl mx-auto text-muted-foreground empty:hidden'>
            {blog?.description}
          </p>
        </div>
      )}
      <BlogListPagination />
    </Section>
  );
}

export { BlogList };
