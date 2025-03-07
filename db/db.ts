/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { articlesTable, sourcesTable } from "@/db/schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// For migrations
const migrationClient = postgres(process.env.DATABASE_URL, {
  max: 1,
  ssl: {
    rejectUnauthorized: false
  },
  connection: {
    application_name: "pm-ai-newsletter-migrator"
  }
})

// For queries
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 1,
  ssl: {
    rejectUnauthorized: false
  },
  idle_timeout: 15,
  connect_timeout: 15,
  max_lifetime: 60 * 30,
  connection: {
    application_name: "pm-ai-newsletter"
  },
  prepare: true
})

// Configure Drizzle with both schemas
export const db = drizzle(queryClient, {
  schema: {
    articles: articlesTable,
    sources: sourcesTable
  }
})

// Run migrations on startup
migrate(drizzle(migrationClient), { migrationsFolder: "./db/migrations" })
  .then(() => {
    console.log("Migrations complete")
    migrationClient.end()
  })
  .catch((err) => {
    console.error("Migration failed", err)
    migrationClient.end()
  })
