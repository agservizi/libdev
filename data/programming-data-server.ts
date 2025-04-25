// This file contains the programming data for server-side use
// NO "use client" directive here since this is for server components

export const programmingData = {
  languages: {
    HTML: {
      documentation: "https://developer.mozilla.org/it/docs/Web/HTML",
      commands: [
        {
          name: "Struttura Base",
          description: "La struttura base di un documento HTML",
          syntax:
            "<!DOCTYPE html>\n<html>\n<head>\n  <title>Titolo Pagina</title>\n</head>\n<body>\n  <!-- Contenuto qui -->\n</body>\n</html>",
          example:
            "<!DOCTYPE html>\n<html>\n<head>\n  <title>La Mia Prima Pagina</title>\n</head>\n<body>\n  <h1>Ciao Mondo!</h1>\n  <p>Questo è un paragrafo.</p>\n</body>\n</html>",
        },
        {
          name: "Intestazioni",
          description: "Intestazioni HTML da h1 a h6",
          syntax:
            "<h1>Intestazione 1</h1>\n<h2>Intestazione 2</h2>\n<h3>Intestazione 3</h3>\n<h4>Intestazione 4</h4>\n<h5>Intestazione 5</h5>\n<h6>Intestazione 6</h6>",
          example: "<h1>Titolo Principale</h1>\n<h2>Sottotitolo</h2>\n<h3>Intestazione Sezione</h3>",
        },
        {
          name: "Collegamenti",
          description: "Creare collegamenti ipertestuali ad altre pagine",
          syntax: '<a href="url">testo del link</a>',
          example: '<a href="https://www.esempio.it">Visita Esempio.it</a>',
        },
        {
          name: "Immagini",
          description: "Visualizzare immagini in HTML",
          syntax: '<img src="immagine.jpg" alt="Descrizione" width="500" height="600">',
          example: '<img src="gatto.jpg" alt="Un gatto carino" width="300" height="200">',
        },
        {
          name: "Liste",
          description: "Creare liste ordinate e non ordinate",
          syntax:
            "<!-- Lista non ordinata -->\n<ul>\n  <li>Elemento 1</li>\n  <li>Elemento 2</li>\n</ul>\n\n<!-- Lista ordinata -->\n<ol>\n  <li>Primo elemento</li>\n  <li>Secondo elemento</li>\n</ol>",
          example: "<ul>\n  <li>Mele</li>\n  <li>Arance</li>\n  <li>Banane</li>\n</ul>",
        },
        {
          name: "Tabelle",
          description: "Creare tabelle per organizzare i dati",
          syntax:
            "<table>\n  <thead>\n    <tr>\n      <th>Intestazione 1</th>\n      <th>Intestazione 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Riga 1, Cella 1</td>\n      <td>Riga 1, Cella 2</td>\n    </tr>\n    <tr>\n      <td>Riga 2, Cella 1</td>\n      <td>Riga 2, Cella 2</td>\n    </tr>\n  </tbody>\n</table>",
          example:
            "<table border='1'>\n  <thead>\n    <tr>\n      <th>Nome</th>\n      <th>Età</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Mario</td>\n      <td>30</td>\n    </tr>\n    <tr>\n      <td>Lucia</td>\n      <td>25</td>\n    </tr>\n  </tbody>\n</table>",
        },
        {
          name: "Moduli",
          description: "Creare moduli per l'input dell'utente",
          syntax:
            "<form action='/submit' method='post'>\n  <label for='nome'>Nome:</label>\n  <input type='text' id='nome' name='nome'>\n  \n  <label for='email'>Email:</label>\n  <input type='email' id='email' name='email'>\n  \n  <input type='submit' value='Invia'>\n</form>",
          example:
            "<form action='/registrazione' method='post'>\n  <div>\n    <label for='username'>Username:</label>\n    <input type='text' id='username' name='username' required>\n  </div>\n  <div>\n    <label for='password'>Password:</label>\n    <input type='password' id='password' name='password' required>\n  </div>\n  <div>\n    <input type='submit' value='Registrati'>\n  </div>\n</form>",
        },
        {
          name: "Elementi Semantici",
          description: "Elementi HTML5 con significato semantico",
          syntax:
            "<header>Intestazione della pagina</header>\n<nav>Navigazione</nav>\n<main>\n  <article>Articolo principale</article>\n  <section>Sezione di contenuto</section>\n  <aside>Contenuto correlato</aside>\n</main>\n<footer>Piè di pagina</footer>",
          example:
            "<header>\n  <h1>Il Mio Blog</h1>\n  <nav>\n    <ul>\n      <li><a href='/'>Home</a></li>\n      <li><a href='/articoli'>Articoli</a></li>\n      <li><a href='/contatti'>Contatti</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Titolo Articolo</h2>\n    <p>Contenuto dell'articolo...</p>\n  </article>\n  <aside>\n    <h3>Articoli Correlati</h3>\n    <ul>\n      <li><a href='#'>Altro articolo 1</a></li>\n      <li><a href='#'>Altro articolo 2</a></li>\n    </ul>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2023 Il Mio Blog</p>\n</footer>",
        },
      ],
    },
    CSS: {
      documentation: "https://developer.mozilla.org/it/docs/Web/CSS",
      commands: [
        {
          name: "Selettori",
          description: "Selezionare elementi HTML per applicare stili",
          syntax: "selettore {\n  proprietà: valore;\n}",
          example: "h1 {\n  color: blue;\n  font-size: 24px;\n}",
        },
        {
          name: "Box Model",
          description: "Controllare margini, bordi, padding e dimensioni del contenuto",
          syntax:
            "elemento {\n  margin: top right bottom left;\n  padding: top right bottom left;\n  border: width style color;\n}",
          example:
            "div {\n  margin: 10px;\n  padding: 15px;\n  border: 1px solid black;\n  width: 300px;\n  height: 200px;\n}",
        },
        {
          name: "Flexbox",
          description: "Creare layout flessibili con CSS Flexbox",
          syntax:
            ".container {\n  display: flex;\n  flex-direction: row | column;\n  justify-content: flex-start | center | flex-end | space-between;\n  align-items: stretch | center | flex-start | flex-end;\n}",
          example:
            ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.item {\n  flex: 1;\n}",
        },
        {
          name: "Grid",
          description: "Creare layout basati su griglia con CSS Grid",
          syntax: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 10px;\n}",
          example:
            ".galleria {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  grid-gap: 16px;\n}",
        },
        {
          name: "Media Queries",
          description: "Applicare stili in base alle caratteristiche del dispositivo",
          syntax: "@media screen and (max-width: 768px) {\n  /* Stili per schermi più piccoli di 768px */\n}",
          example: "@media screen and (max-width: 600px) {\n  .colonna {\n    width: 100%;\n  }\n}",
        },
        {
          name: "Animazioni",
          description: "Creare animazioni CSS",
          syntax:
            "@keyframes nome-animazione {\n  0% {\n    /* proprietà iniziali */\n  }\n  100% {\n    /* proprietà finali */\n  }\n}\n\nelemento {\n  animation: nome-animazione durata timing-function delay iteration-count direction fill-mode;\n}",
          example:
            "@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.elemento {\n  animation: fade-in 1s ease-in-out forwards;\n}",
        },
        {
          name: "Variabili CSS",
          description: "Definire e utilizzare variabili CSS (Custom Properties)",
          syntax: ":root {\n  --nome-variabile: valore;\n}\n\nelemento {\n  proprietà: var(--nome-variabile);\n}",
          example:
            ":root {\n  --colore-primario: #3498db;\n  --colore-secondario: #2ecc71;\n  --padding-base: 15px;\n}\n\n.bottone {\n  background-color: var(--colore-primario);\n  padding: var(--padding-base);\n  color: white;\n}\n\n.bottone.alternativo {\n  background-color: var(--colore-secondario);\n}",
        },
        {
          name: "Trasformazioni",
          description: "Applicare trasformazioni 2D e 3D agli elementi",
          syntax:
            "elemento {\n  transform: function(valore);\n}\n\n/* Funzioni di trasformazione comuni */\ntransform: translate(x, y);\ntransform: rotate(angolo);\ntransform: scale(x, y);\ntransform: skew(x-angle, y-angle);",
          example:
            ".card {\n  transition: transform 0.3s ease;\n}\n\n.card:hover {\n  transform: translateY(-10px) rotate(2deg);\n}\n\n.cubo {\n  transform: perspective(500px) rotateY(45deg);\n}",
        },
      ],
    },
    JavaScript: {
      documentation: "https://developer.mozilla.org/it/docs/Web/JavaScript",
      commands: [
        {
          name: "Variabili",
          description: "Dichiarare variabili usando let, const o var",
          syntax: "let nomeVariabile = valore;\nconst nomeConstante = valore;\nvar vecchioStileVariabile = valore;",
          example: "let contatore = 0;\nconst PI = 3.14159;\nlet nome = 'Mario';",
        },
        {
          name: "Funzioni",
          description: "Definire e chiamare funzioni",
          syntax:
            "// Dichiarazione di funzione\nfunction nomeFunzione(param1, param2) {\n  // codice\n  return valore;\n}\n\n// Funzione freccia\nconst nomeFunzione = (param1, param2) => {\n  // codice\n  return valore;\n};",
          example:
            "function somma(a, b) {\n  return a + b;\n}\n\nconst moltiplica = (a, b) => a * b;\n\nconsole.log(somma(5, 3));      // 8\nconsole.log(moltiplica(4, 2)); // 8",
        },
        {
          name: "Array",
          description: "Creare e manipolare array",
          syntax:
            "const nomeArray = [elemento1, elemento2, elemento3];\n\n// Metodi comuni per array\nnomeArray.push(elemento);     // Aggiunge alla fine\nnomeArray.pop();              // Rimuove dall'ultimo\nnomeArray.unshift(elemento);  // Aggiunge all'inizio\nnomeArray.shift();            // Rimuove dal primo\nnomeArray.slice(inizio, fine);  // Ottiene sotto",
        },
        {
          name: "Objects",
          description: "Create and use JavaScript objects",
          syntax:
            "const objectName = {\n  property1: value1,\n  property2: value2,\n  method() {\n    // code\n  }\n};",
          example:
            "const person = {\n  firstName: 'John',\n  lastName: 'Doe',\n  age: 30,\n  fullName() {\n    return this.firstName + ' ' + this.lastName;\n  }\n};\n\nconsole.log(person.fullName());  // 'John Doe'",
        },
        {
          name: "Promises",
          description: "Handle asynchronous operations",
          syntax:
            "const promise = new Promise((resolve, reject) => {\n  // Async operation\n  if (success) {\n    resolve(value);\n  } else {\n    reject(error);\n  }\n});\n\npromise\n  .then(result => {\n    // Handle success\n  })\n  .catch(error => {\n    // Handle error\n  });",
          example:
            "function fetchData(url) {\n  return fetch(url)\n    .then(response => response.json());\n}\n\nfetchData('https://api.example.com/data')\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));",
        },
      ],
    },
    TypeScript: {
      documentation: "https://www.typescriptlang.org/docs/",
      commands: [
        {
          name: "Basic Types",
          description: "Define variables with type annotations",
          syntax:
            "let variableName: type = value;\n\n// Basic types\nlet num: number = 42;\nlet str: string = 'hello';\nlet bool: boolean = true;\nlet arr: number[] = [1, 2, 3];\nlet tuple: [string, number] = ['hello', 42];\nlet any: any = 'anything';\nlet unknown: unknown = 'something';\nlet obj: object = { key: 'value' };",
          example:
            "let id: number = 101;\nlet username: string = 'johndoe';\nlet isActive: boolean = true;\nlet scores: number[] = [85, 92, 78];\nlet user: [string, number] = ['John', 30];",
        },
        {
          name: "Interfaces",
          description: "Define object shapes with interfaces",
          syntax:
            "interface InterfaceName {\n  property1: type1;\n  property2?: type2;  // Optional property\n  readonly property3: type3;  // Read-only property\n  method(param: paramType): returnType;\n}",
          example:
            "interface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number;  // Optional\n  readonly createdAt: Date;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'John Doe',\n  email: 'john@example.com',\n  createdAt: new Date()\n};",
        },
        {
          name: "Type Aliases",
          description: "Create custom type definitions",
          syntax:
            "type TypeName = baseType | otherType;\n\n// Union types\ntype ID = string | number;\n\n// Object type\ntype Person = {\n  name: string;\n  age: number;\n};",
          example:
            "type Status = 'pending' | 'approved' | 'rejected';\n\ntype User = {\n  id: number;\n  name: string;\n  status: Status;\n};\n\nconst user: User = {\n  id: 1,\n  name: 'John',\n  status: 'approved'\n};",
        },
        {
          name: "Generics",
          description: "Create reusable components with type parameters",
          syntax:
            "function functionName<T>(param: T): T {\n  return param;\n}\n\ninterface Container<T> {\n  value: T;\n}",
          example:
            "function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42);  // Returns number\nconst str = identity<string>('hello');  // Returns string\n\ninterface Box<T> {\n  contents: T;\n}\n\nconst box: Box<string> = { contents: 'hello' };",
        },
        {
          name: "Enums",
          description: "Define a set of named constants",
          syntax: "enum EnumName {\n  Value1,\n  Value2,\n  Value3 = 'custom'\n}",
          example:
            "enum Direction {\n  Up,\n  Down,\n  Left,\n  Right\n}\n\nlet dir: Direction = Direction.Up;\n\nenum HttpStatus {\n  OK = 200,\n  NotFound = 404,\n  Error = 500\n}\n\nfunction handleResponse(status: HttpStatus) {\n  if (status === HttpStatus.OK) {\n    console.log('Success');\n  }\n}",
        },
      ],
    },
    React: {
      documentation: "https://react.dev/reference/react",
      commands: [
        {
          name: "Functional Components",
          description: "Create React components using functions",
          syntax:
            "import React from 'react';\n\nfunction ComponentName(props) {\n  return (\n    <div>\n      {/* JSX content */}\n    </div>\n  );\n}\n\nexport default ComponentName;",
          example:
            "import React from 'react';\n\nfunction Greeting({ name }) {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to our app.</p>\n    </div>\n  );\n}\n\nexport default Greeting;",
        },
        {
          name: "Hooks - useState",
          description: "Manage state in functional components",
          syntax:
            "import { useState } from 'react';\n\nfunction Component() {\n  const [state, setState] = useState(initialValue);\n  \n  // Update state\n  setState(newValue);\n  // or with function\n  setState(prevState => newValue);\n}",
          example:
            "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n    </div>\n  );\n}",
        },
        {
          name: "Hooks - useEffect",
          description: "Perform side effects in functional components",
          syntax:
            "import { useEffect } from 'react';\n\nfunction Component() {\n  useEffect(() => {\n    // Side effect code\n    \n    // Optional cleanup function\n    return () => {\n      // Cleanup code\n    };\n  }, [dependencies]);\n}",
          example:
            "import { useState, useEffect } from 'react';\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    async function fetchData() {\n      try {\n        const response = await fetch('https://api.example.com/data');\n        const result = await response.json();\n        setData(result);\n      } catch (error) {\n        console.error('Error fetching data:', error);\n      } finally {\n        setLoading(false);\n      }\n    }\n    \n    fetchData();\n  }, []);\n  \n  if (loading) return <div>Loading...</div>;\n  return <div>{JSON.stringify(data)}</div>;\n}",
        },
        {
          name: "Props",
          description: "Pass data between React components",
          syntax:
            "// Parent component\nfunction Parent() {\n  return <Child propName={value} />;\n}\n\n// Child component\nfunction Child(props) {\n  return <div>{props.propName}</div>;\n}\n\n// With destructuring\nfunction Child({ propName }) {\n  return <div>{propName}</div>;\n}",
          example:
            "function ParentComponent() {\n  const user = {\n    name: 'John',\n    age: 30\n  };\n  \n  return <UserProfile user={user} isAdmin={true} />;\n}\n\nfunction UserProfile({ user, isAdmin }) {\n  return (\n    <div>\n      <h2>{user.name}</h2>\n      <p>Age: {user.age}</p>\n      {isAdmin && <button>Edit Profile</button>}\n    </div>\n  );\n}",
        },
        {
          name: "Context API",
          description: "Share state across the component tree without prop drilling",
          syntax:
            "// Create context\nconst MyContext = React.createContext(defaultValue);\n\n// Provider\nfunction Provider() {\n  const [state, setState] = useState(initialState);\n  \n  return (\n    <MyContext.Provider value={{ state, setState }}>\n      {children}\n    </MyContext.Provider>\n  );\n}\n\n// Consumer\nfunction Consumer() {\n  const { state, setState } = useContext(MyContext);\n}",
          example:
            "import { createContext, useContext, useState } from 'react';\n\n// Create context\nconst ThemeContext = createContext('light');\n\n// Provider component\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  \n  const toggleTheme = () => {\n    setTheme(theme === 'light' ? 'dark' : 'light');\n  };\n  \n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// Consumer component\nfunction ThemedButton() {\n  const { theme, toggleTheme } = useContext(ThemeContext);\n  \n  return (\n    <button\n      onClick={toggleTheme}\n      style={{\n        background: theme === 'light' ? '#fff' : '#333',\n        color: theme === 'light' ? '#333' : '#fff'\n      }}\n    >\n      Toggle Theme\n    </button>\n  );\n}",
        },
      ],
    },
    "Next.js": {
      documentation: "https://nextjs.org/docs",
      commands: [
        {
          name: "Pages Router",
          description: "Create routes with file-based routing in pages directory",
          syntax:
            "// pages/index.js - Home page\nexport default function Home() {\n  return <div>Home Page</div>;\n}\n\n// pages/about.js - About page\nexport default function About() {\n  return <div>About Page</div>;\n}\n\n// pages/posts/[id].js - Dynamic route\nexport default function Post({ id }) {\n  return <div>Post {id}</div>;\n}",
          example:
            "// pages/index.js\nimport Link from 'next/link';\n\nexport default function Home() {\n  return (\n    <div>\n      <h1>Welcome to my website</h1>\n      <Link href=\"/about\">\n        <a>About Us</a>\n      </Link>\n    </div>\n  );\n}",
        },
        {
          name: "App Router",
          description: "Create routes with the new App Router in app directory",
          syntax:
            "// app/page.tsx - Home page\nexport default function Home() {\n  return <div>Home Page</div>;\n}\n\n// app/about/page.tsx - About page\nexport default function About() {\n  return <div>About Page</div>;\n}\n\n// app/posts/[id]/page.tsx - Dynamic route\nexport default function Post({ params }: { params: { id: string } }) {\n  return <div>Post {params.id}</div>;\n}",
          example:
            '// app/layout.tsx\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>\n        <header>My Website</header>\n        <main>{children}</main>\n        <footer>© 2023</footer>\n      </body>\n    </html>\n  )\n}',
        },
        {
          name: "Data Fetching",
          description: "Fetch data in Next.js components",
          syntax:
            "// App Router - Server Component\nasync function getData() {\n  const res = await fetch('https://api.example.com/data');\n  return res.json();\n}\n\nexport default async function Page() {\n  const data = await getData();\n  return <div>{data.title}</div>;\n}\n\n// Pages Router - getServerSideProps\nexport async function getServerSideProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  \n  return { props: { data } };\n}",
          example:
            "// app/users/page.tsx\nasync function getUsers() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/users');\n  if (!res.ok) throw new Error('Failed to fetch users');\n  return res.json();\n}\n\nexport default async function UsersPage() {\n  const users = await getUsers();\n  \n  return (\n    <div>\n      <h1>Users</h1>\n      <ul>\n        {users.map((user) => (\n          <li key={user.id}>{user.name}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
        },
        {
          name: "API Routes",
          description: "Create API endpoints in Next.js",
          syntax:
            "// Pages Router - pages/api/hello.js\nexport default function handler(req, res) {\n  res.status(200).json({ message: 'Hello World' });\n}\n\n// App Router - app/api/hello/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ message: 'Hello World' });\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  return NextResponse.json({ received: body });\n}",
          example:
            "// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\n\nconst users = [\n  { id: 1, name: 'John' },\n  { id: 2, name: 'Jane' }\n];\n\nexport async function GET() {\n  return NextResponse.json(users);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const newUser = { id: users.length + 1, ...body };\n  users.push(newUser);\n  return NextResponse.json(newUser, { status: 201 });\n}",
        },
        {
          name: "Server Actions",
          description: "Create server-side functions that can be called from client components",
          syntax:
            "'use server';\n\nexport async function myAction(formData) {\n  // Server-side code\n  const name = formData.get('name');\n  // Process data, update database, etc.\n  return { success: true };\n}\n\n// In client component\nimport { myAction } from './actions';\n\nexport default function Form() {\n  return <form action={myAction}>...</form>;\n}",
          example:
            "'use server';\n\nimport { revalidatePath } from 'next/cache';\n\nexport async function addTodo(formData) {\n  const title = formData.get('title');\n  \n  // Add to database\n  await db.todos.create({ title });\n  \n  // Revalidate the todos page\n  revalidatePath('/todos');\n}\n\n// app/todos/page.js\nimport { addTodo } from './actions';\n\nexport default function Todos() {\n  return (\n    <form action={addTodo}>\n      <input name=\"title\" />\n      <button type=\"submit\">Add Todo</button>\n    </form>\n  );\n}",
        },
      ],
    },
    PHP: {
      documentation: "https://www.php.net/docs.php",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic PHP syntax and structure",
          syntax: '<?php\n  // PHP code goes here\n  echo "Hello, World!";\n?>',
          example: '<?php\n  $greeting = "Hello";\n  $name = "John";\n  echo $greeting . ", " . $name . "!";\n?>',
        },
        {
          name: "Variables",
          description: "Declare and use variables in PHP",
          syntax:
            '<?php\n  $variableName = value;\n  \n  // Variable types\n  $string = "text";\n  $integer = 42;\n  $float = 3.14;\n  $boolean = true;\n  $array = [1, 2, 3];\n  $null = null;\n?>',
          example:
            '<?php\n  $name = "John Doe";\n  $age = 30;\n  $isActive = true;\n  \n  echo "Name: $name, Age: $age";\n  \n  if ($isActive) {\n    echo "User is active";\n  }\n?>',
        },
        {
          name: "Arrays",
          description: "Create and manipulate arrays in PHP",
          syntax:
            "<?php\n  // Indexed array\n  $array = [value1, value2, value3];\n  \n  // Associative array\n  $assocArray = [\n    'key1' => value1,\n    'key2' => value2\n  ];\n  \n  // Multidimensional array\n  $multiArray = [\n    ['a', 'b', 'c'],\n    ['d', 'e', 'f']\n  ];\n?>",
          example:
            '<?php\n  // Indexed array\n  $fruits = ["apple", "banana", "orange"];\n  echo $fruits[1];  // banana\n  \n  // Associative array\n  $person = [\n    "name" => "John",\n    "age" => 30,\n    "city" => "New York"\n  ];\n  echo $person["name"];  // John\n  \n  // Loop through array\n  foreach ($fruits as $fruit) {\n    echo $fruit . "<br>";\n  }\n?>',
        },
        {
          name: "Functions",
          description: "Define and use functions in PHP",
          syntax:
            "<?php\n  function functionName($param1, $param2 = defaultValue) {\n    // Function code\n    return $result;\n  }\n  \n  // Call the function\n  $result = functionName($arg1, $arg2);\n?>",
          example:
            '<?php\n  function calculateTotal($prices, $taxRate = 0.1) {\n    $subtotal = array_sum($prices);\n    $tax = $subtotal * $taxRate;\n    return $subtotal + $tax;\n  }\n  \n  $items = [29.99, 49.99, 19.99];\n  $total = calculateTotal($items);\n  \n  echo "Total: $" . number_format($total, 2);\n?>',
        },
        {
          name: "Database Connection",
          description: "Connect to a MySQL database using PHP",
          syntax:
            '<?php\n  $servername = "localhost";\n  $username = "username";\n  $password = "password";\n  $dbname = "database";\n  \n  // Create connection\n  $conn = new mysqli($servername, $username, $password, $dbname);\n  \n  // Check connection\n  if ($conn->connect_error) {\n    die("Connection failed: " . $conn->connect_error);\n  }\n  \n  // SQL query\n  $sql = "SELECT * FROM table_name";\n  $result = $conn->query($sql);\n  \n  // Close connection\n  $conn->close();\n?>',
          example:
            '<?php\n  // Database connection\n  $conn = new mysqli("localhost", "root", "password", "mydb");\n  \n  if ($conn->connect_error) {\n    die("Connection failed: " . $conn->connect_error);\n  }\n  \n  // Query to fetch users\n  $sql = "SELECT id, name, email FROM users";\n  $result = $conn->query($sql);\n  \n  if ($result->num_rows > 0) {\n    // Output data\n    while($row = $result->fetch_assoc()) {\n      echo "ID: " . $row["id"] . " - Name: " . $row["name"] . "<br>";\n    }\n  } else {\n    echo "0 results";\n  }\n  \n  $conn->close();\n?>',
        },
      ],
    },
    Python: {
      documentation: "https://docs.python.org/3/",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic Python syntax and structure",
          syntax:
            "# This is a comment\nprint('Hello, World!')\n\n# Variables\nname = 'John'\nage = 30\n\n# Conditional\nif age > 18:\n    print('Adult')\nelse:\n    print('Minor')",
          example:
            "# Simple Python program\nname = input('Enter your name: ')\nprint(f'Hello, {name}!')\n\nage = int(input('Enter your age: '))\nif age >= 18:\n    print('You are an adult.')\nelse:\n    print('You are a minor.')",
        },
        {
          name: "Functions",
          description: "Define and use functions in Python",
          syntax:
            'def function_name(parameter1, parameter2=default_value):\n    """Docstring: explains what the function does"""\n    # Function body\n    return result\n\n# Call the function\nresult = function_name(argument1, argument2)',
          example:
            "def greet(name, greeting='Hello'):\n    \"\"\"Return a greeting message\"\"\"\n    return f'{greeting}, {name}!'\n\n# Function calls\nprint(greet('John'))  # Hello, John!\nprint(greet('Jane', 'Hi'))  # Hi, Jane!",
        },
        {
          name: "Lists",
          description: "Create and manipulate lists in Python",
          syntax:
            "# Create a list\nmy_list = [item1, item2, item3]\n\n# Access items\nfirst_item = my_list[0]  # First item\nlast_item = my_list[-1]  # Last item\n\n# Slicing\nsubset = my_list[1:3]  # Items from index 1 to 2\n\n# Common methods\nmy_list.append(item)  # Add item to end\nmy_list.insert(index, item)  # Insert at position\nmy_list.remove(item)  # Remove first occurrence\nmy_list.pop(index)  # Remove and return item at index",
          example:
            "# Working with lists\nfruits = ['apple', 'banana', 'orange']\n\n# Add items\nfruits.append('grape')\nfruits.insert(1, 'mango')\nprint(fruits)  # ['apple', 'mango', 'banana', 'orange', 'grape']\n\n# Remove items\nfruits.remove('banana')\nlast_fruit = fruits.pop()\nprint(fruits)  # ['apple', 'mango', 'orange']\n\n# List comprehension\nsquares = [x**2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]",
        },
        {
          name: "Dictionaries",
          description: "Create and use dictionaries (key-value pairs) in Python",
          syntax:
            "# Create a dictionary\nmy_dict = {\n    'key1': value1,\n    'key2': value2\n}\n\n# Access values\nvalue = my_dict['key1']\n\n# Safe access with get\nvalue = my_dict.get('key3', default_value)\n\n# Add or update\nmy_dict['key3'] = value3\n\n# Remove\ndel my_dict['key1']\n\n# Iterate\nfor key in my_dict:  # Keys\nfor key, value in my_dict.items():  # Key-value pairs",
          example:
            "# Working with dictionaries\nperson = {\n    'name': 'John',\n    'age': 30,\n    'city': 'New York'\n}\n\n# Access and modify\nprint(person['name'])  # John\nperson['email'] = 'john@example.com'\n\n# Safe access\ncountry = person.get('country', 'Unknown')\nprint(country)  # Unknown\n\n# Iterate through dictionary\nfor key, value in person.items():\n    print(f'{key}: {value}')",
        },
        {
          name: "Classes",
          description: "Define and use classes for object-oriented programming in Python",
          syntax:
            'class ClassName:\n    """Class docstring"""\n    \n    # Class variable\n    class_variable = value\n    \n    def __init__(self, param1, param2):\n        # Instance variables\n        self.param1 = param1\n        self.param2 = param2\n    \n    def method_name(self, param):\n        """Method docstring"""\n        # Method body\n        return result\n\n# Create an instance\nobject = ClassName(arg1, arg2)\n\n# Call a method\nresult = object.method_name(arg)',
          example:
            "class Person:\n    \"\"\"A simple class representing a person\"\"\"\n    \n    # Class variable\n    species = 'Human'\n    \n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f'Hello, my name is {self.name}'\n    \n    def has_birthday(self):\n        self.age += 1\n\n# Create instances\njohn = Person('John', 30)\nprint(john.greet())  # Hello, my name is John\n\n# Access and modify attributes\nprint(john.age)  # 30\njohn.has_birthday()\nprint(john.age)  # 31",
        },
      ],
    },
    Ruby: {
      documentation: "https://ruby-doc.org/",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic Ruby syntax and structure",
          syntax:
            "# This is a comment\nputs 'Hello, World!'\n\n# Variables\nname = 'John'\nage = 30\n\n# Conditional\nif age > 18\n  puts 'Adult'\nelse\n  puts 'Minor'\nend",
          example:
            "# Simple Ruby program\nprint 'Enter your name: '\nname = gets.chomp\nputs \"Hello, #{name}!\"\n\nprint 'Enter your age: '\nage = gets.chomp.to_i\nif age >= 18\n  puts 'You are an adult.'\nelse\n  puts 'You are a minor.'\nend",
        },
        {
          name: "Methods",
          description: "Define and use methods in Ruby",
          syntax:
            "def method_name(parameter1, parameter2 = default_value)\n  # Method body\n  return result\nend\n\n# Call the method\nresult = method_name(argument1, argument2)",
          example:
            "def greet(name, greeting = 'Hello')\n  \"#{greeting}, #{name}!\"\nend\n\n# Method calls\nputs greet('John')  # Hello, John!\nputs greet('Jane', 'Hi')  # Hi, Jane!\n\n# Method with block\ndef repeat(n)\n  n.times { yield }\nend\n\nrepeat(3) { puts 'Echo!' }",
        },
        {
          name: "Arrays",
          description: "Create and manipulate arrays in Ruby",
          syntax:
            "# Create an array\nmy_array = [item1, item2, item3]\n\n# Access items\nfirst_item = my_array[0]  # First item\nlast_item = my_array[-1]  # Last item\n\n# Slicing\nsubset = my_array[1..3]  # Items from index 1 to 3\n\n# Common methods\nmy_array.push(item)  # Add item to end\nmy_array.unshift(item)  # Add item to beginning\nmy_array.pop  # Remove and return last item\nmy_array.shift  # Remove and return first item",
          example:
            '# Working with arrays\nfruits = [\'apple\', \'banana\', \'orange\']\n\n# Add items\nfruits.push(\'grape\')\nfruits.unshift(\'mango\')\nputs fruits.inspect  # ["mango", "apple", "banana", "orange", "grape"]\n\n# Remove items\nfruits.pop\nfirst_fruit = fruits.shift\nputs fruits.inspect  # ["apple", "banana", "orange"]\n\n# Array iteration\nfruits.each { |fruit| puts fruit }\n\n# Array transformation\nsquares = (1..5).map { |n| n**2 }\nputs squares.inspect  # [1, 4, 9, 16, 25]',
        },
        {
          name: "Hashes",
          description: "Create and use hashes (key-value pairs) in Ruby",
          syntax:
            "# Create a hash\nmy_hash = {\n  key1: value1,\n  key2: value2\n}\n\n# Alternative syntax\nmy_hash = {\n  'key1' => value1,\n  'key2' => value2\n}\n\n# Access values\nvalue = my_hash[:key1]  # Symbol keys\nvalue = my_hash['key1']  # String keys\n\n# Add or update\nmy_hash[:key3] = value3\n\n# Remove\nmy_hash.delete(:key1)",
          example:
            "# Working with hashes\nperson = {\n  name: 'John',\n  age: 30,\n  city: 'New York'\n}\n\n# Access and modify\nputs person[:name]  # John\nperson[:email] = 'john@example.com'\n\n# Iteration\nperson.each do |key, value|\n  puts \"#{key}: #{value}\"\nend\n\n# Hash transformation\nages = { john: 30, jane: 25, bob: 40 }\nolder_ages = ages.transform_values { |age| age + 10 }\nputs older_ages.inspect  # {:john=>40, :jane=>35, :bob=>50}",
        },
        {
          name: "Classes",
          description: "Define and use classes for object-oriented programming in Ruby",
          syntax:
            "class ClassName\n  # Class variable\n  @@class_variable = value\n  \n  # Constructor\n  def initialize(param1, param2)\n    # Instance variables\n    @param1 = param1\n    @param2 = param2\n  end\n  \n  # Instance method\n  def method_name\n    # Method body\n  end\n  \n  # Getter\n  def param1\n    @param1\n  end\n  \n  # Setter\n  def param1=(value)\n    @param1 = value\n  end\n  \n  # Or use attr_accessor\n  attr_accessor :param2\nend\n\n# Create an instance\nobject = ClassName.new(arg1, arg2)",
          example:
            "class Person\n  # Class variable\n  @@count = 0\n  \n  # Getters and setters\n  attr_accessor :name\n  attr_reader :age\n  \n  def initialize(name, age)\n    @name = name\n    @age = age\n    @@count += 1\n  end\n  \n  def greet\n    \"Hello, my name is #{@name}\"\n  end\n  \n  def has_birthday\n    @age += 1\n  end\n  \n  # Class method\n  def self.count\n    @@count\n  end\nend\n\n# Create instances\njohn = Person.new('John', 30)\nputs john.greet  # Hello, my name is John\n\n# Access and modify attributes\nputs john.age  # 30\njohn.has_birthday\nputs john.age  # 31\n\n# Change name using setter\njohn.name = 'Johnny'\nputs john.name  # Johnny\n\n# Call class method\nputs Person.count  # 1",
        },
      ],
    },
    Go: {
      documentation: "https://golang.org/doc/",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic Go syntax and structure",
          syntax:
            '// This is a comment\npackage main\n\nimport (\n\t"fmt"\n)\n\nfunc main() {\n\t// Your code here\n\tfmt.Println("Hello, World!")\n\t\n\t// Variables\n\tvar name string = "John"\n\tage := 30  // Short declaration\n\t\n\t// Conditional\n\tif age > 18 {\n\t\tfmt.Println("Adult")\n\t} else {\n\t\tfmt.Println("Minor")\n\t}\n}',
          example:
            'package main\n\nimport (\n\t"fmt"\n)\n\nfunc main() {\n\t// Print a message\n\tfmt.Println("Hello, Go!")\n\t\n\t// Variables\n\tname := "John"\n\tage := 30\n\t\n\t// String formatting\n\tfmt.Printf("Name: %s, Age: %d\\n", name, age)\n\t\n\t// Conditional\n\tif age >= 18 {\n\t\tfmt.Println("You are an adult.")\n\t} else {\n\t\tfmt.Println("You are a minor.")\n\t}\n}',
        },
        {
          name: "Functions",
          description: "Define and use functions in Go",
          syntax:
            "// Function declaration\nfunc functionName(param1 type1, param2 type2) returnType {\n\t// Function body\n\treturn result\n}\n\n// Multiple return values\nfunc functionName(param type) (returnType1, returnType2) {\n\treturn value1, value2\n}\n\n// Call the function\nresult := functionName(arg1, arg2)",
          example:
            'package main\n\nimport (\n\t"fmt"\n)\n\n// Simple function\nfunc greet(name string) string {\n\treturn fmt.Sprintf("Hello, %s!", name)\n}\n\n// Function with multiple return values\nfunc divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\treturn 0, fmt.Errorf("cannot divide by zero")\n\t}\n\treturn a / b, nil\n}\n\nfunc main() {\n\t// Call simple function\n\tmessage := greet("John")\n\tfmt.Println(message)  // Hello, John!\n\t\n\t// Call function with multiple returns\n\tresult, err := divide(10, 2)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t} else {\n\t\tfmt.Println("Result:", result)  // Result: 5\n\t}\n}',
        },
        {
          name: "Slices",
          description: "Create and manipulate slices (dynamic arrays) in Go",
          syntax:
            "// Create a slice\nvar mySlice []type\n\n// Initialize with values\nmySlice := []type{value1, value2, value3}\n\n// Create with make\nmySlice := make([]type, length, capacity)\n\n// Access elements\nfirstItem := mySlice[0]\n\n// Slicing\nsubset := mySlice[1:3]  // Items from index 1 to 2\n\n// Append\nmySlice = append(mySlice, newItem)\n\n// Length and capacity\nlength := len(mySlice)\ncapacity := cap(mySlice)",
          example:
            'package main\n\nimport (\n\t"fmt"\n)\n\nfunc main() {\n\t// Create a slice\n\tfruits := []string{"apple", "banana", "orange"}\n\tfmt.Println("Fruits:", fruits)\n\t\n\t// Append to slice\n\tfruits = append(fruits, "grape", "mango")\n\tfmt.Println("After append:", fruits)\n\t\n\t// Slice operations\n\tcitrus := fruits[2:4]  // [orange grape]\n\tfmt.Println("Citrus fruits:", citrus)\n\t\n\t// Create with make\n\tnumbers := make([]int, 5)\n\tfmt.Println("Numbers:", numbers)  // [0 0 0 0 0]\n\t\n\t// Iterate over slice\n\tfor i, fruit := range fruits {\n\t\tfmt.Printf("%d: %s\\n", i, fruit)\n\t}\n}',
        },
        {
          name: "Maps",
          description: "Create and use maps (key-value pairs) in Go",
          syntax:
            "// Create a map\nvar myMap map[keyType]valueType\n\n// Initialize with values\nmyMap := map[keyType]valueType{\n\tkey1: value1,\n\tkey2: value2,\n}\n\n// Create with make\nmyMap := make(map[keyType]valueType)\n\n// Access values\nvalue := myMap[key]\n\n// Check if key exists\nvalue, exists := myMap[key]\n\n// Add or update\nmyMap[key] = value\n\n// Delete\ndelete(myMap, key)",
          example:
            'package main\n\nimport (\n\t"fmt"\n)\n\nfunc main() {\n\t// Create a map\n\tperson := map[string]string{\n\t\t"name": "John",\n\t\t"city": "New York",\n\t\t"job":  "Developer",\n\t}\n\t\n\t// Access values\n\tfmt.Println("Name:", person["name"])\n\t\n\t// Check if key exists\n\tage, exists := person["age"]\n\tif !exists {\n\t\tfmt.Println("Age not specified")\n\t}\n\t\n\t// Add or update\n\tperson["email"] = "john@example.com"\n\t\n\t// Delete\n\tdelete(person, "job")\n\t\n\t// Iterate over map\n\tfor key, value := range person {\n\t\tfmt.Printf("%s: %s\\n", key, value)\n\t}\n}',
        },
        {
          name: "Structs",
          description: "Define and use structs (custom data types) in Go",
          syntax:
            '// Define a struct\ntype StructName struct {\n\tField1 Type1\n\tField2 Type2\n\t// Tags for serialization\n\tField3 Type3 `json:"field_3"`\n}\n\n// Create an instance\nvar instance StructName\ninstance = StructName{Field1: value1, Field2: value2}\n\n// Access fields\nvalue := instance.Field1',
          example:
            'package main\n\nimport (\n\t"fmt"\n)\n\n// Define a struct\ntype Person struct {\n\tName    string\n\tAge     int\n\tAddress Address\n}\n\ntype Address struct {\n\tStreet  string\n\tCity    string\n\tCountry string\n}\n\n// Method on struct\nfunc (p Person) Greet() string {\n\treturn fmt.Sprintf("Hello, my name is %s and I am %d years old", p.Name, p.Age)\n}\n\n// Pointer receiver for modifying the struct\nfunc (p *Person) HasBirthday() {\n\tp.Age++\n}\n\nfunc main() {\n\t// Create a struct instance\n\tjohn := Person{\n\t\tName: "John",\n\t\tAge:  30,\n\t\tAddress: Address{\n\t\t\tStreet:  "123 Main St",\n\t\t\tCity:    "New York",\n\t\t\tCountry: "USA",\n\t\t},\n\t}\n\t\n\t// Access fields\n\tfmt.Println("Name:", john.Name)\n\tfmt.Println("City:", john.Address.City)\n\t\n\t// Call method\n\tfmt.Println(john.Greet())\n\t\n\t// Modify with pointer receiver method\n\tjohn.HasBirthday()\n\tfmt.Println("After birthday:", john.Age)  // 31\n}',
        },
      ],
    },
    Rust: {
      documentation: "https://doc.rust-lang.org/book/",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic Rust syntax and structure",
          syntax:
            '// This is a comment\n\nfn main() {\n    // Your code here\n    println!("Hello, World!");\n    \n    // Variables (immutable by default)\n    let name = "John";\n    let mut age = 30;  // Mutable variable\n    \n    // Conditional\n    if age > 18 {\n        println!("Adult");\n    } else {\n        println!("Minor");\n    }\n}',
          example:
            'fn main() {\n    // Print a message\n    println!("Hello, Rust!");\n    \n    // Variables\n    let name = "John";\n    let mut age = 30;\n    \n    // String formatting\n    println!("Name: {}, Age: {}", name, age);\n    \n    // Modify mutable variable\n    age += 1;\n    println!("Next year: {}", age);\n    \n    // Conditional\n    if age >= 18 {\n        println!("You are an adult.");\n    } else {\n        println!("You are a minor.");\n    }\n}',
        },
        {
          name: "Functions",
          description: "Define and use functions in Rust",
          syntax:
            "// Function declaration\nfn function_name(param1: Type1, param2: Type2) -> ReturnType {\n    // Function body\n    return result;\n    // Or just write the expression for implicit return\n    result\n}\n\n// Call the function\nlet result = function_name(arg1, arg2);",
          example:
            'fn main() {\n    // Call simple function\n    let message = greet("John");\n    println!("{}", message);  // Hello, John!\n    \n    // Call function with multiple parameters\n    let sum = add(5, 7);\n    println!("Sum: {}", sum);  // Sum: 12\n    \n    // Function with early return\n    let result = divide(10.0, 2.0);\n    match result {\n        Ok(value) => println!("Result: {}", value),  // Result: 5\n        Err(e) => println!("Error: {}", e),\n    }\n}\n\n// Simple function\nfn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n\n// Function with multiple parameters\nfn add(a: i32, b: i32) -> i32 {\n    a + b  // Implicit return\n}\n\n// Function with Result type for error handling\nfn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        return Err(String::from("cannot divide by zero"));\n    }\n    Ok(a / b)\n}',
        },
        {
          name: "Vectors",
          description: "Create and manipulate vectors (dynamic arrays) in Rust",
          syntax:
            "// Create an empty vector\nlet mut vec: Vec<Type> = Vec::new();\n\n// Initialize with values\nlet vec = vec![value1, value2, value3];\n\n// Access elements\nlet first = &vec[0];  // Panics if out of bounds\nlet first = vec.get(0);  // Returns Option<&T>\n\n// Add elements\nvec.push(value);\n\n// Remove elements\nlet last = vec.pop();  // Returns Option<T>\n\n// Iterate\nfor item in &vec {\n    // Use item\n}",
          example:
            'fn main() {\n    // Create a vector\n    let mut fruits = vec!["apple", "banana", "orange"];\n    println!("Fruits: {:?}", fruits);\n    \n    // Add to vector\n    fruits.push("grape");\n    fruits.push("mango");\n    println!("After push: {:?}", fruits);\n    \n    // Access elements\n    let first = &fruits[0];\n    println!("First fruit: {}", first);\n    \n    // Safe access with get\n    match fruits.get(10) {\n        Some(fruit) => println!("Fruit at index 10: {}", fruit),\n        None => println!("No fruit at index 10"),\n    }\n    \n    // Remove last element\n    if let Some(last) = fruits.pop() {\n        println!("Removed: {}", last);\n    }\n    \n    // Iterate over vector\n    for (i, fruit) in fruits.iter().enumerate() {\n        println!("{}: {}", i, fruit);\n    }\n}',
        },
        {
          name: "Structs",
          description: "Define and use structs (custom data types) in Rust",
          syntax:
            "// Define a struct\nstruct StructName {\n    field1: Type1,\n    field2: Type2,\n}\n\n// Implementation block\nimpl StructName {\n    // Constructor (convention)\n    fn new(field1: Type1, field2: Type2) -> Self {\n        StructName {\n            field1,\n            field2,\n        }\n    }\n    \n    // Method\n    fn method_name(&self) -> ReturnType {\n        // Method body\n    }\n    \n    // Mutable method\n    fn mutate(&mut self) {\n        // Modify self\n    }\n}\n\n// Create an instance\nlet instance = StructName {\n    field1: value1,\n    field2: value2,\n};\n\n// Or using constructor\nlet instance = StructName::new(value1, value2);",
          example:
            'struct Person {\n    name: String,\n    age: u32,\n    address: Address,\n}\n\nstruct Address {\n    street: String,\n    city: String,\n    country: String,\n}\n\nimpl Person {\n    // Constructor\n    fn new(name: &str, age: u32, address: Address) -> Self {\n        Person {\n            name: String::from(name),\n            age,\n            address,\n        }\n    }\n    \n    // Method\n    fn greet(&self) -> String {\n        format!("Hello, my name is {} and I am {} years old", self.name, self.age)\n    }\n    \n    // Mutable method\n    fn have_birthday(&mut self) {\n        self.age += 1;\n    }\n}\n\nfn main() {\n    // Create a struct instance\n    let mut john = Person {\n        name: String::from("John"),\n        age: 30,\n        address: Address {\n            street: String::from("123 Main St"),\n            city: String::from("New York"),\n            country: String::from("USA"),\n        },\n    };\n    \n    // Access fields\n    println!("Name: {}", john.name);\n    println!("City: {}", john.address.city);\n    \n    // Call method\n    println!("{}", john.greet());\n    \n    // Modify with mutable method\n    john.have_birthday();\n    println!("After birthday: {}", john.age);  // 31\n}',
        },
        {
          name: "Error Handling",
          description: "Handle errors in Rust using Result and Option types",
          syntax:
            "// Result type for operations that can fail\nfn might_fail() -> Result<SuccessType, ErrorType> {\n    if success {\n        Ok(value)\n    } else {\n        Err(error)\n    }\n}\n\n// Using Result\nmatch might_fail() {\n    Ok(value) => { /* Handle success */ },\n    Err(error) => { /* Handle error */ },\n}\n\n// Propagating errors with ?\nfn function() -> Result<SuccessType, ErrorType> {\n    let value = might_fail()?;  // Returns error if might_fail returns Err\n    Ok(value)\n}\n\n// Option type for values that might not exist\nfn might_be_absent() -> Option<ValueType> {\n    if has_value {\n        Some(value)\n    } else {\n        None\n    }\n}",
          example:
            'use std::fs::File;\nuse std::io::{self, Read};\n\n// Function that returns a Result\nfn read_file_contents(path: &str) -> Result<String, io::Error> {\n    let mut file = File::open(path)?;  // ? operator propagates error\n    let mut contents = String::new();\n    file.read_to_string(&mut contents)?;\n    Ok(contents)\n}\n\nfn main() {\n    // Using match with Result\n    match read_file_contents("example.txt") {\n        Ok(contents) => println!("File contents: {}", contents),\n        Err(error) => println!("Error reading file: {}", error),\n    }\n    \n    // Using if let with Option\n    let numbers = vec![1, 2, 3];\n    let first = numbers.first();\n    \n    if let Some(value) = first {\n        println!("First number: {}", value);\n    } else {\n        println!("Vector is empty");\n    }\n    \n    // Unwrap (panics if None/Err)\n    // Use only when you\'re certain the operation won\'t fail\n    let contents = read_file_contents("example.txt").unwrap();\n    \n    // Providing a default with unwrap_or\n    let maybe_value: Option<i32> = None;\n    let value = maybe_value.unwrap_or(42);\n    println!("Value: {}", value);  // Value: 42\n}',
        },
      ],
    },
    Swift: {
      documentation: "https://swift.org/documentation/",
      commands: [
        {
          name: "Basic Syntax",
          description: "Basic Swift syntax and structure",
          syntax:
            '// This is a comment\n\n// Print to console\nprint("Hello, World!")\n\n// Variables and constants\nvar name = "John"  // Variable (mutable)\nlet age = 30      // Constant (immutable)\n\n// Type annotations\nvar score: Int = 100\nvar average: Double = 85.5\nvar message: String = "Hello"\nvar isActive: Bool = true\n\n// Conditional\nif age > 18 {\n    print("Adult")\n} else {\n    print("Minor")\n}',
          example:
            '// Simple Swift program\nlet name = "John"\nlet age = 30\n\n// String interpolation\nprint("Hello, my name is \\(name) and I am \\(age) years old.")\n\n// Conditional with multiple branches\nif age < 13 {\n    print("Child")\n} else if age < 20 {\n    print("Teenager")\n} else {\n    print("Adult")\n}\n\n// Optional binding\nvar optionalName: String? = "John"\nif let unwrappedName = optionalName {\n    print("Name: \\(unwrappedName)")\n} else {\n    print("No name provided")\n}',
        },
        {
          name: "Functions",
          description: "Define and use functions in Swift",
          syntax:
            '// Function declaration\nfunc functionName(paramName: ParamType) -> ReturnType {\n    // Function body\n    return value\n}\n\n// Function with default parameter\nfunc greet(name: String, greeting: String = "Hello") -> String {\n    return "\\(greeting), \\(name)!"\n}\n\n// Function calls\nprint(greet(name: "John"))  // Hello, John!\nprint(greet(name: "Jane", greeting: "Hi"))  // Hi, Jane!\n\n// Function with multiple parameters\nfunc calculateStats(numbers: [Int]) -> (min: Int, max: Int, sum: Int) {\n    var min = numbers[0]\n    var max = numbers[0]\n    var sum = 0\n    \n    for number in numbers {\n        min = min < number ? min : number\n        max = max > number ? max : number\n        sum += number\n    }\n    \n    return (min, max, sum)\n}\n\n// Using tuple return value\nlet numbers = [5, 3, 8, 1, 9]\nlet stats = calculateStats(numbers: numbers)\nprint("Min: \\(stats.min), Max: \\(stats.max), Sum: \\(stats.sum)")',
        },
        {
          name: "Arrays",
          description: "Create and manipulate arrays in Swift",
          syntax:
            "// Create an array\nvar emptyArray: [Type] = []\nvar emptyArray = [Type]()\n\n// Initialize with values\nvar items = [value1, value2, value3]\n\n// Typed array\nvar numbers: [Int] = [1, 2, 3, 4]\n\n// Access elements\nlet firstItem = items[0]\n\n// Add elements\nitems.append(value)\nitems.insert(value, at: index)\n\n// Remove elements\nlet removed = items.remove(at: index)\nitems.removeLast()\n\n// Array operations\nlet count = items.count\nlet isEmpty = items.isEmpty\nlet contains = items.contains(value)",
          example:
            '// Create arrays\nvar fruits = ["apple", "banana", "orange"]\nvar numbers: [Int] = [1, 2, 3, 4, 5]\n\n// Access elements\nprint("First fruit: \\(fruits[0])")\n\n// Modify arrays\nfruits.append("grape")\nfruits.insert("mango", at: 1)\nprint("Fruits: \\(fruits)")\n\n// Remove elements\nlet removed = fruits.remove(at: 2)\nprint("Removed: \\(removed)")\nprint("Fruits after removal: \\(fruits)")\n\n// Array operations\nprint("Number of fruits: \\(fruits.count)")\nprint("Contains banana? \\(fruits.contains("banana"))")\n\n// Iterate through array\nfor fruit in fruits {\n    print(fruit)\n}\n\n// Iterate with index\nfor (index, fruit) in fruits.enumerated() {\n    print("\\(index): \\(fruit)")\n}\n\n// Transform array\nlet uppercasedFruits = fruits.map { $0.uppercased() }\nprint("Uppercased: \\(uppercasedFruits)")',
        },
        {
          name: "Dictionaries",
          description: "Create and use dictionaries (key-value pairs) in Swift",
          syntax:
            "// Create a dictionary\nvar emptyDict: [KeyType: ValueType] = [:]\nvar emptyDict = [KeyType: ValueType]()\n\n// Initialize with values\nvar dict = [\n    key1: value1,\n    key2: value2,\n    key3: value3\n]\n\n// Access values\nlet value = dict[key]  // Returns optional\n\n// Add or update\ndict[key] = value\n\n// Remove\ndict[key] = nil\nlet removedValue = dict.removeValue(forKey: key)\n\n// Dictionary operations\nlet count = dict.count\nlet isEmpty = dict.isEmpty\nlet keys = Array(dict.keys)\nlet values = Array(dict.values)",
          example:
            '// Create a dictionary\nvar person = [\n    "name": "John",\n    "age": "30",\n    "city": "New York"\n]\n\n// Access values (returns optional)\nif let name = person["name"] {\n    print("Name: \\(name)")\n}\n\n// Add or update\nperson["email"] = "john@example.com"\nperson["age"] = "31"\n\n// Remove\nperson["city"] = nil\n\n// Dictionary operations\nprint("Number of entries: \\(person.count)")\nprint("Keys: \\(Array(person.keys))")\n\n// Iterate through dictionary\nfor (key, value) in person {\n    print("\\(key): \\(value)")\n}\n\n// Typed dictionary\nvar scores: [String: Int] = [\n    "John": 85,\n    "Jane": 92,\n    "Bob": 78\n]\n\n// Calculate average\nlet total = scores.values.reduce(0, +)\nlet average = Double(total) / Double(scores.count)\nprint("Average score: \\(average)")',
        },
        {
          name: "Classes and Structs",
          description: "Define and use classes and structs in Swift",
          syntax:
            "// Define a class\nclass ClassName {\n    // Properties\n    var property1: Type\n    let property2: Type\n    \n    // Initializer\n    init(property1: Type, property2: Type) {\n        self.property1 = property1\n        self.property2 = property2\n    }\n    \n    // Methods\n    func methodName() -> ReturnType {\n        // Method body\n    }\n}\n\n// Define a struct\nstruct StructName {\n    // Properties\n    var property1: Type\n    let property2: Type\n    \n    // Methods\n    func methodName() -> ReturnType {\n        // Method body\n    }\n    \n    // Mutating method (can modify properties)\n    mutating func update() {\n        property1 = newValue\n    }\n}\n\n// Create instances\nlet classInstance = ClassName(property1: value1, property2: value2)\nlet structInstance = StructName(property1: value1, property2: value2)",
          example:
            '// Define a class\nclass Person {\n    // Properties\n    var name: String\n    var age: Int\n    \n    // Initializer\n    init(name: String, age: Int) {\n        self.name = name\n        self.age = age\n    }\n    \n    // Method\n    func greet() -> String {\n        return "Hello, my name is \\(name) and I am \\(age) years old."\n    }\n    \n    // Method that modifies properties\n    func haveBirthday() {\n        age += 1\n    }\n}\n\n// Define a struct\nstruct Point {\n    var x: Double\n    var y: Double\n    \n    // Method\n    func distanceFromOrigin() -> Double {\n        return sqrt(x*x + y*y)\n    }\n    \n    // Mutating method\n    mutating func moveBy(dx: Double, dy: Double) {\n        x += dx\n        y += dy\n    }\n}\n\n// Using the class\nlet john = Person(name: "John", age: 30)\nprint(john.greet())\njohn.haveBirthday()\nprint("After birthday: \\(john.age)")  // 31\n\n// Using the struct\nvar point = Point(x: 3.0, y: 4.0)\nprint("Distance: \\(point.distanceFromOrigin())")  // 5.0\npoint.moveBy(dx: 2.0, dy: 3.0)\nprint("New position: (\\(point.x), \\(point.y))")  // (5.0, 7.0)',
        },
      ],
    },
  },
}

// Aggiungiamo una funzione di utilità per verificare la validità dei dati
export function validateProgrammingData() {
  if (!programmingData || typeof programmingData !== "object") {
    console.error("programmingData non è un oggetto valido")
    return false
  }

  if (!programmingData.languages || typeof programmingData.languages !== "object") {
    console.error("programmingData.languages non è un oggetto valido")
    return false
  }

  return true
}
