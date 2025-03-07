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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="min-h-[280px] overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-7 w-[85%] bg-muted animate-pulse rounded" />
                <div className="h-7 w-[65%] bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-full bg-muted animate-pulse rounded" />
                <div className="h-5 w-[90%] bg-muted animate-pulse rounded" />
                <div className="h-5 w-[75%] bg-muted animate-pulse rounded" />
              </div>
              <div className="pt-4 border-t flex justify-between">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 