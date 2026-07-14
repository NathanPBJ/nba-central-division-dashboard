import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge tailwind classes safely without style conflicts.
 * Combines the power of clsx (conditional classes) and tailwind-merge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
