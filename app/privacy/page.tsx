import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-8">Informativa sulla Privacy</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduzione</h2>
            <p>
              La presente Informativa sulla Privacy descrive come LibDev raccoglie, utilizza e condivide i dati
              personali quando utilizzi il nostro sito web.
            </p>

            <h2>2. Dati raccolti</h2>
            <p>Raccogliamo i seguenti tipi di informazioni:</p>
            <ul>
              <li>Informazioni che ci fornisci direttamente</li>
              <li>Informazioni raccolte automaticamente</li>
              <li>Informazioni da fonti di terze parti</li>
            </ul>

            <h2>3. Utilizzo dei dati</h2>
            <p>Utilizziamo i dati raccolti per:</p>
            <ul>
              <li>Fornire, mantenere e migliorare i nostri servizi</li>
              <li>Personalizzare la tua esperienza</li>
              <li>Comunicare con te</li>
              <li>Proteggere i nostri utenti</li>
            </ul>

            <h2>4. Condivisione dei dati</h2>
            <p>Possiamo condividere le tue informazioni con:</p>
            <ul>
              <li>Fornitori di servizi</li>
              <li>Partner commerciali</li>
              <li>Per conformità legale</li>
            </ul>

            <h2>5. I tuoi diritti</h2>
            <p>Hai il diritto di:</p>
            <ul>
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare i tuoi dati personali</li>
              <li>Cancellare i tuoi dati personali</li>
              <li>Opporti al trattamento dei tuoi dati personali</li>
            </ul>

            <h2>6. Sicurezza dei dati</h2>
            <p>Adottiamo misure di sicurezza appropriate per proteggere i tuoi dati personali.</p>

            <h2>7. Modifiche alla presente Informativa</h2>
            <p>
              Possiamo aggiornare la nostra Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali
              modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina.
            </p>

            <h2>8. Contattaci</h2>
            <p>
              Per qualsiasi domanda sulla presente Informativa sulla Privacy, contattaci all'indirizzo email:
              privacy@libdev.it
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
