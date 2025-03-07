"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { SelectSource } from "@/db/schema"
import { Settings } from "lucide-react"

interface SidebarNavProps {
  sources: SelectSource[]
  currentSource?: string
}

export default function SidebarNav({ sources, currentSource }: SidebarNavProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <h2 className="font-semibold mb-4">Sources</h2>

        <Link
          href="/"
          className={cn(
            "flex items-center w-full px-2 py-1.5 text-sm transition-colors rounded-lg hover:bg-muted",
            !currentSource && "bg-muted"
          )}
        >
          All Sources
        </Link>

        <div className="ml-2 pl-2 mt-1 flex flex-col gap-1 border-l">
          {sources.map((source) => {
            const isActive = currentSource === source.slug
            const colorClasses = {
              blue: "bg-blue-500",
              purple: "bg-purple-500",
              green: "bg-green-500",
              orange: "bg-orange-500",
              pink: "bg-pink-500",
              yellow: "bg-yellow-500",
              teal: "bg-teal-500",
              red: "bg-red-500",
              indigo: "bg-indigo-500"
            }

            return (
              <div key={source.id} className="w-full">
                <Link
                  href={`/?source=${source.slug}`}
                  className={cn(
                    "flex items-center gap-2 w-full px-2 py-1.5 text-sm transition-colors rounded-lg hover:bg-muted",
                    isActive && "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      colorClasses[source.color as keyof typeof colorClasses]
                    )}
                  />
                  {source.name}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-1.5 text-sm transition-colors rounded-lg hover:bg-muted"
        >
          <Settings className="h-4 w-4" />
          Manage Sources
        </Link>
      </div>
    </div>
  )
} 