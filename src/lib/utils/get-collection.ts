import {getPayload, CollectionSlug} from 'payload';
import payloadConfig from '@payload-config';
import {unstable_cache} from 'next/cache';
import {cache} from "react";

type Find = Awaited<ReturnType<typeof getPayload>>['find'];
type FindByID = Awaited<ReturnType<typeof getPayload>>['findByID'];

type FindParams<TCollection extends CollectionSlug> = Parameters<Find>[0] & {
    collection: TCollection;
};

type FindByIdParams<TCollection extends CollectionSlug> =
    Parameters<FindByID>[0] & {
    collection: TCollection;
};

const getCollection = cache(async <TCollection extends CollectionSlug>(
    options: FindParams<TCollection>,
) => {
    const payload = await getPayload({
        config: payloadConfig,
    });
    return payload.find(options);
});

const getCollectionById = cache(async <TCollection extends CollectionSlug>(
    options: FindByIdParams<TCollection>,
) => {
    const payload = await getPayload({
        config: payloadConfig,
    });
    return payload.findByID(options);
});

const getCachedCollection = <TCollection extends CollectionSlug>(
    options: FindParams<TCollection>,
) =>
    unstable_cache(
        async () => await getCollection<TCollection>(options),
        [
            JSON.stringify(options),
        ],
        {
            tags: [
                `collection-${options.collection}`,
                'all',
            ],
        },
    );

const getCachedCollectionById = <TCollection extends CollectionSlug>(
    options: FindByIdParams<TCollection>,
) =>
    unstable_cache(
        async () => await getCollectionById<TCollection>(options),
        [
            JSON.stringify(options),
        ],
        {
            tags: [
                `collection-${options.collection}-${options.id}`,
                'all',
            ],
        },
    );

export {
    getCollection,
    getCachedCollection,
    getCollectionById,
    getCachedCollectionById,
};
