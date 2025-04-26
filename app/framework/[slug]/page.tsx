import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FrameworkPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: FrameworkPageProps): Promise<Metadata> {
  const { framework } = await getFramework(params.slug)

  if (!framework) {
    return {
      title: "Framework non trovato | LibDev",
      description: "Il framework richiesto non è stato trovato.",
    }
  }

  return {
    title: `${framework.name} | LibDev`,
    description: framework.description,
  }
}

async function getFramework(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/frameworks/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      if (res.status === 404) {
        return { framework: null }
      }
      throw new Error("Errore durante il recupero del framework")
    }

    return res.json()
  } catch (error) {
    console.error("Errore durante il recupero del framework:", error)
    return { framework: null }
  }
}

export default async function FrameworkPage({ params }: FrameworkPageProps) {
  const { framework } = await getFramework(params.slug)

  if (!framework) {
    notFound()
  }

  // Funzione per determinare il colore del badge in base alla categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "backend":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "mobile":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "database":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "devops":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "cloud":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/contenuti/framework">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai framework
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
        <div className="md:flex-1">
          <div className="flex items-center gap-4 mb-4">
            {framework.logo && (
              <img
                src={framework.logo || "/placeholder.svg"}
                alt={framework.name}
                className="w-16 h-16 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{framework.name}</h1>
              <div className="flex items-center mt-1">
                <Badge variant="outline">{framework.language}</Badge>
                <span className="mx-2">•</span>
                <Badge className={getCategoryColor(framework.category)}>{framework.category}</Badge>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6">{framework.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-1" />
              <span className="font-medium">{framework.popularity}/10</span>
            </div>

            <a
              href={framework.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Sito web
            </a>

            {framework.github && (
              <a
                href={framework.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Informazioni rapide</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-gray-500">Linguaggio</dt>
              <dd className="font-medium">{framework.language}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Categoria</dt>
              <dd className="font-medium">{framework.category}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Rilasciato</dt>
              <dd className="font-medium">{new Date(framework.createdAt).toLocaleDateString()}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Popolarità</dt>
              <dd className="font-medium">{framework.popularity}/10</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Caratteristiche principali</h2>
          <ul className="space-y-2">
            {framework.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Casi d'uso</h2>
          <ul className="space-y-2">
            {framework.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600 mt-2 mr-2"></span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Aziende che lo utilizzano</h2>
          <ul className="space-y-2">
            {framework.companies.map((company, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600 mt-2 mr-2"></span>
                <span>{company}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Alternative</h2>
          <ul className="space-y-2">
            {framework.alternatives.map((alternative, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 mt-2 mr-2"></span>
                <span>{alternative}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Documentazione ufficiale</h3>
        <p className="text-blue-700 mb-3">
          Per informazioni più dettagliate, consulta la documentazione ufficiale di {framework.name}.
        </p>
        <a
          href={framework.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Vai alla documentazione
        </a>
      </div>
    </div>
  )
}
