import nodemailer from 'nodemailer';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

let options = {};

if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_HOST) {
  options = {
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS!,
    defaultFromName: process.env.DEFAULT_FROM_NAME!,
    transportOptions: {
      secure: true,
      host: process.env.SMTP_HOST,
      port: 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  };
} else if (process.env.MAIL_GOOGLE_MAIL && process.env.MAIL_GOOGLE_PASSWORD) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: process.env.NODE_ENV === 'production',
    auth: {
      user: process.env.MAIL_GOOGLE_MAIL,
      pass: process.env.MAIL_GOOGLE_PASSWORD,
    },
  });
  options = {
    defaultFromAddress: process.env.MAIL_GOOGLE_MAIL,
    defaultFromName: process.env.MAIL_GOOGLE_MAIL,
    transport: transporter,
  };
}

export const emailFuture = nodemailerAdapter({
  defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS!,
  defaultFromName: process.env.DEFAULT_FROM_NAME!,
  ...options,
});
