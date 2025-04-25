import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isVercelPreview } from "./lib/vercel-utils"

export function middleware(request: NextRequest) {
  // Se siamo in un ambiente di preview di Vercel, non verificare il database
  if (isVercelPreview()) {
    return NextResponse.next()
  }

  // Verifica lo stato del database
  // Questo codice viene eseguito solo in ambienti non-preview
  const { pathname } = request.nextUrl

  // Ignora le richieste alle API e alle risorse statiche
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/database-error") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Verifica lo stato del database
  // Qui puoi implementare una logica per verificare lo stato del database
  // e reindirizzare a una pagina di errore se necessario

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/health|_next/static|_next/image|favicon.ico).*)"],
}
