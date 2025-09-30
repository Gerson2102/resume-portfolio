import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

export function formatDateRange(start: string, end?: string): string {
  const startFormatted = formatDate(start)
  if (!end) return startFormatted
  const endFormatted = formatDate(end)

  if (startFormatted === endFormatted) return startFormatted

  return `${startFormatted} - ${endFormatted}`
}

export function getImageAlt(title: string, context?: string): string {
  if (context) {
    return `${title} - ${context}`
  }
  return title
}

export function optimizeImagePath(path: string, size: 'thumb' | 'medium' | 'large' = 'medium'): string {
  const sizeMap = {
    thumb: 'w_600',
    medium: 'w_1200',
    large: 'w_1600'
  }

  // For now, return original path. In production, you'd add Cloudinary or similar transformations
  return path
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getYearFromDate(date: string): number {
  return new Date(date).getFullYear()
}

export function sortByDate<T extends { date: string }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
}

export function groupByYear<T extends { date: string }>(items: T[]): Record<number, T[]> {
  return items.reduce((acc, item) => {
    const year = getYearFromDate(item.date)
    if (!acc[year]) acc[year] = []
    acc[year].push(item)
    return acc
  }, {} as Record<number, T[]>)
}

// Social media URLs
export const SOCIAL_LINKS = {
  github: 'https://github.com/Gerson2102',
  twitter: 'https://x.com/Glv_exe02',
  linkedin: 'https://www.linkedin.com/in/gerson-lv/',
  telegram: 'https://t.me/Glv_rar'
} as const

export const CONTACT_INFO = {
  telegram: '@Glv_rar',
  email: 'gersonloavas@gmail.com',
  location: 'Costa Rica'
} as const