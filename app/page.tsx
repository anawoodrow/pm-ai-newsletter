"use server"

import { db } from "@/db/db"
import SidebarNav from "@/components/sidebar-nav"
import ArticleFetcher from "@/components/article-fetcher"

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const source = typeof searchParams.source === "string" ? searchParams.source : undefined
  const sources = await db.query.sources.findMany()

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-full flex-col">
          <div className="flex-1 p-6">
            <SidebarNav sources={sources} currentSource={source} />
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          <ArticleFetcher source={source} />
        </div>
      </main>
    </div>
  )
} 