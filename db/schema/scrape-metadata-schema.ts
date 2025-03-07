import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core"

export const scrapeMetadataTable = pgTable("scrape_metadata", {
  id: uuid("id").defaultRandom().primaryKey(),
  lastScrapeAt: timestamp("last_scrape_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertScrapeMetadata = typeof scrapeMetadataTable.$inferInsert
export type SelectScrapeMetadata = typeof scrapeMetadataTable.$inferSelect 