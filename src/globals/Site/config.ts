import {GlobalConfig} from 'payload';
import {lexicalEditor} from '@payloadcms/richtext-lexical';
import {defaultFeatures} from '@/components/rich-text/default-features';
import {
    authenticated,
    authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import {revalidateGlobal} from '@/lib/utils/revalidate-global';

export const Site: GlobalConfig = {
    slug: 'site',
    access: {
        read: authenticatedOrPublished,
        update: authenticated,
    },
    hooks: {
        afterChange: [
            (ctx) => revalidateGlobal(ctx.global.slug),
        ],
    },
    fields: [
        {
            type: 'upload',
            relationTo: 'media',
            name: 'logo',
            label: 'logo',
            filterOptions: {
                mimeType: {
                    contains: 'image',
                },
            },
        },
        {
            type: 'upload',
            relationTo: 'media',
            name: 'favicon',
            label: 'Favicon',
            filterOptions: {
                mimeType: {
                    contains: 'image',
                },
            },
            admin: {
                description: 'Favicon Generator - https://realfavicongenerator.net',
            },
        },
        {
            type: 'text',
            name: 'googleVerificationCode',
        },
        {
            type: 'text',
            name: 'googleTagManagerId',
        },
        {
            type: 'text',
            name: 'googleAnalyticsId',
        },
        {
            type: 'checkbox',
            name: 'cookieConsentBannerEnabled',
        },
        {
            type: 'group',
            admin: {
                condition: (data) => {
                    return data?.cookieConsentBannerEnabled;
                },
            },
            fields: [
                {
                    name: 'acceptButtonLabel',
                    type: 'text',
                    defaultValue: 'Accept All',
                    required: true,
                },
                {
                    name: 'rejectButtonLabel',
                    type: 'text',
                    defaultValue: 'Reject All',
                    required: true,
                },
                {
                    type: 'richText',
                    name: 'cookieConsentBannerContent',
                    editor: lexicalEditor({
                        features: () => [
                            ...defaultFeatures,
                        ],
                    }),
                    required: false,
                },
            ],
        },
    ],
};
