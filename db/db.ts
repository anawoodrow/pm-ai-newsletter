/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { articles, sources } from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// Database client for queries
const queryClient = postgres(process.env.DATABASE_URL!)

// Create db instance with query builder
export const db = drizzle(queryClient, {
  schema: {
    articles,
    sources
  }
})
