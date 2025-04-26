"use client"

// Modello dati per i progetti
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  language: string
  level: "principiante" | "intermedio" | "avanzato"
  tags: string[]
  githubRepo?: string
  demoUrl?: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
  author: string
  features: string[]
  technologies: string[]
  prerequisites?: string[]
  sections: {
    title: string
    content: string
    code?: string
    explanation?: string
  }[]
}

// Modello dati per i design pattern
export interface DesignPattern {
  id: string
  slug: string
  title: string
  description: string
  category: "creazionale" | "strutturale" | "comportamentale" | "architetturale" | "concorrenza"
  languages: string[]
  complexity: "bassa" | "media" | "alta"
  useCases: string[]
}

// Dati di esempio per i progetti
const projectsData: Project[] = [
  {
    id: "blog-react",
    slug: "blog-react",
    title: "Blog con React e Markdown",
    description: "Un semplice blog creato con React che utilizza file Markdown per i contenuti.",
    language: "JavaScript",
    level: "intermedio",
    tags: ["react", "markdown", "frontend"],
    githubRepo: "https://github.com/example/blog-react",
    demoUrl: "https://example.com/blog-react",
    thumbnail: "/images/projects/blog-react.png",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-08-15T00:00:00Z",
    author: "Marco Rossi",
    features: ["Lettura di articoli Markdown", "Paginazione", "Ricerca"],
    technologies: ["React", "Markdown", "CSS"],
    prerequisites: ["Conoscenza base di React", "JavaScript ES6"],
    sections: [
      {
        title: "Introduzione",
        content: "Questo progetto mostra come creare un blog utilizzando React e file Markdown.",
      },
      {
        title: "Componenti principali",
        content: "I componenti principali sono ArticleList, ArticleDetail e MarkdownRenderer.",
        code: "// Esempio di componente ArticleList\nfunction ArticleList() {\n  return <div>Lista articoli</div>;\n}",
      },
    ],
  },
  {
    id: "ecommerce-nextjs",
    slug: "ecommerce-nextjs",
    title: "E-commerce con Next.js",
    description: "Un e-commerce completo creato con Next.js, Stripe e Tailwind CSS.",
    language: "JavaScript",
    level: "avanzato",
    tags: ["nextjs", "ecommerce", "stripe", "tailwindcss"],
    githubRepo: "https://github.com/example/ecommerce-nextjs",
    demoUrl: "https://example.com/ecommerce-nextjs",
    thumbnail: "/images/projects/ecommerce-nextjs.png",
    createdAt: "2023-07-01T00:00:00Z",
    updatedAt: "2023-09-20T00:00:00Z",
    author: "Laura Bianchi",
    features: ["Carrello", "Checkout con Stripe", "Gestione prodotti", "Autenticazione"],
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    prerequisites: ["Conoscenza avanzata di React", "Next.js", "API"],
    sections: [
      {
        title: "Introduzione",
        content: "Questo progetto mostra come creare un e-commerce completo utilizzando Next.js.",
      },
      {
        title: "Integrazione con Stripe",
        content: "L'integrazione con Stripe permette di gestire i pagamenti in modo sicuro.",
        code: "// Esempio di integrazione con Stripe\nstripe.charges.create({\n  amount: 1000,\n  currency: 'eur',\n  source: 'tok_visa',\n});",
      },
    ],
  },
  {
    id: "task-manager-flask",
    slug: "task-manager-flask",
    title: "Task Manager con Flask",
    description: "Un'applicazione web per la gestione delle attività creata con Flask e SQLAlchemy.",
    language: "Python",
    level: "intermedio",
    tags: ["flask", "sqlalchemy", "backend", "web"],
    githubRepo: "https://github.com/example/task-manager-flask",
    demoUrl: "https://example.com/task-manager-flask",
    thumbnail: "/images/projects/task-manager-flask.png",
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2023-07-20T00:00:00Z",
    author: "Giovanni Verdi",
    features: ["Creazione e gestione attività", "Autenticazione utenti", "Categorizzazione", "Filtri e ricerca"],
    technologies: ["Flask", "SQLAlchemy", "SQLite", "Bootstrap"],
    prerequisites: ["Conoscenza base di Python", "HTML e CSS"],
    sections: [
      {
        title: "Introduzione",
        content:
          "Questo progetto mostra come creare un'applicazione web per la gestione delle attività utilizzando Flask.",
      },
      {
        title: "Modelli di dati",
        content: "I modelli principali sono User e Task, definiti utilizzando SQLAlchemy.",
        code: "from flask_sqlalchemy import SQLAlchemy\nfrom werkzeug.security import generate_password_hash, check_password_hash\n\ndb = SQLAlchemy()\n\nclass User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    email = db.Column(db.String(120), unique=True, nullable=False)\n    password_hash = db.Column(db.String(128))\n    tasks = db.relationship('Task', backref='user', lazy=True)\n    \n    def set_password(self, password):\n        self.password_hash = generate_password_hash(password)\n        \n    def check_password(self, password):\n        return check_password_hash(self.password_hash, password)\n\nclass Task(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    title = db.Column(db.String(100), nullable=False)\n    description = db.Column(db.Text)\n    done = db.Column(db.Boolean, default=False)\n    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)",
        explanation:
          "Questi modelli definiscono la struttura del database dell'applicazione. User rappresenta un utente registrato, mentre Task rappresenta un'attività associata a un utente.",
      },
      {
        title: "Route e viste",
        content: "Le route principali sono per la gestione degli utenti e delle attività.",
        code: "from flask import Blueprint, render_template, redirect, url_for, flash, request\nfrom flask_login import login_required, current_user\nfrom .models import Task, db\n\ntasks = Blueprint('tasks', __name__)\n\n@tasks.route('/tasks')\n@login_required\ndef index():\n    tasks = Task.query.filter_by(user_id=current_user.id).all()\n    return render_template('tasks/index.html', tasks=tasks)\n\n@tasks.route('/tasks/new', methods=['GET', 'POST'])\n@login_required\ndef new():\n    if request.method == 'POST':\n        title = request.form['title']\n        description = request.form['description']\n        task = Task(title=title, description=description, user_id=current_user.id)\n        db.session.add(task)\n        db.session.commit()\n        flash('Task created successfully!')\n        return redirect(url_for('tasks.index'))\n    return render_template('tasks/new.html')",
        explanation:
          "Queste route gestiscono la visualizzazione e la creazione delle attività. Sono protette dall'autenticazione, quindi solo gli utenti registrati possono accedervi.",
      },
    ],
  },
  {
    id: "weather-app-react",
    slug: "weather-app-react",
    title: "App Meteo con React",
    description: "Un'applicazione meteo che utilizza l'API OpenWeatherMap per mostrare le previsioni del tempo.",
    language: "JavaScript",
    level: "principiante",
    tags: ["react", "api", "frontend"],
    githubRepo: "https://github.com/example/weather-app-react",
    demoUrl: "https://example.com/weather-app-react",
    thumbnail: "/images/projects/weather-app-react.png",
    createdAt: "2023-04-10T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    author: "Sofia Ricci",
    features: ["Previsioni meteo attuali", "Previsioni a 5 giorni", "Ricerca per città", "Geolocalizzazione"],
    technologies: ["React", "OpenWeatherMap API", "Axios", "CSS"],
    prerequisites: ["Conoscenza base di React", "JavaScript ES6"],
    sections: [
      {
        title: "Introduzione",
        content: "Questo progetto mostra come creare un'applicazione meteo utilizzando React e l'API OpenWeatherMap.",
      },
      {
        title: "Configurazione dell'API",
        content: "Per utilizzare l'API OpenWeatherMap, è necessario registrarsi e ottenere una chiave API.",
        code: "// Configurazione di Axios per le chiamate API\nimport axios from 'axios';\n\nconst API_KEY = 'your_api_key';\nconst BASE_URL = 'https://api.openweathermap.org/data/2.5';\n\nexport const getWeather = async (city) => {\n  try {\n    const response = await axios.get(`${BASE_URL}/weather`, {\n      params: {\n        q: city,\n        appid: API_KEY,\n        units: 'metric'\n      }\n    });\n    return response.data;\n  } catch (error) {\n    console.error('Error fetching weather data:', error);\n    throw error;\n  }\n};",
        explanation:
          "Questa funzione utilizza Axios per effettuare una chiamata all'API OpenWeatherMap e ottenere i dati meteo per una città specifica.",
      },
      {
        title: "Componente principale",
        content: "Il componente principale dell'applicazione gestisce lo stato e le chiamate API.",
        code: "import React, { useState, useEffect } from 'react';\nimport { getWeather } from './api';\nimport WeatherDisplay from './WeatherDisplay';\nimport SearchBar from './SearchBar';\n\nfunction App() {\n  const [weather, setWeather] = useState(null);\n  const [city, setCity] = useState('Rome');\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchWeather = async () => {\n      try {\n        setLoading(true);\n        const data = await getWeather(city);\n        setWeather(data);\n        setError(null);\n      } catch (err) {\n        setError('Failed to fetch weather data');\n        setWeather(null);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchWeather();\n  }, [city]);\n\n  const handleSearch = (searchCity) => {\n    setCity(searchCity);\n  };\n\n  return (\n    <div className=\"App\">\n      <h1>Weather App</h1>\n      <SearchBar onSearch={handleSearch} />\n      {loading && <p>Loading...</p>}\n      {error && <p className=\"error\">{error}</p>}\n      {weather && <WeatherDisplay weather={weather} />}\n    </div>\n  );\n}",
        explanation:
          "Questo componente gestisce lo stato dell'applicazione, effettua le chiamate API quando la città cambia e renderizza i componenti figli.",
      },
    ],
  },
  {
    id: "chat-app-nodejs",
    slug: "chat-app-nodejs",
    title: "Chat App con Node.js e Socket.io",
    description: "Un'applicazione di chat in tempo reale creata con Node.js, Express e Socket.io.",
    language: "JavaScript",
    level: "intermedio",
    tags: ["nodejs", "socketio", "express", "realtime"],
    githubRepo: "https://github.com/example/chat-app-nodejs",
    demoUrl: "https://example.com/chat-app-nodejs",
    thumbnail: "/images/projects/chat-app-nodejs.png",
    createdAt: "2023-03-20T00:00:00Z",
    updatedAt: "2023-05-10T00:00:00Z",
    author: "Luca Neri",
    features: ["Chat in tempo reale", "Stanze di chat", "Notifiche di digitazione", "Lista utenti online"],
    technologies: ["Node.js", "Express", "Socket.io", "HTML/CSS"],
    prerequisites: ["Conoscenza base di JavaScript", "Node.js", "HTML e CSS"],
    sections: [
      {
        title: "Introduzione",
        content:
          "Questo progetto mostra come creare un'applicazione di chat in tempo reale utilizzando Node.js e Socket.io.",
      },
      {
        title: "Configurazione del server",
        content: "Il server è configurato utilizzando Express e Socket.io per gestire le connessioni WebSocket.",
        code: "const express = require('express');\nconst http = require('http');\nconst socketIo = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIo(server);\n\napp.use(express.static('public'));\n\nio.on('connection', (socket) => {\n  console.log('New user connected');\n  \n  socket.on('join', (username) => {\n    socket.username = username;\n    io.emit('user joined', username);\n  });\n  \n  socket.on('chat message', (msg) => {\n    io.emit('chat message', {\n      username: socket.username,\n      message: msg\n    });\n  });\n  \n  socket.on('typing', () => {\n    socket.broadcast.emit('typing', socket.username);\n  });\n  \n  socket.on('disconnect', () => {\n    io.emit('user left', socket.username);\n    console.log('User disconnected');\n  });\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
        explanation:
          "Questo codice configura un server Express con Socket.io per gestire le connessioni WebSocket. Gestisce eventi come l'ingresso di un utente, l'invio di messaggi, la digitazione e la disconnessione.",
      },
      {
        title: "Client JavaScript",
        content: "Il client utilizza Socket.io per connettersi al server e gestire gli eventi in tempo reale.",
        code: "const socket = io();\n\nconst form = document.getElementById('form');\nconst input = document.getElementById('input');\nconst messages = document.getElementById('messages');\nconst typing = document.getElementById('typing');\n\n// Join chat\nconst username = prompt('Enter your username:');\nsocket.emit('join', username);\n\n// Send message\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  if (input.value) {\n    socket.emit('chat message', input.value);\n    input.value = '';\n  }\n});\n\n// Typing indicator\ninput.addEventListener('input', () => {\n  socket.emit('typing');\n});\n\n// Receive events\nsocket.on('chat message', (data) => {\n  const item = document.createElement('li');\n  item.textContent = `${data.username}: ${data.message}`;\n  messages.appendChild(item);\n  window.scrollTo(0, document.body.scrollHeight);\n  typing.textContent = '';\n});\n\nsocket.on('user joined', (username) => {\n  const item = document.createElement('li');\n  item.textContent = `${username} joined the chat`;\n  item.classList.add('event');\n  messages.appendChild(item);\n});\n\nsocket.on('user left', (username) => {\n  const item = document.createElement('li');\n  item.textContent = `${username} left the chat`;\n  item.classList.add('event');\n  messages.appendChild(item);\n});\n\nsocket.on('typing', (username) => {\n  typing.textContent = `${username} is typing...`;\n  setTimeout(() => {\n    typing.textContent = '';\n  }, 3000);\n});",
        explanation:
          "Questo codice client gestisce la connessione al server Socket.io e gli eventi di chat come l'invio di messaggi, la digitazione e le notifiche di ingresso/uscita degli utenti.",
      },
    ],
  },
  {
    id: "portfolio-gatsby",
    slug: "portfolio-gatsby",
    title: "Portfolio con Gatsby",
    description: "Un sito portfolio personale creato con Gatsby e GraphQL.",
    language: "JavaScript",
    level: "intermedio",
    tags: ["gatsby", "graphql", "react", "portfolio"],
    githubRepo: "https://github.com/example/portfolio-gatsby",
    demoUrl: "https://example.com/portfolio-gatsby",
    thumbnail: "/images/projects/portfolio-gatsby.png",
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-04-05T00:00:00Z",
    author: "Anna Bianchi",
    features: ["Pagine statiche veloci", "Blog integrato", "Ottimizzazione SEO", "Immagini ottimizzate"],
    technologies: ["Gatsby", "React", "GraphQL", "Styled Components"],
    prerequisites: ["Conoscenza di React", "JavaScript ES6", "CSS"],
    sections: [
      {
        title: "Introduzione",
        content: "Questo progetto mostra come creare un sito portfolio personale utilizzando Gatsby e GraphQL.",
      },
      {
        title: "Configurazione di Gatsby",
        content:
          "La configurazione di Gatsby include plugin per ottimizzare le immagini, gestire i dati con GraphQL e altro.",
        code: "// gatsby-config.js\nmodule.exports = {\n  siteMetadata: {\n    title: 'My Portfolio',\n    description: 'A personal portfolio website built with Gatsby',\n    author: 'Your Name',\n  },\n  plugins: [\n    'gatsby-plugin-react-helmet',\n    'gatsby-plugin-styled-components',\n    {\n      resolve: 'gatsby-source-filesystem',\n      options: {\n        name: 'images',\n        path: `${__dirname}/src/images`,\n      },\n    },\n    {\n      resolve: 'gatsby-source-filesystem',\n      options: {\n        name: 'projects',\n        path: `${__dirname}/src/projects`,\n      },\n    },\n    'gatsby-transformer-sharp',\n    'gatsby-plugin-sharp',\n    {\n      resolve: 'gatsby-transformer-remark',\n      options: {\n        plugins: [\n          'gatsby-remark-relative-images',\n          {\n            resolve: 'gatsby-remark-images',\n            options: {\n              maxWidth: 750,\n              linkImagesToOriginal: false,\n            },\n          },\n        ],\n      },\n    },\n  ],\n};",
        explanation:
          "Questo file di configurazione definisce i metadati del sito e i plugin utilizzati, come quelli per la gestione delle immagini, dei file Markdown e dei componenti styled.",
      },
      {
        title: "Query GraphQL",
        content: "Gatsby utilizza GraphQL per recuperare i dati da varie fonti e renderizzarli nelle pagine.",
        code: 'import React from \'react\';\nimport { graphql, useStaticQuery } from \'gatsby\';\nimport Img from \'gatsby-image\';\n\nconst Projects = () => {\n  const data = useStaticQuery(graphql`\n    query {\n      allMarkdownRemark(\n        filter: { fileAbsolutePath: { regex: "/projects/" } }\n        sort: { fields: frontmatter___date, order: DESC }\n      ) {\n        edges {\n          node {\n            frontmatter {\n              title\n              date(formatString: "MMMM DD, YYYY")\n              description\n              featuredImage {\n                childImageSharp {\n                  fluid(maxWidth: 800) {\n                    ...GatsbyImageSharpFluid\n                  }\n                }\n              }\n            }\n            fields {\n              slug\n            }\n            excerpt\n          }\n        }\n      }\n    }\n  `);\n\n  return (\n    <div>\n      <h1>Projects</h1>\n      <div className="projects-grid">\n        {data.allMarkdownRemark.edges.map(({ node }) => (\n          <div key={node.fields.slug} className="project-card">\n            <Img\n              fluid={node.frontmatter.featuredImage.childImageSharp.fluid}\n              alt={node.frontmatter.title}\n            />\n            <h2>{node.frontmatter.title}</h2>\n            <p className="date">{node.frontmatter.date}</p>\n            <p>{node.excerpt}</p>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n};\n\nexport default Projects;',
        explanation:
          "Questo componente utilizza GraphQL per recuperare i dati dei progetti dai file Markdown e renderizzarli in una griglia. Gatsby-image viene utilizzato per ottimizzare le immagini.",
      },
    ],
  },
]

const designPatternsData: DesignPattern[] = [
  {
    id: "singleton",
    slug: "singleton",
    title: "Singleton",
    description: "Assicura che una classe abbia una sola istanza e fornisce un punto di accesso globale ad essa.",
    category: "creazionale",
    languages: ["JavaScript", "TypeScript", "Java"],
    complexity: "bassa",
    useCases: ["Gestione della configurazione", "Logging", "Gestione della connessione al database"],
  },
  {
    id: "factory",
    slug: "factory",
    title: "Factory Method",
    description:
      "Definisce un'interfaccia per la creazione di un oggetto, ma lascia alle sottoclassi il compito di decidere quale classe istanziare.",
    category: "creazionale",
    languages: ["JavaScript", "TypeScript", "Java", "Python"],
    complexity: "media",
    useCases: ["Creazione di oggetti complessi", "Astrazione della logica di creazione"],
  },
  {
    id: "observer",
    slug: "observer",
    title: "Observer",
    description:
      "Definisce una dipendenza uno-a-molti tra oggetti in modo che quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.",
    category: "comportamentale",
    languages: ["JavaScript", "TypeScript", "Java", "Python", "C#"],
    complexity: "media",
    useCases: ["Gestione eventi", "Aggiornamento automatico dell'interfaccia utente"],
  },
  {
    id: "strategy",
    slug: "strategy",
    title: "Strategy",
    description:
      "Definisce una famiglia di algoritmi, incapsula ciascuno di essi e li rende intercambiabili. Permette all'algoritmo di variare indipendentemente dai client che lo utilizzano.",
    category: "comportamentale",
    languages: ["JavaScript", "TypeScript", "Java", "Python", "C#"],
    complexity: "media",
    useCases: ["Algoritmi di ordinamento", "Strategie di validazione", "Algoritmi di compressione"],
  },
  {
    id: "decorator",
    slug: "decorator",
    title: "Decorator",
    description:
      "Consente di aggiungere nuove funzionalità a oggetti esistenti dinamicamente, senza alterare la loro struttura.",
    category: "strutturale",
    languages: ["JavaScript", "TypeScript", "Java", "Python"],
    complexity: "media",
    useCases: ["Aggiunta di funzionalità a componenti UI", "Middleware in framework web", "Stream I/O"],
  },
  {
    id: "adapter",
    slug: "adapter",
    title: "Adapter",
    description:
      "Converte l'interfaccia di una classe in un'altra interfaccia che i client si aspettano. Permette a classi con interfacce incompatibili di lavorare insieme.",
    category: "strutturale",
    languages: ["JavaScript", "TypeScript", "Java", "C#"],
    complexity: "bassa",
    useCases: ["Integrazione di librerie di terze parti", "Compatibilità con sistemi legacy", "API wrapper"],
  },
  {
    id: "mvc",
    slug: "mvc",
    title: "Model-View-Controller (MVC)",
    description:
      "Separa un'applicazione in tre componenti principali: Model (dati), View (interfaccia utente) e Controller (logica di business).",
    category: "architetturale",
    languages: ["JavaScript", "TypeScript", "Java", "Python", "PHP"],
    complexity: "media",
    useCases: ["Applicazioni web", "Applicazioni desktop", "Framework di sviluppo"],
  },
  {
    id: "repository",
    slug: "repository",
    title: "Repository",
    description:
      "Separa la logica che recupera i dati e li mappa a un modello di entità dalla logica di business che agisce sul modello.",
    category: "architetturale",
    languages: ["JavaScript", "TypeScript", "C#", "Java"],
    complexity: "media",
    useCases: ["Accesso al database", "Astrazione della persistenza dei dati", "Testing"],
  },
]

// Funzioni di utilità per accedere ai dati
export function getAllProjects() {
  return projectsData
}

export function getProjectBySlug(slug: string) {
  return projectsData.find((project) => project.slug === slug)
}

export function getProjectsByLanguage(language: string) {
  return projectsData.filter((project) => project.language === language)
}

export function getProjectsByLevel(level: "principiante" | "intermedio" | "avanzato") {
  return projectsData.filter((project) => project.level === level)
}

// Funzioni CRUD
export function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">) {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  projectsData.push(newProject)
  return newProject
}

export function updateProject(slug: string, projectData: Partial<Project>) {
  const index = projectsData.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return null
  }

  const updatedProject = {
    ...projectsData[index],
    ...projectData,
    updatedAt: new Date().toISOString(),
  }

  projectsData[index] = updatedProject
  return updatedProject
}

export function deleteProject(slug: string) {
  const index = projectsData.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return false
  }

  projectsData.splice(index, 1)
  return true
}

export function getAllDesignPatterns() {
  return designPatternsData
}

export function getDesignPatternsByCategory(category: string) {
  return designPatternsData.filter((pattern) => pattern.category === category)
}

export function getDesignPatternBySlug(slug: string) {
  return designPatternsData.find((pattern) => pattern.slug === slug)
}

export type { Project, DesignPattern }
