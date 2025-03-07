"use client"

import { SelectArticle } from "@/db/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArticleListProps {
  articles: SelectArticle[]
}

const sourceColors: Record<string, string> = {
  productcompass: "text-blue-600 dark:text-blue-400",
  hils: "text-emerald-600 dark:text-emerald-400",
  cutlefish: "text-purple-600 dark:text-purple-400",
  oneknightinproduct: "text-orange-600 dark:text-orange-400"
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card 
          key={article.id} 
          className="flex flex-col hover:shadow-lg transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800 group"
        >
          <CardHeader className="flex-none border-l-4 rounded-l-sm transition-colors duration-300" 
            style={{
              borderLeftColor: article.source === 'productcompass' ? '#2563eb' :
                             article.source === 'hils' ? '#059669' :
                             article.source === 'cutlefish' ? '#9333ea' :
                             '#f97316'
            }}
          >
            <CardTitle className="line-clamp-2 text-lg">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {article.title}
                <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between gap-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.description}
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className={cn("font-medium", sourceColors[article.source])}>
                {article.source}
              </span>
              <time 
                dateTime={article.publishedAt.toISOString()}
                className="text-muted-foreground"
              >
                {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 