"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

// Se não existir, remova ou comente e use price.toLocaleString()
import { formatPrice } from "@/lib/utils"

interface CryptoCardProps {
  symbol: string
  name: string
  price: number
  change24h: number
  onClick?: () => void
}

// Se não tiver formatPrice, pode criar assim:
// function formatPrice(price: number) {
//   return "R$ " + price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
// }

const getBadgeVariant = (isPositive: boolean) => {
  // Caso não tenha variants "success/destructive", pode usar "default"/"secondary"
  return isPositive ? "success" : "destructive"
}

const CryptoCard = ({ symbol, name, price, change24h, onClick }: CryptoCardProps) => {
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
            <Badge variant={getBadgeVariant(isPositive)} className="flex items-center">
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {change24h.toFixed(2)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">{name}</div>
          <div className="text-xl font-bold">
            {typeof formatPrice === "function"
              ? formatPrice(price)
              : price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default CryptoCard
