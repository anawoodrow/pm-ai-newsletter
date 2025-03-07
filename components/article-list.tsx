"use client"

import { SelectArticle } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="relative flex flex-col gap-4 p-6 transition-colors hover:bg-muted/50 min-h-[280px]"
            style={{
              borderLeft: `4px solid ${article.sourceColor || '#666'}`,
            }}
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
        ))}
      </div>
    </div>
  )
} 