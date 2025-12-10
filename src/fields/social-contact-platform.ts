import { SelectField } from 'payload'

export const socialContactPlatform:SelectField =   {
  type: 'select',
  interfaceName: 'ISocialContactPlatform',
  name: 'platformName',
  required: true,
  label: 'Social / Contact Platform',
  options: [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Gmail', value: 'gmail' },

    { label: 'Facebook', value: 'facebook' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'X', value: 'x' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'Telegram', value: 'telegram' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Snapchat', value: 'snapchat' },
    { label: 'Pinterest', value: 'pinterest' },
    { label: 'Viber', value: 'viber' },
    { label: 'Skype', value: 'skype' },
    { label: 'Reddit', value: 'reddit' },
    { label: 'Discord', value: 'discord' },

    { label: 'GitHub', value: 'github' },
    { label: 'GitLab', value: 'gitlab' },
    { label: 'Bitbucket', value: 'bitbucket' },
    { label: 'Dribbble', value: 'dribbble' },
    { label: 'Behance', value: 'behance' },
    { label: 'Medium', value: 'medium' },
    { label: 'Google', value: 'google' },

    { label: 'Other', value: 'other' },
  ],
}