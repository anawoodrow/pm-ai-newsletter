"use server"

import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { Suspense } from "react"
import RefreshButton from "@/components/refresh-button"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Settings } from "lucide-react"
import { ArticleFetcher } from "@/components/article-fetcher"
import ArticleListSkeleton from "@/components/article-list-skeleton"

interface PageProps {
  searchParams: { source?: string }
}

export default async function Page({ searchParams }: PageProps) {
  const { source } = searchParams
  const sources = await db.query.sources.findMany()

  return (
    <div className="flex min-h-screen">
      <SidebarNav sources={sources} />
      
      <div className="flex-1">
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Articles</h1>
            <div className="flex items-center gap-2">
              <RefreshButton />
              <Button variant="outline" size="icon" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <main>
            {!sources.length ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No sources configured</h2>
                <p className="text-muted-foreground mb-6">
                  Add some newsletter sources to get started.
                </p>
                <Button asChild>
                  <Link href="/settings">Configure Sources</Link>
                </Button>
              </div>
            ) : !source ? (
              <Suspense fallback={<ArticleListSkeleton />}>
                <ArticleFetcher />
              </Suspense>
            ) : (
              <Suspense fallback={<ArticleListSkeleton />}>
                <ArticleFetcher source={source} />
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 