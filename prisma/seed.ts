// Script di seeding per popolare il database con dati iniziali

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Inizializzazione del database con dati di esempio...")

  // Crea un utente di esempio
  const user = await prisma.user.upsert({
    where: { email: "admin@libdev.com" },
    update: {},
    create: {
      email: "admin@libdev.com",
      name: "Admin",
      password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // "password" hashed
    },
  })
  console.log(`Utente creato: ${user.name} (${user.email})`)

  // Crea un progetto di esempio
  const project = await prisma.project.create({
    data: {
      name: "Progetto Demo",
      description: "Un progetto di esempio per LibDev",
      users: {
        create: {
          userId: user.id,
          role: "owner",
        },
      },
    },
  })
  console.log(`Progetto creato: ${project.name}`)

  // Crea alcuni file di esempio
  const files = await Promise.all([
    prisma.file.create({
      data: {
        name: "index.html",
        path: "/",
        content: `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Progetto Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Benvenuto in LibDev!</h1>
  <p>Questo è un file di esempio.</p>
  <script src="script.js"></script>
</body>
</html>`,
        language: "html",
        projectId: project.id,
      },
    }),
    prisma.file.create({
      data: {
        name: "style.css",
        path: "/",
        content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
}`,
        language: "css",
        projectId: project.id,
      },
    }),
    prisma.file.create({
      data: {
        name: "script.js",
        path: "/",
        content: `document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento caricato!');
});`,
        language: "javascript",
        projectId: project.id,
      },
    }),
  ])
  console.log(`Creati ${files.length} file di esempio`)

  // Crea alcuni snippet di esempio
  const snippets = await Promise.all([
    prisma.snippet.create({
      data: {
        title: "Hello World in JavaScript",
        description: "Un semplice esempio di Hello World in JavaScript",
        code: `console.log('Hello, World!');`,
        language: "javascript",
        tags: ["javascript", "beginner", "example"],
        userId: user.id,
      },
    }),
    prisma.snippet.create({
      data: {
        title: "Funzione di ordinamento in Python",
        description: "Implementazione di un algoritmo di ordinamento in Python",
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Esempio di utilizzo
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`,
        language: "python",
        tags: ["python", "algorithm", "sorting"],
        userId: user.id,
      },
    }),
  ])
  console.log(`Creati ${snippets.length} snippet di esempio`)

  // Crea alcune librerie di esempio
  const libraries = await Promise.all([
    prisma.library.create({
      data: {
        name: "React",
        version: "18.2.0",
        description: "Una libreria JavaScript per costruire interfacce utente",
        language: "javascript",
        url: "https://reactjs.org",
        stars: 200000,
      },
    }),
    prisma.library.create({
      data: {
        name: "TensorFlow",
        version: "2.12.0",
        description: "Una piattaforma end-to-end open source per il machine learning",
        language: "python",
        url: "https://www.tensorflow.org",
        stars: 170000,
      },
    }),
    prisma.library.create({
      data: {
        name: "Laravel",
        version: "10.0.0",
        description: "Il framework PHP per artisti del web",
        language: "php",
        url: "https://laravel.com",
        stars: 70000,
      },
    }),
  ])
  console.log(`Create ${libraries.length} librerie di esempio`)

  // Crea alcune estensioni di esempio
  const extensions = await Promise.all([
    prisma.extension.create({
      data: {
        name: "Prettier",
        publisher: "Prettier",
        version: "9.12.0",
        description: "Formattatore di codice opinionato",
        icon: "https://prettier.io/icon.png",
        downloadCount: 15000000,
        rating: 4.8,
      },
    }),
    prisma.extension.create({
      data: {
        name: "ESLint",
        publisher: "Microsoft",
        version: "2.4.0",
        description: "Integra ESLint nell'editor",
        icon: "https://eslint.org/icon.png",
        downloadCount: 12000000,
        rating: 4.7,
      },
    }),
  ])
  console.log(`Create ${extensions.length} estensioni di esempio`)

  // Crea alcune impostazioni di esempio
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { id: "theme" },
      update: {},
      create: {
        id: "theme",
        value: { mode: "dark", accent: "blue" },
      },
    }),
    prisma.setting.upsert({
      where: { id: "editor" },
      update: {},
      create: {
        id: "editor",
        value: { fontSize: 14, tabSize: 2, wordWrap: true },
      },
    }),
  ])
  console.log(`Create ${settings.length} impostazioni di esempio`)

  console.log("Seeding completato con successo!")
}

main()
  .catch((e) => {
    console.error("Errore durante il seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
