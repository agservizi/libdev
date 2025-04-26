import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, BookOpen, Code } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { InteractiveQuiz } from "@/components/interactive-quiz"
import { CodeChallenge } from "@/components/code-challenge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TutorialPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const { tutorial } = await getTutorial(params.slug)

  if (!tutorial) {
    return {
      title: "Tutorial non trovato | LibDev",
      description: "Il tutorial richiesto non è stato trovato.",
    }
  }

  return {
    title: `${tutorial.title} | LibDev`,
    description: tutorial.description,
  }
}

async function getTutorial(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/tutorials/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      if (res.status === 404) {
        return { tutorial: null }
      }
      throw new Error("Errore durante il recupero del tutorial")
    }

    return res.json()
  } catch (error) {
    console.error("Errore durante il recupero del tutorial:", error)
    return { tutorial: null }
  }
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { tutorial } = await getTutorial(params.slug)

  if (!tutorial) {
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
          <Link href="/contenuti/tutorial">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai tutorial
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{tutorial.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{tutorial.language}</Badge>
          <Badge className={getLevelColor(tutorial.level)}>{tutorial.level}</Badge>
          {tutorial.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{tutorial.duration} min</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{tutorial.steps.length} lezioni</span>
          </div>
          <div className="flex items-center">
            <Code className="w-4 h-4 mr-1" />
            <span>{tutorial.challenges.length} sfide</span>
          </div>
        </div>
      </div>

      {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Prerequisiti</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {tutorial.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contenuto del tutorial</h2>

        {tutorial.steps.map((step, index) => (
          <div key={step.id} className="mb-8">
            <h3 className="text-xl font-medium mb-3">
              {index + 1}. {step.title}
            </h3>
            <div className="prose max-w-none mb-4">
              <p>{step.content}</p>
            </div>

            {step.code && <CodeBlock code={step.code} title={`Esempio di codice - ${step.title}`} />}

            {step.explanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-800">{step.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {tutorial.quizzes && tutorial.quizzes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quiz</h2>

          {tutorial.quizzes.map((quiz) => (
            <InteractiveQuiz key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

      {tutorial.challenges && tutorial.challenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sfide di codifica</h2>

          {tutorial.challenges.map((challenge) => (
            <CodeChallenge key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  )
}
