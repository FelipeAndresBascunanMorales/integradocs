import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parameterize = (string: string) => {
  return string
    .normalize('NFD')                   // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '')   // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')       // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '');          // Remove leading/trailing hyphens
};