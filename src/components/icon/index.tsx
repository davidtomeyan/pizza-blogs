'use client';
import { type LucideProps } from 'lucide-react';

import { socialIconNames, SocialIconName } from '@/components/social-icons';
import {
  lucideIconNames,
  LucideIconName,
} from '@/components/lucide-icon-names';
import { IDynamicIcon } from '@/payload-types';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const DynamicIcon = dynamic(
  () => import('lucide-react/dynamic').then((m) => m.DynamicIcon),
  {
    ssr: false,
    loading: () => {
      return (
        <svg
          className='size-5'
          aria-hidden
          focusable='false'
        />
      );
    },
  },
);

const SocialIcons = dynamic(
  () => import('@/components/social-icons').then((m) => m.SocialIcons),
  {
    ssr: false,
    loading: () => {
      return (
        <svg
          className='size-5 bg-muted rounded-sm animate-pulse'
          aria-hidden
          focusable='false'
        />
      );
    },
  },
);

const socialNames = socialIconNames as readonly string[];
const lucideNames = lucideIconNames as readonly string[];

function isSocialName(n: string): n is SocialIconName {
  return socialNames.includes(n);
}

function isLucideName(n: string): n is LucideIconName {
  return lucideNames.includes(n);
}

export const Icon = memo(function Icon({
  iconName,
  ...props
}: {
  iconName?: IDynamicIcon | null;
} & LucideProps) {
  if (!iconName) return null;

  if (isSocialName(iconName)) {
    return (
      <SocialIcons
        iconName={iconName}
        {...props}
      />
    );
  }

  if (isLucideName(iconName)) {
    return (
      <DynamicIcon
        {...props}
        name={iconName}
      />
    );
  }

  return null;
});
