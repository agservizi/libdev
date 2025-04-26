import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FaqAccordion } from "@/components/faq-accordion"

// Dati statici per le FAQ (in un'app reale, questi dati verrebbero recuperati dall'API)
const faqData = {
  categories: [
    {
      id: "general",
      name: "Generale",
      faqs: [
        {
          id: "what-is-libdev",
          question: "Cos'è LibDev?",
          answer:
            "LibDev è un assistente di programmazione che ti aiuta a trovare rapidamente sintassi, comandi ed esempi di vari linguaggi di programmazione. È progettato per essere uno strumento di riferimento rapido per sviluppatori di tutti i livelli.",
        },
        {
          id: "is-libdev-free",
          question: "LibDev è gratuito?",
          answer:
            "Sì, LibDev è completamente gratuito da utilizzare. Non ci sono costi nascosti o funzionalità premium a pagamento.",
        },
        {
          id: "supported-languages",
          question: "Quali linguaggi di programmazione sono supportati?",
          answer:
            "Attualmente supportiamo HTML, CSS, JavaScript, TypeScript, React, Next.js, PHP, Python, Ruby, Go, Rust e Swift. Stiamo costantemente aggiungendo nuovi linguaggi e framework.",
        },
      ],
    },
    {
      id: "usage",
      name: "Utilizzo",
      faqs: [
        {
          id: "how-to-search",
          question: "Come posso cercare un comando specifico?",
          answer:
            "Puoi utilizzare la barra di ricerca nella home page per cercare qualsiasi linguaggio, comando o sintassi. I risultati verranno filtrati in tempo reale mentre digiti.",
        },
        {
          id: "save-commands",
          question: "Posso salvare i comandi per consultarli in seguito?",
          answer:
            "Sì, puoi salvare i comandi nei preferiti cliccando sull'icona del segnalibro accanto a ciascun comando. I comandi salvati saranno disponibili nella sezione 'Preferiti' (funzionalità in arrivo).",
        },
        {
          id: "share-commands",
          question: "Posso condividere un comando con altri?",
          answer:
            "Sì, ogni comando ha un'opzione di condivisione che ti permette di copiare un link diretto al comando o condividerlo sui social media.",
        },
      ],
    },
    {
      id: "technical",
      name: "Tecnico",
      faqs: [
        {
          id: "data-source",
          question: "Da dove provengono i dati di LibDev?",
          answer:
            "I dati di LibDev sono curati dal nostro team e provengono da documentazioni ufficiali, guide e best practices riconosciute dalla comunità. Ci assicuriamo che tutte le informazioni siano accurate e aggiornate.",
        },
        {
          id: "offline-use",
          question: "Posso utilizzare LibDev offline?",
          answer:
            "Attualmente LibDev richiede una connessione internet per funzionare. Stiamo valutando la possibilità di implementare una modalità offline in futuro.",
        },
        {
          id: "api-available",
          question: "LibDev offre un'API pubblica?",
          answer:
            "Non ancora, ma stiamo lavorando per rendere disponibile un'API pubblica che permetterà agli sviluppatori di integrare i dati di LibDev nelle loro applicazioni.",
        },
      ],
    },
    {
      id: "contribute",
      name: "Contribuire",
      faqs: [
        {
          id: "how-to-contribute",
          question: "Come posso contribuire a LibDev?",
          answer:
            "Apprezziamo i contributi della comunità! Puoi contribuire segnalando errori, suggerendo miglioramenti o aggiungendo nuovi comandi e linguaggi. Contattaci all'indirizzo contributi@libdev.it per maggiori informazioni.",
        },
        {
          id: "report-error",
          question: "Ho trovato un errore nei dati, come posso segnalarlo?",
          answer:
            "Puoi segnalare errori o imprecisioni utilizzando il pulsante 'Segnala un errore' presente in ogni comando, oppure inviando un'email a errori@libdev.it con i dettagli del problema.",
        },
      ],
    },
  ],
}

export default function FaqPage() {
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
            <h1 className="text-4xl font-bold mb-4">Domande Frequenti</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trova risposte alle domande più comuni su LibDev
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Cerca nelle FAQ
              </CardTitle>
              <CardDescription>Trova rapidamente le risposte alle tue domande</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Cerca nelle FAQ..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="general" className="space-y-8">
            <TabsList className="w-full flex flex-wrap h-auto mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {faqData.categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex-grow data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqData.categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <HelpCircle className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                    {category.name}
                  </h2>
                  <FaqAccordion faqs={category.faqs} />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Non hai trovato la risposta che cercavi?</h3>
            <p className="text-muted-foreground mb-6">Contattaci direttamente e saremo felici di aiutarti</p>
            <Button asChild>
              <Link href="mailto:supporto@libdev.it">Contatta il supporto</Link>
            </Button>
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
