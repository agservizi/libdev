import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TerminiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Termini e Condizioni</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Accettazione dei Termini</h2>
            <p>
              Utilizzando il sito web LibDev, accetti di essere vincolato dai presenti Termini e Condizioni. Se non
              accetti questi termini, ti preghiamo di non utilizzare il nostro sito.
            </p>

            <h2>2. Modifiche ai Termini</h2>
            <p>
              Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive
              immediatamente dopo la pubblicazione dei termini aggiornati. L'uso continuato del sito dopo tali modifiche
              costituirà il tuo consenso ai nuovi termini.
            </p>

            <h2>3. Utilizzo del Servizio</h2>
            <p>
              Ti concediamo una licenza limitata, non esclusiva e non trasferibile per accedere e utilizzare il nostro
              servizio per scopi personali e non commerciali.
            </p>

            <h2>4. Restrizioni d'Uso</h2>
            <p>Non puoi:</p>
            <ul>
              <li>Utilizzare il nostro servizio per scopi illegali</li>
              <li>Violare i diritti di proprietà intellettuale</li>
              <li>Tentare di accedere a dati non destinati a te</li>
              <li>Interferire con il funzionamento del servizio</li>
            </ul>

            <h2>5. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti presenti sul sito, inclusi testi, grafica, logo, icone, immagini, clip audio, download
              digitali e compilazioni di dati, sono di proprietà di LibDev o dei suoi fornitori di contenuti e sono
              protetti dalle leggi sul copyright.
            </p>

            <h2>6. Limitazione di Responsabilità</h2>
            <p>
              In nessun caso LibDev sarà responsabile per danni diretti, indiretti, incidentali, speciali o
              consequenziali derivanti dall'uso o dall'impossibilità di utilizzare il servizio.
            </p>

            <h2>7. Indennizzo</h2>
            <p>
              Accetti di indennizzare e tenere indenne LibDev da qualsiasi reclamo, danno, responsabilità, costo o spesa
              derivante dalla tua violazione di questi Termini.
            </p>

            <h2>8. Legge Applicabile</h2>
            <p>
              Questi Termini saranno regolati e interpretati in conformità con le leggi italiane, senza riguardo ai suoi
              conflitti di principi di legge.
            </p>

            <h2>9. Contattaci</h2>
            <p>
              Per qualsiasi domanda sui presenti Termini e Condizioni, contattaci all'indirizzo email: info@libdev.it
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo />
            <span className="text-sm text-muted-foreground ml-2">© 2025 LibDev. Tutti i diritti riservati.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/termini" className="text-sm text-muted-foreground hover:text-foreground">
              Termini
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
