import z from 'zod/v4'

const envPublicSchema = z.object({
  cmsUrl: z.url(),
})

const cmsUrl = process?.env.NEXT_PUBLIC_CMS_URL

const envPublic = envPublicSchema.parse({ cmsUrl })
export { envPublic }
