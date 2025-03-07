"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

function generateSlug(name: string) {
  return name.toLowerCase()
    .replace(/[']/g, '') // Remove apostrophes first
    .replace(/[^a-z0-9]/g, '') // Then remove all other special characters
}

function generateUniqueColor() {
  // Use golden ratio for even distribution
  const goldenRatio = 0.618033988749895
  
  // Generate a random starting hue
  let hue = Math.random()
  
  // Use the golden ratio to generate the next hue
  hue += goldenRatio
  hue %= 1
  
  // Convert to degrees and create HSL color
  const hueInDegrees = Math.floor(hue * 360)
  // High saturation (80%) and lightness (50%) for vibrant but readable colors
  return `hsl(${hueInDegrees}, 80%, 50%)`
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
      const color = generateUniqueColor()
      
      const response = await fetch("/api/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          url,
          color,
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
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
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