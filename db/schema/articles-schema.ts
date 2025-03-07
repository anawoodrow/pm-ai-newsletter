import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const articlesTable = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  source: text("source").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertArticle = typeof articlesTable.$inferInsert
export type SelectArticle = typeof articlesTable.$inferSelect 