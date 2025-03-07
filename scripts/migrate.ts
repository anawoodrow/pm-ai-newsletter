import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })

async function main() {
  try {
    await migrate(drizzle(migrationClient), { migrationsFolder: "./db/migrations" })
    console.log("Migrations complete")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  } finally {
    await migrationClient.end()
  }
}

main() 