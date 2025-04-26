import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PatternCardProps {
  pattern: {
    id: string
    slug: string
    title: string
    description: string
    category: "creazionale" | "strutturale" | "comportamentale" | "architetturale" | "concorrenza"
    languages: string[]
    complexity: "bassa" | "media" | "alta"
    useCases: string[]
  }
}

export function PatternCard({ pattern }: PatternCardProps) {
  // Mappa le categorie a colori
  const categoryColors = {
    creazionale: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    strutturale: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    comportamentale: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    architetturale: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    concorrenza: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  // Mappa la complessità a colori
  const complexityColors = {
    bassa: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    media: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    alta: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{pattern.title}</CardTitle>
            <CardDescription className="mt-2">{pattern.description}</CardDescription>
          </div>
          <Badge className={categoryColors[pattern.category]}>{pattern.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={complexityColors[pattern.complexity]} variant="outline">
            Complessità: {pattern.complexity}
          </Badge>
          {pattern.languages.slice(0, 3).map((language) => (
            <Badge key={language} variant="secondary" className="text-xs">
              {language}
            </Badge>
          ))}
          {pattern.languages.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{pattern.languages.length - 3}
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Casi d'uso:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {pattern.useCases.slice(0, 3).map((useCase, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{useCase}</span>
              </li>
            ))}
            {pattern.useCases.length > 3 && (
              <li className="text-xs text-muted-foreground">+{pattern.useCases.length - 3} altri...</li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/pattern/${pattern.slug}`}>
            <FileCode className="h-4 w-4 mr-2" />
            Visualizza pattern
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
