import type { Metadata } from "next"
import { FrameworkCard } from "@/components/framework-card"
import { getAllFrameworks } from "@/data/frameworks-data-server"

export const metadata: Metadata = {
  title: "Framework e Librerie | LibDev",
  description:
    "Scopri i framework e le librerie più popolari per ogni linguaggio di programmazione, con guide dettagliate e confronti.",
}

export default function FrameworkPage() {
  // Ottieni i framework dal file di dati server-side
  const frameworks = getAllFrameworks()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Framework e Librerie</h1>

      <p className="text-lg text-gray-700 mb-8">
        Scopri i framework e le librerie più popolari per ogni linguaggio di programmazione, con guide dettagliate e
        confronti.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtra per categoria</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/contenuti/framework?category=frontend"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Frontend
          </a>
          <a
            href="/contenuti/framework?category=backend"
            className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
          >
            Backend
          </a>
          <a
            href="/contenuti/framework?category=mobile"
            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
          >
            Mobile
          </a>
          <a
            href="/contenuti/framework?category=database"
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            Database
          </a>
          <a
            href="/contenuti/framework?category=devops"
            className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
          >
            DevOps
          </a>
          <a
            href="/contenuti/framework?category=cloud"
            className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors"
          >
            Cloud
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <FrameworkCard key={framework.id} framework={framework} />
        ))}
      </div>

      {frameworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nessun framework trovato</p>
        </div>
      )}
    </div>
  )
}
