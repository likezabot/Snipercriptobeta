import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(price);
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "bg-success text-success-foreground";
  if (confidence >= 60) return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
}

export function getDirectionColor(direction: string): string {
  return direction === "BUY" 
    ? "bg-success text-success-foreground" 
    : "bg-destructive text-destructive-foreground";
}

export function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " anos atrás";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " meses atrás";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " dias atrás";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " horas atrás";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutos atrás";
  
  return Math.floor(seconds) + " segundos atrás";
}