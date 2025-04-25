"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Copy, Check, FileCode, Eye, EyeOff, SplitIcon as LayoutSplit, Maximize2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import * as babel from "@babel/standalone"
import * as prettier from "prettier"
import { getPrettierConfig } from "@/lib/prettier-config"
import FileExplorer from "./FileExplorer"
import DownloadCode from "./DownloadCode"
import GitHubImport from "./GitHubImport"
import LibraryManager, { type LibraryDefinition } from "./LibraryManager"
import FormatterSettings from "./FormatterSettings"
import { v4 as uuidv4 } from "uuid"

// Tipi di linguaggio supportati
export type Language =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "php"
  | "json"
  | "markdown"
  | "sql"

// Tipo per i file del progetto
export interface ProjectFile {
  id: string
  name: string
  language: Language
  content: string
  path: string
}

// Tipo per il progetto
export interface Project {
  id: string
  name: string
  description: string
  files: ProjectFile[]
  mainFile: string
  created: Date
  updated: Date
}

// Esempi di codice predefiniti per ogni linguaggio
const EXAMPLES: Record<Language, string> = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>Esempio HTML</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Benvenuto in LibDev</h1>
    <p>Questo è un esempio di codice HTML con CSS integrato.</p>
    <button onclick="alert('Hai cliccato il pulsante!')">Clicca qui</button>
  </div>
</body>
</html>`,
  css: `/* Stile per una card */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.card-content {
  color: #666;
  line-height: 1.6;
}

.card-button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.card-button:hover {
  background-color: #3a7bc8;
}`,
  javascript: `// Esempio di classe in JavaScript
class Persona {
  constructor(nome, età) {
    this.nome = nome;
    this.età = età;
  }
  
  saluta() {
    return \`Ciao, mi chiamo \${this.nome} e ho \${this.età} anni.\`;
  }
  
  compleanno() {
    this.età++;
    return \`Oggi compio \${this.età} anni!\`;
  }
}

// Creare un'istanza della classe
const persona = new Persona('Mario', 30);

// Utilizzare i metodi
console.log(persona.saluta());
console.log(persona.compleanno());

// Esempio di funzioni di array
const numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pari = numeri.filter(n => n % 2 === 0);
const quadrati = numeri.map(n => n * n);
const somma = numeri.reduce((acc, n) => acc + n, 0);

console.log('Numeri pari:', pari);
console.log('Quadrati:', quadrati);
console.log('Somma:', somma);`,
  typescript: `// Interfaccia per definire la struttura di un utente
interface Utente {
  id: number;
  nome: string;
  email: string;
  ruolo: 'admin' | 'utente' | 'ospite';
  dataRegistrazione: Date;
  attivo: boolean;
}

// Funzione che accetta un utente e restituisce una stringa
function formattaUtente(utente: Utente): string {
  const stato = utente.attivo ? 'attivo' : 'inattivo';
  const data = utente.dataRegistrazione.toLocaleDateString('it-IT');
  
  return \`\${utente.nome} (\${utente.email}) - \${utente.ruolo}, \${stato}, registrato il \${data}\`;
}

// Esempio di utilizzo
const utente: Utente = {
  id: 1,
  nome: 'Mario Rossi',
  email: 'mario.rossi@example.com',
  ruolo: 'admin',
  dataRegistrazione: new Date(2023, 0, 15),
  attivo: true
};

console.log(formattaUtente(utente));

// Esempio di classe generica
class Collezione<T> {
  private items: T[] = [];
  
  aggiungi(item: T): void {
    this.items.push(item);
  }
  
  rimuovi(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }
  
  ottieni(index: number): T | undefined {
    return this.items[index];
  }
  
  conteggio(): number {
    return this.items.length;
  }
}

const numeri = new Collezione<number>();
numeri.aggiungi(1);
numeri.aggiungi(2);
numeri.aggiungi(3);

console.log('Conteggio:', numeri.conteggio());
console.log('Elemento 1:', numeri.ottieni(1));`,
  jsx: `// Esempio di componente React in JSX
function App() {
  const [contatore, setContatore] = React.useState(0);
  const [input, setInput] = React.useState('');
  
  const incrementa = () => {
    setContatore(contatore + 1);
  };
  
  const decrementa = () => {
    setContatore(contatore - 1);
  };
  
  return (
    <div className="app">
      <h1>Esempio React</h1>
      
      <div className="contatore">
        <h2>Contatore: {contatore}</h2>
        <button onClick={decrementa}>-</button>
        <button onClick={incrementa}>+</button>
      </div>
      
      <div className="form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi qualcosa..."
        />
        <p>Hai scritto: {input}</p>
      </div>
    </div>
  );
}

// Renderizza il componente
ReactDOM.render(<App />, document.getElementById('root'));`,
  tsx: `// Esempio di componente React in TSX
import React, { useState, useEffect } from 'react';

interface Utente {
  id: number;
  nome: string;
  email: string;
}

interface PropsCard {
  utente: Utente;
  onModifica: (id: number) => void;
  onElimina: (id: number) => void;
}

const UtenteCard: React.FC<PropsCard> = ({ utente, onModifica, onElimina }) => {
  return (
    <div className="card">
      <h3>{utente.nome}</h3>
      <p>{utente.email}</p>
      <div className="actions">
        <button onClick={() => onModifica(utente.id)}>Modifica</button>
        <button onClick={() => onElimina(utente.id)}>Elimina</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [utenti, setUtenti] = useState<Utente[]>([
    { id: 1, nome: 'Mario Rossi', email: 'mario@example.com' },
    { id: 2, nome: 'Giulia Bianchi', email: 'giulia@example.com' },
  ]);
  
  const [caricamento, setCaricamento] = useState<boolean>(false);
  
  useEffect(() => {
    // Simula caricamento dati
    setCaricamento(true);
    setTimeout(() => {
      setCaricamento(false);
    }, 1000);
  }, []);
  
  const handleModifica = (id: number) => {
    alert(\`Modifica utente con ID: \${id}\`);
  };
  
  const handleElimina = (id: number) => {
    setUtenti(utenti.filter(utente => utente.id !== id));
  };
  
  if (caricamento) {
    return <div>Caricamento in corso...</div>;
  }
  
  return (
    <div className="app">
      <h1>Gestione Utenti</h1>
      <div className="utenti-lista">
        {utenti.map(utente => (
          <UtenteCard 
            key={utente.id}
            utente={utente}
            onModifica={handleModifica}
            onElimina={handleElimina}
          />
        ))}
      </div>
    </div>
  );
};

export default App;`,
  php: `<?php
// Esempio di classe in PHP
class Prodotto {
    private $id;
    private $nome;
    private $prezzo;
    private $disponibile;
    
    public function __construct($id, $nome, $prezzo, $disponibile = true) {
        $this->id = $id;
        $this->nome = $nome;
        $this->prezzo = $prezzo;
        $this->disponibile = $disponibile;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getNome() {
        return $this->nome;
    }
    
    public function getPrezzo() {
        return $this->prezzo;
    }
    
    public function isDisponibile() {
        return $this->disponibile;
    }
    
    public function setDisponibile($disponibile) {
        $this->disponibile = $disponibile;
    }
    
    public function getPrezzoFormattato() {
        return number_format($this->prezzo, 2, ',', '.') . ' €';
    }
}

// Creare alcuni prodotti
$prodotti = [
    new Prodotto(1, 'Laptop', 999.99),
    new Prodotto(2, 'Smartphone', 499.50),
    new Prodotto(3, 'Tablet', 299.99, false),
];

// Visualizzare i prodotti
echo "<h1>Elenco Prodotti</h1>";
echo "<ul>";
foreach ($prodotti as $prodotto) {
    $disponibilità = $prodotto->isDisponibile() ? 'Disponibile' : 'Non disponibile';
    echo "<li>";
    echo "<strong>" . htmlspecialchars($prodotto->getNome()) . "</strong> - ";
    echo $prodotto->getPrezzoFormattato() . " - ";
    echo $disponibilità;
    echo "</li>";
}
echo "</ul>";

// Funzione per filtrare i prodotti disponibili
function filtraProdottiDisponibili($prodotti) {
    return array_filter($prodotti, function($prodotto) {
        return $prodotto->isDisponibile();
    });
}

$prodottiDisponibili = filtraProdottiDisponibili($prodotti);
echo "<p>Prodotti disponibili: " . count($prodottiDisponibili) . "</p>";
?>`,
  json: `{
  "progetto": {
    "nome": "LibDev Editor",
    "versione": "1.0.0",
    "descrizione": "Un editor di codice avanzato per sviluppatori",
    "autore": {
      "nome": "Team LibDev",
      "email": "info@libdev.it",
      "sito": "https://libdev.it"
    },
    "linguaggi": [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "PHP"
    ],
    "funzionalità": {
      "editor": true,
      "preview": true,
      "snippets": true,
      "temi": true,
      "formattazione": true,
      "multiFile": true
    },
    "requisiti": {
      "browser": [
        "Chrome >= 80",
        "Firefox >= 75",
        "Safari >= 13",
        "Edge >= 80"
      ],
      "dispositivi": [
        "Desktop",
        "Tablet",
        "Mobile"
      ]
    },
    "licenza": "MIT"
  }
}`,
  markdown: `# LibDev Editor

## Introduzione

LibDev Editor è un editor di codice avanzato che supporta molteplici linguaggi di programmazione e offre funzionalità come:

- Syntax highlighting
- Completamento automatico
- Anteprima in tempo reale
- Snippet predefiniti
- Temi personalizzabili

## Linguaggi supportati

| Linguaggio | Anteprima | Completamento | Linting |
|------------|:---------:|:-------------:|:-------:|
| HTML       | ✅        | ✅            | ✅      |
| CSS        | ✅        | ✅            | ✅      |
| JavaScript | ✅        | ✅            | ✅      |
| TypeScript | ✅        | ✅            | ✅      |
| React      | ✅        | ✅            | ✅      |
| PHP        | ❌        | ✅            | ✅      |

## Esempio di codice

\`\`\`javascript
function saluta(nome) {
  return \`Ciao, \${nome}!\`;
}

console.log(saluta('Mondo'));
\`\`\`

## Come iniziare

1. Seleziona un linguaggio dal menu a tendina
2. Scrivi o incolla il tuo codice nell'editor
3. Clicca su "Esegui" per vedere l'anteprima
4. Utilizza gli snippet predefiniti per velocizzare lo sviluppo

> **Nota**: Per progetti più complessi, considera l'utilizzo di un ambiente di sviluppo locale.

## Risorse utili

* [Documentazione HTML](https://developer.mozilla.org/it/docs/Web/HTML)
* [Documentazione CSS](https://developer.mozilla.org/it/docs/Web/CSS)
* [Documentazione JavaScript](https://developer.mozilla.org/it/docs/Web/JavaScript)
* [Documentazione TypeScript](https://www.typescriptlang.org/docs/)
* [Documentazione React](https://it.reactjs.org/docs/getting-started.html)
* [Documentazione PHP](https://www.php.net/docs.php)`,
  sql: `-- Creazione di una tabella per gli utenti
CREATE TABLE utenti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  cognome VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  data_registrazione DATETIME DEFAULT CURRENT_TIMESTAMP,
  ultimo_accesso DATETIME,
  attivo BOOLEAN DEFAULT TRUE
);

-- Creazione di una tabella per i prodotti
CREATE TABLE prodotti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descrizione TEXT,
  prezzo DECIMAL(10, 2) NOT NULL,
  quantita INT NOT NULL DEFAULT 0,
  categoria VARCHAR(50),
  data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserimento di alcuni utenti di esempio
INSERT INTO utenti (nome, cognome, email, password) VALUES
('Mario', 'Rossi', 'mario.rossi@example.com', 'password123'),
('Giulia', 'Bianchi', 'giulia.bianchi@example.com', 'password456'),
('Luca', 'Verdi', 'luca.verdi@example.com', 'password789');

-- Inserimento di alcuni prodotti di esempio
INSERT INTO prodotti (nome, descrizione, prezzo, quantita, categoria) VALUES
('Laptop XYZ', 'Laptop potente con processore di ultima generazione', 999.99, 10, 'Elettronica'),
('Smartphone ABC', 'Smartphone con fotocamera avanzata', 499.50, 20, 'Elettronica'),
('Libro "Programmazione"', 'Guida completa alla programmazione moderna', 29.99, 50, 'Libri');

-- Query di selezione con JOIN
SELECT u.nome, u.cognome, COUNT(p.id) AS num_prodotti
FROM utenti u
LEFT JOIN ordini o ON u.id = o.utente_id
LEFT JOIN ordini_prodotti op ON o.id = op.ordine_id
LEFT JOIN prodotti p ON op.prodotto_id = p.id
GROUP BY u.id
ORDER BY num_prodotti DESC;`,
}

// Progetti predefiniti
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "default-html",
    name: "Progetto HTML",
    description: "Un semplice progetto HTML con CSS e JavaScript",
    files: [
      {
        id: "html-index",
        name: "index.html",
        language: "html",
        content: EXAMPLES.html,
        path: "/index.html",
      },
      {
        id: "html-style",
        name: "style.css",
        language: "css",
        content: `.custom-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}`,
        path: "/style.css",
      },
      {
        id: "html-script",
        name: "script.js",
        language: "javascript",
        content: `// Funzione che viene eseguita quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i pulsanti con la classe 'custom-button'
  const buttons = document.querySelectorAll('.custom-button');
  
  // Aggiunge un event listener a ciascun pulsante
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      alert('Hai cliccato il pulsante: ' + button.textContent);
    });
  });
  
  // Aggiunge un nuovo pulsante dinamicamente
  const container = document.querySelector('.container');
  const newButton = document.createElement('button');
  newButton.textContent = 'Pulsante Dinamico';
  newButton.className = 'custom-button';
  newButton.addEventListener('click', function() {
    alert('Questo pulsante è stato creato dinamicamente!');
  });
  
  container.appendChild(newButton);
});`,
        path: "/script.js",
      },
    ],
    mainFile: "html-index",
    created: new Date(),
    updated: new Date(),
  },
  {
    id: "default-react",
    name: "Applicazione React",
    description: "Un'applicazione React con componenti e stato",
    files: [
      {
        id: "react-index",
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html>
<head>
  <title>Applicazione React</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="App.jsx"></script>
</body>
</html>`,
        path: "/index.html",
      },
      {
        id: "react-app",
        name: "App.jsx",
        language: "jsx",
        content: `// Componente principale dell'applicazione
function App() {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Imparare React', completed: true },
    { id: 2, text: 'Creare un\'applicazione', completed: false },
    { id: 3, text: 'Deployare l\'applicazione', completed: false }
  ]);
  const [newTask, setNewTask] = React.useState('');

  // Aggiunge un nuovo task
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Cambia lo stato di completamento di un task
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Rimuove un task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Lista delle Attività</h1>
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Aggiungi una nuova attività..."
        />
        <button onClick={addTask}>Aggiungi</button>
      </div>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onRemove={removeTask}
      />
    </div>
  );
}

// Componente per la lista dei task
function TaskList({ tasks, onToggle, onRemove }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <li className="empty-message">Nessuna attività da mostrare</li>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onRemove={onRemove} 
          />
        ))
      )}
    </ul>
  );
}

// Componente per il singolo task
function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onRemove(task.id)}>Elimina</button>
    </li>
  );
}

// Renderizza l'applicazione
ReactDOM.render(<App />, document.getElementById('root'));`,
        path: "/App.jsx",
      },
      {
        id: "react-style",
        name: "style.css",
        language: "css",
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
  padding: 20px;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.add-task {
  display: flex;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.add-task button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.add-task button:hover {
  background-color: #2980b9;
}

.task-list {
  list-style: none;
}

.task-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-list li:last-child {
  border-bottom: none;
}

.task-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.task-list li input[type="checkbox"] {
  margin-right: 10px;
}

.task-list li span {
  flex: 1;
}

.task-list li button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-list li button:hover {
  background-color: #c0392b;
}

.empty-message {
  text-align: center;
  color: #888;
  font-style: italic;
}`,
        path: "/style.css",
      },
    ],
    mainFile: "react-index",
    created: new Date(),
    updated: new Date(),
  },
]

export default function CodeEditor() {
  // Stato per il progetto corrente
  const [projectName, setProjectName] = useState("Nuovo Progetto")
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [currentFile, setCurrentFile] = useState<ProjectFile | null>(null)

  // Stato per l'editor
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")

  // Stato per le librerie
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryDefinition[]>([])

  // Aggiungiamo uno stato per le impostazioni di formattazione
  const [formatterSettings, setFormatterSettings] = useState({})

  // Aggiungiamo uno stato per l'opzione di formattazione al salvataggio
  const [formatOnSave, setFormatOnSave] = useState(false)

  // Aggiungi uno stato per il live preview
  const [isLivePreviewEnabled, setIsLivePreviewEnabled] = useState(false)

  // Aggiungi uno stato per tenere traccia dell'ultima volta che il contenuto è stato modificato
  const [lastEditTime, setLastEditTime] = useState(0)

  // Aggiungi uno stato per la vista divisa
  const [isSplitViewEnabled, setIsSplitViewEnabled] = useState(false)

  // Aggiungi uno stato per il ridimensionamento della vista divisa
  const [splitViewRatio, setSplitViewRatio] = useState(50) // percentuale per l'editor

  // Riferimenti
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const editorRef = useRef<any>(null)
  const splitDividerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Inizializza con un file di default se non ci sono file
  useEffect(() => {
    if (files.length === 0) {
      const defaultFile: ProjectFile = {
        id: uuidv4(),
        name: "index.html",
        language: "html",
        content: EXAMPLES.html,
        path: "/index.html",
      }

      setFiles([defaultFile])
      setCurrentFile(defaultFile)
    }
  }, [files])

  // Funzione per gestire il cambio di file
  const handleFileSelect = (file: ProjectFile | null) => {
    if (file) {
      setCurrentFile(file)
    }
  }

  // Modifichiamo la funzione handleSaveFile per formattare il codice se l'opzione è attiva
  const handleSaveFile = async (file: ProjectFile) => {
    let fileToSave = file

    // Se l'opzione di formattazione al salvataggio è attiva, formatta il codice
    if (formatOnSave) {
      try {
        const baseConfig = getPrettierConfig(file.language)
        const config = { ...baseConfig, ...formatterSettings }
        const formattedCode = await prettier.format(file.content, config)
        fileToSave = { ...file, content: formattedCode }
      } catch (error) {
        console.error("Errore durante la formattazione:", error)
        // Continua con il salvataggio anche se la formattazione fallisce
      }
    }

    setFiles((prevFiles) => prevFiles.map((f) => (f.id === fileToSave.id ? fileToSave : f)))

    // Se il file corrente è quello che stiamo salvando, aggiorniamo anche quello
    if (currentFile && currentFile.id === fileToSave.id) {
      setCurrentFile(fileToSave)
    }

    toast({
      title: "File salvato",
      description: `Il file "${fileToSave.name}" è stato salvato.`,
    })
  }

  // Funzione per importare file da GitHub
  const handleImportFromGitHub = (importedFiles: ProjectFile[]) => {
    // Aggiungi i file importati al progetto
    setFiles(importedFiles)

    // Seleziona il primo file
    if (importedFiles.length > 0) {
      setCurrentFile(importedFiles[0])
    }

    toast({
      title: "Progetto importato",
      description: `Importati ${importedFiles.length} file da GitHub.`,
    })
  }

  // Funzione per eseguire il codice
  const runCode = () => {
    if (!currentFile) return

    setIsRunning(true)

    // Se non siamo in vista divisa, passa alla tab di anteprima
    if (!isSplitViewEnabled) {
      setActiveTab("preview")
    }

    try {
      // Ottieni tutti i file HTML
      const htmlFiles = files.filter((file) => file.language === "html")

      // Se non ci sono file HTML, crea un HTML di base
      if (htmlFiles.length === 0) {
        const htmlContent = generateHtmlFromCurrentFile()
        updateIframe(htmlContent)
      } else {
        // Altrimenti, usa il file HTML principale o il primo disponibile
        const mainHtmlFile = htmlFiles.find((file) => file.path === "/index.html") || htmlFiles[0]

        // Sostituisci i riferimenti ai file con il loro contenuto
        let htmlContent = mainHtmlFile.content

        // Aggiungi le librerie CSS selezionate
        const cssLibraries = selectedLibraries.filter((lib) => lib.category === "css")
        if (cssLibraries.length > 0) {
          const cssLinks = cssLibraries.map((lib) => `<link rel="stylesheet" href="${lib.cdnUrl}">`).join("\n")

          // Inserisci i link CSS prima della chiusura del tag head
          htmlContent = htmlContent.replace("</head>", `${cssLinks}\n</head>`)
        }

        // Aggiungi le librerie JavaScript selezionate
        const jsLibraries = selectedLibraries.filter((lib) => lib.category === "js")
        if (jsLibraries.length > 0) {
          const jsScripts = jsLibraries.map((lib) => `<script src="${lib.cdnUrl}"></script>`).join("\n")

          // Inserisci gli script JS prima della chiusura del tag body
          htmlContent = htmlContent.replace("</body>", `${jsScripts}\n</body>`)
        }

        // Sostituisci i riferimenti ai file CSS
        files
          .filter((file) => file.language === "css")
          .forEach((cssFile) => {
            const fileName = cssFile.name

            const cssContent = cssFile.content

            // Sostituisci i link ai file CSS con il contenuto inline
            const linkRegex = new RegExp(`<link[^>]*href=["']${fileName}["'][^>]*>`, "g")
            htmlContent = htmlContent.replace(linkRegex, `<style>\n${cssContent}\n</style>`)
          })

        // Sostituisci i riferimenti ai file JavaScript
        files
          .filter((file) => file.language === "javascript" || file.language === "jsx")
          .forEach((jsFile) => {
            const fileName = jsFile.name
            const jsContent = jsFile.content

            // Sostituisci gli script src con il contenuto inline
            const scriptRegex = new RegExp(`<script[^>]*src=["']${fileName}["'][^>]*></script>`, "g")

            // Se è JSX, compila con Babel
            if (jsFile.language === "jsx") {
              try {
                const compiledJs =
                  babel.transform(jsContent, {
                    presets: ["react"],
                  }).code || ""

                htmlContent = htmlContent.replace(scriptRegex, `<script>\n${compiledJs}\n</script>`)
              } catch (error) {
                console.error("Errore nella compilazione JSX:", error)
                htmlContent = htmlContent.replace(scriptRegex, `<script>\n// Errore nella compilazione JSX\n</script>`)
              }
            } else {
              htmlContent = htmlContent.replace(scriptRegex, `<script>\n${jsContent}\n</script>`)
            }
          })

        updateIframe(htmlContent)
      }
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Errore: ${error.message}`)
      } else {
        setOutput("Si è verificato un errore sconosciuto")
      }
    } finally {
      setIsRunning(false)
    }
  }

  // Aggiungi un effetto per aggiornare l'anteprima quando si cambia tab
  useEffect(() => {
    if ((activeTab === "preview" || isSplitViewEnabled) && currentFile) {
      try {
        const htmlContent = generateHtmlFromCurrentFile()
        updateIframe(htmlContent)
      } catch (error) {
        console.error("Errore nell'aggiornamento dell'anteprima:", error)
      }
    }
  }, [activeTab, isSplitViewEnabled])

  // Modifica la funzione handleEditorChange per aggiornare lastEditTime
  const handleEditorChange = (value: string | undefined) => {
    if (!currentFile || !value) return

    const updatedFile = { ...currentFile, content: value }
    setCurrentFile(updatedFile)

    // Aggiorna il file nella lista
    setFiles((prevFiles) => prevFiles.map((file) => (file.id === currentFile.id ? updatedFile : file)))

    // Aggiorna il timestamp dell'ultima modifica
    setLastEditTime(Date.now())
  }

  // Aggiungi un effetto per il live preview
  useEffect(() => {
    if (!isLivePreviewEnabled || !currentFile) return

    // Usa un timeout per debounce
    const debounceTimeout = setTimeout(() => {
      // Se siamo già nella tab di preview o in vista divisa, aggiorna l'anteprima
      if (activeTab === "preview" || isSplitViewEnabled) {
        try {
          const htmlContent = generateHtmlFromCurrentFile()
          updateIframe(htmlContent)
        } catch (error) {
          console.error("Errore nell'aggiornamento del live preview:", error)
        }
      }
    }, 500) // 500ms di debounce

    return () => clearTimeout(debounceTimeout)
  }, [currentFile, isLivePreviewEnabled, lastEditTime, isSplitViewEnabled])

  // Funzione per generare HTML dal file corrente
  const generateHtmlFromCurrentFile = () => {
    if (!currentFile) return ""

    switch (currentFile.language) {
      case "html":
        return currentFile.content

      case "css":
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Anteprima CSS</title>
            <style>${currentFile.content}</style>
          </head>
          <body>
            <div class="preview-container">
              <h1>Anteprima CSS</h1>
              <div class="card">
                <h2 class="card-title">Esempio Card</h2>
                <p class="card-content">Questo è un esempio di contenuto per testare il CSS.</p>
                <button class="card-button">Pulsante</button>
              </div>
            </div>
          </body>
          </html>
        `

      case "javascript":
      case "typescript":
        // Per JavaScript/TypeScript, eseguiamo in un contesto isolato e catturiamo l'output
        const originalConsoleLog = console.log
        const logs: string[] = []

        console.log = (...args) => {
          logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "))
        }

        try {
          // Per TypeScript, compiliamo in JavaScript
          let jsCode = currentFile.content

          if (currentFile.language === "typescript") {
            jsCode =
              babel.transform(currentFile.content, {
                presets: ["typescript"],
              }).code || ""
          }

          // Eseguiamo il codice in un contesto isolato
          const func = new Function(jsCode)
          func()
          setOutput(logs.join("\n"))
        } catch (error) {
          if (error instanceof Error) {
            setOutput(`Errore: ${error.message}`)
          } else {
            setOutput("Si è verificato un errore sconosciuto")
          }
        } finally {
          // Ripristiniamo console.log
          console.log = originalConsoleLog
        }

        // Restituisci un HTML che mostra l'output della console
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Output JavaScript</title>
            <style>
              body { font-family: monospace; padding: 20px; }
              pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
            </style>
          </head>
          <body>
            <h1>Output JavaScript</h1>
            <pre>${logs.join("\n")}</pre>
          </body>
          </html>
        `

      case "jsx":
      case "tsx":
        // Per JSX/TSX, compiliamo in JavaScript e poi creiamo un HTML con React
        try {
          // Utilizziamo Babel per transpilare JSX/TSX in JavaScript
          const jsCode =
            babel.transform(currentFile.content, {
              presets: [currentFile.language === "tsx" ? "typescript" : "", "react"],
            }).code || ""

          // Creiamo un HTML che include React e il codice compilato
          return `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Anteprima React</title>
              <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
                button { margin-right: 5px; padding: 5px 10px; cursor: pointer; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script>
                ${jsCode}
              </script>
            </body>
            </html>
          `
        } catch (error) {
          if (error instanceof Error) {
            setOutput(`Errore di compilazione: ${error.message}`)
          } else {
            setOutput("Si è verificato un errore sconosciuto durante la compilazione")
          }

          return `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Errore</title>
              <style>
                body { font-family: monospace; padding: 20px; }
                .error { color: red; background-color: #ffeeee; padding: 10px; border-radius: 5px; }
              </style>
            </head>
            <body>
              <h1>Errore di compilazione</h1>
              <div class="error">${error instanceof Error ? error.message : "Errore sconosciuto"}</div>
              <h2>Codice sorgente:</h2>
              <pre>${currentFile.content}</pre>
            </body>
            </html>
          `
        }

      case "php":
        // Per PHP, mostriamo un messaggio che spiega la limitazione
        setOutput(
          "Il codice PHP non può essere eseguito direttamente nel browser. " +
            "Per eseguire PHP è necessario un server web con interprete PHP. " +
            "Questo è solo un esempio di codice PHP.",
        )

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Codice PHP</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .message { background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #6c757d; }
              pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
            </style>
          </head>
          <body>
            <h1>Codice PHP</h1>
            <div class="message">
              <p>Il codice PHP non può essere eseguito direttamente nel browser.</p>
              <p>Per eseguire PHP è necessario un server web con interprete PHP.</p>
            </div>
            <h2>Codice sorgente:</h2>
            <pre>${currentFile.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </body>
          </html>
        `

      case "markdown":
        // Per Markdown, convertiamo in HTML
        const markdownHtml = convertMarkdownToHtml(currentFile.content)

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Anteprima Markdown</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; color: #333; }
              h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
              h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
              h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
              p, blockquote, ul, ol, dl, table, pre { margin-top: 0; margin-bottom: 16px; }
              blockquote { padding: 0 1em; color: #6a737d; border-left: .25em solid #dfe2e5; }
              a { color: #0366d6; text-decoration: none; }
              a:hover { text-decoration: underline; }
              code { padding: .2em .4em; margin: 0; font-size: 85%; background-color: rgba(27,31,35,.05); border-radius: 3px; font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; }
              pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 3px; }
              pre code { padding: 0; margin: 0; font-size: 100%; background-color: transparent; }
              table { border-spacing: 0; border-collapse: collapse; }
              table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
              table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }
              table tr:nth-child(2n) { background-color: #f6f8fa; }
            </style>
          </head>
          <body>
            <div class="markdown-body">
              ${markdownHtml}
            </div>
          </body>
          </html>
        `

      case "json":
        // Per JSON, mostriamo una visualizzazione formattata
        try {
          const jsonObj = JSON.parse(currentFile.content)
          const formattedJson = JSON.stringify(jsonObj, null, 2)

          return `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Anteprima JSON</title>
              <style>
                body { font-family: monospace; padding: 20px; }
                pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
                .string { color: #008000; }
                .number { color: #0000ff; }
                .boolean { color: #b22222; }
                .null { color: #808080; }
                .key { color: #a52a2a; }
              </style>
            </head>
            <body>
              <h1>Anteprima JSON</h1>
              <pre>${syntaxHighlightJson(formattedJson)}</pre>
            </body>
            </html>
          `
        } catch (error) {
          return `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Errore JSON</title>
              <style>
                body { font-family: monospace; padding: 20px; }
                .error { color: red; background-color: #ffeeee; padding: 10px; border-radius: 5px; }
              </style>
            </head>
            <body>
              <h1>Errore di parsing JSON</h1>
              <div class="error">${error instanceof Error ? error.message : "Errore sconosciuto"}</div>
              <h2>Codice sorgente:</h2>
              <pre>${currentFile.content}</pre>
            </body>
            </html>
          `
        }

      case "sql":
        // Per SQL, mostriamo solo il codice formattato
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Codice SQL</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .message { background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #6c757d; }
              pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; font-family: monospace; }
              .keyword { color: #0000ff; }
              .string { color: #a31515; }
              .number { color: #098658; }
              .comment { color: #008000; }
            </style>
          </head>
          <body>
            <h1>Codice SQL</h1>
            <div class="message">
              <p>Il codice SQL non può essere eseguito direttamente nel browser.</p>
              <p>Per eseguire SQL è necessario un database e un ambiente di esecuzione appropriato.</p>
            </div>
            <h2>Codice sorgente:</h2>
            <pre>${syntaxHighlightSql(currentFile.content)}</pre>
          </body>
          </html>
        `

      default:
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Anteprima non disponibile</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
              .message { background-color: #f8f9fa; padding: 15px; border-radius: 5px; display: inline-block; margin-top: 50px; }
            </style>
          </head>
          <body>
            <div class="message">
              <h2>Anteprima non disponibile</h2>
              <p>L'anteprima per questo tipo di file non è supportata.</p>
            </div>
          </body>
          </html>
        `
    }
  }

  // Funzione per aggiornare l'iframe
  const updateIframe = (htmlContent: string) => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(htmlContent)
        iframeDoc.close()
      }
    }
  }

  // Funzione per convertire Markdown in HTML
  const convertMarkdownToHtml = (markdown: string): string => {
    // Implementazione semplificata di conversione Markdown -> HTML
    let html = markdown
      // Escape HTML
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

      // Headers
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
      .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
      .replace(/^###### (.*$)/gm, "<h6>$1</h6>")

      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")

      // Links
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')

      // Lists
      .replace(/^\* (.*$)/gm, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")

      // Blockquotes
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")

      // Code blocks
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")

      // Horizontal rule
      .replace(/^---$/gm, "<hr>")

      // Paragraphs
      .replace(/\n\s*\n/g, "</p><p>")

    // Wrap with paragraphs
    html = "<p>" + html + "</p>"

    // Fix lists
    html = html.replace(/<\/li><p><li>/g, "<li>")

    return html
  }

  // Funzione per evidenziare la sintassi JSON
  const syntaxHighlightJson = (json: string): string => {
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "number"
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key"
          } else {
            cls = "string"
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean"
        } else if (/null/.test(match)) {
          cls = "null"
        }
        return `<span class="${cls}">${match}</span>`
      },
    )
  }

  // Funzione per evidenziare la sintassi SQL
  const syntaxHighlightSql = (sql: string): string => {
    return sql
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|CONSTRAINT|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|DEFAULT|AUTO_INCREMENT|INT|VARCHAR|TEXT|DATE|DATETIME|BOOLEAN|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|BETWEEN|IN|LIKE|IS|VALUES)/gi,
        '<span class="keyword">$1</span>',
      )
      .replace(/('.*?')/g, '<span class="string">$1</span>')
      .replace(/(\d+)/g, '<span class="number">$1</span>')
      .replace(/(--.*$)/gm, '<span class="comment">$1</span>')
  }

  // Funzione per copiare il codice negli appunti
  const copyCode = () => {
    if (!currentFile) return

    navigator.clipboard.writeText(currentFile.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)

    toast({
      title: "Codice copiato",
      description: "Il codice è stato copiato negli appunti.",
    })
  }

  // Configurazione dell'editor Monaco
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    editor.focus()

    // Configura l'editor
    monaco.editor.defineTheme("libdev-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e",
        "editor.foreground": "#d4d4d4",
        "editor.lineHighlightBackground": "#2a2a2a",
        "editor.selectionBackground": "#264f78",
        "editor.inactiveSelectionBackground": "#3a3d41",
        "editorCursor.foreground": "#d4d4d4",
      },
    })

    monaco.editor.setTheme("libdev-dark")
  }

  // Memorizza le estensioni di file per ogni linguaggio
  const fileExtensions = useMemo(
    () => ({
      html: "html",
      css: "css",
      javascript: "js",
      typescript: "ts",
      jsx: "jsx",
      tsx: "tsx",
      php: "php",
      json: "json",
      markdown: "md",
      sql: "sql",
    }),
    [],
  )

  const formatCode = async () => {
    if (!currentFile) return

    try {
      const baseConfig = getPrettierConfig(currentFile.language)
      const config = { ...baseConfig, ...formatterSettings }
      const formattedCode = await prettier.format(currentFile.content, config)

      // Aggiorniamo il file con il codice formattato
      const updatedFile = { ...currentFile, content: formattedCode }
      setCurrentFile(updatedFile)

      // Aggiorniamo il file nella lista
      setFiles((prevFiles) => prevFiles.map((file) => (file.id === currentFile.id ? updatedFile : file)))

      toast({
        title: "Codice formattato",
        description: "Il codice è stato formattato con Prettier.",
      })
    } catch (error) {
      console.error("Errore durante la formattazione:", error)
      toast({
        title: "Errore di formattazione",
        description: "Si è verificato un errore durante la formattazione del codice.",
        variant: "destructive",
      })
    }
  }

  // Aggiungiamo un gestore per le scorciatoie da tastiera
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+F o Cmd+Shift+F per formattare il codice
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault()
        formatCode()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentFile])

  // Gestione del ridimensionamento della vista divisa
  useEffect(() => {
    if (!isSplitViewEnabled || !splitDividerRef.current || !containerRef.current) return

    const divider = splitDividerRef.current
    const container = containerRef.current
    let isDragging = false

    const startDrag = (e: MouseEvent) => {
      isDragging = true
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    const doDrag = (e: MouseEvent) => {
      if (!isDragging) return

      const containerRect = container.getBoundingClientRect()
      const newRatio = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Limita il ridimensionamento tra 20% e 80%
      const clampedRatio = Math.min(Math.max(newRatio, 20), 80)
      setSplitViewRatio(clampedRatio)
    }

    const stopDrag = () => {
      isDragging = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    divider.addEventListener("mousedown", startDrag)
    document.addEventListener("mousemove", doDrag)
    document.addEventListener("mouseup", stopDrag)

    return () => {
      divider.removeEventListener("mousedown", startDrag)
      document.removeEventListener("mousemove", doDrag)
      document.removeEventListener("mouseup", stopDrag)
    }
  }, [isSplitViewEnabled])

  return (
    <div className="flex flex-col h-screen">
      {/* Barra superiore */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">{projectName}</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <LibraryManager selectedLibraries={selectedLibraries} onLibrariesChange={setSelectedLibraries} />
          <GitHubImport onImport={handleImportFromGitHub} />
          <DownloadCode files={files} projectName={projectName} />
          <FormatterSettings
            onSettingsChange={setFormatterSettings}
            formatOnSave={formatOnSave}
            onFormatOnSaveChange={setFormatOnSave}
          />
          <Button variant="outline" size="sm" className="gap-1" onClick={formatCode} title="Formatta codice">
            <FileCode size={16} />
            <span>Formatta</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setIsLivePreviewEnabled(!isLivePreviewEnabled)}
            title={isLivePreviewEnabled ? "Disattiva anteprima in tempo reale" : "Attiva anteprima in tempo reale"}
          >
            {isLivePreviewEnabled ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{isLivePreviewEnabled ? "Live Off" : "Live On"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setIsSplitViewEnabled(!isSplitViewEnabled)}
            title={isSplitViewEnabled ? "Vista normale" : "Vista divisa"}
          >
            {isSplitViewEnabled ? <Maximize2 size={16} /> : <LayoutSplit size={16} />}
            <span>{isSplitViewEnabled ? "Unisci" : "Dividi"}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={copyCode}>
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            <span>{isCopied ? "Copiato" : "Copia"}</span>
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning} className="gap-1">
            <Play size={16} />
            <span>Esegui</span>
          </Button>
        </div>
      </div>

      {/* Area principale */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <FileExplorer onFileSelect={handleFileSelect} currentFile={currentFile} onSaveFile={handleSaveFile} />

        {/* Editor e Preview */}
        {isSplitViewEnabled ? (
          // Vista divisa
          <div ref={containerRef} className="flex-1 flex overflow-hidden">
            {/* Editor */}
            <div
              style={{ width: `${splitViewRatio}%` }}
              className="h-full border-r border-gray-200 dark:border-gray-700"
            >
              {currentFile ? (
                <Editor
                  height="100%"
                  language={
                    currentFile.language === "jsx"
                      ? "javascript"
                      : currentFile.language === "tsx"
                        ? "typescript"
                        : currentFile.language
                  }
                  value={currentFile.content}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    lineNumbers: "on",
                    folding: true,
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                  theme="vs-dark"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Seleziona un file per iniziare a modificarlo
                </div>
              )}
            </div>

            {/* Divisore ridimensionabile */}
            <div
              ref={splitDividerRef}
              className="w-1 bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 cursor-col-resize"
              title="Trascina per ridimensionare"
            ></div>

            {/* Anteprima */}
            <div style={{ width: `${100 - splitViewRatio}%` }} className="h-full bg-white">
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin"
              />
              {currentFile?.language === "php" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
                  <div className="max-w-md p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Anteprima PHP non disponibile
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Il codice PHP richiede un server per essere eseguito. Questa è solo una visualizzazione del
                      codice. Per eseguire PHP, è necessario un ambiente server come XAMPP, WAMP o un server web con PHP
                      installato.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Vista normale con tabs
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
              <TabsList className="px-4 pt-2 bg-gray-50 dark:bg-gray-900">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Anteprima</TabsTrigger>
                {(currentFile?.language === "javascript" || currentFile?.language === "typescript") && (
                  <TabsTrigger value="console">Console</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="editor" className="p-0 m-0 flex-1 overflow-hidden">
                {currentFile ? (
                  <div className="h-full border-t border-gray-200 dark:border-gray-700">
                    <Editor
                      height="100%"
                      language={
                        currentFile.language === "jsx"
                          ? "javascript"
                          : currentFile.language === "tsx"
                            ? "typescript"
                            : currentFile.language
                      }
                      value={currentFile.content}
                      onChange={handleEditorChange}
                      onMount={handleEditorDidMount}
                      options={{
                        minimap: { enabled: true },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: "on",
                        lineNumbers: "on",
                        folding: true,
                        formatOnPaste: true,
                        formatOnType: true,
                      }}
                      theme="vs-dark"
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Seleziona un file per iniziare a modificarlo
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview" className="p-0 m-0 flex-1 overflow-hidden">
                <div className="h-full border-t border-gray-200 dark:border-gray-700 bg-white">
                  <iframe
                    ref={iframeRef}
                    title="preview"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {currentFile?.language === "php" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
                      <div className="max-w-md p-6 text-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Anteprima PHP non disponibile
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Il codice PHP richiede un server per essere eseguito. Questa è solo una visualizzazione del
                          codice. Per eseguire PHP, è necessario un ambiente server come XAMPP, WAMP o un server web con
                          PHP installato.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {(currentFile?.language === "javascript" || currentFile?.language === "typescript") && (
                <TabsContent value="console" className="p-0 m-0 flex-1 overflow-hidden">
                  <div className="h-full border-t border-gray-200 dark:border-gray-700 bg-gray-900 text-white p-4 font-mono text-sm overflow-auto">
                    {output ? (
                      <pre>{output}</pre>
                    ) : (
                      <div className="text-gray-500">Clicca su "Esegui" per vedere l'output della console.</div>
                    )}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
