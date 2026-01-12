import {BasePayload, getPayload, GlobalSlug} from 'payload';
import payloadConfig from '@payload-config';
import {unstable_cache} from 'next/cache';
import {SelectFromGlobalSlug} from 'node_modules/payload/dist/globals/config/types';
import {cache} from "react";

type FindGlobal = BasePayload['findGlobal'];
type FindGlobalParams<
    TSlug extends GlobalSlug,
    TSelect extends Parameters<FindGlobal>[0]['select'],
> = Parameters<FindGlobal>[0] & {
    slug: TSlug;
    select?: TSelect;
};

const getGlobal: FindGlobal = cache(async (options) => {
    const payload = await getPayload({
        config: payloadConfig,
    });
    return payload.findGlobal({
        depth: 14,
        ...options,
    });
});

const getCachedGlobal = <
    TSlug extends GlobalSlug,
    TSelect extends SelectFromGlobalSlug<TSlug>,
>(
    params: FindGlobalParams<TSlug, TSelect>,
) => {
    return unstable_cache(
        async () => await getGlobal(params),
        [
            JSON.stringify(params)
        ],
        {
            tags: [
                `global-${params.slug}`,
                'all',
            ],
        },
    );
}

export {getGlobal, getCachedGlobal};
