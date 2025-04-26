import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/data/projects-data"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, description, language, level, tags, githubRepo, demoUrl } = project

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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {project.thumbnail && (
        <div className="h-48 overflow-hidden">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link href={`/project/${slug}`} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          </h3>
          <Badge className={getLevelColor(level)}>{level}</Badge>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{language}</Badge>
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-3 mb-4">
          {githubRepo && (
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
            >
              <Github className="w-4 h-4 mr-1" />
              Repository
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Demo
            </a>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t">
        <Link href={`/project/${slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Esplora il progetto →
        </Link>
      </div>
    </div>
  )
}
