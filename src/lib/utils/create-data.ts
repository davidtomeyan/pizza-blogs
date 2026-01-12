import { getPayload } from 'payload';
import payloadConfig from '@payload-config';
import type { Payload } from 'payload';

type CreateArgs = Parameters<Payload['create']>[0];

export const createData = async (options: CreateArgs) => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  return payload.create(options);
};
