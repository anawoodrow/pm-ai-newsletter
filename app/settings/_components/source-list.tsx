"use client"

import { SelectSource } from "@/db/schema"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface SourceListProps {
  sources: SelectSource[]
}

export default function SourceList({ sources }: SourceListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(id: string) {
    try {
      setDeletingId(id)
      const response = await fetch(`/api/sources/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete source")
      }

      router.refresh()
    } catch (error) {
      console.error("Error deleting source:", error)
    } finally {
      setDeletingId(null)
    }
  }

  if (!sources.length) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No sources added yet.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sources.map((source) => (
          <TableRow key={source.id}>
            <TableCell className="font-medium">{source.name}</TableCell>
            <TableCell className="font-mono text-sm">{source.url}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(source.id)}
                disabled={deletingId === source.id}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 