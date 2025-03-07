import { scrapeAllArticlesAction } from "@/actions/scrape-articles"
import { NextResponse } from "next/server"

export const runtime = "edge"
export const preferredRegion = "auto"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = await scrapeAllArticlesAction()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json(
      { isSuccess: false, message: "Failed to run cron job" },
      { status: 500 }
    )
  }
} 