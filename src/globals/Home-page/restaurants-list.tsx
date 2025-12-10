import { RestaurantsListPagination } from '@/collections/Restaurants/component.client';
import { Section } from '@/components/section';
import React from 'react';
import { Home } from '@/payload-types';

function RestaurantsList({
  restaurants,
}: {
  restaurants?: Home['restaurants'];
}) {
  if (!restaurants || !restaurants.enable) return null;
  return (
    <Section className='layout space-y-8 w-full mx-auto py-8 md:py-16 px-6'>
      <div className='grid gap-4 text-center'>
        <h2 className='max-w-lg mx-auto empty:hidden text-4xl font-semibold'>
          {restaurants?.title}
        </h2>
        <p className='max-w-3xl mx-auto text-muted-foreground empty:hidden'>
          {restaurants?.description}
        </p>
      </div>
      <RestaurantsListPagination />
    </Section>
  );
}

export { RestaurantsList };
