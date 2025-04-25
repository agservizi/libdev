import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data"

// GET - Ottieni tutti i comandi di un linguaggio
export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  const name = params.name

  if (!programmingData.languages[name]) {
    return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
  }

  return NextResponse.json({
    language: name,
    commands: programmingData.languages[name].commands,
  })
}

// POST - Aggiungi un nuovo comando a un linguaggio
export async function POST(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const name = params.name
    const body = await request.json()
    const { commandName, description, syntax, example } = body

    if (!programmingData.languages[name]) {
      return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
    }

    if (!commandName || !description || !syntax || !example) {
      return NextResponse.json(
        { error: "Dati mancanti. Richiesti: commandName, description, syntax, example" },
        { status: 400 },
      )
    }

    // Verifica se il comando esiste già
    const commandExists = programmingData.languages[name].commands.some((cmd) => cmd.name === commandName)

    if (commandExists) {
      return NextResponse.json(
        { error: `Il comando '${commandName}' esiste già per il linguaggio '${name}'` },
        { status: 409 },
      )
    }

    // Aggiungi il nuovo comando
    const newCommand = {
      name: commandName,
      description,
      syntax,
      example,
    }

    programmingData.languages[name].commands.push(newCommand)

    return NextResponse.json(
      {
        message: `Comando '${commandName}' aggiunto con successo al linguaggio '${name}'`,
        command: newCommand,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Errore durante l'aggiunta del comando:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}
