import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Code, Github, Globe, Heart, Mail, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla home
            </Link>
          </Button>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Chi Siamo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              LibDev è nato dalla passione per la programmazione e dalla volontà di creare uno strumento utile per tutti
              gli sviluppatori.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                La nostra missione
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  LibDev nasce con l'obiettivo di semplificare la vita degli sviluppatori, offrendo un accesso rapido e
                  intuitivo alla sintassi e ai comandi dei linguaggi di programmazione più utilizzati.
                </p>
                <p>
                  Sappiamo quanto può essere frustrante dover cercare continuamente la sintassi corretta o esempi di
                  codice durante lo sviluppo. Per questo abbiamo creato LibDev: per avere tutte queste informazioni in
                  un unico posto, facilmente accessibili e ben organizzate.
                </p>
                <p>
                  Il nostro obiettivo è diventare il punto di riferimento per gli sviluppatori di tutto il mondo,
                  offrendo uno strumento che permetta di risparmiare tempo e aumentare la produttività.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                Il nostro team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                        <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">Marco Rossi</h3>
                      <p className="text-sm text-muted-foreground mb-3">Fondatore & Lead Developer</p>
                      <p className="text-sm mb-4">
                        Appassionato di sviluppo web e intelligenza artificiale, con oltre 10 anni di esperienza nel
                        settore.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                        <Code className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">Laura Bianchi</h3>
                      <p className="text-sm text-muted-foreground mb-3">UX Designer & Content Manager</p>
                      <p className="text-sm mb-4">
                        Esperta in user experience e content strategy, con una passione per la creazione di interfacce
                        intuitive.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />I nostri valori
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Semplicità</h3>
                    <p className="text-muted-foreground">
                      Crediamo che la semplicità sia la chiave per un'esperienza utente efficace. Per questo ci
                      impegniamo a mantenere LibDev intuitivo e facile da usare.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Qualità</h3>
                    <p className="text-muted-foreground">
                      Ci impegniamo a fornire contenuti accurati e aggiornati, per garantire che gli sviluppatori
                      possano fare affidamento su LibDev per il loro lavoro quotidiano.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Comunità</h3>
                    <p className="text-muted-foreground">
                      Crediamo nel potere della comunità e nell'importanza della condivisione delle conoscenze. LibDev è
                      costruito con e per la comunità degli sviluppatori.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Globe className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                Contattaci
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>Hai domande, suggerimenti o vuoi collaborare con noi? Non esitare a contattarci!</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@libdev.it" className="text-blue-600 dark:text-blue-400">
                    info@libdev.it
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/libdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    github.com/libdev
                  </a>
                </p>
                <p>
                  Twitter:{" "}
                  <a
                    href="https://twitter.com/libdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    @libdev
                  </a>
                </p>
              </div>
            </section>
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
            <Link href="/chi-siamo" className="text-sm text-muted-foreground hover:text-foreground">
              Chi siamo
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
