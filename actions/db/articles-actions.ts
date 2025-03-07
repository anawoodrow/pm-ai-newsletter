"use server"

import { db } from "@/db/db"
import { InsertArticle, SelectArticle, articlesTable } from "@/db/schema"
import { ActionState } from "@/types"
import { desc, eq, lt, sql } from "drizzle-orm"
import { subDays, format } from "date-fns"

export async function createArticleAction(
  article: InsertArticle
): Promise<ActionState<SelectArticle>> {
  try {
    console.log(`Creating article: ${article.title}`)
    const [newArticle] = await db.insert(articlesTable).values(article).returning()
    return {
      isSuccess: true,
      message: "Article created successfully",
      data: newArticle
    }
  } catch (error) {
    console.error("Error creating article:", error)
    return { isSuccess: false, message: "Failed to create article" }
  }
}

export async function getArticlesAction(): Promise<ActionState<SelectArticle[]>> {
  try {
    console.log("Fetching recent articles...")
    
    // Use a window function to rank articles by publish date within each source
    const articles = await db.execute(sql`
      WITH RankedArticles AS (
        SELECT *,
          ROW_NUMBER() OVER (
            PARTITION BY source 
            ORDER BY published_at DESC
          ) as rank
        FROM articles
      )
      SELECT * FROM RankedArticles 
      WHERE rank <= 3
      ORDER BY published_at DESC
      LIMIT 12
    `) as Array<{
      id: string
      title: string
      url: string
      description: string | null
      source: string
      image_url: string | null
      published_at: string
      score: number
      created_at: string
      updated_at: string
    }>

    // Convert the raw results to typed articles
    const typedArticles = articles.map(row => ({
      id: row.id,
      title: row.title,
      url: row.url,
      description: row.description,
      source: row.source as SelectArticle["source"],
      imageUrl: row.image_url,
      publishedAt: new Date(row.published_at),
      score: row.score,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }))

    console.log(`Found ${typedArticles.length} articles`)
    typedArticles.forEach(article => {
      console.log(`- ${article.title} (${format(article.publishedAt, 'yyyy-MM-dd')}) from ${article.source}`)
    })

    return {
      isSuccess: true,
      message: "Articles retrieved successfully",
      data: typedArticles
    }
  } catch (error) {
    console.error("Error getting articles:", error)
    return { isSuccess: false, message: "Failed to get articles" }
  }
}

export async function deleteArticleAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(articlesTable).where(eq(articlesTable.id, id))
    return {
      isSuccess: true,
      message: "Article deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { isSuccess: false, message: "Failed to delete article" }
  }
}

export async function cleanupOldArticlesAction(): Promise<ActionState<void>> {
  try {
    await db
      .delete(articlesTable)
      .where(lt(articlesTable.publishedAt, subDays(new Date(), 90)))

    return {
      isSuccess: true,
      message: "Old articles cleaned up successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error cleaning up old articles:", error)
    return { isSuccess: false, message: "Failed to clean up old articles" }
  }
}

export async function clearDatabaseAction(): Promise<ActionState<void>> {
  try {
    console.log("Clearing all articles from database...")
    await db.delete(articlesTable)
    return {
      isSuccess: true,
      message: "Database cleared successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error clearing database:", error)
    return { isSuccess: false, message: "Failed to clear database" }
  }
} 