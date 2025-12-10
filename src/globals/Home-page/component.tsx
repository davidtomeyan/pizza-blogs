import { getCachedGlobal } from '@/lib/utils/get-global';
import React from 'react';
import { BlogsCarousel } from './blogs-carousel';
import { RestaurantsList } from './restaurants-list';
import { CtaSection } from './cta-section';
import { TopRestaurants } from '@/globals/Home-page/top-restaurants';
import { ContactUs } from '@/globals/Home-page/contact-us';

export async function HomePage() {
  const res = await getCachedGlobal({
    slug: 'home',
  })();

  return (
    <div className='flex flex-col w-full'>
      <BlogsCarousel blogsCarousel={res.blogsCarousel} />
      <RestaurantsList restaurants={res.restaurants} />
      <CtaSection ctaSection={res.ctaSection} />
      <TopRestaurants topRestaurants={res.topRestaurants} />
      <ContactUs contactUs={res.contactUs} />
    </div>
  );
}
