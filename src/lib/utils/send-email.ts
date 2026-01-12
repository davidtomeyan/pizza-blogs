import { getPayload, SendEmailOptions } from 'payload';
import payloadConfig from '@payload-config';

export const sendEmail = async (message: SendEmailOptions) => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  return await payload.sendEmail({
    to: process.env.MAILS_TO?.split(',').filter(Boolean),
    ...message,
  });
};
