"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

const AVAILABLE_ICONS = [
  "newspaper",
  "book",
  "brain",
  "sword",
  "zap",
  "star",
  "heart",
  "coffee",
  "compass",
  "lightbulb"
] as const

const AVAILABLE_COLORS = [
  'blue',   // For backgrounds like bg-blue-100 dark:bg-blue-900
  'purple', // bg-purple-100 dark:bg-purple-900
  'green',  // bg-green-100 dark:bg-green-900
  'orange', // bg-orange-100 dark:bg-orange-900
  'pink',   // bg-pink-100 dark:bg-pink-900
  'yellow', // bg-yellow-100 dark:bg-yellow-900
  'teal',   // bg-teal-100 dark:bg-teal-900
  'red',    // bg-red-100 dark:bg-red-900
  'indigo'  // bg-indigo-100 dark:bg-indigo-900
] as const

function generateSlug(name: string) {
  return name.toLowerCase()
    .replace(/[']/g, '') // Remove apostrophes first
    .replace(/[^a-z0-9]/g, '') // Then remove all other special characters
}

export default function AddSourceForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const randomIcon = AVAILABLE_ICONS[Math.floor(Math.random() * AVAILABLE_ICONS.length)]
      const randomColor = AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)]
      
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          url,
          icon: randomIcon,
          color: randomColor,
          slug: generateSlug(name)
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add source")
      }

      setName("")
      setUrl("")
      router.refresh()
    } catch (error) {
      console.error("Error adding source:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Product Newsletter"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="url">RSS Feed URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/feed"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Add Source
      </Button>
    </form>
  )
} 