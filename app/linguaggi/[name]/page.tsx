import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Code, Filter, Search, SortAsc } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageCommands } from "@/components/language-commands"
import { programmingData } from "@/data/programming-data-server"
import { notFound } from "next/navigation"

interface LanguagePageProps {
  params: {
    name: string
  }
}

export async function generateStaticParams() {
  return Object.keys(programmingData.languages).map((name) => ({
    name,
  }))
}

export default function LanguagePage({ params }: LanguagePageProps) {
  const { name } = params

  // Verifica se il linguaggio esiste
  if (!programmingData.languages[name]) {
    notFound()
  }

  const languageData = programmingData.languages[name]
  const commands = languageData.commands || []
  const documentation = languageData.documentation || "#"

  // Raggruppa i comandi per categoria (prima parola della descrizione)
  const categories: Record<string, any[]> = {}

  commands.forEach((command) => {
    if (!command || !command.description) return

    const firstWord = command.description.split(" ")[0]

    if (!categories[firstWord]) {
      categories[firstWord] = []
    }

    categories[firstWord].push(command)
  })

  const categoryNames = Object.keys(categories)

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-muted-foreground mb-4">
                {commands.length} comandi disponibili in {categoryNames.length} categorie
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryNames.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href={documentation} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentazione ufficiale
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/?q=${encodeURIComponent(name)}`}>
                  <Search className="h-4 w-4 mr-2" />
                  Cerca in {name}
                </Link>
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Panoramica
              </CardTitle>
              <CardDescription>Esplora tutti i comandi disponibili per {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtra
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Ordina
                </Button>
              </div>

              <Tabs defaultValue={categoryNames[0] || "all"}>
                <TabsList className="w-full flex flex-wrap h-auto mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="flex-grow data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
                  >
                    Tutti
                  </TabsTrigger>
                  {categoryNames.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="flex-grow data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all">
                  <LanguageCommands commands={commands} language={name} />
                </TabsContent>

                {categoryNames.map((category) => (
                  <TabsContent key={category} value={category}>
                    <LanguageCommands commands={categories[category]} language={name} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
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
