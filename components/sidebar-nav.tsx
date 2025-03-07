"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Newspaper, 
  BookOpen, 
  Brain, 
  Sword,
  LayoutGrid,
  Settings,
  Zap,
  Star,
  Heart,
  Coffee,
  Compass,
  Lightbulb,
  LucideIcon
} from "lucide-react"
import { SelectSource } from "@/db/schema"

const iconMap: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  book: BookOpen,
  brain: Brain,
  sword: Sword,
  grid: LayoutGrid,
  zap: Zap,
  star: Star,
  heart: Heart,
  coffee: Coffee,
  compass: Compass,
  lightbulb: Lightbulb
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: SelectSource[]
}

export function SidebarNav({ className, sources, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSource = searchParams.get("source")

  const allSourcesItem = {
    name: "All Sources",
    icon: "grid",
    href: "/",
    slug: undefined
  }

  const items = [
    allSourcesItem,
    ...sources.map(source => ({
      name: source.name,
      icon: source.icon,
      href: `/?source=${source.slug}`,
      slug: source.slug
    }))
  ]

  return (
    <div className={cn("w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)} {...props}>
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Sources</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1 mt-4">
              {items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutGrid
                const isSelected = (!currentSource && !item.slug) || currentSource === item.slug
                return (
                  <Button
                    key={item.slug || 'all'}
                    variant={isSelected ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
} 