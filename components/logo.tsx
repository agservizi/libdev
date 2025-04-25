import { Code2 } from "lucide-react"
import Link from "next/link"

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline">
      <div
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 text-white ${
          size === "large" ? "h-14 w-14" : "h-10 w-10"
        }`}
      >
        <Code2 className={size === "large" ? "h-8 w-8" : "h-6 w-6"} />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight leading-none ${size === "large" ? "text-4xl" : "text-xl"}`}>
          Lib<span className="text-blue-600 dark:text-blue-400">Dev</span>
        </span>
        {size === "large" && <span className="text-sm text-muted-foreground">Il tuo assistente di programmazione</span>}
      </div>
    </Link>
  )
}
