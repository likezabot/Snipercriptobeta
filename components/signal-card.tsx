"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getConfidenceColor, getDirectionColor, getTimeAgo } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Gauge, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface SignalCardProps {
  symbol: string
  direction: string
  entryPrice: number
  stopLoss?: number
  takeProfit?: number
  confidence: number
  leverage: number
  createdAt: Date
  onClick?: () => void
}

export function SignalCard({
  symbol,
  direction,
  entryPrice,
  stopLoss,
  takeProfit,
  confidence,
  leverage,
  createdAt,
  onClick
}: SignalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="signal-card h-full overflow-hidden">
        <CardHeader className={`pb-2 ${direction === "BUY" ? "bg-success/10" : "bg-destructive/10"}`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{symbol}</CardTitle>
            <Badge variant={direction === "BUY" ? "success" : "destructive"} className="flex items-center">
              {direction === "BUY" ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {direction}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <div className="text-sm text-muted-foreground">Entrada</div>
              <div className="font-medium">{formatPrice(entryPrice)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Alavancagem</div>
              <div className="font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                {leverage}x
              </div>
            </div>
            {stopLoss && (
              <div>
                <div className="text-sm text-muted-foreground">Stop Loss</div>
                <div className="font-medium text-destructive">{formatPrice(stopLoss)}</div>
              </div>
            )}
            {takeProfit && (
              <div>
                <div className="text-sm text-muted-foreground">Take Profit</div>
                <div className="font-medium text-success">{formatPrice(takeProfit)}</div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Badge className={`flex items-center ${getConfidenceColor(confidence)}`}>
              <Gauge className="h-3 w-3 mr-1" />
              Confiança: {confidence.toFixed(0)}%
            </Badge>
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {getTimeAgo(createdAt)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}