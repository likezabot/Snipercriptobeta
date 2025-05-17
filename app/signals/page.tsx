"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { SignalCard } from "@/components/signal-card"
import { Button } from "@/components/ui/button"
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  ArrowUpDown,
  Search
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function SignalsPage() {
  const [signals, setSignals] = useState<any[]>([])
  const [filteredSignals, setFilteredSignals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [timeframeFilter, setTimeframeFilter] = useState("all")
  const [directionFilter, setDirectionFilter] = useState("all")
  const [confidenceFilter, setConfidenceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  
  const [signalsRef, signalsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Simulating data fetching
    const fetchSignals = async () => {
      setLoading(true)
      
      // Mock data for signals
      const mockSignals = Array(20).fill(null).map((_, index) => {
        const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT", "XRPUSDT", "DOGEUSDT", "DOTUSDT"]
        const timeframes = ["1m", "5m", "15m", "1h", "4h"]
        const directions = ["BUY", "SELL"]
        
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]
        const basePrice = symbol === "BTCUSDT" ? 65000 : 
                         symbol === "ETHUSDT" ? 3200 : 
                         symbol === "BNBUSDT" ? 560 : 
                         symbol === "SOLUSDT" ? 140 : 
                         symbol === "ADAUSDT" ? 0.55 : 
                         symbol === "XRPUSDT" ? 0.60 : 
                         symbol === "DOGEUSDT" ? 0.12 : 100
        
        const direction = directions[Math.floor(Math.random() * directions.length)]
        const entryPrice = basePrice * (1 + (Math.random() - 0.5) * 0.02)
        const stopLoss = direction === "BUY" 
          ? entryPrice * (1 - Math.random() * 0.02) 
          : entryPrice * (1 + Math.random() * 0.02)
        const takeProfit = direction === "BUY" 
          ? entryPrice * (1 + Math.random() * 0.04) 
          : entryPrice * (1 - Math.random() * 0.04)
        const confidence = Math.floor(Math.random() * 40) + 60 // 60-100
        const leverage = confidence >= 80 ? 5 : confidence >= 70 ? 3 : confidence >= 60 ? 2 : 1
        
        return {
          id: `signal-${index + 1}`,
          symbol,
          timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
          direction,
          entryPrice,
          stopLoss,
          takeProfit,
          confidence,
          leverage,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)) // Last 24 hours
        }
      })
      
      // Sort by date descending by default
      mockSignals.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      
      setSignals(mockSignals)
      setFilteredSignals(mockSignals)
      setLoading(false)
    }
    
    fetchSignals()
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...signals]
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(signal => 
        signal.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply timeframe filter
    if (timeframeFilter !== "all") {
      result = result.filter(signal => signal.timeframe === timeframeFilter)
    }
    
    // Apply direction filter
    if (directionFilter !== "all") {
      result = result.filter(signal => signal.direction === directionFilter)
    }
    
    // Apply confidence filter
    if (confidenceFilter !== "all") {
      switch (confidenceFilter) {
        case "high":
          result = result.filter(signal => signal.confidence >= 80)
          break
        case "medium":
          result = result.filter(signal => signal.confidence >= 60 && signal.confidence < 80)
          break
        case "low":
          result = result.filter(signal => signal.confidence < 60)
          break
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case "date":
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
        case "symbol":
          comparison = a.symbol.localeCompare(b.symbol)
          break
        case "confidence":
          comparison = a.confidence - b.confidence
          break
        case "leverage":
          comparison = a.leverage - b.leverage
          break
      }
      
      return sortOrder === "asc" ? comparison : -comparison
    })
    
    setFilteredSignals(result)
  }, [signals, searchTerm, timeframeFilter, directionFilter, confidenceFilter, sortBy, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Histórico de Sinais</h1>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
          
          {/* Filters Section */}
          <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por símbolo..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="w-full sm:w-auto">
                  <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="1m">1 minuto</SelectItem>
                      <SelectItem value="5m">5 minutos</SelectItem>
                      <SelectItem value="15m">15 minutos</SelectItem>
                      <SelectItem value="1h">1 hora</SelectItem>
                      <SelectItem value="4h">4 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Select value={directionFilter} onValueChange={setDirectionFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Direção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="BUY">Compra</SelectItem>
                      <SelectItem value="SELL">Venda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Confiança" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta (80%+)</SelectItem>
                      <SelectItem value="medium">Média (60-79%)</SelectItem>
                      <SelectItem value="low">Baixa (<60%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Data</SelectItem>
                      <SelectItem value="symbol">Símbolo</SelectItem>
                      <SelectItem value="confidence">Confiança</SelectItem>
                      <SelectItem value="leverage">Alavancagem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="h-10 w-10"
                >
                  {sortOrder === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Signals Grid */}
          <motion.div 
            ref={signalsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSignals.map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={signalsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 1) }}
              >
                <SignalCard
                  symbol={signal.symbol}
                  direction={signal.direction}
                  entryPrice={signal.entryPrice}
                  stopLoss={signal.stopLoss}
                  takeProfit={signal.takeProfit}
                  confidence={signal.confidence}
                  leverage={signal.leverage}
                  createdAt={signal.createdAt}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {filteredSignals.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum sinal encontrado com os filtros aplicados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}