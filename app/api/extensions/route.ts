import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// Modifico il modello di dati delle estensioni per includere le dipendenze
// Aggiungo il campo "dependencies" ad alcune estensioni

// Modifica l'estensione ESLint per aggiungere dipendenze
const extensions = [
  {
    id: "ms-vscode.vscode-typescript-next",
    name: "TypeScript e JavaScript Language Features",
    description: "Supporto per i linguaggi TypeScript e JavaScript",
    version: "1.0.0",
    publisher: "Microsoft",
    isInstalled: true,
    dependencies: [],
  },
  {
    id: "esbenp.prettier-vscode",
    name: "Prettier - Formattatore di codice",
    description: "Formattatore di codice che utilizza prettier",
    version: "9.10.4",
    publisher: "Prettier",
    isInstalled: true,
    dependencies: [],
  },
  {
    id: "dbaeumer.vscode-eslint",
    name: "ESLint",
    description: "Integra ESLint JavaScript in VS Code",
    version: "2.4.0",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: ["ms-vscode.vscode-typescript-next"],
  },
  {
    id: "ms-python.python",
    name: "Python",
    description: "Supporto completo per il linguaggio Python con IntelliSense, linting, debugging e molto altro",
    version: "2023.20.0",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-dotnettools.csharp",
    name: "C#",
    description: "Supporto per C# con sintassi evidenziata, IntelliSense e debugging",
    version: "2.0.328",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "redhat.java",
    name: "Language Support for Java",
    description: "Supporto per Java con sintassi evidenziata, IntelliSense, refactoring e debugging",
    version: "1.23.0",
    publisher: "Red Hat",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "golang.go",
    name: "Go",
    description: "Supporto completo per il linguaggio Go",
    version: "0.40.0",
    publisher: "Go Team at Google",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "bmewburn.vscode-intelephense-client",
    name: "PHP Intelephense",
    description: "Client PHP Intelephense per Visual Studio Code",
    version: "1.9.5",
    publisher: "Ben Mewburn",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "bradlc.vscode-tailwindcss",
    name: "Tailwind CSS IntelliSense",
    description: "Strumenti intelligenti per Tailwind CSS in VS Code",
    version: "0.9.11",
    publisher: "Tailwind Labs",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ritwickdey.liveserver",
    name: "Live Server",
    description:
      "Avvia un server di sviluppo locale con funzionalità di ricarica automatica per pagine statiche e dinamiche",
    version: "5.7.9",
    publisher: "Ritwick Dey",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-azuretools.vscode-docker",
    name: "Docker",
    description: "Facilita la creazione, gestione e debug di applicazioni containerizzate",
    version: "1.26.0",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "github.copilot",
    name: "GitHub Copilot",
    description: "Il tuo compagno di programmazione AI",
    version: "1.105.0",
    publisher: "GitHub",
    isInstalled: true,
    dependencies: [],
  },
  {
    id: "github.vscode-pull-request-github",
    name: "GitHub Pull Requests and Issues",
    description: "Gestisci le pull request e le issues di GitHub direttamente in VS Code",
    version: "0.66.1",
    publisher: "GitHub",
    isInstalled: false,
    dependencies: ["eamodio.gitlens"],
  },
  {
    id: "eamodio.gitlens",
    name: "GitLens — Git supercharged",
    description: "Potenzia le funzionalità Git integrate in Visual Studio Code",
    version: "14.3.0",
    publisher: "GitKraken",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-vscode-remote.remote-ssh",
    name: "Remote - SSH",
    description: "Apri qualsiasi cartella su un host remoto, macchina virtuale o container",
    version: "0.102.0",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-vsliveshare.vsliveshare",
    name: "Live Share",
    description: "Collaborazione in tempo reale in VS Code",
    version: "1.0.5883",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "pkief.material-icon-theme",
    name: "Material Icon Theme",
    description: "Icone in stile Material Design per Visual Studio Code",
    version: "4.28.0",
    publisher: "Philipp Kief",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "dracula-theme.theme-dracula",
    name: "Dracula Official",
    description: "Tema scuro ufficiale Dracula per Visual Studio Code",
    version: "2.24.2",
    publisher: "Dracula Theme",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "binaryify.onedarkpro",
    name: "One Dark Pro",
    description: "Tema scuro ispirato all'interfaccia di Atom",
    version: "3.16.0",
    publisher: "binaryify",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "streetsidesoftware.code-spell-checker",
    name: "Code Spell Checker",
    description: "Correttore ortografico per il codice sorgente",
    version: "2.20.3",
    publisher: "Street Side Software",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-vscode.test-adapter-converter",
    name: "Test Explorer UI",
    description: "Interfaccia utente per eseguire i test",
    version: "2.0.3",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "formulahendry.auto-rename-tag",
    name: "Auto Rename Tag",
    description: "Rinomina automaticamente i tag HTML/XML accoppiati",
    version: "0.1.10",
    publisher: "Jun Han",
    isInstalled: false,
    dependencies: ["formulahendry.auto-close-tag"],
  },
  {
    id: "formulahendry.auto-close-tag",
    name: "Auto Close Tag",
    description: "Chiude automaticamente i tag HTML/XML",
    version: "0.5.14",
    publisher: "Jun Han",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "christian-kohler.path-intellisense",
    name: "Path Intellisense",
    description: "Completamento automatico dei percorsi dei file",
    version: "2.8.4",
    publisher: "Christian Kohler",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-playwright.playwright",
    name: "Playwright Test for VSCode",
    description: "Esegui e debugga test Playwright direttamente in VS Code",
    version: "1.0.15",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: ["ms-vscode.test-adapter-converter"],
  },
  {
    id: "mikestead.dotenv",
    name: "DotENV",
    description: "Supporto per i file .env",
    version: "1.0.1",
    publisher: "mikestead",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "ms-kubernetes-tools.vscode-kubernetes-tools",
    name: "Kubernetes",
    description: "Sviluppa, esegui il deploy e debugga applicazioni Kubernetes",
    version: "1.3.15",
    publisher: "Microsoft",
    isInstalled: false,
    dependencies: ["ms-azuretools.vscode-docker"],
  },
  {
    id: "svelte.svelte-vscode",
    name: "Svelte for VS Code",
    description: "Supporto per il linguaggio Svelte",
    version: "107.10.0",
    publisher: "Svelte",
    isInstalled: false,
    dependencies: [],
  },
  {
    id: "vue.volar",
    name: "Vue Language Features (Volar)",
    description: "Supporto per il linguaggio Vue 3",
    version: "1.8.5",
    publisher: "Vue",
    isInstalled: false,
    dependencies: [],
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const query = searchParams.get("query")

  if (id) {
    const extension = extensions.find((e) => e.id === id)
    if (!extension) {
      return NextResponse.json({ error: "Extension not found" }, { status: 404 })
    }
    return NextResponse.json(extension)
  }

  if (query) {
    const filteredExtensions = extensions.filter(
      (e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) || e.description.toLowerCase().includes(query.toLowerCase()),
    )
    return NextResponse.json(filteredExtensions)
  }

  return NextResponse.json(extensions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name || !body.publisher) {
    return NextResponse.json({ error: "Name and publisher are required" }, { status: 400 })
  }

  const newExtension = {
    id: body.id || uuidv4(),
    name: body.name,
    description: body.description || "",
    version: body.version || "1.0.0",
    publisher: body.publisher,
    isInstalled: body.isInstalled || false,
    dependencies: [],
  }

  extensions.push(newExtension)
  return NextResponse.json(newExtension, { status: 201 })
}

// Aggiorno la funzione PUT per gestire le dipendenze durante l'installazione
export async function PUT(request: NextRequest) {
  const body = await request.json()

  if (!body.id) {
    return NextResponse.json({ error: "Extension ID is required" }, { status: 400 })
  }

  const extensionIndex = extensions.findIndex((e) => e.id === body.id)
  if (extensionIndex === -1) {
    return NextResponse.json({ error: "Extension not found" }, { status: 404 })
  }

  const updatedExtension = {
    ...extensions[extensionIndex],
    ...body,
  }

  extensions[extensionIndex] = updatedExtension

  // Se stiamo installando l'estensione, verifichiamo se ci sono dipendenze da installare
  if (body.isInstalled === true) {
    const dependenciesToInstall = extensions[extensionIndex].dependencies || []
    const installedDependencies = []

    // Installiamo tutte le dipendenze
    for (const depId of dependenciesToInstall) {
      const depIndex = extensions.findIndex((e) => e.id === depId)
      if (depIndex !== -1 && !extensions[depIndex].isInstalled) {
        extensions[depIndex].isInstalled = true
        installedDependencies.push(extensions[depIndex])
      }
    }

    // Restituiamo l'estensione aggiornata e le dipendenze installate
    return NextResponse.json({
      extension: updatedExtension,
      installedDependencies: installedDependencies,
    })
  }

  // Se stiamo disinstallando, verifichiamo se ci sono estensioni che dipendono da questa
  if (body.isInstalled === false) {
    const dependentExtensions = extensions.filter(
      (e) => e.isInstalled && e.dependencies && e.dependencies.includes(body.id),
    )

    if (dependentExtensions.length > 0) {
      return NextResponse.json({
        extension: updatedExtension,
        dependentExtensions: dependentExtensions,
      })
    }
  }

  return NextResponse.json(updatedExtension)
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Extension ID is required" }, { status: 400 })
  }

  const extensionIndex = extensions.findIndex((e) => e.id === id)
  if (extensionIndex === -1) {
    return NextResponse.json({ error: "Extension not found" }, { status: 404 })
  }

  extensions.splice(extensionIndex, 1)
  return NextResponse.json({ success: true })
}
