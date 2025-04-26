import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data-server"

// GET - Ottieni le categorie di comandi per un linguaggio specifico
export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const name = params.name

    if (!programmingData.languages[name]) {
      return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
    }

    const commands = programmingData.languages[name].commands || []

    // Raggruppa i comandi per categoria
    const categories: Record<string, any[]> = {}

    commands.forEach((command) => {
      if (!command || !command.description) return

      // Utilizziamo la prima parola della descrizione come categoria
      const firstWord = command.description.split(" ")[0]

      if (!categories[firstWord]) {
        categories[firstWord] = []
      }

      categories[firstWord].push(command)
    })

    return NextResponse.json({
      language: name,
      categories,
    })
  } catch (error) {
    console.error("Errore durante il recupero delle categorie:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero delle categorie" },
      { status: 500 },
    )
  }
}

// POST - Aggiungi una nuova categoria per un linguaggio
export async function POST(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const name = params.name
    const body = await request.json()
    const { categoryName, description } = body

    if (!programmingData.languages[name]) {
      return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
    }

    if (!categoryName) {
      return NextResponse.json({ error: "Dati mancanti. Richiesto: categoryName" }, { status: 400 })
    }

    // In un sistema reale, qui salveresti la categoria nel database
    // Per questa demo, restituiamo semplicemente un successo

    return NextResponse.json(
      {
        message: `Categoria '${categoryName}' aggiunta con successo al linguaggio '${name}'`,
        category: {
          name: categoryName,
          description: description || "",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Errore durante l'aggiunta della categoria:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}
