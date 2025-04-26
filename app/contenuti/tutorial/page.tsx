import type { Metadata } from "next"
import { TutorialCard } from "@/components/tutorial-card"
import { getAllTutorials } from "@/data/tutorials-data"

export const metadata: Metadata = {
  title: "Tutorial Interattivi | LibDev",
  description:
    "Impara nuovi linguaggi e tecnologie con i nostri tutorial interattivi. Ogni tutorial include esempi di codice, quiz e sfide pratiche.",
}

export default function TutorialPage() {
  // Ottieni i tutorial direttamente dal file di dati locale
  const tutorials = getAllTutorials()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tutorial Interattivi</h1>

      <p className="text-lg text-gray-700 mb-8">
        Impara nuovi linguaggi e tecnologie con i nostri tutorial interattivi. Ogni tutorial include esempi di codice,
        quiz e sfide pratiche.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtra per livello</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/contenuti/tutorial?level=principiante"
            className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
          >
            Principiante
          </a>
          <a
            href="/contenuti/tutorial?level=intermedio"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Intermedio
          </a>
          <a
            href="/contenuti/tutorial?level=avanzato"
            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
          >
            Avanzato
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>

      {tutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nessun tutorial trovato</p>
        </div>
      )}
    </div>
  )
}
