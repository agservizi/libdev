import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { project } = await getProject(params.slug)

  if (!project) {
    return {
      title: "Progetto non trovato | LibDev",
      description: "Il progetto richiesto non è stato trovato.",
    }
  }

  return {
    title: `${project.title} | LibDev`,
    description: project.description,
  }
}

async function getProject(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      if (res.status === 404) {
        return { project: null }
      }
      throw new Error("Errore durante il recupero del progetto")
    }

    return res.json()
  } catch (error) {
    console.error("Errore durante il recupero del progetto:", error)
    return { project: null }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project } = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  // Funzione per determinare il colore del badge in base al livello
  const getLevelColor = (level: string) => {
    switch (level) {
      case "principiante":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "intermedio":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "avanzato":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/contenuti/progetti">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai progetti
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        {project.thumbnail && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <img src={project.thumbnail || "/placeholder.svg"} alt={project.title} className="w-full h-auto" />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{project.language}</Badge>
          <Badge className={getLevelColor(project.level)}>{project.level}</Badge>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-4 mb-6">
          {project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              Repository GitHub
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo live
            </a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Dettagli del progetto</h2>

          {project.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-medium mb-3">{section.title}</h3>
              <div className="prose max-w-none mb-4">
                <p>{section.content}</p>
              </div>

              {section.code && <CodeBlock code={section.code} title={`Codice - ${section.title}`} />}

              {section.explanation && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                  <p className="text-blue-800">{section.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg border mb-6">
            <h3 className="text-lg font-semibold mb-4">Informazioni sul progetto</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Linguaggio</dt>
                <dd className="font-medium">{project.language}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Livello</dt>
                <dd className="font-medium">{project.level}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Autore</dt>
                <dd className="font-medium">{project.author}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Data di creazione</dt>
                <dd className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Ultimo aggiornamento</dt>
                <dd className="font-medium">{new Date(project.updatedAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border mb-6">
            <h3 className="text-lg font-semibold mb-4">Funzionalità</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border mb-6">
            <h3 className="text-lg font-semibold mb-4">Tecnologie utilizzate</h3>
            <ul className="space-y-2">
              {project.technologies.map((tech, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-600 mt-2 mr-2"></span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.prerequisites && project.prerequisites.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Prerequisiti</h3>
              <ul className="space-y-2">
                {project.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mt-2 mr-2"></span>
                    <span>{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
