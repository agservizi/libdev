"use client"

import { useState } from "react"
import type { Quiz } from "@/data/tutorials-data"
import { CheckCircle, XCircle } from "lucide-react"

interface InteractiveQuizProps {
  quiz: Quiz
  onComplete?: (correct: boolean) => void
}

export function InteractiveQuiz({ quiz, onComplete }: InteractiveQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const isCorrect = selectedOption === quiz.correctAnswer

  const handleSubmit = () => {
    if (selectedOption === null) return

    setSubmitted(true)
    if (onComplete) {
      onComplete(isCorrect)
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setSubmitted(false)
  }

  return (
    <div className="border rounded-lg p-6 my-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>

      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <div
            key={index}
            className={`
              p-3 border rounded-md cursor-pointer transition-colors
              ${selectedOption === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}
              ${submitted && index === quiz.correctAnswer ? "border-green-500 bg-green-50" : ""}
              ${submitted && selectedOption === index && selectedOption !== quiz.correctAnswer ? "border-red-500 bg-red-50" : ""}
              ${submitted ? "cursor-default" : ""}
            `}
            onClick={() => !submitted && setSelectedOption(index)}
          >
            <div className="flex items-center">
              <div className="mr-2 w-5">
                {submitted && index === quiz.correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}
                {submitted && selectedOption === index && selectedOption !== quiz.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>

      {submitted && (
        <div className={`p-4 rounded-md mb-4 ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          <p className="font-medium mb-1">{isCorrect ? "Risposta corretta!" : "Risposta errata"}</p>
          <p>{quiz.explanation}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {submitted ? (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
          >
            Riprova
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`
              px-4 py-2 rounded-md transition-colors
              ${
                selectedOption === null
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            Verifica
          </button>
        )}
      </div>
    </div>
  )
}
