"use client"

// Modello dati per i tutorial interattivi
export interface TutorialStep {
  id: string
  title: string
  content: string
  code?: string
  explanation?: string
}

export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  starterCode: string
  solutionCode: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
}

export interface Tutorial {
  id: string
  slug: string
  title: string
  description: string
  language: string
  level: "principiante" | "intermedio" | "avanzato"
  duration: number // in minuti
  author: string
  createdAt: string
  updatedAt: string
  steps: TutorialStep[]
  quizzes: Quiz[]
  challenges: Challenge[]
  prerequisites?: string[]
  tags: string[]
}

// Dati di esempio per i tutorial
const tutorialsData: Tutorial[] = [
  {
    id: "js-basics-101",
    slug: "javascript-fondamenti",
    title: "Fondamenti di JavaScript",
    description:
      "Impara le basi di JavaScript, dalle variabili alle funzioni, in questo tutorial completo per principianti.",
    language: "JavaScript",
    level: "principiante",
    duration: 60,
    author: "Marco Rossi",
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-03-20T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione a JavaScript",
        content:
          "JavaScript è un linguaggio di programmazione che permette di creare contenuti dinamici su pagine web. È uno dei linguaggi più popolari al mondo e può essere eseguito direttamente nel browser.",
        explanation:
          "JavaScript è stato creato nel 1995 e da allora è diventato uno dei pilastri dello sviluppo web moderno.",
      },
      {
        id: "step-2",
        title: "Variabili e tipi di dati",
        content:
          "In JavaScript, puoi dichiarare variabili usando `let`, `const` o `var`. I tipi di dati principali sono stringhe, numeri, booleani, array e oggetti.",
        code: "// Dichiarazione di variabili\nlet nome = 'Mario';\nconst età = 30;\nlet isAttivo = true;\n\n// Array\nlet numeri = [1, 2, 3, 4];\n\n// Oggetto\nlet persona = {\n  nome: 'Mario',\n  cognome: 'Rossi',\n  età: 30\n};",
        explanation:
          "Le variabili dichiarate con `let` possono essere riassegnate, mentre quelle dichiarate con `const` no.",
      },
      {
        id: "step-3",
        title: "Funzioni",
        content: "Le funzioni in JavaScript sono blocchi di codice riutilizzabili che eseguono un'azione specifica.",
        code: "// Dichiarazione di funzione\nfunction saluta(nome) {\n  return `Ciao, ${nome}!`;\n}\n\n// Chiamata di funzione\nconsole.log(saluta('Mario')); // Output: Ciao, Mario!\n\n// Arrow function\nconst somma = (a, b) => a + b;\nconsole.log(somma(5, 3)); // Output: 8",
        explanation: "Le arrow function sono una sintassi più concisa introdotta in ES6 per dichiarare funzioni.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale keyword viene utilizzata per dichiarare una variabile che non può essere riassegnata?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        explanation:
          "La keyword `const` viene utilizzata per dichiarare costanti, ovvero variabili che non possono essere riassegnate dopo l'inizializzazione.",
      },
      {
        id: "quiz-2",
        question: "Quale di questi è un tipo di dato primitivo in JavaScript?",
        options: ["Array", "Object", "Function", "String"],
        correctAnswer: 3,
        explanation:
          "String è un tipo di dato primitivo in JavaScript, insieme a Number, Boolean, Null, Undefined e Symbol.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Calcolo del fattoriale",
        description: "Scrivi una funzione che calcoli il fattoriale di un numero.",
        starterCode: "function fattoriale(n) {\n  // Scrivi qui la tua soluzione\n}",
        solutionCode:
          "function fattoriale(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  return n * fattoriale(n - 1);\n}",
        testCases: [
          {
            input: "fattoriale(5)",
            expectedOutput: "120",
          },
          {
            input: "fattoriale(0)",
            expectedOutput: "1",
          },
        ],
      },
    ],
    prerequisites: ["Conoscenza base di HTML"],
    tags: ["javascript", "web", "programmazione", "fondamenti"],
  },
  {
    id: "react-hooks",
    slug: "react-hooks-guida",
    title: "Guida completa ai React Hooks",
    description:
      "Scopri come utilizzare i React Hooks per gestire lo stato e il ciclo di vita dei componenti funzionali.",
    language: "React",
    level: "intermedio",
    duration: 90,
    author: "Laura Bianchi",
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-04-15T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione ai React Hooks",
        content:
          "I React Hooks sono funzioni che permettono di utilizzare lo stato e altre funzionalità di React senza scrivere una classe.",
        explanation: "Introdotti in React 16.8, i Hooks hanno rivoluzionato il modo di scrivere componenti React.",
      },
      {
        id: "step-2",
        title: "useState Hook",
        content: "Il hook useState permette di aggiungere lo stato locale a un componente funzionale.",
        code: "import React, { useState } from 'react';\n\nfunction Contatore() {\n  const [conteggio, setConteggio] = useState(0);\n\n  return (\n    <div>\n      <p>Hai cliccato {conteggio} volte</p>\n      <button onClick={() => setConteggio(conteggio + 1)}>\n        Clicca qui\n      </button>\n    </div>\n  );\n}",
        explanation: "useState restituisce una coppia di valori: lo stato corrente e una funzione per aggiornarlo.",
      },
      {
        id: "step-3",
        title: "useEffect Hook",
        content: "Il hook useEffect permette di eseguire effetti collaterali nei componenti funzionali.",
        code: "import React, { useState, useEffect } from 'react';\n\nfunction Esempio() {\n  const [count, setCount] = useState(0);\n\n  // Simile a componentDidMount e componentDidUpdate\n  useEffect(() => {\n    // Aggiorna il titolo del documento usando l'API del browser\n    document.title = `Hai cliccato ${count} volte`;\n  });\n\n  return (\n    <div>\n      <p>Hai cliccato {count} volte</p>\n      <button onClick={() => setCount(count + 1)}>\n        Clicca qui\n      </button>\n    </div>\n  );\n}",
        explanation: "useEffect viene eseguito dopo ogni rendering, incluso il primo.",
      },
      {
        id: "step-4",
        title: "useContext Hook",
        content: "Il hook useContext permette di utilizzare il Context API di React in modo più semplice.",
        code: "import React, { useContext } from 'react';\n\n// Crea un Context\nconst ThemeContext = React.createContext('light');\n\nfunction ThemedButton() {\n  // Usa il Context\n  const theme = useContext(ThemeContext);\n  \n  return (\n    <button style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>\n      Sono stilizzato in base al tema: {theme}\n    </button>\n  );\n}",
        explanation: "useContext accetta un oggetto Context e restituisce il valore corrente del Context.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale hook viene utilizzato per eseguire effetti collaterali in un componente funzionale?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation:
          "useEffect viene utilizzato per eseguire effetti collaterali come la sottoscrizione a eventi, chiamate API, o manipolazione del DOM.",
      },
      {
        id: "quiz-2",
        question:
          "Quale hook è l'equivalente di componentDidMount, componentDidUpdate e componentWillUnmount combinati?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation:
          "useEffect può simulare il comportamento di componentDidMount, componentDidUpdate e componentWillUnmount a seconda di come viene utilizzato.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Todo List con Hooks",
        description: "Crea una semplice Todo List utilizzando useState e useEffect.",
        starterCode: "import React from 'react';\n\nfunction TodoList() {\n  // Implementa qui la tua soluzione\n}",
        solutionCode:
          "import React, { useState, useEffect } from 'react';\n\nfunction TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n\n  useEffect(() => {\n    console.log('Todos aggiornati:', todos);\n  }, [todos]);\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, input]);\n      setInput('');\n    }\n  };\n\n  return (\n    <div>\n      <h2>Todo List</h2>\n      <input\n        value={input}\n        onChange={(e) => setInput(e.target.value)}\n        placeholder=\"Aggiungi un todo\"\n      />\n      <button onClick={addTodo}>Aggiungi</button>\n      <ul>\n        {todos.map((todo, index) => (\n          <li key={index}>{todo}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
        testCases: [
          {
            input: "Aggiungere 'Comprare il latte' e verificare che appaia nella lista",
            expectedOutput: "La lista dovrebbe contenere 'Comprare il latte'",
          },
        ],
      },
    ],
    prerequisites: ["Conoscenza base di React", "JavaScript ES6"],
    tags: ["react", "hooks", "frontend", "javascript"],
  },
  {
    id: "python-data-analysis",
    slug: "python-analisi-dati",
    title: "Analisi dei dati con Python",
    description: "Impara ad analizzare e visualizzare dati utilizzando Python, Pandas e Matplotlib.",
    language: "Python",
    level: "intermedio",
    duration: 120,
    author: "Giovanni Verdi",
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-05-20T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione a Pandas",
        content:
          "Pandas è una libreria Python per l'analisi e la manipolazione dei dati. Fornisce strutture dati flessibili e potenti per lavorare con dati strutturati.",
        explanation: "Pandas è costruito sulla libreria NumPy e fornisce funzionalità simili a quelle di Excel o SQL.",
      },
      {
        id: "step-2",
        title: "Caricamento dei dati",
        content: "Pandas permette di caricare dati da vari formati come CSV, Excel, SQL e JSON.",
        code: "import pandas as pd\n\n# Carica dati da un file CSV\ndf = pd.read_csv('dati.csv')\n\n# Visualizza le prime righe\nprint(df.head())\n\n# Informazioni sul DataFrame\nprint(df.info())\n\n# Statistiche descrittive\nprint(df.describe())",
        explanation:
          "Il metodo read_csv() è uno dei tanti metodi disponibili per caricare dati in un DataFrame Pandas.",
      },
      {
        id: "step-3",
        title: "Pulizia dei dati",
        content:
          "La pulizia dei dati è un passaggio fondamentale nell'analisi dei dati. Include la gestione dei valori mancanti, la rimozione dei duplicati e la correzione dei tipi di dati.",
        code: "# Verifica valori mancanti\nprint(df.isnull().sum())\n\n# Rimuovi righe con valori mancanti\ndf_clean = df.dropna()\n\n# Oppure riempi i valori mancanti\ndf_filled = df.fillna(value={'colonna_numerica': 0, 'colonna_testo': 'N/A'})\n\n# Rimuovi duplicati\ndf_unique = df.drop_duplicates()",
        explanation:
          "La pulizia dei dati è spesso la parte più lunga del processo di analisi, ma è essenziale per ottenere risultati affidabili.",
      },
      {
        id: "step-4",
        title: "Visualizzazione dei dati con Matplotlib",
        content:
          "Matplotlib è una libreria Python per la creazione di grafici statici, interattivi e animati. È spesso utilizzata insieme a Pandas per visualizzare i dati.",
        code: "import matplotlib.pyplot as plt\n\n# Crea un grafico a barre\ndf['categoria'].value_counts().plot(kind='bar')\nplt.title('Conteggio per categoria')\nplt.xlabel('Categoria')\nplt.ylabel('Conteggio')\nplt.show()\n\n# Crea un grafico a dispersione\nplt.scatter(df['x'], df['y'])\nplt.title('Grafico a dispersione')\nplt.xlabel('X')\nplt.ylabel('Y')\nplt.show()",
        explanation:
          "Matplotlib offre molti tipi di grafici e opzioni di personalizzazione per visualizzare efficacemente i dati.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale metodo di Pandas viene utilizzato per caricare dati da un file CSV?",
        options: ["load_csv()", "read_csv()", "import_csv()", "open_csv()"],
        correctAnswer: 1,
        explanation: "Il metodo read_csv() viene utilizzato per caricare dati da un file CSV in un DataFrame Pandas.",
      },
      {
        id: "quiz-2",
        question: "Quale metodo viene utilizzato per gestire i valori mancanti in un DataFrame?",
        options: ["remove_na()", "clean()", "dropna()", "delete_null()"],
        correctAnswer: 2,
        explanation:
          "Il metodo dropna() viene utilizzato per rimuovere le righe o le colonne con valori mancanti da un DataFrame.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Analisi di un dataset",
        description:
          "Carica il dataset fornito, pulisci i dati e crea un grafico che mostri la relazione tra due variabili.",
        starterCode:
          "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Carica il dataset\n# Pulisci i dati\n# Crea un grafico",
        solutionCode:
          "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Carica il dataset\ndf = pd.read_csv('dataset.csv')\n\n# Pulisci i dati\ndf_clean = df.dropna()\n\n# Crea un grafico\nplt.figure(figsize=(10, 6))\nplt.scatter(df_clean['x'], df_clean['y'])\nplt.title('Relazione tra X e Y')\nplt.xlabel('X')\nplt.ylabel('Y')\nplt.grid(True)\nplt.show()",
        testCases: [
          {
            input: "Carica dataset.csv e crea un grafico a dispersione",
            expectedOutput: "Un grafico a dispersione che mostra la relazione tra X e Y",
          },
        ],
      },
    ],
    prerequisites: ["Conoscenza base di Python", "Nozioni di statistica"],
    tags: ["python", "data-analysis", "pandas", "matplotlib", "data-science"],
  },
  {
    id: "nodejs-api",
    slug: "nodejs-rest-api",
    title: "Creazione di REST API con Node.js",
    description: "Impara a creare API RESTful utilizzando Node.js, Express e MongoDB.",
    language: "JavaScript",
    level: "avanzato",
    duration: 150,
    author: "Luca Neri",
    createdAt: "2023-04-20T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione alle REST API",
        content:
          "Le API RESTful sono un'architettura di comunicazione basata su HTTP che permette ai client di accedere e manipolare le risorse del server utilizzando operazioni predefinite.",
        explanation:
          "REST (Representational State Transfer) è uno stile architetturale che utilizza HTTP per la comunicazione tra client e server.",
      },
      {
        id: "step-2",
        title: "Configurazione del progetto Node.js",
        content: "Configuriamo un progetto Node.js con Express per creare la nostra API.",
        code: "// Inizializza un nuovo progetto\n$ npm init -y\n\n// Installa le dipendenze\n$ npm install express mongoose dotenv\n$ npm install --save-dev nodemon\n\n// Crea il file server.js\nconst express = require('express');\nconst mongoose = require('mongoose');\nrequire('dotenv').config();\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Middleware\napp.use(express.json());\n\n// Connessione a MongoDB\nmongoose.connect(process.env.MONGODB_URI, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n})\n.then(() => console.log('Connesso a MongoDB'))\n.catch(err => console.error('Errore di connessione a MongoDB:', err));\n\n// Avvia il server\napp.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));",
        explanation:
          "Questo codice configura un'applicazione Express di base e si connette a un database MongoDB utilizzando Mongoose.",
      },
      {
        id: "step-3",
        title: "Creazione di modelli e route",
        content: "Creiamo un modello Mongoose e le route per la nostra API.",
        code: "// models/User.js\nconst mongoose = require('mongoose');\n\nconst userSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  createdAt: {\n    type: Date,\n    default: Date.now\n  }\n});\n\nmodule.exports = mongoose.model('User', userSchema);\n\n// routes/users.js\nconst express = require('express');\nconst router = express.Router();\nconst User = require('../models/User');\n\n// Get all users\nrouter.get('/', async (req, res) => {\n  try {\n    const users = await User.find();\n    res.json(users);\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n\n// Create a user\nrouter.post('/', async (req, res) => {\n  const user = new User({\n    name: req.body.name,\n    email: req.body.email,\n    password: req.body.password\n  });\n\n  try {\n    const newUser = await user.save();\n    res.status(201).json(newUser);\n  } catch (err) {\n    res.status(400).json({ message: err.message });\n  }\n});\n\nmodule.exports = router;",
        explanation:
          "Abbiamo creato un modello User con Mongoose e le route per ottenere tutti gli utenti e creare un nuovo utente.",
      },
      {
        id: "step-4",
        title: "Implementazione di middleware e autenticazione",
        content: "Aggiungiamo middleware per la gestione degli errori e l'autenticazione con JWT.",
        code: "// Installa jsonwebtoken\n$ npm install jsonwebtoken\n\n// middleware/auth.js\nconst jwt = require('jsonwebtoken');\n\nfunction auth(req, res, next) {\n  const token = req.header('x-auth-token');\n\n  // Verifica se il token esiste\n  if (!token) {\n    return res.status(401).json({ message: 'Accesso negato. Token mancante.' });\n  }\n\n  try {\n    // Verifica il token\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    res.status(400).json({ message: 'Token non valido.' });\n  }\n}\n\nmodule.exports = auth;\n\n// routes/auth.js\nconst express = require('express');\nconst router = express.Router();\nconst User = require('../models/User');\nconst jwt = require('jsonwebtoken');\n\n// Login\nrouter.post('/', async (req, res) => {\n  const { email, password } = req.body;\n\n  try {\n    // Verifica se l'utente esiste\n    const user = await User.findOne({ email });\n    if (!user) {\n      return res.status(400).json({ message: 'Credenziali non valide.' });\n    }\n\n    // Verifica la password (in un'app reale, dovresti usare bcrypt)\n    if (password !== user.password) {\n      return res.status(400).json({ message: 'Credenziali non valide.' });\n    }\n\n    // Crea e firma il token JWT\n    const token = jwt.sign(\n      { id: user._id },\n      process.env.JWT_SECRET,\n      { expiresIn: '1h' }\n    );\n\n    res.json({ token });\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n\nmodule.exports = router;",
        explanation:
          "Abbiamo implementato un middleware di autenticazione che verifica i token JWT e una route per l'autenticazione degli utenti.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale metodo HTTP viene utilizzato per creare una nuova risorsa in un'API RESTful?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 1,
        explanation:
          "Il metodo HTTP POST viene utilizzato per creare una nuova risorsa in un'API RESTful. GET è per leggere, PUT per aggiornare e DELETE per eliminare.",
      },
      {
        id: "quiz-2",
        question: "Quale libreria viene comunemente utilizzata per l'autenticazione basata su token in Node.js?",
        options: ["passport", "jsonwebtoken", "auth0", "oauth"],
        correctAnswer: 1,
        explanation:
          "jsonwebtoken (JWT) è una libreria comunemente utilizzata per l'autenticazione basata su token in Node.js. Permette di creare, firmare e verificare token JWT.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Implementazione di CRUD completo",
        description:
          "Implementa le operazioni CRUD (Create, Read, Update, Delete) complete per una risorsa a tua scelta.",
        starterCode:
          "const express = require('express');\nconst router = express.Router();\nconst Resource = require('../models/Resource');\n\n// Implementa le route CRUD qui\n\nmodule.exports = router;",
        solutionCode:
          "const express = require('express');\nconst router = express.Router();\nconst Resource = require('../models/Resource');\n\n// Get all resources\nrouter.get('/', async (req, res) => {\n  try {\n    const resources = await Resource.find();\n    res.json(resources);\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n\n// Get one resource\nrouter.get('/:id', getResource, (req, res) => {\n  res.json(res.resource);\n});\n\n// Create a resource\nrouter.post('/', async (req, res) => {\n  const resource = new Resource(req.body);\n\n  try {\n    const newResource = await resource.save();\n    res.status(201).json(newResource);\n  } catch (err) {\n    res.status(400).json({ message: err.message });\n  }\n});\n\n// Update a resource\nrouter.patch('/:id', getResource, async (req, res) => {\n  Object.keys(req.body).forEach(key => {\n    res.resource[key] = req.body[key];\n  });\n\n  try {\n    const updatedResource = await res.resource.save();\n    res.json(updatedResource);\n  } catch (err) {\n    res.status(400).json({ message: err.message });\n  }\n});\n\n// Delete a resource\nrouter.delete('/:id', getResource, async (req, res) => {\n  try {\n    await res.resource.remove();\n    res.json({ message: 'Resource deleted' });\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n\n// Middleware to get resource by ID\nasync function getResource(req, res, next) {\n  try {\n    const resource = await Resource.findById(req.params.id);\n    if (resource == null) {\n      return res.status(404).json({ message: 'Resource not found' });\n    }\n    res.resource = resource;\n    next();\n  } catch (err) {\n    return res.status(500).json({ message: err.message });\n  }\n}\n\nmodule.exports = router;",
        testCases: [
          {
            input: "Implementa le operazioni CRUD per una risorsa",
            expectedOutput: "Route GET, POST, PATCH e DELETE funzionanti",
          },
        ],
      },
    ],
    prerequisites: ["Conoscenza di JavaScript", "Nozioni di base di Node.js", "Comprensione di HTTP e REST"],
    tags: ["nodejs", "express", "mongodb", "api", "rest", "backend"],
  },
  {
    id: "flutter-app",
    slug: "flutter-app-mobile",
    title: "Sviluppo di app mobile con Flutter",
    description: "Impara a creare applicazioni mobile cross-platform con Flutter e Dart.",
    language: "Dart",
    level: "intermedio",
    duration: 180,
    author: "Sofia Ricci",
    createdAt: "2023-05-10T00:00:00Z",
    updatedAt: "2023-07-25T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione a Flutter",
        content:
          "Flutter è un framework open-source di Google per la creazione di applicazioni mobile, web e desktop da un singolo codebase. Utilizza il linguaggio di programmazione Dart.",
        explanation:
          "Flutter permette di sviluppare applicazioni con un'interfaccia utente nativa su diverse piattaforme, con prestazioni elevate e un design accattivante.",
      },
      {
        id: "step-2",
        title: "Configurazione dell'ambiente di sviluppo",
        content:
          "Prima di iniziare a sviluppare con Flutter, è necessario configurare l'ambiente di sviluppo installando Flutter SDK, un editor di codice come VS Code o Android Studio, e gli emulatori per testare le applicazioni.",
        code: "# Scarica Flutter SDK dal sito ufficiale\n# Aggiungi Flutter al PATH\n\n# Verifica l'installazione\n$ flutter doctor\n\n# Crea un nuovo progetto\n$ flutter create my_app\n\n# Entra nella directory del progetto\n$ cd my_app\n\n# Avvia l'applicazione\n$ flutter run",
        explanation:
          "Il comando 'flutter doctor' verifica che tutte le dipendenze siano installate correttamente e segnala eventuali problemi.",
      },
      {
        id: "step-3",
        title: "Widget e layout in Flutter",
        content:
          "In Flutter, tutto è un widget. I widget sono gli elementi di base per costruire l'interfaccia utente dell'applicazione.",
        code: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Flutter Demo',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      home: MyHomePage(title: 'Flutter Demo Home Page'),\n    );\n  }\n}\n\nclass MyHomePage extends StatefulWidget {\n  MyHomePage({Key? key, required this.title}) : super(key: key);\n\n  final String title;\n\n  @override\n  _MyHomePageState createState() => _MyHomePageState();\n}\n\nclass _MyHomePageState extends State<MyHomePage> {\n  int _counter = 0;\n\n  void _incrementCounter() {\n    setState(() {\n      _counter++;\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text(widget.title),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: <Widget>[\n            Text(\n              'You have pushed the button this many times:',\n            ),\n            Text(\n              '$_counter',\n              style: Theme.of(context).textTheme.headline4,\n            ),\n          ],\n        ),\n      ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: _incrementCounter,\n        tooltip: 'Increment',\n        child: Icon(Icons.add),\n      ),\n    );\n  }\n}",
        explanation:
          "Questo è un esempio di applicazione Flutter di base che mostra un contatore che si incrementa quando si preme un pulsante.",
      },
      {
        id: "step-4",
        title: "Gestione dello stato in Flutter",
        content:
          "La gestione dello stato è un aspetto fondamentale nello sviluppo di applicazioni Flutter. Ci sono diversi approcci, tra cui StatefulWidget, Provider, Bloc e Redux.",
        code: "// Esempio di gestione dello stato con Provider\n\n// Installa provider\n// pubspec.yaml\n// dependencies:\n//   provider: ^6.0.0\n\nimport 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\n\n// Modello di dati\nclass Counter with ChangeNotifier {\n  int _count = 0;\n  int get count => _count;\n\n  void increment() {\n    _count++;\n    notifyListeners();\n  }\n}\n\nvoid main() {\n  runApp(\n    ChangeNotifierProvider(\n      create: (context) => Counter(),\n      child: MyApp(),\n    ),\n  );\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Provider Example',\n      home: MyHomePage(),\n    );\n  }\n}\n\nclass MyHomePage extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Provider Example'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: <Widget>[\n            Text('You have pushed the button this many times:'),\n            // Consume the Counter\n            Consumer<Counter>(\n              builder: (context, counter, child) => Text(\n                '${counter.count}',\n                style: Theme.of(context).textTheme.headline4,\n              ),\n            ),\n          ],\n        ),\n      ),\n      floatingActionButton: FloatingActionButton(\n        // Access the Counter\n        onPressed: () => Provider.of<Counter>(context, listen: false).increment(),\n        tooltip: 'Increment',\n        child: Icon(Icons.add),\n      ),\n    );\n  }\n}",
        explanation:
          "Questo esempio mostra come utilizzare Provider per gestire lo stato dell'applicazione in modo più scalabile rispetto a StatefulWidget.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale linguaggio di programmazione viene utilizzato per sviluppare applicazioni Flutter?",
        options: ["JavaScript", "Kotlin", "Swift", "Dart"],
        correctAnswer: 3,
        explanation:
          "Flutter utilizza Dart, un linguaggio di programmazione sviluppato da Google, ottimizzato per la creazione di interfacce utente.",
      },
      {
        id: "quiz-2",
        question: "Quale dei seguenti non è un approccio per la gestione dello stato in Flutter?",
        options: ["Provider", "Bloc", "Redux", "Angular"],
        correctAnswer: 3,
        explanation:
          "Angular è un framework per lo sviluppo web, non un approccio per la gestione dello stato in Flutter. Provider, Bloc e Redux sono tutti approcci validi per la gestione dello stato in Flutter.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Creazione di un'app Todo List",
        description: "Crea un'app Todo List con Flutter che permetta di aggiungere, completare ed eliminare attività.",
        starterCode:
          "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(TodoApp());\n}\n\nclass TodoApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Todo List',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      home: TodoList(),\n    );\n  }\n}\n\nclass TodoList extends StatefulWidget {\n  @override\n  _TodoListState createState() => _TodoListState();\n}\n\nclass _TodoListState extends State<TodoList> {\n  // Implementa la tua soluzione qui\n  \n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Todo List'),\n      ),\n      body: Center(\n        child: Text('Implementa la tua Todo List qui'),\n      ),\n    );\n  }\n}",
        solutionCode:
          "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(TodoApp());\n}\n\nclass TodoApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Todo List',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      home: TodoList(),\n    );\n  }\n}\n\nclass Todo {\n  String title;\n  bool completed;\n\n  Todo({required this.title, this.completed = false});\n}\n\nclass TodoList extends StatefulWidget {\n  @override\n  _TodoListState createState() => _TodoListState();\n}\n\nclass _TodoListState extends State<TodoList> {\n  final List<Todo> _todos = [];\n  final TextEditingController _controller = TextEditingController();\n\n  void _addTodo() {\n    if (_controller.text.isNotEmpty) {\n      setState(() {\n        _todos.add(Todo(title: _controller.text));\n        _controller.clear();\n      });\n    }\n  }\n\n  void _toggleTodo(int index) {\n    setState(() {\n      _todos[index].completed = !_todos[index].completed;\n    });\n  }\n\n  void _removeTodo(int index) {\n    setState(() {\n      _todos.removeAt(index);\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Todo List'),\n      ),\n      body: Column(\n        children: [\n          Padding(\n            padding: const EdgeInsets.all(16.0),\n            child: Row(\n              children: [\n                Expanded(\n                  child: TextField(\n                    controller: _controller,\n                    decoration: InputDecoration(\n                      hintText: 'Aggiungi un'attività...',\n                    ),\n                  ),\n                ),\n                IconButton(\n                  icon: Icon(Icons.add),\n                  onPressed: _addTodo,\n                ),\n              ],\n            ),\n          ),\n          Expanded(\n            child: ListView.builder(\n              itemCount: _todos.length,\n              itemBuilder: (context, index) {\n                return ListTile(\n                  leading: Checkbox(\n                    value: _todos[index].completed,\n                    onChanged: (_) => _toggleTodo(index),\n                  ),\n                  title: Text(\n                    _todos[index].title,\n                    style: TextStyle(\n                      decoration: _todos[index].completed\n                          ? TextDecoration.lineThrough\n                          : TextDecoration.none,\n                    ),\n                  ),\n                  trailing: IconButton(\n                    icon: Icon(Icons.delete),\n                    onPressed: () => _removeTodo(index),\n                  ),\n                );\n              },\n            ),\n          ),\n        ],\n      ),\n    );\n  }\n}",
        testCases: [
          {
            input: "Crea un'app Todo List con Flutter",
            expectedOutput: "Un'app che permette di aggiungere, completare ed eliminare attività",
          },
        ],
      },
    ],
    prerequisites: ["Conoscenza base di programmazione", "Nozioni di Dart (opzionale)"],
    tags: ["flutter", "dart", "mobile", "cross-platform", "ui"],
  },
  {
    id: "sql-basics",
    slug: "sql-fondamenti",
    title: "Fondamenti di SQL",
    description: "Impara le basi del linguaggio SQL per interrogare e manipolare database relazionali.",
    language: "SQL",
    level: "principiante",
    duration: 90,
    author: "Antonio Bianchi",
    createdAt: "2023-06-05T00:00:00Z",
    updatedAt: "2023-08-10T00:00:00Z",
    steps: [
      {
        id: "step-1",
        title: "Introduzione a SQL",
        content:
          "SQL (Structured Query Language) è un linguaggio standard per l'accesso e la manipolazione di database relazionali. Permette di creare, leggere, aggiornare ed eliminare dati (operazioni CRUD).",
        explanation:
          "SQL è utilizzato da molti sistemi di gestione di database relazionali (RDBMS) come MySQL, PostgreSQL, SQLite, SQL Server e Oracle.",
      },
      {
        id: "step-2",
        title: "Creazione di tabelle",
        content:
          "Le tabelle sono gli oggetti fondamentali di un database relazionale. Contengono i dati organizzati in righe e colonne.",
        code: "-- Creazione di una tabella\nCREATE TABLE utenti (\n  id INT PRIMARY KEY,\n  nome VARCHAR(50) NOT NULL,\n  cognome VARCHAR(50) NOT NULL,\n  email VARCHAR(100) UNIQUE,\n  data_nascita DATE,\n  data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Creazione di una tabella con chiave esterna\nCREATE TABLE ordini (\n  id INT PRIMARY KEY,\n  utente_id INT,\n  prodotto VARCHAR(100) NOT NULL,\n  quantita INT DEFAULT 1,\n  data_ordine TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (utente_id) REFERENCES utenti(id)\n);",
        explanation:
          "Questo esempio mostra come creare due tabelle: 'utenti' e 'ordini'. La tabella 'ordini' ha una chiave esterna che fa riferimento alla tabella 'utenti'.",
      },
      {
        id: "step-3",
        title: "Interrogazioni di base",
        content:
          "Le interrogazioni SELECT sono utilizzate per recuperare dati da una o più tabelle. Possono essere filtrate, ordinate e raggruppate.",
        code: "-- Seleziona tutti i campi di tutti gli utenti\nSELECT * FROM utenti;\n\n-- Seleziona solo alcuni campi\nSELECT nome, cognome, email FROM utenti;\n\n-- Filtra i risultati con WHERE\nSELECT * FROM utenti WHERE data_nascita > '1990-01-01';\n\n-- Ordina i risultati\nSELECT * FROM utenti ORDER BY cognome ASC, nome ASC;\n\n-- Limita il numero di risultati\nSELECT * FROM utenti LIMIT 10;\n\n-- Conta il numero di utenti\nSELECT COUNT(*) AS numero_utenti FROM utenti;",
        explanation:
          "Questi esempi mostrano diverse varianti dell'istruzione SELECT per recuperare e filtrare i dati dalla tabella 'utenti'.",
      },
      {
        id: "step-4",
        title: "Manipolazione dei dati",
        content: "Le istruzioni INSERT, UPDATE e DELETE sono utilizzate per manipolare i dati nelle tabelle.",
        code: "-- Inserimento di dati\nINSERT INTO utenti (id, nome, cognome, email, data_nascita)\nVALUES (1, 'Mario', 'Rossi', 'mario.rossi@example.com', '1985-03-15');\n\n-- Inserimento di più righe\nINSERT INTO utenti (id, nome, cognome, email, data_nascita)\nVALUES \n  (2, 'Luigi', 'Verdi', 'luigi.verdi@example.com', '1990-07-22'),\n  (3, 'Anna', 'Bianchi', 'anna.bianchi@example.com', '1988-11-30');\n\n-- Aggiornamento di dati\nUPDATE utenti\nSET email = 'nuovo.email@example.com'\nWHERE id = 1;\n\n-- Eliminazione di dati\nDELETE FROM utenti\nWHERE id = 3;",
        explanation:
          "Questi esempi mostrano come inserire nuovi dati, aggiornare dati esistenti ed eliminare dati dalle tabelle.",
      },
      {
        id: "step-5",
        title: "Join tra tabelle",
        content:
          "I join permettono di combinare righe da due o più tabelle basandosi su una colonna correlata tra di esse.",
        code: "-- Inner join\nSELECT u.nome, u.cognome, o.prodotto, o.quantita\nFROM utenti u\nINNER JOIN ordini o ON u.id = o.utente_id;\n\n-- Left join\nSELECT u.nome, u.cognome, o.prodotto, o.quantita\nFROM utenti u\nLEFT JOIN ordini o ON u.id = o.utente_id;\n\n-- Right join\nSELECT u.nome, u.cognome, o.prodotto, o.quantita\nFROM utenti u\nRIGHT JOIN ordini o ON u.id = o.utente_id;\n\n-- Full join (non supportato da tutti i DBMS)\nSELECT u.nome, u.cognome, o.prodotto, o.quantita\nFROM utenti u\nFULL JOIN ordini o ON u.id = o.utente_id;",
        explanation:
          "Questi esempi mostrano diversi tipi di join tra le tabelle 'utenti' e 'ordini'. L'INNER JOIN restituisce solo le righe che hanno corrispondenze in entrambe le tabelle, il LEFT JOIN include tutte le righe dalla tabella di sinistra, il RIGHT JOIN include tutte le righe dalla tabella di destra, e il FULL JOIN include tutte le righe da entrambe le tabelle.",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        question: "Quale istruzione SQL viene utilizzata per recuperare dati da una tabella?",
        options: ["GET", "RETRIEVE", "SELECT", "FETCH"],
        correctAnswer: 2,
        explanation:
          "L'istruzione SELECT viene utilizzata per recuperare dati da una o più tabelle in un database relazionale.",
      },
      {
        id: "quiz-2",
        question: "Quale clausola SQL viene utilizzata per filtrare i risultati di una query?",
        options: ["FILTER", "WHERE", "HAVING", "CONDITION"],
        correctAnswer: 1,
        explanation:
          "La clausola WHERE viene utilizzata per filtrare i risultati di una query SQL in base a condizioni specificate.",
      },
    ],
    challenges: [
      {
        id: "challenge-1",
        title: "Interrogazione complessa",
        description:
          "Scrivi una query SQL che restituisca il nome, il cognome e il numero totale di ordini per ogni utente, ordinati per numero di ordini decrescente.",
        starterCode: "-- Scrivi qui la tua query",
        solutionCode:
          "SELECT u.nome, u.cognome, COUNT(o.id) AS numero_ordini\nFROM utenti u\nLEFT JOIN ordini o ON u.id = o.utente_id\nGROUP BY u.id, u.nome, u.cognome\nORDER BY numero_ordini DESC;",
        testCases: [
          {
            input: "Scrivi una query che restituisca il nome, il cognome e il numero totale di ordini per ogni utente",
            expectedOutput: "Una query che utilizza LEFT JOIN, GROUP BY e ORDER BY per ottenere il risultato richiesto",
          },
        ],
      },
    ],
    prerequisites: ["Nessun prerequisito specifico"],
    tags: ["sql", "database", "relational", "query", "crud"],
  },
]

// Funzioni di utilità per accedere ai dati
export function getAllTutorials() {
  return tutorialsData
}

export function getTutorialBySlug(slug: string) {
  return tutorialsData.find((tutorial) => tutorial.slug === slug)
}

export function getTutorialsByLanguage(language: string) {
  return tutorialsData.filter((tutorial) => tutorial.language === language)
}

export function getTutorialsByLevel(level: "principiante" | "intermedio" | "avanzato") {
  return tutorialsData.filter((tutorial) => tutorial.level === level)
}

// Funzioni CRUD
export function createTutorial(tutorial: Omit<Tutorial, "id" | "createdAt" | "updatedAt">) {
  const newTutorial: Tutorial = {
    ...tutorial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tutorialsData.push(newTutorial)
  return newTutorial
}

export function updateTutorial(slug: string, tutorialData: Partial<Tutorial>) {
  const index = tutorialsData.findIndex((tutorial) => tutorial.slug === slug)

  if (index === -1) {
    return null
  }

  const updatedTutorial = {
    ...tutorialsData[index],
    ...tutorialData,
    updatedAt: new Date().toISOString(),
  }

  tutorialsData[index] = updatedTutorial
  return updatedTutorial
}

export function deleteTutorial(slug: string) {
  const index = tutorialsData.findIndex((tutorial) => tutorial.slug === slug)

  if (index === -1) {
    return false
  }

  tutorialsData.splice(index, 1)
  return true
}
