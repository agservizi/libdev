import Link from "next/link"
import { Code } from "lucide-react"
import type { SearchResult } from "@/types/search"

interface LanguageCardProps {
  language: SearchResult
}

export default function LanguageCard({ language }: LanguageCardProps) {
  return (
    <Link href={`/explore/${language.id}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${language.colorClass}`}>
            <Code size={20} className="text-white" />
          </div>
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{language.title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{language.description}</p>
        <div className="flex flex-wrap gap-2">
          {language.categories ? (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
              {language.categories.length} categorie
            </span>
          ) : null}
          {language.commands ? (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
              {language.commands.length} comandi
            </span>
          ) : null}
          {language.examples ? (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
              {language.examples.length} esempi
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
