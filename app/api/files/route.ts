import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const path = searchParams.get("path")
  const projectId = searchParams.get("projectId")

  if (id) {
    const file = await prisma.file.findUnique({
      where: { id },
    })

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.json(file)
  }

  if (path && projectId) {
    const files = await prisma.file.findMany({
      where: {
        path: { startsWith: path },
        projectId,
      },
    })

    return NextResponse.json(files)
  }

  if (projectId) {
    const files = await prisma.file.findMany({
      where: { projectId },
    })

    return NextResponse.json(files)
  }

  // Fallback: restituisci tutti i file (non consigliato in produzione)
  const files = await prisma.file.findMany()
  return NextResponse.json(files)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name || !body.path || body.content === undefined || !body.projectId) {
    return NextResponse.json({ error: "Name, path, content, and projectId are required" }, { status: 400 })
  }

  const newFile = await prisma.file.create({
    data: {
      name: body.name,
      path: body.path,
      content: body.content,
      language: body.language || "plaintext",
      project: {
        connect: { id: body.projectId },
      },
    },
  })

  return NextResponse.json(newFile, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  if (!body.id) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 })
  }

  try {
    const updatedFile = await prisma.file.update({
      where: { id: body.id },
      data: {
        name: body.name,
        path: body.path,
        content: body.content,
        language: body.language,
        lastModified: new Date(),
      },
    })

    return NextResponse.json(updatedFile)
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 })
  }

  try {
    await prisma.file.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
