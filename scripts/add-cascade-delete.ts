import { db } from "@/db/db"
import { sql } from "drizzle-orm"

async function main() {
  try {
    // Add foreign key constraint with cascade delete
    await db.execute(sql`
      ALTER TABLE articles
      ADD CONSTRAINT fk_articles_source
      FOREIGN KEY (source)
      REFERENCES sources(slug)
      ON DELETE CASCADE;
    `)

    console.log("Successfully added cascade delete constraint")
  } catch (error) {
    console.error("Error adding cascade delete constraint:", error)
    process.exit(1)
  }
}

main() 