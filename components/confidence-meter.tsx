"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ConfidenceMeterProps {
  value: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ConfidenceMeter({ 
  value, 
  size = "md", 
  showLabel = true 
}: ConfidenceMeterProps) {
  const getColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 60) return "text-warning";
    return "text-destructive";
  };

  const getSize = (size: string) => {
    switch (size) {
      case "sm": return "w-24 h-24";
      case "lg": return "w-48 h-48";
      default: return "w-36 h-36";
    }
  };

  const getFontSize = (size: string) => {
    switch (size) {
      case "sm": return "text-xl";
      case "lg": return "text-4xl";
      default: return "text-2xl";
    }
  };

  return (
    <div className={cn("relative", getSize(size))}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-muted/20"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${value * 2.83} 283`}
          strokeDashoffset="0"
          className={getColor(value)}
          initial={{ strokeDasharray: "0 283" }}
          animate={{ strokeDasharray: `${value * 2.83} 283` }}
          transition={{ duration: 1, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div 
          className={cn("font-bold", getFontSize(size))}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className={getColor(value)}>{value}%</span>
        </motion.div>
        {showLabel && (
          <motion.div 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Confiança
          </motion.div>
        )}
      </div>
    </div>
  )
}