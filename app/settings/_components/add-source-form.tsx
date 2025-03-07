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
      
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          url,
          icon: randomIcon,
          slug: name.toLowerCase().replace(/\s+/g, "")
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