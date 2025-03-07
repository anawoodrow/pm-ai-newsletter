import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

interface RouteParams {
  params: {
    id: string
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params

    await db.delete(sourcesTable).where(eq(sourcesTable.id, id))

    return NextResponse.json({ message: "Source deleted successfully" })
  } catch (error) {
    console.error("Error deleting source:", error)
    return NextResponse.json(
      { error: "Failed to delete source" },
      { status: 500 }
    )
  }
} 