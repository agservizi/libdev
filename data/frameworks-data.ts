"use client"

// Modello dati per l'espansione dei linguaggi
export interface Framework {
  id: string
  slug: string
  name: string
  description: string
  language: string
  category: "frontend" | "backend" | "mobile" | "database" | "devops" | "cloud" | "altro"
  website: string
  documentation: string
  github?: string
  logo?: string
  popularity: number // da 1 a 10
  createdAt: string
  features: string[]
  useCases: string[]
  companies: string[]
  alternatives: string[]
}

// Dati di esempio per i framework
const frameworksData: Framework[] = [
  {
    id: "react",
    slug: "react",
    name: "React",
    description:
      "Una libreria JavaScript per costruire interfacce utente. React consente di creare UI complesse da piccoli e isolati pezzi di codice chiamati 'componenti'.",
    language: "JavaScript",
    category: "frontend",
    website: "https://reactjs.org",
    documentation: "https://reactjs.org/docs/getting-started.html",
    github: "https://github.com/facebook/react",
    logo: "/images/frameworks/react.png",
    popularity: 9,
    createdAt: "2013-05-29T00:00:00Z",
    features: [
      "Componenti riutilizzabili",
      "Virtual DOM per prestazioni ottimizzate",
      "Flusso di dati unidirezionale",
      "JSX per template dichiarativi",
      "Supporto per server-side rendering",
    ],
    useCases: [
      "Single Page Applications",
      "Applicazioni web complesse",
      "Dashboard e pannelli di amministrazione",
      "E-commerce",
      "Applicazioni mobile con React Native",
    ],
    companies: ["Facebook", "Instagram", "Netflix", "Airbnb", "Discord"],
    alternatives: ["Vue.js", "Angular", "Svelte", "Preact"],
  },
  {
    id: "express",
    slug: "express",
    name: "Express.js",
    description:
      "Express è un framework web minimalista e flessibile per Node.js che fornisce un robusto set di funzionalità per applicazioni web e mobile.",
    language: "JavaScript",
    category: "backend",
    website: "https://expressjs.com",
    documentation: "https://expressjs.com/en/guide/routing.html",
    github: "https://github.com/expressjs/express",
    logo: "/images/frameworks/express.png",
    popularity: 8,
    createdAt: "2010-11-16T00:00:00Z",
    features: [
      "Routing HTTP robusto",
      "Middleware per estendere le funzionalità",
      "Supporto per template engines",
      "Gestione di sessioni e cookie",
      "Integrazione con database",
    ],
    useCases: ["API RESTful", "Applicazioni web", "Backend per applicazioni mobile", "Microservizi", "Proxy server"],
    companies: ["IBM", "Uber", "Accenture", "Fox Sports", "MySpace"],
    alternatives: ["Koa.js", "Hapi.js", "Fastify", "NestJS"],
  },
  {
    id: "django",
    slug: "django",
    name: "Django",
    description:
      "Django è un framework web Python di alto livello che incoraggia lo sviluppo rapido e il design pulito e pragmatico.",
    language: "Python",
    category: "backend",
    website: "https://www.djangoproject.com",
    documentation: "https://docs.djangoproject.com",
    github: "https://github.com/django/django",
    logo: "/images/frameworks/django.png",
    popularity: 8,
    createdAt: "2005-07-21T00:00:00Z",
    features: [
      "ORM potente e intuitivo",
      "Admin interface automatica",
      "Sistema di template robusto",
      "Autenticazione e autorizzazione integrate",
      "Sicurezza contro attacchi comuni",
    ],
    useCases: ["Applicazioni web complesse", "CMS", "E-commerce", "Applicazioni scientifiche", "Piattaforme social"],
    companies: ["Instagram", "Pinterest", "Mozilla", "Eventbrite", "Disqus"],
    alternatives: ["Flask", "FastAPI", "Pyramid", "Ruby on Rails"],
  },
  {
    id: "vue",
    slug: "vue",
    name: "Vue.js",
    description:
      "Vue.js è un framework JavaScript progressivo per la costruzione di interfacce utente. È progettato per essere adottabile incrementalmente.",
    language: "JavaScript",
    category: "frontend",
    website: "https://vuejs.org",
    documentation: "https://vuejs.org/guide/introduction.html",
    github: "https://github.com/vuejs/vue",
    logo: "/images/frameworks/vue.png",
    popularity: 8,
    createdAt: "2014-02-11T00:00:00Z",
    features: [
      "Reattività e composizione dei componenti",
      "Sintassi di template semplice e intuitiva",
      "Transizioni e animazioni integrate",
      "Routing e gestione dello stato ufficiali",
      "Tooling eccellente con Vue CLI",
    ],
    useCases: [
      "Single Page Applications",
      "Applicazioni web progressive",
      "Widget interattivi",
      "Prototipi rapidi",
      "Miglioramento di applicazioni esistenti",
    ],
    companies: ["Alibaba", "Xiaomi", "Nintendo", "GitLab", "Adobe"],
    alternatives: ["React", "Angular", "Svelte", "Ember.js"],
  },
  {
    id: "laravel",
    slug: "laravel",
    name: "Laravel",
    description:
      "Laravel è un framework PHP web con sintassi espressiva ed elegante. Mira a rendere lo sviluppo web piacevole senza sacrificare la funzionalità.",
    language: "PHP",
    category: "backend",
    website: "https://laravel.com",
    documentation: "https://laravel.com/docs",
    github: "https://github.com/laravel/laravel",
    logo: "/images/frameworks/laravel.png",
    popularity: 8,
    createdAt: "2011-06-09T00:00:00Z",
    features: [
      "Eloquent ORM",
      "Sistema di migrazione del database",
      "Sistema di template Blade",
      "Autenticazione e autorizzazione integrate",
      "Sistema di code e job",
    ],
    useCases: ["Applicazioni web", "API RESTful", "CMS", "E-commerce", "Applicazioni aziendali"],
    companies: ["Pfizer", "BBC", "Crowdcube", "Laracasts", "About You"],
    alternatives: ["Symfony", "CodeIgniter", "CakePHP", "Yii"],
  },
  {
    id: "angular",
    slug: "angular",
    name: "Angular",
    description:
      "Angular è una piattaforma per la costruzione di applicazioni web e mobile. È un framework TypeScript completo per lo sviluppo frontend.",
    language: "TypeScript",
    category: "frontend",
    website: "https://angular.io",
    documentation: "https://angular.io/docs",
    github: "https://github.com/angular/angular",
    logo: "/images/frameworks/angular.png",
    popularity: 7,
    createdAt: "2016-09-14T00:00:00Z",
    features: [
      "Architettura basata su componenti",
      "Binding bidirezionale dei dati",
      "Dependency injection",
      "Routing potente",
      "Reactive forms",
    ],
    useCases: [
      "Applicazioni enterprise",
      "Single Page Applications",
      "Applicazioni web progressive",
      "Dashboard e pannelli di amministrazione",
      "Applicazioni mobile con Ionic",
    ],
    companies: ["Google", "Microsoft", "Samsung", "Deutsche Bank", "UPS"],
    alternatives: ["React", "Vue.js", "Svelte", "Ember.js"],
  },
  {
    id: "flask",
    slug: "flask",
    name: "Flask",
    description:
      "Flask è un micro-framework web Python leggero e flessibile. È facile da imparare e utilizzare, ma potente abbastanza per applicazioni complesse.",
    language: "Python",
    category: "backend",
    website: "https://flask.palletsprojects.com",
    documentation: "https://flask.palletsprojects.com/en/2.0.x/",
    github: "https://github.com/pallets/flask",
    logo: "/images/frameworks/flask.png",
    popularity: 7,
    createdAt: "2010-04-01T00:00:00Z",
    features: [
      "Routing semplice e intuitivo",
      "Sistema di template Jinja2",
      "Supporto per test unitari",
      "Estensibile con plugin",
      "Compatibile con WSGI",
    ],
    useCases: ["API RESTful", "Microservizi", "Prototipi rapidi", "Applicazioni web leggere", "Backend per SPA"],
    companies: ["Netflix", "Airbnb", "Uber", 'Reddit  "Applicazioni web leggere', "Backend per SPA"],
    companies: ["Netflix", "Airbnb", "Uber", "Reddit", "LinkedIn"],
    alternatives: ["Django", "FastAPI", "Pyramid", "Bottle"],
  },
  {
    id: "spring-boot",
    slug: "spring-boot",
    name: "Spring Boot",
    description:
      "Spring Boot è un framework Java che semplifica lo sviluppo di applicazioni Spring riducendo la configurazione necessaria e fornendo un'esperienza di sviluppo più rapida.",
    language: "Java",
    category: "backend",
    website: "https://spring.io/projects/spring-boot",
    documentation: "https://docs.spring.io/spring-boot/docs/current/reference/html/",
    github: "https://github.com/spring-projects/spring-boot",
    logo: "/images/frameworks/spring-boot.png",
    popularity: 9,
    createdAt: "2014-04-01T00:00:00Z",
    features: [
      "Configurazione automatica",
      "Starter dependencies",
      "Server embedded",
      "Metriche e monitoraggio",
      "Facile integrazione con altri progetti Spring",
    ],
    useCases: [
      "Microservizi",
      "API RESTful",
      "Applicazioni enterprise",
      "Batch processing",
      "Applicazioni cloud-native",
    ],
    companies: ["Netflix", "Amazon", "Accenture", "JPMorgan Chase", "Pivotal"],
    alternatives: ["Quarkus", "Micronaut", "Jakarta EE", "Dropwizard"],
  },
  {
    id: "fastapi",
    slug: "fastapi",
    name: "FastAPI",
    description:
      "FastAPI è un moderno framework web Python ad alte prestazioni per la creazione di API con Python 3.6+ basato su standard aperti.",
    language: "Python",
    category: "backend",
    website: "https://fastapi.tiangolo.com",
    documentation: "https://fastapi.tiangolo.com/tutorial/",
    github: "https://github.com/tiangolo/fastapi",
    logo: "/images/frameworks/fastapi.png",
    popularity: 8,
    createdAt: "2018-12-01T00:00:00Z",
    features: [
      "Prestazioni elevate grazie a Starlette e Pydantic",
      "Validazione automatica dei dati",
      "Documentazione API automatica con Swagger UI e ReDoc",
      "Supporto per WebSockets e GraphQL",
      "Dependency injection",
    ],
    useCases: ["API RESTful", "Microservizi", "Backend per SPA", "Data science APIs", "Applicazioni in tempo reale"],
    companies: ["Microsoft", "Uber", "Netflix", "Spotify", "Capital One"],
    alternatives: ["Flask", "Django REST Framework", "Falcon", "Starlette"],
  },
  {
    id: "flutter",
    slug: "flutter",
    name: "Flutter",
    description:
      "Flutter è un framework UI di Google per la creazione di applicazioni native compilate per mobile, web e desktop da un singolo codebase.",
    language: "Dart",
    category: "mobile",
    website: "https://flutter.dev",
    documentation: "https://flutter.dev/docs",
    github: "https://github.com/flutter/flutter",
    logo: "/images/frameworks/flutter.png",
    popularity: 8,
    createdAt: "2017-05-01T00:00:00Z",
    features: [
      "Hot Reload per sviluppo rapido",
      "Widget personalizzabili",
      "Prestazioni native",
      "Supporto multi-piattaforma",
      "Ricco ecosistema di package",
    ],
    useCases: [
      "Applicazioni mobile cross-platform",
      "Applicazioni web progressive",
      "Applicazioni desktop",
      "Prototipi rapidi",
      "Applicazioni con UI complesse",
    ],
    companies: ["Google", "Alibaba", "eBay", "BMW", "Capital One"],
    alternatives: ["React Native", "Xamarin", "Ionic", "NativeScript"],
  },
]

// Dati di esempio per i confronti tra linguaggi
export interface LanguageComparison {
  id: string
  slug: string
  title: string
  description: string
  languages: string[]
  categories: string[]
  createdAt: string
  updatedAt: string
  author: string
  sections: {
    title: string
    content: string
    examples?: {
      language: string
      code: string
      explanation?: string
    }[]
  }[]
}

const languageComparisonsData: LanguageComparison[] = [
  {
    id: "js-vs-python",
    slug: "javascript-vs-python",
    title: "JavaScript vs Python: Confronto completo",
    description:
      "Un'analisi dettagliata delle differenze e somiglianze tra JavaScript e Python, due dei linguaggi di programmazione più popolari.",
    languages: ["JavaScript", "Python"],
    categories: ["sintassi", "performance", "ecosistema", "casi d'uso"],
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-05-15T00:00:00Z",
    author: "Marco Rossi",
    sections: [
      {
        title: "Introduzione",
        content:
          "JavaScript e Python sono due dei linguaggi di programmazione più popolari al mondo, ma hanno origini, filosofie e casi d'uso molto diversi. JavaScript è nato per il web, mentre Python è stato progettato come linguaggio general-purpose con un focus sulla leggibilità.",
      },
      {
        title: "Sintassi e leggibilità",
        content:
          "La sintassi è una delle differenze più evidenti tra i due linguaggi. Python utilizza l'indentazione per definire i blocchi di codice, mentre JavaScript utilizza parentesi graffe.",
        examples: [
          {
            language: "JavaScript",
            code: "function calcolaMedia(numeri) {\n  let somma = 0;\n  for (let i = 0; i < numeri.length; i++) {\n    somma += numeri[i];\n  }\n  return somma / numeri.length;\n}",
            explanation:
              "JavaScript utilizza parentesi graffe per definire i blocchi di codice e punto e virgola per terminare le istruzioni.",
          },
          {
            language: "Python",
            code: "def calcola_media(numeri):\n    somma = 0\n    for numero in numeri:\n        somma += numero\n    return somma / len(numeri)",
            explanation:
              "Python utilizza l'indentazione per definire i blocchi di codice e non richiede punto e virgola.",
          },
        ],
      },
      {
        title: "Tipizzazione",
        content:
          "JavaScript è un linguaggio a tipizzazione dinamica e debole, mentre Python è a tipizzazione dinamica ma forte.",
        examples: [
          {
            language: "JavaScript",
            code: "let x = 5;\nx = 'stringa'; // Valido in JavaScript\nconsole.log('5' + 5); // Output: '55' (concatenazione di stringhe)",
            explanation:
              "JavaScript permette di cambiare il tipo di una variabile e converte implicitamente i tipi nelle operazioni.",
          },
          {
            language: "Python",
            code: "x = 5\nx = 'stringa'  # Valido anche in Python\nprint('5' + 5)  # Errore: non puoi concatenare str e int",
            explanation:
              "Python permette di cambiare il tipo di una variabile, ma non converte implicitamente i tipi nelle operazioni.",
          },
        ],
      },
      {
        title: "Ecosistema e librerie",
        content:
          "Entrambi i linguaggi hanno ecosistemi ricchi e vibranti, ma con focus diversi. JavaScript domina lo sviluppo web frontend e ha una forte presenza nel backend con Node.js. Python eccelle in data science, machine learning e automazione.",
        examples: [
          {
            language: "JavaScript",
            code: "// Frontend con React\nimport React from 'react';\n\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n\n// Backend con Node.js\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello, World!');\n});\n\napp.listen(3000);",
            explanation: "JavaScript è utilizzato sia per lo sviluppo frontend che backend.",
          },
          {
            language: "Python",
            code: "# Data science con pandas e matplotlib\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('data.csv')\nplt.plot(df['x'], df['y'])\nplt.show()\n\n# Machine learning con scikit-learn\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression().fit(X_train, y_train)",
            explanation: "Python è ampiamente utilizzato per data science e machine learning.",
          },
        ],
      },
    ],
  },
  {
    id: "react-vs-vue",
    slug: "react-vs-vue",
    title: "React vs Vue: Quale scegliere?",
    description:
      "Un confronto approfondito tra React e Vue.js, due dei framework JavaScript più popolari per lo sviluppo frontend.",
    languages: ["JavaScript"],
    categories: ["frontend", "framework", "performance", "ecosistema"],
    createdAt: "2023-04-15T00:00:00Z",
    updatedAt: "2023-06-20T00:00:00Z",
    author: "Laura Bianchi",
    sections: [
      {
        title: "Introduzione",
        content:
          "React e Vue.js sono due dei framework JavaScript più popolari per lo sviluppo di interfacce utente. Entrambi utilizzano un approccio basato su componenti e offrono prestazioni eccellenti, ma hanno filosofie e approcci diversi.",
      },
      {
        title: "Sintassi e approccio",
        content:
          "React utilizza JSX, una sintassi che combina JavaScript e HTML, mentre Vue utilizza template HTML con direttive speciali.",
        examples: [
          {
            language: "React",
            code: "function Counter() {\n  const [count, setCount] = React.useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
            explanation: "React utilizza JSX e hooks per gestire lo stato e gli eventi.",
          },
          {
            language: "Vue",
            code: '<template>\n  <div>\n    <p>Count: {{ count }}</p>\n    <button @click="increment">Increment</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      count: 0\n    };\n  },\n  methods: {\n    increment() {\n      this.count++;\n    }\n  }\n};\n</script>',
            explanation: "Vue utilizza template HTML con direttive speciali e un oggetto options API.",
          },
        ],
      },
      {
        title: "Gestione dello stato",
        content:
          "React non ha una soluzione ufficiale per la gestione dello stato globale, ma spesso viene utilizzato con Redux o Context API. Vue ha Vuex come soluzione ufficiale.",
        examples: [
          {
            language: "React con Redux",
            code: "// Store\nimport { createStore } from 'redux';\n\nconst counterReducer = (state = { count: 0 }, action) => {\n  switch (action.type) {\n    case 'INCREMENT':\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(counterReducer);\n\n// Componente\nimport { useDispatch, useSelector } from 'react-redux';\n\nfunction Counter() {\n  const count = useSelector(state => state.count);\n  const dispatch = useDispatch();\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>\n    </div>\n  );\n}",
            explanation: "React con Redux per la gestione dello stato globale.",
          },
          {
            language: "Vue con Vuex",
            code: "// Store\nimport { createStore } from 'vuex';\n\nconst store = createStore({\n  state: {\n    count: 0\n  },\n  mutations: {\n    increment(state) {\n      state.count++;\n    }\n  }\n});\n\n// Componente\n<template>\n  <div>\n    <p>Count: {{ count }}</p>\n    <button @click=\"increment\">Increment</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  computed: {\n    count() {\n      return this.$store.state.count;\n    }\n  },\n  methods: {\n    increment() {\n      this.$store.commit('increment');\n    }\n  }\n};\n</script>",
            explanation: "Vue con Vuex per la gestione dello stato globale.",
          },
        ],
      },
      {
        title: "Ecosistema e comunità",
        content:
          "React ha un ecosistema più ampio e una comunità più grande, essendo supportato da Facebook. Vue è più leggero e ha una curva di apprendimento più dolce, ma ha una comunità più piccola.",
      },
      {
        title: "Conclusione",
        content:
          "Sia React che Vue sono ottimi framework e la scelta dipende dalle preferenze personali, dalle esigenze del progetto e dall'ecosistema esistente. React è più flessibile e ha un ecosistema più ampio, mentre Vue è più semplice da imparare e offre una soluzione più integrata.",
      },
    ],
  },
  {
    id: "sql-vs-nosql",
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL: Confronto tra database relazionali e non relazionali",
    description:
      "Un'analisi delle differenze, vantaggi e svantaggi dei database SQL e NoSQL, per aiutarti a scegliere la soluzione migliore per il tuo progetto.",
    languages: ["SQL", "NoSQL"],
    categories: ["database", "performance", "scalabilità", "casi d'uso"],
    createdAt: "2023-05-20T00:00:00Z",
    updatedAt: "2023-07-10T00:00:00Z",
    author: "Giovanni Verdi",
    sections: [
      {
        title: "Introduzione",
        content:
          "I database SQL (relazionali) e NoSQL (non relazionali) rappresentano due approcci diversi alla gestione dei dati. I database SQL utilizzano tabelle con schema fisso e relazioni, mentre i database NoSQL offrono modelli di dati più flessibili.",
      },
      {
        title: "Struttura dei dati",
        content:
          "I database SQL organizzano i dati in tabelle con righe e colonne, mentre i database NoSQL possono utilizzare vari modelli di dati: documenti, coppie chiave-valore, colonne o grafi.",
        examples: [
          {
            language: "SQL",
            code: "CREATE TABLE utenti (\n  id INT PRIMARY KEY,\n  nome VARCHAR(50),\n  email VARCHAR(100) UNIQUE\n);\n\nCREATE TABLE ordini (\n  id INT PRIMARY KEY,\n  utente_id INT,\n  prodotto VARCHAR(100),\n  quantita INT,\n  FOREIGN KEY (utente_id) REFERENCES utenti(id)\n);\n\nSELECT u.nome, o.prodotto\nFROM utenti u\nJOIN ordini o ON u.id = o.utente_id;",
            explanation: "In SQL, i dati sono organizzati in tabelle con relazioni tra di esse.",
          },
          {
            language: "NoSQL (MongoDB)",
            code: '// Collezione \'utenti\'\n{\n  "_id": ObjectId("5f8d3b3e1c9d440000a1f3b5"),\n  "nome": "Mario Rossi",\n  "email": "mario@example.com",\n  "ordini": [\n    {\n      "prodotto": "Laptop",\n      "quantita": 1\n    },\n    {\n      "prodotto": "Mouse",\n      "quantita": 2\n    }\n  ]\n}',
            explanation: "In NoSQL, i dati possono essere annidati all'interno di documenti, evitando join espliciti.",
          },
        ],
      },
      {
        title: "Schema e flessibilità",
        content:
          "I database SQL richiedono uno schema predefinito e rigido, mentre i database NoSQL sono schemaless o hanno uno schema flessibile, permettendo di aggiungere campi senza modificare la struttura esistente.",
      },
      {
        title: "Scalabilità",
        content:
          "I database SQL scalano verticalmente (aggiungendo più risorse al server), mentre i database NoSQL sono progettati per scalare orizzontalmente (distribuendo i dati su più server).",
      },
      {
        title: "Transazioni e ACID",
        content:
          "I database SQL supportano completamente le proprietà ACID (Atomicità, Coerenza, Isolamento, Durabilità), garantendo l'integrità dei dati. I database NoSQL spesso sacrificano alcune di queste proprietà per ottenere maggiore scalabilità e prestazioni.",
      },
      {
        title: "Casi d'uso",
        content:
          "I database SQL sono ideali per applicazioni che richiedono transazioni complesse e integrità referenziale, come sistemi finanziari o di e-commerce. I database NoSQL sono più adatti per big data, contenuti non strutturati, applicazioni in tempo reale e casi in cui la scalabilità orizzontale è prioritaria.",
      },
    ],
  },
]

// Funzioni di utilità per accedere ai dati
export function getAllFrameworks() {
  return frameworksData
}

export function getFrameworkBySlug(slug: string) {
  return frameworksData.find((framework) => framework.slug === slug)
}

export function getFrameworksByLanguage(language: string) {
  return frameworksData.filter((framework) => framework.language === language)
}

export function getFrameworksByCategory(category: string) {
  return frameworksData.filter((framework) => framework.category === category)
}

export function getAllLanguageComparisons() {
  return languageComparisonsData
}

export function getLanguageComparisonBySlug(slug: string) {
  return languageComparisonsData.find((comparison) => comparison.slug === slug)
}

// Funzioni CRUD per i framework
export function createFramework(framework: Omit<Framework, "id" | "createdAt">) {
  const newFramework: Framework = {
    ...framework,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  frameworksData.push(newFramework)
  return newFramework
}

export function updateFramework(slug: string, frameworkData: Partial<Framework>) {
  const index = frameworksData.findIndex((framework) => framework.slug === slug)

  if (index === -1) {
    return null
  }

  const updatedFramework = {
    ...frameworksData[index],
    ...frameworkData,
  }

  frameworksData[index] = updatedFramework
  return updatedFramework
}

export function deleteFramework(slug: string) {
  const index = frameworksData.findIndex((framework) => framework.slug === slug)

  if (index === -1) {
    return false
  }

  frameworksData.splice(index, 1)
  return true
}

// Funzioni CRUD per i confronti tra linguaggi
export function createLanguageComparison(comparison: Omit<LanguageComparison, "id" | "createdAt" | "updatedAt">) {
  const newComparison: LanguageComparison = {
    ...comparison,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  languageComparisonsData.push(newComparison)
  return newComparison
}

export function updateLanguageComparison(slug: string, comparisonData: Partial<LanguageComparison>) {
  const index = languageComparisonsData.findIndex((comparison) => comparison.slug === slug)

  if (index === -1) {
    return null
  }

  const updatedComparison = {
    ...languageComparisonsData[index],
    ...comparisonData,
    updatedAt: new Date().toISOString(),
  }

  languageComparisonsData[index] = updatedComparison
  return updatedComparison
}

export function deleteLanguageComparison(slug: string) {
  const index = languageComparisonsData.findIndex((comparison) => comparison.slug === slug)

  if (index === -1) {
    return false
  }

  languageComparisonsData.splice(index, 1)
  return true
}
