import Link from "next/link"
import Image from "next/image"
import SearchBar from "@/components/SearchBar"
import ThemeToggle from "@/components/ThemeToggle"
import LanguageCard from "@/components/LanguageCard"
import programmingData from "@/data/commands.json"

export default function ExplorePage() {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Esplora Linguaggi di Programmazione</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmingData.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      </main>
    </div>
  )
}
