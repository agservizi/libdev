import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (id) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { files: true },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  }

  const projects = await prisma.project.findMany()
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 })
  }

  const newProject = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description || "",
      files: {
        create: body.files || [],
      },
    },
    include: { files: true },
  })

  return NextResponse.json(newProject, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  if (!body.id) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
  }

  try {
    const updatedProject = await prisma.project.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
      },
      include: { files: true },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
  }

  try {
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }
}
