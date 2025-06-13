import { ReactNode } from "react"
import { oswald } from "../layout"
import { Header } from "./_components/header"
import { SessionProvider } from "next-auth/react"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${oswald.className}`}>
      <SessionProvider>
        <Header />
      </SessionProvider>
      {children}
    </div>
  )
}
