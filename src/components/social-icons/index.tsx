import type { IconBaseProps } from 'react-icons';

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTelegramPlane,
  FaWhatsapp,
  FaSnapchatGhost,
  FaPinterest,
  FaViber,
  FaSkype,
  FaRedditAlien,
  FaDiscord,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaDribbble,
  FaBehance,
  FaPhone,
  FaGoogle,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiMaildotru } from 'react-icons/si';
import { SiGmail, SiMedium } from 'react-icons/si';

export const socialIconsMap = {
  facebook: FaFacebook,
  gmail: SiGmail,
  x: FaXTwitter,
  medium: SiMedium,
  email: SiMaildotru,
  phone: FaPhone,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  telegram: FaTelegramPlane,
  whatsapp: FaWhatsapp,
  snapchat: FaSnapchatGhost,
  pinterest: FaPinterest,
  viber: FaViber,
  skype: FaSkype,
  reddit: FaRedditAlien,
  discord: FaDiscord,
  github: FaGithub,
  gitlab: FaGitlab,
  bitbucket: FaBitbucket,
  dribbble: FaDribbble,
  google: FaGoogle,
  behance: FaBehance,
} as const;

export const socialIconNames = Object.keys(socialIconsMap) as SocialIconName[];
export type SocialIconName = keyof typeof socialIconsMap;

export function SocialIcons({
  iconName,
  ...props
}: {
  iconName: SocialIconName;
} & IconBaseProps) {
  const Icon = socialIconsMap[iconName];
  if (!Icon) return null;
  return <Icon {...props} />;
}
