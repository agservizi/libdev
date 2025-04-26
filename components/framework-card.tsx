import Link from "next/link"
import { ExternalLink, Github, Star } from "lucide-react"
import type { Framework } from "@/data/frameworks-data"
import { Badge } from "@/components/ui/badge"

interface FrameworkCardProps {
  framework: Framework
}

export function FrameworkCard({ framework }: FrameworkCardProps) {
  const { slug, name, description, language, category, website, github, popularity } = framework

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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link href={`/framework/${slug}`} className="hover:text-blue-600 transition-colors">
              {name}
            </Link>
          </h3>
          <Badge className={getCategoryColor(category)}>{category}</Badge>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{language}</Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>Popolarità: {popularity}/10</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Sito web
          </a>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t">
        <Link href={`/framework/${slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Scopri di più →
        </Link>
      </div>
    </div>
  )
}
