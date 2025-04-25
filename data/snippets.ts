"use client"

// Definizione dei tipi
interface Snippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
}

// Snippet predefiniti
export const PREDEFINED_SNIPPETS: Snippet[] = [
  // HTML Snippets
  {
    id: "html-boilerplate",
    title: "HTML Boilerplate",
    description: "Struttura base HTML5",
    code: `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Titolo Documento</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Titolo Pagina</h1>
  </header>
  <main>
    <p>Contenuto principale</p>
  </main>
  <footer>
    <p>&copy; 2023 Il Mio Sito</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    language: "html",
    category: "Struttura",
  },
  {
    id: "html-form",
    title: "Form HTML",
    description: "Form di contatto con validazione",
    code: `<form action="/submit" method="post">
  <div class="form-group">
    <label for="name">Nome:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Messaggio:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit">Invia</button>
</form>`,
    language: "html",
    category: "Form",
  },
  {
    id: "html-table",
    title: "Tabella HTML",
    description: "Tabella con intestazione e corpo",
    code: `<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Cognome</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mario</td>
      <td>Rossi</td>
      <td>mario.rossi@example.com</td>
    </tr>
    <tr>
      <td>Giulia</td>
      <td>Bianchi</td>
      <td>giulia.bianchi@example.com</td>
    </tr>
  </tbody>
</table>`,
    language: "html",
    category: "Tabelle",
  },

  // CSS Snippets
  {
    id: "css-flexbox",
    title: "Flexbox Layout",
    description: "Layout responsive con Flexbox",
    code: `.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  flex: 0 0 calc(33.333% - 20px);
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .item {
    flex: 0 0 calc(50% - 15px);
  }
}

@media (max-width: 480px) {
  .item {
    flex: 0 0 100%;
  }
}`,
    language: "css",
    category: "Layout",
  },
  {
    id: "css-grid",
    title: "CSS Grid Layout",
    description: "Layout a griglia responsive",
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.grid-item {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}`,
    language: "css",
    category: "Layout",
  },
  {
    id: "css-animation",
    title: "Animazione CSS",
    description: "Animazione con keyframes",
    code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  animation: fadeIn 0.5s ease-out forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }`,
    language: "css",
    category: "Animazioni",
  },

  // JavaScript Snippets
  {
    id: "js-fetch",
    title: "Fetch API",
    description: "Richiesta dati con Fetch API",
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`Errore HTTP! Stato: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore durante il fetch:', error);
    throw error;
  }
}

// Esempio di utilizzo
fetchData('https://api.example.com/data')
  .then(data => {
    console.log('Dati ricevuti:', data);
    // Elabora i dati
  })
  .catch(error => {
    console.error('Errore:', error);
    // Gestisci l'errore
  });`,
    language: "javascript",
    category: "API",
  },
  {
    id: "js-localstorage",
    title: "LocalStorage",
    description: "Gestione dati con LocalStorage",
    code: `// Funzioni per gestire il localStorage
const storage = {
  // Salva un valore
  save: function(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
      return false;
    }
  },
  
  // Recupera un valore
  load: function(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Errore durante il caricamento:', error);
      return null;
    }
  },
  
  // Rimuove un valore
  remove: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Errore durante la rimozione:', error);
      return false;
    }
  },
  
  // Pulisce tutto il localStorage
  clear: function() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Errore durante la pulizia:', error);
      return false;
    }
  }
};

// Esempio di utilizzo
const user = { id: 1, name: 'Mario', preferences: { theme: 'dark' } };
storage.save('user', user);

const savedUser = storage.load('user');
console.log(savedUser);`,
    language: "javascript",
    category: "Storage",
  },
  {
    id: "js-debounce",
    title: "Debounce Function",
    description: "Funzione per limitare le chiamate frequenti",
    code: `/**
 * Crea una versione debounced di una funzione
 * @param {Function} func - La funzione da eseguire
 * @param {number} wait - Il tempo di attesa in millisecondi
 * @returns {Function} - La funzione debounced
 */
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Esempio di utilizzo
const handleSearch = debounce(function(event) {
  const searchTerm = event.target.value;
  console.log('Ricerca per:', searchTerm);
  // Esegui la ricerca
}, 300);

// Aggiungi l'event listener
document.getElementById('search').addEventListener('input', handleSearch);`,
    language: "javascript",
    category: "Utility",
  },

  // TypeScript Snippets
  {
    id: "ts-interface",
    title: "TypeScript Interface",
    description: "Definizione di interfacce in TypeScript",
    code: `// Definizione di un'interfaccia base
interface Persona {
  id: number;
  nome: string;
  cognome: string;
  email?: string; // Proprietà opzionale
  readonly dataNascita: Date; // Proprietà di sola lettura
}

// Estensione di un'interfaccia
interface Dipendente extends Persona {
  ruolo: string;
  stipendio: number;
  dipartimento: string;
}

// Implementazione
const dipendente: Dipendente = {
  id: 1,
  nome: 'Mario',
  cognome: 'Rossi',
  email: 'mario.rossi@example.com',
  dataNascita: new Date(1985, 3, 12),
  ruolo: 'Sviluppatore',
  stipendio: 45000,
  dipartimento: 'IT'
};

// Funzione che utilizza l'interfaccia
function mostraDipendente(dip: Dipendente): string {
  return \`\${dip.nome} \${dip.cognome} (\${dip.ruolo})\`;
}

console.log(mostraDipendente(dipendente));`,
    language: "typescript",
    category: "Tipi",
  },
  {
    id: "ts-generics",
    title: "TypeScript Generics",
    description: "Utilizzo di generics in TypeScript",
    code: `// Funzione generica
function primoElemento<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

const numeri = [1, 2, 3, 4, 5];
const stringhe = ['a', 'b', 'c'];

const primoNumero = primoElemento(numeri); // tipo: number
const primaStringa = primoElemento(stringhe); // tipo: string

// Classe generica
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

// Utilizzo della classe generica
interface Prodotto {
  id: number;
  nome: string;
  prezzo: number;
}

const prodotti = new Collezione<Prodotto>();
prodotti.aggiungi({ id: 1, nome: 'Laptop', prezzo: 999.99 });
prodotti.aggiungi({ id: 2, nome: 'Smartphone', prezzo: 499.50 });

console.log(prodotti.conteggio()); // 2
console.log(prodotti.ottieni(0)); // { id: 1, nome: 'Laptop', prezzo: 999.99 }`,
    language: "typescript",
    category: "Tipi",
  },

  // React (JSX) Snippets
  {
    id: "jsx-component",
    title: "Componente Funzionale React",
    description: "Componente funzionale con hooks",
    code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, count]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsActive(false);
  };

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="buttons">
        {!isActive ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;`,
    language: "jsx",
    category: "Componenti",
  },
  {
    id: "jsx-form",
    title: "Form in React",
    description: "Gestione form con React",
    code: `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\\'email è obbligatoria';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Invia i dati del form
      console.log('Form inviato:', formData);
      setIsSubmitted(true);
      
      // Reset form dopo l'invio
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className="form-container">
      {isSubmitted ? (
        <div className="success-message">
          <h2>Grazie per il tuo messaggio!</h2>
          <p>Ti risponderemo al più presto.</p>
          <button onClick={() => setIsSubmitted(false)}>Invia un altro messaggio</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Contattaci</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Messaggio</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          <button type="submit">Invia Messaggio</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;`,
    language: "jsx",
    category: "Form",
  },

  // PHP Snippets
  {
    id: "php-class",
    title: "Classe PHP",
    description: "Definizione di una classe in PHP",
    code: `<?php
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

// Utilizzo della classe
$prodotto = new Prodotto(1, 'Laptop', 999.99);
echo $prodotto->getNome() . ': ' . $prodotto->getPrezzoFormattato();
?>`,
    language: "php",
    category: "OOP",
  },
  {
    id: "php-database",
    title: "Connessione Database",
    description: "Connessione a MySQL con PDO",
    code: `<?php
// Parametri di connessione
$host = 'localhost';
$dbname = 'nome_database';
$username = 'username';
$password = 'password';

try {
    // Crea una nuova connessione PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Imposta la modalità di errore su exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepara e esegue una query
    $stmt = $pdo->prepare("SELECT * FROM utenti WHERE attivo = :attivo");
    $stmt->execute(['attivo' => true]);
    
    // Recupera i risultati
    $utenti = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Visualizza i risultati
    foreach ($utenti as $utente) {
        echo "ID: " . $utente['id'] . ", Nome: " . $utente['nome'] . "<br>";
    }
} catch (PDOException $e) {
    // Gestisce gli errori
    echo "Errore di connessione: " . $e->getMessage();
}

// Chiude la connessione
$pdo = null;
?>`,
    language: "php",
    category: "Database",
  },
]
