import { Section } from '@/components/section';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Icon } from '@/components/icon';
import Link from 'next/link';
import React from 'react';
import { Home } from '@/payload-types';
import { ContactUsForm } from '@/globals/Home-page/contact-us-form';
import { Separator } from '@/components/ui/separator';

function ContactUs({ contactUs }: { contactUs?: Home['contactUs'] }) {
  if (!contactUs || !contactUs.enable) return null;

  return (
    <Section id={"contact-us"} className='space-y-8 w-full lg:py-16'>
      <div className='relative'>
        <div className='grid max-lg:gap-6 lg:grid-cols-2 max-w-8xl mx-auto'>
          <div className='py-8 md:py-20 max-w-md mx-auto px-6 w-full'>
            <ContactUsForm
              label={contactUs.label}
              title={contactUs.title}
              description={contactUs.description}
            />
          </div>
          <Separator className='lg:hidden' />
          <div className='flex flex-col justify-center items-center p-6'>
            <ItemGroup className='max-w-md w-full flex flex-col  items-center lg:items-start'>
              {contactUs?.links?.map(({ link }, index) => (
                <Item key={index}>
                  <ItemMedia
                    className="max-lg:hidden bg-background [&_svg:not([class*='size-'])]:size-5 size-10"
                    variant={'icon'}>
                    {link.icon && <Icon iconName={link.icon} />}
                  </ItemMedia>
                  <ItemHeader className="lg:hidden">
                    <ItemMedia
                      className="bg-background [&_svg:not([class*='size-'])]:size-5 size-10 mx-auto"
                      variant={'icon'}>
                      {link.icon && <Icon iconName={link.icon} />}
                    </ItemMedia>
                  </ItemHeader>
                  <ItemContent className='mt-1  items-center lg:items-start'>
                    <ItemTitle>{link.ctaText}</ItemTitle>
                    <ItemDescription>
                      <Link href={link.url}>{link.label}</Link>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </div>
        </div>
        <div className='absolute h-full right-0 w-full lg:w-1/2 bg-secondary top-0 -z-10' />
      </div>
    </Section>
  );
}

export { ContactUs };
