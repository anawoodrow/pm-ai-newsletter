import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { articlesTable } from "./articles-schema"

export const articleHistoryTable = pgTable("article_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  articleId: uuid("article_id")
    .references(() => articlesTable.id)
    .notNull(),
  displayedAt: timestamp("displayed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertArticleHistory = typeof articleHistoryTable.$inferInsert
export type SelectArticleHistory = typeof articleHistoryTable.$inferSelect 