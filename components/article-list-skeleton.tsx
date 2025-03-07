"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ArticleListSkeleton() {
  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          <p className="text-lg text-muted-foreground">
            Fetching the latest articles...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-full overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <div className="h-6 w-28 bg-muted animate-pulse rounded-full" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="space-y-2">
                <div className="h-6 w-[85%] bg-muted animate-pulse rounded" />
                <div className="h-6 w-[65%] bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-[90%] bg-muted animate-pulse rounded" />
                <div className="h-4 w-[75%] bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 