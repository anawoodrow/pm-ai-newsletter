import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const sourcesTable = pgTable("sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSource = typeof sourcesTable.$inferInsert
export type SelectSource = typeof sourcesTable.$inferSelect 