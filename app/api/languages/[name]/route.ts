import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data"

// GET - Ottieni un linguaggio specifico
export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  const name = params.name

  if (!programmingData.languages[name]) {
    return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
  }

  return NextResponse.json({
    name,
    ...programmingData.languages[name],
  })
}

// PUT - Aggiorna un linguaggio esistente
export async function PUT(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const name = params.name
    const body = await request.json()
    const { documentation, commands } = body

    if (!programmingData.languages[name]) {
      return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
    }

    // Aggiorna il linguaggio
    if (documentation) {
      programmingData.languages[name].documentation = documentation
    }

    if (commands && Array.isArray(commands)) {
      programmingData.languages[name].commands = commands
    }

    return NextResponse.json({
      message: `Linguaggio '${name}' aggiornato con successo`,
      language: {
        name,
        ...programmingData.languages[name],
      },
    })
  } catch (error) {
    console.error("Errore durante l'aggiornamento del linguaggio:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}

// DELETE - Elimina un linguaggio
export async function DELETE(request: NextRequest, { params }: { params: { name: string } }) {
  const name = params.name

  if (!programmingData.languages[name]) {
    return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
  }

  // Elimina il linguaggio
  delete programmingData.languages[name]

  return NextResponse.json({
    message: `Linguaggio '${name}' eliminato con successo`,
  })
}
