import { Geist_Mono,Geist } from 'next/font/google'


export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: "variable",
  style: ["normal"],
})

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "variable",
  style: ["normal"],
})


export const fonts = `${sans.variable} ${mono.variable}`
