/**
 * Dati mock per gli ambienti di preview
 */

export const mockProjects = [
  {
    id: "mock-project-1",
    name: "Progetto React",
    description: "Un'applicazione React di esempio",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "mock-project-2",
    name: "API Node.js",
    description: "Un'API RESTful costruita con Node.js",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "mock-project-3",
    name: "Sito Web Portfolio",
    description: "Un sito web portfolio personale",
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-05"),
  },
]

export const mockFiles = [
  {
    id: "mock-file-1",
    name: "App.js",
    path: "/src/App.js",
    content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Benvenuto nell'App</h1>
        <p>
          Modifica <code>src/App.js</code> e salva per ricaricare.
        </p>
      </header>
    </div>
  );
}

export default App;`,
    language: "javascript",
    lastModified: new Date("2023-01-10"),
    projectId: "mock-project-1",
  },
  {
    id: "mock-file-2",
    name: "index.js",
    path: "/src/index.js",
    content: `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server in ascolto sulla porta \${port}\`);
});`,
    language: "javascript",
    lastModified: new Date("2023-02-05"),
    projectId: "mock-project-2",
  },
  {
    id: "mock-file-3",
    name: "index.html",
    path: "/index.html",
    content: `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Il Mio Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Il Mio Portfolio</h1>
    <nav>
      <ul>
        <li><a href="#about">Chi Sono</a></li>
        <li><a href="#projects">Progetti</a></li>
        <li><a href="#contact">Contatti</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="about">
      <h2>Chi Sono</h2>
      <p>Sono uno sviluppatore web appassionato di tecnologia.</p>
    </section>
    <section id="projects">
      <h2>I Miei Progetti</h2>
      <div class="project-grid">
        <!-- Progetti qui -->
      </div>
    </section>
    <section id="contact">
      <h2>Contattami</h2>
      <form>
        <input type="text" placeholder="Nome">
        <input type="email" placeholder="Email">
        <textarea placeholder="Messaggio"></textarea>
        <button type="submit">Invia</button>
      </form>
    </section>
  </main>
  <footer>
    <p>&copy; 2023 Il Mio Portfolio</p>
  </footer>
</body>
</html>`,
    language: "html",
    lastModified: new Date("2023-03-03"),
    projectId: "mock-project-3",
  },
]

export const mockUsers = [
  {
    id: "mock-user-1",
    email: "utente1@esempio.com",
    name: "Utente Esempio",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export const mockLibraries = [
  {
    id: "mock-library-1",
    name: "react",
    version: "18.2.0",
    description: "Una libreria JavaScript per costruire interfacce utente",
    language: "javascript",
    url: "https://reactjs.org",
    stars: 200000,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "mock-library-2",
    name: "express",
    version: "4.18.2",
    description: "Framework web veloce, non opinionato e minimalista per Node.js",
    language: "javascript",
    url: "https://expressjs.com",
    stars: 60000,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export const mockSnippets = [
  {
    id: "mock-snippet-1",
    title: "Funzione di ordinamento array",
    description: "Una funzione per ordinare un array di numeri",
    code: `function sortArray(arr) {
  return [...arr].sort((a, b) => a - b);
}`,
    language: "javascript",
    tags: ["array", "ordinamento", "javascript"],
    userId: "mock-user-1",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
]

export const mockExtensions = [
  {
    id: "mock-extension-1",
    name: "Prettier - Code formatter",
    publisher: "Prettier",
    version: "9.12.0",
    description: "Formatta il tuo JavaScript / TypeScript / CSS usando Prettier",
    icon: "https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png",
    downloadCount: 25000000,
    rating: 4.8,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export const mockSettings = [
  {
    id: "theme",
    value: { mode: "dark", accent: "blue" },
  },
  {
    id: "editor",
    value: { fontSize: 14, fontFamily: "Fira Code", tabSize: 2 },
  },
]

// Esporta tutti i dati mock
export const mockData = {
  projects: mockProjects,
  files: mockFiles,
  users: mockUsers,
  libraries: mockLibraries,
  snippets: mockSnippets,
  extensions: mockExtensions,
  settings: mockSettings,
}
