import { scrapeAllArticlesAction } from "@/actions/scrape-articles"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const result = await scrapeAllArticlesAction()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in scrape route:", error)
    return NextResponse.json(
      { isSuccess: false, message: "Failed to scrape articles" },
      { status: 500 }
    )
  }
} 