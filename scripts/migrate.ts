import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { sql } from "drizzle-orm"

const DATABASE_URL = "postgres://postgres.rsfbsdmgufhpdeovoqyr:ZOG3CORVnGRO2na6@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

const client = postgres(DATABASE_URL, { ssl: { rejectUnauthorized: false } })
const db = drizzle(client)

async function main() {
  try {
    // Update source slugs
    await db.execute(sql`
      UPDATE sources
      SET slug = REGEXP_REPLACE(LOWER(name), '[^a-z0-9]', '', 'g')
    `)

    // Update article sources, keeping the original source if no match is found
    await db.execute(sql`
      UPDATE articles a
      SET source = COALESCE(
        (
          SELECT REGEXP_REPLACE(LOWER(s.name), '[^a-z0-9]', '', 'g')
          FROM sources s
          WHERE REGEXP_REPLACE(LOWER(s.name), '[^a-z0-9]', '', 'g') = a.source
          OR s.slug = a.source
          OR LOWER(s.name) = LOWER(a.source)
          LIMIT 1
        ),
        a.source
      )
    `)

    console.log("Migration completed successfully")
    process.exit(0)
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  }
}

main() 