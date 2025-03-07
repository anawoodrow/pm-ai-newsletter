import { NextResponse } from "next/server"
import { db } from "@/db/db"
import { articlesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import Parser from "rss-parser"

const parser = new Parser({
  headers: {
    'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  },
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['description', 'description']
    ]
  }
})

async function fetchRSSFeed(source: { name: string, url: string, slug: string }) {
  try {
    console.log(`\nFetching RSS feed for ${source.name}...`)
    console.log(`URL: ${source.url}`)
    
    const feed = await parser.parseURL(source.url)
    console.log(`Feed title: ${feed.title}`)
    console.log(`Found ${feed.items.length} potential articles`)
    
    return feed.items.map((item: Parser.Item) => ({
      title: item.title || "",
      description: item.contentSnippet || item.content || (item as any).contentEncoded || "",
      url: item.link || "",
      publishedAt: new Date(item.pubDate || item.isoDate || ""),
      source: source.slug
    }))
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error)
    return []
  }
}

export async function GET() {
  try {
    const articles = []
    const sources = await db.query.sources.findMany()
    
    console.log(`Found ${sources.length} sources to scrape:`)
    sources.forEach(source => console.log(`- ${source.name} (${source.url})`))

    for (const source of sources) {
      const items = await fetchRSSFeed(source)
      articles.push(...items)
    }

    // Filter out articles without required fields
    const validArticles = articles.filter(
      article => article.title && article.url && article.publishedAt
    )

    console.log(`\nFound ${validArticles.length} valid articles to process`)

    // Insert new articles
    let newArticles = 0
    for (const article of validArticles) {
      // Check if article already exists
      const existing = await db.query.articles.findFirst({
        where: eq(articlesTable.url, article.url)
      })

      if (!existing) {
        await db.insert(articlesTable).values(article)
        newArticles++
        console.log(`Added new article: ${article.title}`)
      }
    }

    console.log(`\nAdded ${newArticles} new articles to the database`)

    return NextResponse.json({
      isSuccess: true,
      message: `Articles scraped successfully. Added ${newArticles} new articles.`
    })
  } catch (error) {
    console.error("Error scraping articles:", error)
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Failed to scrape articles"
      },
      { status: 500 }
    )
  }
} 