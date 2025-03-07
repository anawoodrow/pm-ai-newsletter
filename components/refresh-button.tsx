"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  async function handleRefresh() {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/test-scrape")
      const result = await response.json()
      
      if (!result.isSuccess) {
        throw new Error(result.message)
      }
      
      // Refresh the page to show new articles
      router.refresh()
    } catch (error) {
      console.error("Error refreshing articles:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      {isRefreshing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Refreshing...
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Articles
        </>
      )}
    </Button>
  )
} 