import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// For migrations
const migrationClient = postgres(process.env.DATABASE_URL, {
  max: 1,
  ssl: {
    rejectUnauthorized: false
  },
  idle_timeout: 15,
  connect_timeout: 15,
  connection: {
    application_name: "pm-ai-newsletter-migrator"
  }
})

// Run migrations
async function main() {
  try {
    await migrate(drizzle(migrationClient), { migrationsFolder: "./db/migrations" })
    console.log("Migrations complete")
  } catch (err) {
    console.error("Migration failed:", err)
  } finally {
    await migrationClient.end()
  }
}

main() 