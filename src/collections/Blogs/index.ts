import type {CollectionConfig} from 'payload';
import {
    authenticated,
    authenticatedOrPublished,
} from '@/lib/utils/access/auth';
import {richTextWithBlocksField} from '@/fields/rich-text-with-blocks';
import {
    revalidateCollection,
    revalidateCollectionById,
} from '@/lib/utils/revalidate-collection';
import {revalidateGlobal} from "@/lib/utils/revalidate-global";

export const Blogs: CollectionConfig<'blogs'> = {
    slug: 'blogs',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        desc: true,
        image: true,
    },
    hooks: {
        afterChange: [
            ({doc, collection}) => {
                revalidateCollection(collection.slug);
                revalidateCollectionById(collection.slug, doc.id);
                revalidateGlobal("home")
            },
        ],
        afterDelete: [
            ({doc, collection}) => {
                revalidateCollection(collection.slug);
                revalidateGlobal("home")
                revalidateCollectionById(collection.slug, doc.id);
            },
        ],
    },
    admin: {
        group: 'Data',
        useAsTitle: 'title',
        defaultColumns: [
            'title',
            'updatedAt',
        ],
    },
    fields: [
        {
            type: 'upload',
            name: 'image',
            relationTo: 'media',
            filterOptions: {
                mimeType: {
                    contains: 'image',
                },
            },
        },
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'textarea',
            name: 'desc',
            label: 'Description',
            required: true,
        },
        richTextWithBlocksField,
    ],
};
