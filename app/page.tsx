"use server"

import { db } from "@/db/db"
import SidebarNav from "@/components/sidebar-nav"
import ArticleFetcher from "@/components/article-fetcher"
import { Suspense } from "react"
import ArticlesSkeleton from "@/components/articles-skeleton"

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const { source } = await searchParams
  const selectedSource = typeof source === "string" ? source : undefined
  const sources = await db.query.sources.findMany()

  return (
    <div className="flex h-screen">
      <SidebarNav sources={sources} />
      <main className="flex-1 overflow-y-auto px-12 py-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<ArticlesSkeleton />}>
            <ArticleFetcher source={selectedSource} />
          </Suspense>
        </div>
      </main>
    </div>
  )
} 