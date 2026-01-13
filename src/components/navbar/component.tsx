import Link from 'next/link';
import { PopoverAnchor, PopoverTrigger } from '@/components/ui/popover';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PopoverProvider } from './popover-provider';
import { Button } from '@/components/ui/button';
import { LinksMobile } from '@/components/navbar/client';
export function Navbar() {
  return (
    <PopoverProvider>
      <header className='h-(--header-height) flex justify-center w-full bg-background sticky top-0 left-0 z-50 border-b border-border/70'>
        <div className='grow flex items-center justify-between max-w-layout gap-5 px-4 lg:px-6 py-4 min-w-0'>
          <Link
            href='/'
            className='h-full flex'>
            <Logo />
          </Link>
          <LinksDesktop />
          <PopoverTrigger className='md:hidden group relative'>
            <Menu className='opacity-0' />
            <Menu className='top-0 transition-[scale] absolute scale-100 group-data-[state=open]:scale-0' />
            <X className='top-0 transition-[scale] absolute scale-0 group-data-[state=open]:scale-100 ' />
          </PopoverTrigger>
        </div>
        <PopoverAnchor />
      </header>
      <LinksMobile />
    </PopoverProvider>
  );
}

function LinksDesktop() {
  return (
    <nav className='hidden md:flex grow gap-4 items-center justify-end'>
      <div className='flex'>
        <Button
          variant='link'
          asChild>
          <Link href={'/'}>Home</Link>
        </Button>
        <Button
          variant='link'
          asChild>
          <Link href={'/about-us'}>About Us</Link>
        </Button>
      </div>
      <Button asChild>
        <Link href={'/#contact-us'}>contact-us</Link>
      </Button>
    </nav>
  );
}
