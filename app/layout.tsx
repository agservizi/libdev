import type React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AutoTheme } from "@/components/auto-theme"
import { Toaster } from "@/components/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "LibDev - La tua libreria di comandi per sviluppatori",
  description: "Trova rapidamente i comandi più utili per i tuoi linguaggi di programmazione preferiti",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AutoTheme />
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2 mb-4">
            <div className="container flex h-14 items-center max-w-7xl mx-auto">
              <div className="mr-4 flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Logo asLink={false} />
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link href="/" className="transition-colors hover:text-foreground/80">
                    Home
                  </Link>
                  <Link href="/contenuti" className="transition-colors hover:text-foreground/80">
                    Contenuti
                  </Link>
                  <Link href="/chi-siamo" className="transition-colors hover:text-foreground/80">
                    Chi Siamo
                  </Link>
                  <Link href="/faq" className="transition-colors hover:text-foreground/80">
                    FAQ
                  </Link>
                </nav>
              </div>
              <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-8 md:py-6 px-4 mt-4">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-7xl mx-auto">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} LibDev. Tutti i diritti riservati.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/termini" className="underline underline-offset-4 hover:text-foreground">
                  Termini
                </Link>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
