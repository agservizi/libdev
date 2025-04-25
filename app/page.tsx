import type React from "react"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, FileCode, GitBranch, Globe, Server } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Trova il codice che ti serve <span className="text-blue-600 dark:text-blue-400">in un istante</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cerca sintassi, comandi ed esempi di linguaggi di programmazione con il motore di ricerca più avanzato per
              sviluppatori
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Decorative code blocks */}
        <div className="hidden md:block absolute -right-20 top-20 opacity-20 dark:opacity-10">
          <div className="w-64 h-64 rounded-lg bg-blue-600 dark:bg-blue-700 rotate-12" />
        </div>
        <div className="hidden md:block absolute -left-20 bottom-10 opacity-20 dark:opacity-10">
          <div className="w-64 h-64 rounded-lg bg-indigo-600 dark:bg-indigo-700 -rotate-12" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Esplora le nostre funzionalità</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-10 w-10 text-blue-600" />}
              title="Sintassi di linguaggi"
              description="Accedi alla sintassi di tutti i principali linguaggi di programmazione in un unico posto"
            />
            <FeatureCard
              icon={<FileCode className="h-10 w-10 text-indigo-600" />}
              title="Esempi di codice"
              description="Trova esempi pratici per implementare funzionalità comuni in diversi linguaggi"
            />
            <FeatureCard
              icon={<Database className="h-10 w-10 text-purple-600" />}
              title="Comandi database"
              description="Consulta i comandi più utilizzati per i principali database SQL e NoSQL"
            />
            <FeatureCard
              icon={<Server className="h-10 w-10 text-green-600" />}
              title="API e framework"
              description="Scopri come utilizzare le API e i framework più popolari con esempi concreti"
            />
            <FeatureCard
              icon={<GitBranch className="h-10 w-10 text-orange-600" />}
              title="Controllo versione"
              description="Impara i comandi Git essenziali per gestire il tuo codice in modo efficiente"
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-teal-600" />}
              title="Web development"
              description="Trova soluzioni per HTML, CSS, JavaScript e altri linguaggi web"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a iniziare?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Cerca tra migliaia di comandi, sintassi ed esempi per trovare esattamente ciò di cui hai bisogno
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#search">
              Inizia a cercare
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo />
            <span className="text-sm text-muted-foreground ml-2">© 2023 LibDev. Tutti i diritti riservati.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Termini
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contatti
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
