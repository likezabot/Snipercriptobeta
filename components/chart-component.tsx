"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div className="h-64 w-full flex items-center justify-center">Carregando gráfico...</div>
})

interface ChartComponentProps {
  symbol: string
  timeframe: string
}

export function ChartComponent({ symbol, timeframe }: ChartComponentProps) {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      setLoading(true)
      
      // This is mock data - in a real app, you would fetch from an API
      const mockData = generateMockData(symbol, timeframe)
      
      setTimeout(() => {
        setChartData(mockData)
        setLoading(false)
      }, 1000)
    }
    
    fetchData()
  }, [symbol, timeframe])

  const generateMockData = (symbol: string, timeframe: string) => {
    const dates = []
    const opens = []
    const highs = []
    const lows = []
    const closes = []
    
    const basePrice = Math.random() * 10000 + 1000
    let currentPrice = basePrice
    
    const now = new Date()
    const interval = timeframe === "1m" ? 60000 : 
                    timeframe === "5m" ? 300000 : 
                    timeframe === "15m" ? 900000 : 3600000
    
    for (let i = 0; i < 100; i++) {
      const date = new Date(now.getTime() - (99 - i) * interval)
      dates.push(date)
      
      const change = (Math.random() - 0.5) * basePrice * 0.02
      currentPrice = Math.max(currentPrice + change, 1)
      
      const open = currentPrice
      const close = currentPrice * (1 + (Math.random() - 0.5) * 0.01)
      const high = Math.max(open, close) * (1 + Math.random() * 0.005)
      const low = Math.min(open, close) * (1 - Math.random() * 0.005)
      
      opens.push(open)
      highs.push(high)
      lows.push(low)
      closes.push(close)
      
      currentPrice = close
    }
    
    return {
      dates,
      opens,
      highs,
      lows,
      closes
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-primary" />
          {symbol} ({timeframe})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 w-full flex items-center justify-center">
            Carregando gráfico...
          </div>
        ) : (
          <div className="h-64">
            <Plot
              data={[
                {
                  x: chartData.dates,
                  open: chartData.opens,
                  high: chartData.highs,
                  low: chartData.lows,
                  close: chartData.closes,
                  type: "candlestick",
                  name: symbol,
                  increasing: { line: { color: "rgb(34, 197, 94)" } },
                  decreasing: { line: { color: "rgb(239, 68, 68)" } },
                }
              ]}
              layout={{
                title: "",
                dragmode: "zoom",
                margin: {
                  r: 10,
                  t: 10,
                  b: 40,
                  l: 40
                },
                showlegend: false,
                xaxis: {
                  autorange: true,
                  type: "date"
                },
                yaxis: {
                  autorange: true,
                  type: "linear"
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: {
                  color: "#888"
                }
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
              config={{ responsive: true }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}