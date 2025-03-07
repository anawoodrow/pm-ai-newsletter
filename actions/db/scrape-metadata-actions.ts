"use server"

import { db } from "@/db/db"
import { scrapeMetadataTable } from "@/db/schema"
import { ActionState } from "@/types"
import { desc } from "drizzle-orm"

export async function getLastScrapeTimeAction(): Promise<ActionState<Date | null>> {
  try {
    const [metadata] = await db
      .select({ lastScrapeAt: scrapeMetadataTable.lastScrapeAt })
      .from(scrapeMetadataTable)
      .orderBy(desc(scrapeMetadataTable.lastScrapeAt))
      .limit(1)

    return {
      isSuccess: true,
      message: "Last scrape time retrieved successfully",
      data: metadata?.lastScrapeAt || null
    }
  } catch (error) {
    console.error("Error getting last scrape time:", error)
    return { isSuccess: false, message: "Failed to get last scrape time" }
  }
}

export async function updateLastScrapeTimeAction(): Promise<ActionState<void>> {
  try {
    await db.insert(scrapeMetadataTable).values({
      lastScrapeAt: new Date()
    })

    return {
      isSuccess: true,
      message: "Last scrape time updated successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error updating last scrape time:", error)
    return { isSuccess: false, message: "Failed to update last scrape time" }
  }
} 