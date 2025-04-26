import Link from "next/link"
import { Clock, BookOpen, Code } from "lucide-react"
import type { Tutorial } from "@/data/tutorials-data"
import { Badge } from "@/components/ui/badge"

interface TutorialCardProps {
  tutorial: Tutorial
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const { slug, title, description, language, level, duration, steps, quizzes, challenges } = tutorial

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
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link href={`/tutorial/${slug}`} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          </h3>
          <Badge className={getLevelColor(level)}>{level}</Badge>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{language}</Badge>
          {tutorial.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{steps.length} lezioni</span>
          </div>
          <div className="flex items-center">
            <Code className="w-4 h-4 mr-1" />
            <span>{challenges.length} sfide</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t">
        <Link href={`/tutorial/${slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Inizia il tutorial →
        </Link>
      </div>
    </div>
  )
}
