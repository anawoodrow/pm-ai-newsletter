"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { SelectSource } from "@/db/schema"
import { Settings } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"

interface SidebarNavProps {
  sources: SelectSource[]
}

export default function SidebarNav({ sources }: SidebarNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSource = searchParams.get("source")

  return (
    <nav className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              !currentSource
                ? "bg-secondary"
                : "hover:bg-secondary/50 transition-colors"
            )}
          >
            All Sources
          </Link>

          {sources.map((source) => (
            <Link
              key={source.slug}
              href={`/?source=${source.slug}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                currentSource === source.slug
                  ? "bg-secondary"
                  : "hover:bg-secondary/50 transition-colors"
              )}
            >
              {source.color && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
              )}
              {source.name}
            </Link>
          ))}
        </div>

        <div className="p-6 border-t">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              pathname === "/settings"
                ? "bg-secondary"
                : "hover:bg-secondary/50 transition-colors"
            )}
          >
            <Settings className="h-4 w-4" />
            Manage Sources
          </Link>
        </div>
      </div>
    </nav>
  )
} 