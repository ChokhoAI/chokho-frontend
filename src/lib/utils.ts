import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseJavaDate(input: any): Date | null {
  if (!input) return null;
  
  // Handle Java LocalDateTime array format: [year, month, day, hour, minute, second, nano]
  if (Array.isArray(input)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = input;
    // JS months are 0-indexed, Java months are 1-indexed
    return new Date(year, month - 1, day, hour, minute, second);
  }
  
  const date = new Date(input);
  return isNaN(date.getTime()) ? null : date;
}

export function formatDate(dateInput: any): string {
  const date = parseJavaDate(dateInput);
  if (!date) return "N/A";
  
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function formatDateTime(dateInput: any): string {
  const date = parseJavaDate(dateInput);
  if (!date) return "N/A";
  
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
