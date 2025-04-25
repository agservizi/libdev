import { type NextRequest, NextResponse } from "next/server"
import { programmingData } from "@/data/programming-data"

// GET - Ottieni un comando specifico
export async function GET(request: NextRequest, { params }: { params: { name: string; commandName: string } }) {
  const { name, commandName } = params

  if (!programmingData.languages[name]) {
    return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
  }

  const command = programmingData.languages[name].commands.find((cmd) => cmd.name === commandName)

  if (!command) {
    return NextResponse.json(
      { error: `Comando '${commandName}' non trovato per il linguaggio '${name}'` },
      { status: 404 },
    )
  }

  return NextResponse.json({
    language: name,
    command,
  })
}

// PUT - Aggiorna un comando esistente
export async function PUT(request: NextRequest, { params }: { params: { name: string; commandName: string } }) {
  try {
    const { name, commandName } = params
    const body = await request.json()
    const { description, syntax, example } = body

    if (!programmingData.languages[name]) {
      return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
    }

    const commandIndex = programmingData.languages[name].commands.findIndex((cmd) => cmd.name === commandName)

    if (commandIndex === -1) {
      return NextResponse.json(
        { error: `Comando '${commandName}' non trovato per il linguaggio '${name}'` },
        { status: 404 },
      )
    }

    // Aggiorna il comando
    const updatedCommand = {
      ...programmingData.languages[name].commands[commandIndex],
    }

    if (description) updatedCommand.description = description
    if (syntax) updatedCommand.syntax = syntax
    if (example) updatedCommand.example = example

    programmingData.languages[name].commands[commandIndex] = updatedCommand

    return NextResponse.json({
      message: `Comando '${commandName}' aggiornato con successo`,
      command: updatedCommand,
    })
  } catch (error) {
    console.error("Errore durante l'aggiornamento del comando:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}

// DELETE - Elimina un comando
export async function DELETE(request: NextRequest, { params }: { params: { name: string; commandName: string } }) {
  const { name, commandName } = params

  if (!programmingData.languages[name]) {
    return NextResponse.json({ error: `Linguaggio '${name}' non trovato` }, { status: 404 })
  }

  const commandIndex = programmingData.languages[name].commands.findIndex((cmd) => cmd.name === commandName)

  if (commandIndex === -1) {
    return NextResponse.json(
      { error: `Comando '${commandName}' non trovato per il linguaggio '${name}'` },
      { status: 404 },
    )
  }

  // Elimina il comando
  programmingData.languages[name].commands.splice(commandIndex, 1)

  return NextResponse.json({
    message: `Comando '${commandName}' eliminato con successo dal linguaggio '${name}'`,
  })
}
