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

export const RESUME_URL = 'https://docs.google.com/document/d/1P5qe1xyehWKOcOm5KRUHSzSF6CZN_k6J/edit'
