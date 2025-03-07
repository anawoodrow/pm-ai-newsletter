"use server"

import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import SourceList from "./_components/source-list"
import AddSourceForm from "./_components/add-source-form"

export default async function SettingsPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your newsletter sources and preferences.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sources</CardTitle>
              <CardDescription>
                Add, edit, or remove newsletter sources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AddSourceForm />
              <Suspense fallback={<div>Loading sources...</div>}>
                <SourcesFetcher />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

async function SourcesFetcher() {
  const sources = await db.query.sources.findMany({
    orderBy: [desc(sourcesTable.createdAt)]
  })

  return <SourceList sources={sources} />
} 