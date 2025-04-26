"use client"

import { useState } from "react"
import type { Challenge } from "@/data/tutorials-data"
import { CodeBlock } from "@/components/code-block"
import { CheckCircle, XCircle, Play } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CodeChallengeProps {
  challenge: Challenge
  onComplete?: (completed: boolean) => void
}

export function CodeChallenge({ challenge, onComplete }: CodeChallengeProps) {
  const [code, setCode] = useState(challenge.starterCode)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const { toast } = useToast()

  const runCode = () => {
    try {
      // Questa è una versione semplificata per eseguire il codice
      // In un'implementazione reale, dovresti usare un sandbox sicuro
      const testResults = challenge.testCases.map((testCase) => {
        try {
          // Crea una funzione dal codice dell'utente
          // eslint-disable-next-line no-new-func
          const userFunction = new Function(`
            ${code}
            return ${testCase.input};
          `)

          const output = String(userFunction())
          const expected = testCase.expectedOutput

          return {
            input: testCase.input,
            expected,
            actual: output,
            passed: output === expected,
          }
        } catch (error) {
          return {
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `Errore: ${error instanceof Error ? error.message : String(error)}`,
            passed: false,
          }
        }
      })

      const allPassed = testResults.every((test) => test.passed)

      if (allPassed) {
        setResult({
          success: true,
          message: "Tutti i test sono stati superati! Ottimo lavoro!",
        })

        if (onComplete) {
          onComplete(true)
        }

        toast({
          title: "Sfida completata!",
          description: "Hai superato tutti i test. Ottimo lavoro!",
          variant: "default",
        })
      } else {
        const failedTests = testResults.filter((test) => !test.passed)
        setResult({
          success: false,
          message: `${failedTests.length} test falliti. Controlla i risultati e riprova.`,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Errore durante l'esecuzione del codice: ${error instanceof Error ? error.message : String(error)}`,
      })

      toast({
        title: "Errore",
        description: `Si è verificato un errore durante l'esecuzione del codice: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      })
    }
  }

  const resetChallenge = () => {
    setCode(challenge.starterCode)
    setResult(null)
    setShowSolution(false)
  }

  return (
    <div className="border rounded-lg p-6 my-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
      <p className="text-gray-600 mb-4">{challenge.description}</p>

      <div className="mb-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 font-mono text-sm p-4 border rounded-md bg-gray-50"
          disabled={showSolution}
        />
      </div>

      {result && (
        <div
          className={`p-4 rounded-md mb-4 ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          <div className="flex items-center mb-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 mr-2 text-red-500" />
            )}
            <p className="font-medium">{result.message}</p>
          </div>

          {!result.success && (
            <p className="text-sm">
              Controlla la tua soluzione e riprova. Puoi anche visualizzare la soluzione se sei bloccato.
            </p>
          )}
        </div>
      )}

      {showSolution && (
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Soluzione:</h4>
          <CodeBlock code={challenge.solutionCode} />
        </div>
      )}

      <div className="flex justify-between">
        <div>
          <button
            onClick={resetChallenge}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors mr-3"
          >
            Reset
          </button>

          {!showSolution && (
            <button
              onClick={() => setShowSolution(true)}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
            >
              Mostra soluzione
            </button>
          )}
        </div>

        <button
          onClick={runCode}
          disabled={showSolution}
          className={`
            px-4 py-2 rounded-md transition-colors flex items-center
            ${
              showSolution ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          <Play className="h-4 w-4 mr-2" />
          Esegui codice
        </button>
      </div>
    </div>
  )
}
