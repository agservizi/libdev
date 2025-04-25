// Configurazioni predefinite per Prettier
export const prettierConfig = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  proseWrap: "preserve",
  requirePragma: false,
  vueIndentScriptAndStyle: false,
} as const

// Configurazioni specifiche per ogni linguaggio
export const languageConfigs: Record<string, any> = {
  html: {
    parser: "html",
  },
  css: {
    parser: "css",
  },
  javascript: {
    parser: "babel",
  },
  typescript: {
    parser: "typescript",
  },
  jsx: {
    parser: "babel",
  },
  tsx: {
    parser: "typescript",
  },
  json: {
    parser: "json",
  },
  markdown: {
    parser: "markdown",
  },
}

// Funzione per ottenere la configurazione per un linguaggio specifico
export function getPrettierConfig(language: string) {
  return {
    ...prettierConfig,
    ...(languageConfigs[language] || {}),
  }
}
