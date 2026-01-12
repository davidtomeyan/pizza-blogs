import { getCachedGlobal } from '@/lib/utils/get-global';
import React from 'react';
import { RestaurantsCarousel } from './restaurants-carousel';
import { BlogList } from './blog-list';
import { CtaSection } from './cta-section';
import { TopRestaurants } from '@/globals/Home-page/top-restaurants';
import { ContactUs } from '@/globals/Home-page/contact-us';

export async function HomePage() {
  const res = await getCachedGlobal({
    slug: 'home',
  })();
  return (
    <div className='flex flex-col w-full'>
      <RestaurantsCarousel data={res.restaurantsCarousel} />
      <BlogList blog={res.blogs} />
      <CtaSection ctaSection={res.ctaSection} />
      <TopRestaurants topRestaurants={res.topRestaurants} />
      <ContactUs contactUs={res.contactUs} />
    </div>
  );
}
