import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">LibDev</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Una risorsa completa per linguaggi di programmazione, comandi, sintassi ed esempi.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Linguaggi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore/html"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  HTML
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/css"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  CSS
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/javascript"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  JavaScript
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/typescript"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/react"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/nextjs"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/php"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  PHP
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Link</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Esplora
                </Link>
              </li>
              <li>
                <Link
                  href="/search?q=javascript"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Cerca
                </Link>
              </li>
              <li>
                <Link
                  href="/editor"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Editor di Codice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LibDev. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
