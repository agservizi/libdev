import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "@/components/SearchBar"
import ThemeToggle from "@/components/ThemeToggle"
import programmingData from "@/data/commands.json"

interface LanguagePageProps {
  params: {
    language: string
  }
}

export default function LanguagePage({ params }: LanguagePageProps) {
  const language = params.language
  const languageData = programmingData.find((item) => item.id === language)

  if (!languageData) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-10">
                <Image src="/logo.png" alt="LibDev Logo" fill priority className="object-contain" />
              </div>
            </Link>
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${languageData.colorClass}`}>
              <span className="text-white text-xl font-bold">{languageData.title.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{languageData.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{languageData.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {languageData.resources?.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{resource.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Categories Section */}
          {languageData.categories && languageData.categories.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Categorie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languageData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {category.commands.length} comando{category.commands.length !== 1 ? "i" : ""}
                    </p>
                    <div className="space-y-2">
                      {category.commands.slice(0, 3).map((command, cmdIndex) => (
                        <div key={cmdIndex} className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-sm">
                          <code className="font-mono text-gray-800 dark:text-gray-200">{command.syntax}</code>
                        </div>
                      ))}
                      {category.commands.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          E altri {category.commands.length - 3} comandi...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples Section */}
          {languageData.examples && languageData.examples.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Esempi</h2>
              <div className="space-y-4">
                {languageData.examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium">{example.title}</div>
                    <div className="p-4 bg-white dark:bg-gray-800">
                      <pre className="overflow-x-auto text-sm text-gray-800 dark:text-gray-200 font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return programmingData.map((language) => ({
    language: language.id,
  }))
}
