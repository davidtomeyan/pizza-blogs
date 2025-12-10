// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from '@/collections/Users';
import { Media } from '@/collections/Media';
import { Footer } from '@/globals/Footer/config';
import { Site } from '@/globals/Site/config';
import { plugins } from '@/plugins';
import { emailFuture } from '@/futures/email';
import { simpleEditorFeatures } from '@/components/rich-text/default-features';
import { Blogs } from '@/collections/Blogs';
import { HomePage } from '@/globals/Home-page/config';
import { Restaurants } from '@/collections/Restaurants';
import { AboutUsPage } from '@/globals/About-us-page/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [
    Restaurants,
    Users,
    Media,
    Blogs,
  ],
  globals: [
    AboutUsPage,
    HomePage,
    Footer,
    Site,
  ],
  editor: lexicalEditor({
    features: simpleEditorFeatures,
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  email: emailFuture,
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
