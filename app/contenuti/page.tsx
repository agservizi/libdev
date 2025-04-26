import Link from "next/link"
import type { Metadata } from "next"
import { Book, Code, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Contenuti | LibDev",
  description:
    "Esplora i contenuti di LibDev: tutorial interattivi, framework e librerie, progetti reali, pattern di design e molto altro.",
}

export default function ContenutiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Esplora i Contenuti</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Scopri la nostra vasta collezione di risorse per sviluppatori: tutorial interattivi, framework e librerie,
          progetti reali, pattern di design e confronti tra tecnologie.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tutorial Interattivi */}
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Tutorial Interattivi</CardTitle>
            </div>
            <CardDescription>
              Impara nuovi linguaggi e tecnologie con i nostri tutorial interattivi. Ogni tutorial include esempi di
              codice, quiz e sfide pratiche.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Linguaggi disponibili</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">SQL</Badge>
                  <Badge variant="outline">Dart</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Caratteristiche</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
                    Lezioni passo-passo
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                    Quiz interattivi
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                    Sfide di codifica
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                    Percorsi di apprendimento personalizzati
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <Link
              href="/contenuti/tutorial"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
            >
              Esplora i tutorial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </CardFooter>
        </Card>

        {/* Framework e Librerie */}
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                <Layers className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Framework e Librerie</CardTitle>
            </div>
            <CardDescription>
              Scopri i framework e le librerie più popolari per ogni linguaggio di programmazione, con guide dettagliate
              e confronti.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Categorie</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                    Frontend
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                    Backend
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">
                    Mobile
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300">
                    Database
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Framework popolari</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    React
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    Express.js
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    Django
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    Flutter
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <Link
              href="/contenuti/framework"
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium inline-flex items-center"
            >
              Esplora i framework
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </CardFooter>
        </Card>

        {/* Progetti Reali */}
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Progetti Reali</CardTitle>
            </div>
            <CardDescription>
              Impara attraverso esempi di progetti reali completi, con spiegazioni dettagliate del codice e delle best
              practice.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Livelli di difficoltà</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                    Principiante
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                    Intermedio
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">
                    Avanzato
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Progetti popolari</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
                    Blog con React e Markdown
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
                    E-commerce con Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
                    App meteo con Vue.js
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
                    Chat app con Socket.io
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <Link
              href="/contenuti/progetti"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              Esplora i progetti
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
