// Available colors for source cards
export const availableColors = {
  default: {
    background: "bg-card",
    hover: "hover:bg-card/80",
    border: "border-border",
    solid: "bg-gray-400"
  },
  blue: {
    background: "bg-blue-50 dark:bg-blue-950/50",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-950/70",
    border: "border-blue-200 dark:border-blue-800",
    solid: "bg-blue-500"
  },
  green: {
    background: "bg-green-50 dark:bg-green-950/50",
    hover: "hover:bg-green-100 dark:hover:bg-green-950/70",
    border: "border-green-200 dark:border-green-800",
    solid: "bg-green-500"
  },
  purple: {
    background: "bg-purple-50 dark:bg-purple-950/50",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-950/70",
    border: "border-purple-200 dark:border-purple-800",
    solid: "bg-purple-500"
  },
  orange: {
    background: "bg-orange-50 dark:bg-orange-950/50",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-950/70",
    border: "border-orange-200 dark:border-orange-800",
    solid: "bg-orange-500"
  },
  pink: {
    background: "bg-pink-50 dark:bg-pink-950/50",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-950/70",
    border: "border-pink-200 dark:border-pink-800",
    solid: "bg-pink-500"
  },
  yellow: {
    background: "bg-yellow-50 dark:bg-yellow-950/50",
    hover: "hover:bg-yellow-100 dark:hover:bg-yellow-950/70",
    border: "border-yellow-200 dark:border-yellow-800",
    solid: "bg-yellow-500"
  },
  teal: {
    background: "bg-teal-50 dark:bg-teal-950/50",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-950/70",
    border: "border-teal-200 dark:border-teal-800",
    solid: "bg-teal-500"
  },
  red: {
    background: "bg-red-50 dark:bg-red-950/50",
    hover: "hover:bg-red-100 dark:hover:bg-red-950/70",
    border: "border-red-200 dark:border-red-800",
    solid: "bg-red-500"
  },
  indigo: {
    background: "bg-indigo-50 dark:bg-indigo-950/50",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-950/70",
    border: "border-indigo-200 dark:border-indigo-800",
    solid: "bg-indigo-500"
  }
} as const

export type ColorKey = keyof typeof availableColors

// Predefined color assignments for known sources
const sourceColorMap: Record<string, ColorKey> = {
  "lennysnewsletter": "blue",
  "oneknightinproduct": "purple",
  "cutlefish": "green",
  "productcompass": "orange",
  "producttalk": "pink",
  "elenaverna": "yellow",
  "producttapas": "teal"
}

// Get a color for a source by its name or slug
export function getColorBySource(source: string | undefined) {
  if (!source) return availableColors.default
  
  // Normalize the source to match our slugs
  const normalizedSource = source.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Try to match against our predefined map
  if (sourceColorMap[normalizedSource]) {
    return availableColors[sourceColorMap[normalizedSource]]
  }
  
  // If no match found, use a hash function for consistent assignment
  const hash = source.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)
  
  const colors = Object.keys(availableColors).filter(key => key !== 'default') as ColorKey[]
  const colorIndex = Math.abs(hash) % colors.length
  return availableColors[colors[colorIndex]]
} 