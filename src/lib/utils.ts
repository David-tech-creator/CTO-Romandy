import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return ""
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  })
}

export function formatDateRange(startDate?: Date | string | null, endDate?: Date | string | null): string {
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  
  if (!start && !end) return ""
  if (!start) return `Until ${end}`
  if (!end) return `Since ${start}`
  
  return `${start} - ${end}`
} 