import { type NextRequest, NextResponse } from "next/server"

// Dati statici per le FAQ
const faqData = {
  categories: [
    {
      id: "general",
      name: "Generale",
      faqs: [
        {
          id: "what-is-libdev",
          question: "Cos'è LibDev?",
          answer:
            "LibDev è un assistente di programmazione che ti aiuta a trovare rapidamente sintassi, comandi ed esempi di vari linguaggi di programmazione. È progettato per essere uno strumento di riferimento rapido per sviluppatori di tutti i livelli.",
        },
        {
          id: "is-libdev-free",
          question: "LibDev è gratuito?",
          answer:
            "Sì, LibDev è completamente gratuito da utilizzare. Non ci sono costi nascosti o funzionalità premium a pagamento.",
        },
        {
          id: "supported-languages",
          question: "Quali linguaggi di programmazione sono supportati?",
          answer:
            "Attualmente supportiamo HTML, CSS, JavaScript, TypeScript, React, Next.js, PHP, Python, Ruby, Go, Rust e Swift. Stiamo costantemente aggiungendo nuovi linguaggi e framework.",
        },
      ],
    },
    {
      id: "usage",
      name: "Utilizzo",
      faqs: [
        {
          id: "how-to-search",
          question: "Come posso cercare un comando specifico?",
          answer:
            "Puoi utilizzare la barra di ricerca nella home page per cercare qualsiasi linguaggio, comando o sintassi. I risultati verranno filtrati in tempo reale mentre digiti.",
        },
        {
          id: "save-commands",
          question: "Posso salvare i comandi per consultarli in seguito?",
          answer:
            "Sì, puoi salvare i comandi nei preferiti cliccando sull'icona del segnalibro accanto a ciascun comando. I comandi salvati saranno disponibili nella sezione 'Preferiti' (funzionalità in arrivo).",
        },
        {
          id: "share-commands",
          question: "Posso condividere un comando con altri?",
          answer:
            "Sì, ogni comando ha un'opzione di condivisione che ti permette di copiare un link diretto al comando o condividerlo sui social media.",
        },
      ],
    },
    {
      id: "technical",
      name: "Tecnico",
      faqs: [
        {
          id: "data-source",
          question: "Da dove provengono i dati di LibDev?",
          answer:
            "I dati di LibDev sono curati dal nostro team e provengono da documentazioni ufficiali, guide e best practices riconosciute dalla comunità. Ci assicuriamo che tutte le informazioni siano accurate e aggiornate.",
        },
        {
          id: "offline-use",
          question: "Posso utilizzare LibDev offline?",
          answer:
            "Attualmente LibDev richiede una connessione internet per funzionare. Stiamo valutando la possibilità di implementare una modalità offline in futuro.",
        },
        {
          id: "api-available",
          question: "LibDev offre un'API pubblica?",
          answer:
            "Non ancora, ma stiamo lavorando per rendere disponibile un'API pubblica che permetterà agli sviluppatori di integrare i dati di LibDev nelle loro applicazioni.",
        },
      ],
    },
    {
      id: "contribute",
      name: "Contribuire",
      faqs: [
        {
          id: "how-to-contribute",
          question: "Come posso contribuire a LibDev?",
          answer:
            "Apprezziamo i contributi della comunità! Puoi contribuire segnalando errori, suggerendo miglioramenti o aggiungendo nuovi comandi e linguaggi. Contattaci all'indirizzo contributi@libdev.it per maggiori informazioni.",
        },
        {
          id: "report-error",
          question: "Ho trovato un errore nei dati, come posso segnalarlo?",
          answer:
            "Puoi segnalare errori o imprecisioni utilizzando il pulsante 'Segnala un errore' presente in ogni comando, oppure inviando un'email a errori@libdev.it con i dettagli del problema.",
        },
      ],
    },
  ],
}

// GET - Ottieni tutte le FAQ
export async function GET(request: NextRequest) {
  try {
    // Opzionalmente, filtra per categoria se specificato nell'URL
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    if (category) {
      const categoryData = faqData.categories.find((cat) => cat.id === category)
      if (!categoryData) {
        return NextResponse.json({ error: `Categoria '${category}' non trovata` }, { status: 404 })
      }
      return NextResponse.json({ category: categoryData })
    }

    return NextResponse.json(faqData)
  } catch (error) {
    console.error("Errore durante il recupero delle FAQ:", error)
    return NextResponse.json(
      { error: true, message: "Si è verificato un errore durante il recupero delle FAQ" },
      { status: 500 },
    )
  }
}

// POST - Aggiungi una nuova FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categoryId, question, answer } = body

    if (!categoryId || !question || !answer) {
      return NextResponse.json({ error: "Dati mancanti. Richiesti: categoryId, question, answer" }, { status: 400 })
    }

    // In un sistema reale, qui salveresti la FAQ nel database
    // Per questa demo, restituiamo semplicemente un successo

    return NextResponse.json(
      {
        message: "FAQ aggiunta con successo",
        faq: {
          id: `faq-${Date.now()}`,
          question,
          answer,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Errore durante l'aggiunta della FAQ:", error)
    return NextResponse.json({ error: "Errore durante l'elaborazione della richiesta" }, { status: 500 })
  }
}
