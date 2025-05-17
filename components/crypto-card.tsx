"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

interface CryptoCardProps {
  symbol: string
  name: string
  price: number
  change24h: number
  onClick?: () => void
}

export function CryptoCard({ symbol, name, price, change24h, onClick }: CryptoCardProps) {
  const isPositive = change24h >= 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="crypto-card h-full overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-primary" />
              {symbol}
            </CardTitle>
            <Badge variant={isPositive ? "success" : "destructive"} className="flex items-center">
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {change24h.toFixed(2)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">{name}</div>
          <div className="text-xl font-bold">{formatPrice(price)}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}