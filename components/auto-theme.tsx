"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function AutoTheme() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Funzione per impostare il tema in base all'ora
    const setThemeBasedOnTime = () => {
      const currentHour = new Date().getHours()
      // Modalità notte dalle 19:00 alle 8:00
      if (currentHour >= 19 || currentHour < 8) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }

    // Imposta il tema all'avvio
    setThemeBasedOnTime()

    // Imposta un intervallo per controllare l'ora ogni minuto
    const interval = setInterval(setThemeBasedOnTime, 60000)

    // Pulisci l'intervallo quando il componente viene smontato
    return () => clearInterval(interval)
  }, [setTheme])

  // Questo componente non renderizza nulla visivamente
  return null
}
