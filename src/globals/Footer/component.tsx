import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { getCachedGlobal } from '@/lib/utils/get-global';
import {SocialIcons} from "@/components/social-icons";

export async function Footer() {
  const res = await getCachedGlobal({
    slug: 'footer',
  })();

  return (
    <footer className='flex justify-center items-center'>
      <div
        className={cn([
          'flex max-w-layout flex-1 flex-col px-4 md:px-8 lg:px-12 py-14 xl:py-20 min-w-0 gap-y-14',
        ])}>
        <div
          className={cn([
            'flex-1 flex flex-col justify-center lg:flex-row lg:justify-between gap-y-12',
          ])}>
          <div
            className={cn([
              'flex gap-x-4 gap-y-4 flex-1 px-2 lg:flex-row lg:justify-start',
            ])}>
            <Logo className="mx-auto"/>
          </div>
          <div
            className={cn([
              'flex flex-col text-sm text-muted-foreground items-center gap-x-6 gap-y-4 justify-center flex-1 px-2 lg:flex-row',
            ])}>
            <Link
              className={'hover:underline'}
              href={'/'}>
              Home
            </Link>
            <Link
              className={'hover:underline'}
              href={'/about-us'}>
              About Us
            </Link>
            <Link
              className={'hover:underline'}
              href={'/#contact-us'}>
              Contact Us
            </Link>
          </div>
          <div
            className={cn([
              'flex flex-col text-sm items-center gap-x-4 gap-y-4 justify-center flex-1 px-2 lg:flex-row lg:justify-end',
            ])}>
            {res.socialMediaLinks?.map((social, idx) => {
              return (
                <Link
                  key={idx}
                  className={"[&_svg:not([class*='size-'])]:size-5"}
                  target='_blank'
                  rel='noopener noreferrer'
                  href={social.url}>
                 <SocialIcons iconName={social.socialMedia}/>
                </Link>
              );
            })}
          </div>
        </div>
        <Separator />
        <div
          className={cn([
            'flex-1 flex justify-center flex-col-reverse lg:flex-row  lg:justify-between  gap-y-12',
          ])}>
          <div
            className={cn([
              'flex items-center justify-center flex-1 px-2 lg:justify-start',
            ])}>
            <p className='text-muted-foreground text-sm'>{res.copyrightText}</p>
          </div>
          <div
            className={cn([
              'flex flex-col text-sm text-muted-foreground items-center gap-x-6 gap-y-4 justify-center flex-1 px-2 lg:flex-row lg:justify-end',
            ])}>
            <Link
              className={'hover:underline'}
              href={'/privacy-policy'}>
              Privacy Policy
            </Link>
            <Link
              className={'hover:underline'}
              href={'/terms-of-service'}>
              Terms of Service
            </Link>
            <Link
              className={'hover:underline'}
              href={'/cookies-settings'}>
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
