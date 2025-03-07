"use client"

import { SelectArticle } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { getColorBySource, availableColors } from "@/lib/colors"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ArticleListProps {
  articles: (SelectArticle & { sourceColor: string | null })[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    try {
      setIsRefreshing(true)
      router.refresh()
    } catch (error) {
      console.error("Error refreshing articles:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Articles
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const color = article.sourceColor || 'gray' // Fallback to gray if no color is set
          const colorClasses = {
            blue: 'border-l-4 border-l-blue-500 dark:border-l-blue-400',
            purple: 'border-l-4 border-l-purple-500 dark:border-l-purple-400',
            green: 'border-l-4 border-l-green-500 dark:border-l-green-400',
            orange: 'border-l-4 border-l-orange-500 dark:border-l-orange-400',
            pink: 'border-l-4 border-l-pink-500 dark:border-l-pink-400',
            yellow: 'border-l-4 border-l-yellow-500 dark:border-l-yellow-400',
            teal: 'border-l-4 border-l-teal-500 dark:border-l-teal-400',
            red: 'border-l-4 border-l-red-500 dark:border-l-red-400',
            indigo: 'border-l-4 border-l-indigo-500 dark:border-l-indigo-400',
            gray: 'border-l-4 border-l-gray-500 dark:border-l-gray-400'
          }
          
          return (
            <Card
              key={article.id}
              className={cn(
                "relative flex flex-col gap-4 p-6 transition-colors hover:bg-muted/50 min-h-[280px]",
                colorClasses[color as keyof typeof colorClasses]
              )}
            >
              <h3 className="font-semibold text-xl leading-tight line-clamp-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {article.title}
                </a>
              </h3>

              <p className="line-clamp-3 text-muted-foreground text-base leading-relaxed">
                {article.description}
              </p>

              <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t">
                <p className="text-sm font-medium">
                  {article.source}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(article.publishedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 