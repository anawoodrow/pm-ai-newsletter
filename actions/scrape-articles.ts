"use server"

import { InsertArticle } from "@/db/schema"
import { createArticleAction } from "@/actions/db/articles-actions"
import { db } from "@/db/db"
import Parser from 'rss-parser'

interface ScrapeConfig {
  url: string
  source: string
}

async function scrapeArticles(config: ScrapeConfig) {
  try {
    console.log(`\n==========================================`)
    console.log(`Starting to scrape ${config.source}...`)
    console.log(`URL: ${config.url}`)
    console.log(`==========================================\n`)
    
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

    const feed = await parser.parseURL(config.url)
    console.log(`\nFeed title: ${feed.title}`)
    console.log(`Found ${feed.items.length} potential articles`)

    const articles: InsertArticle[] = []
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    for (const item of feed.items) {
      console.log(`\nProcessing article:`)
      console.log(`- Title: ${item.title || 'NO TITLE'}`)
      console.log(`- URL: ${item.link || 'NO URL'}`)
      console.log(`- Date: ${item.pubDate || item.isoDate || 'NO DATE'}`)
      
      if (item.title && item.link && (item.pubDate || item.isoDate)) {
        const articleDate = new Date(item.pubDate || item.isoDate || '')
        
        if (articleDate >= thirtyDaysAgo) {
          articles.push({
            title: item.title,
            url: item.link,
            source: config.source,
            description: (item as any).contentEncoded || item.content || item.description || null,
            imageUrl: null,
            publishedAt: articleDate
          })
          console.log(`Added article: ${item.title}`)
        } else {
          console.log(`Skipping article - too old (${articleDate.toISOString()})`)
        }
      } else {
        console.log(`Skipping article - missing required fields:`)
        console.log(`- Has title: ${Boolean(item.title)}`)
        console.log(`- Has URL: ${Boolean(item.link)}`)
        console.log(`- Has date: ${Boolean(item.pubDate || item.isoDate)}`)
      }
    }

    console.log(`\nSuccessfully scraped ${articles.length} articles from ${config.source}`)
    return articles
  } catch (error) {
    console.error(`Error scraping ${config.source}:`, error)
    return []
  }
}

export async function scrapeAllArticlesAction() {
  try {
    console.log("\n=== Starting scraping process ===")
    let totalArticles = 0

    // Fetch all sources from the database
    const sources = await db.query.sources.findMany()
    console.log(`Found ${sources.length} sources to scrape:`)
    sources.forEach(source => console.log(`- ${source.name} (${source.url})`))

    for (const source of sources) {
      const config: ScrapeConfig = {
        url: source.url,
        source: source.slug
      }
      
      const articles = await scrapeArticles(config)
      for (const article of articles) {
        const result = await createArticleAction(article)
        if (result.isSuccess) {
          totalArticles++
        } else {
          console.log(`Failed to save article: ${article.title}`)
        }
      }
    }

    console.log(`\n=== Scraping complete ===`)
    console.log(`Added ${totalArticles} new articles.`)
    return { isSuccess: true, message: `Articles scraped successfully. Added ${totalArticles} new articles.` }
  } catch (error) {
    console.error("Error scraping articles:", error)
    return { isSuccess: false, message: "Failed to scrape articles" }
  }
} 