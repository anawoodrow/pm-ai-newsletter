"use server"

import { db } from "@/db/db"
import { articleHistoryTable } from "@/db/schema"
import { ActionState } from "@/types"
import { and, eq, gte, lt } from "drizzle-orm"
import { startOfDay, subDays } from "date-fns"

export async function trackDisplayedArticlesAction(
  articleIds: string[]
): Promise<ActionState<void>> {
  try {
    const now = new Date()
    await db.insert(articleHistoryTable).values(
      articleIds.map((id) => ({
        articleId: id,
        displayedAt: now
      }))
    )

    return {
      isSuccess: true,
      message: "Article display history tracked successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error tracking article display history:", error)
    return { isSuccess: false, message: "Failed to track article display history" }
  }
}

export async function getDisplayedArticleIdsAction(): Promise<
  ActionState<string[]>
> {
  try {
    const history = await db
      .select({ articleId: articleHistoryTable.articleId })
      .from(articleHistoryTable)
      .where(gte(articleHistoryTable.displayedAt, startOfDay(new Date())))

    return {
      isSuccess: true,
      message: "Displayed article IDs retrieved successfully",
      data: history.map((h) => h.articleId)
    }
  } catch (error) {
    console.error("Error getting displayed article IDs:", error)
    return { isSuccess: false, message: "Failed to get displayed article IDs" }
  }
}

export async function cleanupOldHistoryAction(): Promise<ActionState<void>> {
  try {
    await db
      .delete(articleHistoryTable)
      .where(
        and(
          lt(articleHistoryTable.displayedAt, subDays(new Date(), 7))
        )
      )

    return {
      isSuccess: true,
      message: "Old history cleaned up successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error cleaning up old history:", error)
    return { isSuccess: false, message: "Failed to clean up old history" }
  }
} 