import { clearDatabaseAction } from "@/actions/db/articles-actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await clearDatabaseAction()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in clear database:", error)
    return NextResponse.json(
      { error: "Failed to clear database" },
      { status: 500 }
    )
  }
} 