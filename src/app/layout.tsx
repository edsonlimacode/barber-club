import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { cookies } from "next/headers"
import { getCookie } from "cookies-next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald"
})

export const metadata: Metadata = {
  title: "Barber club",
  description: "Sistema gerenciamento de barbearias e salões"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getCookie("barberclub.theme", { cookies })

  const toggleTheme = theme ? theme : "dark"

  return (
    <html lang="pt-BR" id="toggle-theme" className={`${toggleTheme}`}>
      <body className={`${inter.className} antialiased`}>
        <Toaster position="top-center" richColors duration={2000} />
        {children}
      </body>
    </html>
  )
}
