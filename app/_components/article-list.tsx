"use client"

import { SelectArticle } from "@/db/schema"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from "lucide-react"

interface ArticleListProps {
  articles: SelectArticle[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="h-full transition-all duration-200 hover:shadow-lg">
            {article.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground capitalize">
                {article.source}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true
                })}
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                {article.title}
                <ExternalLink className="inline-block ml-2 w-4 h-4" />
              </h2>
              {article.description && (
                <p className="text-muted-foreground line-clamp-3">
                  {article.description}
                </p>
              )}
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
} 