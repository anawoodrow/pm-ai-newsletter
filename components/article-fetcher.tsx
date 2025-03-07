"use server"

import { db } from "@/db/db"
import { articlesTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import ArticleList from "@/components/article-list"

interface ArticleFetcherProps {
  source?: string
}

export async function ArticleFetcher({ source }: ArticleFetcherProps) {
  let query = db.query.articles.findMany({
    orderBy: [desc(articlesTable.publishedAt)],
    limit: 12
  })

  if (source) {
    query = db.query.articles.findMany({
      where: eq(articlesTable.source, source),
      orderBy: [desc(articlesTable.publishedAt)],
      limit: 12
    })
  }

  const articles = await query

  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found. Click refresh to fetch new articles.</p>
      </div>
    )
  }

  return <ArticleList articles={articles} />
} 