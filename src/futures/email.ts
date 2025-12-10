import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: process.env.NODE_ENV === "production",
  auth: {
    type: "OAuth2",
    user: "tomeyandavid1@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export const emailFuture = nodemailerAdapter({
  defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS!,
  defaultFromName: process.env.DEFAULT_FROM_NAME!,
  transport:transporter,
  // transportOptions: {
  //   secure:true,
  //   host: process.env.SMTP_HOST,
  //   port: 465,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // },
})
