import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/data/projects-data"

export const metadata: Metadata = {
  title: "Progetti Reali | LibDev",
  description:
    "Impara attraverso esempi di progetti reali completi, con spiegazioni dettagliate del codice e delle best practice.",
}

export default function ProjectsPage() {
  // Ottieni i progetti direttamente dal file di dati locale
  const projects = getAllProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Progetti Reali</h1>

      <p className="text-lg text-gray-700 mb-8">
        Impara attraverso esempi di progetti reali completi, con spiegazioni dettagliate del codice e delle best
        practice.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtra per livello</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/contenuti/progetti?level=principiante"
            className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
          >
            Principiante
          </a>
          <a
            href="/contenuti/progetti?level=intermedio"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Intermedio
          </a>
          <a
            href="/contenuti/progetti?level=avanzato"
            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
          >
            Avanzato
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nessun progetto trovato</p>
        </div>
      )}
    </div>
  )
}
