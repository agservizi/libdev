"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqAccordionProps {
  faqs: Array<{
    id: string
    question: string
    answer: string
  }>
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <Accordion type="multiple" value={openItems} className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger
            onClick={() => toggleItem(faq.id)}
            className="text-left font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <p>{faq.answer}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
