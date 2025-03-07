"use server"

import { db } from "@/db/db"
import { desc, eq } from "drizzle-orm"
import { articlesTable, sourcesTable } from "@/db/schema"
import ArticleList from "@/components/article-list"

interface ArticleFetcherProps {
  source?: string
}

export default async function ArticleFetcher({ source }: ArticleFetcherProps) {
  const baseQuery = db.select({
    id: articlesTable.id,
    title: articlesTable.title,
    description: articlesTable.description,
    url: articlesTable.url,
    source: articlesTable.source,
    publishedAt: articlesTable.publishedAt,
    imageUrl: articlesTable.imageUrl,
    createdAt: articlesTable.createdAt,
    updatedAt: articlesTable.updatedAt,
    sourceColor: sourcesTable.color
  })
  .from(articlesTable)
  .leftJoin(sourcesTable, eq(articlesTable.source, sourcesTable.slug))
  .orderBy(desc(articlesTable.publishedAt))
  .limit(12)

  const articles = source 
    ? await baseQuery.where(eq(articlesTable.source, source))
    : await baseQuery

  if (!articles.length) {
    return (
      <div className="text-center text-muted-foreground">
        No articles yet. Check back later or refresh the page.
      </div>
    )
  }

  return <ArticleList articles={articles} />
} 