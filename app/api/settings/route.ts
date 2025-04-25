import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

const SETTINGS_ID = "global-settings"

// Funzione per ottenere le impostazioni predefinite
function getDefaultSettings() {
  return {
    theme: "dark",
    fontSize: 14,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    tabSize: 2,
    wordWrap: "on",
    minimap: true,
    formatOnSave: true,
    formatOnPaste: true,
    lineNumbers: "on",
    indentSize: 2,
    autoSave: "off",
    autoSaveDelay: 1000,
  }
}

export async function GET() {
  try {
    const settingsRecord = await prisma.setting.findUnique({
      where: { id: SETTINGS_ID },
    })

    if (!settingsRecord) {
      // Se non esistono impostazioni, crea quelle predefinite
      const defaultSettings = getDefaultSettings()

      await prisma.setting.create({
        data: {
          id: SETTINGS_ID,
          value: defaultSettings,
        },
      })

      return NextResponse.json(defaultSettings)
    }

    return NextResponse.json(settingsRecord.value)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(getDefaultSettings())
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  try {
    const currentSettings = await prisma.setting.findUnique({
      where: { id: SETTINGS_ID },
    })

    const updatedSettings = {
      ...(currentSettings?.value || getDefaultSettings()),
      ...body,
    }

    const result = await prisma.setting.upsert({
      where: { id: SETTINGS_ID },
      update: { value: updatedSettings },
      create: {
        id: SETTINGS_ID,
        value: updatedSettings,
      },
    })

    return NextResponse.json(result.value)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
