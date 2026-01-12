// import { CMSLink as TCMSLink } from '@/payload-types'
//
// export const getCMSLinkProps = (data: TCMSLink) => {
//   const { type, label, newTab, reference, url, variant } = data
//   let href
//
//   if (type === 'reference' && typeof reference?.value === 'object') {
//     switch (reference?.relationTo) {
//       case 'pages': {
//         href = reference.value.slug == 'home' ? '/' : `/${reference.value.slug}`
//         break
//       }
//       case 'posts': {
//         href = `/${reference?.relationTo}/post/${reference?.value.id}`
//         break
//       }
//       default: {
//         href = null
//       }
//     }
//   }
//
//   if (type !== 'reference') {
//     href = url
//   }
//
//   if (!href) return null
//   const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
//   return {
//     href,
//     newTabProps,
//     isReference: type === 'reference',
//     label,
//     variant,
//   }
// }
