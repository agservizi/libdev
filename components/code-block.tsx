"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  title?: string
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = true, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({
        title: "Codice copiato!",
        description: "Il codice è stato copiato negli appunti.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Errore durante la copia del codice:", error)
      toast({
        title: "Errore",
        description: "Non è stato possibile copiare il codice.",
        variant: "destructive",
      })
    }
  }

  // Dividi il codice in righe per mostrare i numeri di riga
  const codeLines = code.split("\n")

  return (
    <div className="rounded-lg overflow-hidden border my-4">
      {title && (
        <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
          <div className="font-mono text-sm text-gray-600">{title}</div>
          <div className="text-xs text-gray-500">{language}</div>
        </div>
      )}

      <div className="relative">
        <pre className={`p-4 bg-gray-50 overflow-x-auto ${showLineNumbers ? "pl-12" : ""}`}>
          <code className="font-mono text-sm">
            {showLineNumbers ? (
              <table className="border-collapse">
                <tbody>
                  {codeLines.map((line, index) => (
                    <tr key={index} className="leading-relaxed">
                      <td className="text-gray-400 select-none text-right pr-4 w-8">{index + 1}</td>
                      <td className="whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="whitespace-pre-wrap">{code}</div>
            )}
          </code>
        </pre>

        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-white/90 border shadow-sm hover:bg-gray-100 transition-colors"
          aria-label="Copia codice"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
        </button>
      </div>
    </div>
  )
}
