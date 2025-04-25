"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function DatabaseErrorPage() {
  const [status, setStatus] = useState<{
    checking: boolean
    success?: boolean
    message?: string
    error?: string
  }>({ checking: true })

  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  async function checkDatabaseConnection() {
    setStatus({ checking: true })
    try {
      const response = await fetch("/api/health")
      const data = await response.json()

      setStatus({
        checking: false,
        success: data.database.success,
        message: data.database.message,
        error: data.database.error,
      })
    } catch (error) {
      setStatus({
        checking: false,
        success: false,
        message: "Errore nella verifica della connessione al database",
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-red-600">Errore di connessione al database</h1>
          <p className="text-gray-600">
            Non è stato possibile connettersi al database. Verifica la configurazione e riprova.
          </p>
        </div>

        <div className="mb-6 rounded-md bg-gray-50 p-4">
          <h2 className="mb-2 font-semibold">Stato della connessione:</h2>
          {status.checking ? (
            <p className="text-gray-600">Verifica in corso...</p>
          ) : (
            <>
              <p className={status.success ? "text-green-600" : "text-red-600"}>{status.message}</p>
              {status.error && <p className="mt-2 text-sm text-red-500">Dettaglio errore: {status.error}</p>}
            </>
          )}
        </div>

        <div className="space-y-4">
          <Button className="w-full" onClick={checkDatabaseConnection} disabled={status.checking}>
            {status.checking ? "Verifica in corso..." : "Riprova connessione"}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "/")}
            disabled={status.checking}
          >
            Torna alla home
          </Button>
        </div>
      </div>
    </div>
  )
}
