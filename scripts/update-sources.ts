import { db } from "@/db/db"
import { sql } from "drizzle-orm"

async function main() {
  try {
    // Make color required
    await db.execute(sql`
      ALTER TABLE sources
      ALTER COLUMN color SET NOT NULL;
    `)

    // Drop icon column
    await db.execute(sql`
      ALTER TABLE sources
      DROP COLUMN IF EXISTS icon;
    `)

    console.log("Successfully updated sources table")
  } catch (error) {
    console.error("Error updating sources table:", error)
    process.exit(1)
  }
}

main() 