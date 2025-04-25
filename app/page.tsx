import SearchBar from "@/components/SearchBar"
import ThemeToggle from "@/components/ThemeToggle"
import LanguageCard from "@/components/LanguageCard"
import Image from "next/image"
import Link from "next/link"
import programmingData from "@/data/commands.json"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center p-4 sm:p-24 pt-12 sm:pt-32">
        <div className="z-10 w-full max-w-3xl flex flex-col items-center justify-center">
          <div className="relative mb-8 w-64 h-16">
            <Image src="/logo.png" alt="LibDev Logo" fill priority className="object-contain" />
          </div>

          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="text-blue-600 dark:text-blue-400">Lib</span>
            <span className="text-gray-800 dark:text-gray-200">Dev</span>
          </h1>

          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/explore"
              className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Esplora Linguaggi
            </Link>
            <Link
              href="/editor"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Prova l'Editor
            </Link>
          </div>

          <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Cerca linguaggi di programmazione, comandi, sintassi ed esempi</p>
            <p className="mt-2">HTML, CSS, JavaScript, TypeScript, React, Next.js, PHP e altro</p>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Esplora Linguaggi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmingData.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      </div>
    </main>
  )
}
