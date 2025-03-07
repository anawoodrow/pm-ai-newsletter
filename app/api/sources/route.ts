import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, url, slug, color } = body

    if (!name || !url || !slug || !color) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const source = await db.insert(sourcesTable).values({
      name,
      url,
      slug,
      color
    }).returning()

    return NextResponse.json(source[0])
  } catch (error) {
    console.error("Error creating source:", error)
    return NextResponse.json(
      { error: "Failed to create source" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const sources = await db.query.sources.findMany()
    return NextResponse.json(sources)
  } catch (error) {
    console.error("Error fetching sources:", error)
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 }
    )
  }
} 