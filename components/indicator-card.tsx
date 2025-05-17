"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface IndicatorCardProps {
  name: string
  value: number
  signal: string
  description: string
  icon: React.ReactNode
}

export function IndicatorCard({ name, value, signal, description, icon }: IndicatorCardProps) {
  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case "compra":
        return "bg-success text-success-foreground";
      case "venda":
        return "bg-destructive text-destructive-foreground";
      case "neutro":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <Card className="indicator-card h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md flex items-center">
              {icon}
              <span className="ml-2">{name}</span>
            </CardTitle>
            <Badge className={getSignalColor(signal)}>
              {signal}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}