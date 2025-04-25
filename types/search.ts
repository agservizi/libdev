export interface Command {
  syntax: string
  description: string
}

export interface Example {
  title: string
  code: string
}

export interface Resource {
  title: string
  url: string
}

export interface Category {
  name: string
  commands: Command[]
}

export interface SearchResult {
  id: string
  title: string
  description: string
  icon: "code" | "book" | "link"
  colorClass: string
  categories?: Category[]
  commands?: Command[]
  examples?: Example[]
  resources?: Resource[]
  relevance?: number
}
