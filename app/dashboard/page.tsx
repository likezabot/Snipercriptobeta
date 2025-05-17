"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { CryptoCard } from "@/components/crypto-card"
import { SignalCard } from "@/components/signal-card"
import { ChartComponent } from "@/components/chart-component"
import { IndicatorCard } from "@/components/indicator-card"
import { ConfidenceMeter } from "@/components/confidence-meter"
import { LeverageRecommendation } from "@/components/leverage-recommendation"
import { 
  BarChart2, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  BarChart, 
  Gauge, 
  RefreshCw,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTCUSDT")
  const [selectedTimeframe, setSelectedTimeframe] = useState("5m")
  const [cryptos, setCryptos] = useState<any[]>([])
  const [latestSignal, setLatestSignal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const [cryptoRef, cryptoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [chartRef, chartInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [indicatorsRef, indicatorsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [signalRef, signalInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      setLoading(true)
      
      // Mock data for cryptocurrencies
      const mockCryptos = [
        { symbol: "BTCUSDT", name: "Bitcoin", price: 65432.50, change24h: 2.34 },
        { symbol: "ETHUSDT", name: "Ethereum", price: 3245.75, change24h: -1.23 },
        { symbol: "BNBUSDT", name: "Binance Coin", price: 567.80, change24h: 0.87 },
        { symbol: "SOLUSDT", name: "Solana", price: 143.25, change24h: 5.67 },
        { symbol: "ADAUSDT", name: "Cardano", price: 0.58, change24h: -0.45 },
        { symbol: "XRPUSDT", name: "Ripple", price: 0.62, change24h: 1.12 }
      ]
      
      setCryptos(mockCryptos)
      
      // Mock data for latest signal
      const mockSignal = {
        id: "1",
        symbol: "BTCUSDT",
        direction: "BUY",
        entryPrice: 65432.50,
        stopLoss: 64500.00,
        takeProfit: 67000.00,
        confidence: 85,
        leverage: 5,
        createdAt: new Date(),
        indicators: [
          { name: "RSI", value: 32.5, signal: "Compra", description: "Condição de sobrevenda" },
          { name: "MACD", value: 0.0023, signal: "Compra", description: "Cruzamento positivo" },
          { name: "Bollinger", value: -0.92, signal: "Compra", description: "Preço próximo à banda inferior" },
          { name: "EMA", value: 65100, signal: "Neutro", description: "Preço próximo à média" }
        ]
      }
      
      setLatestSignal(mockSignal)
      setLoading(false)
    }
    
    fetchData()
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCryptos(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: crypto.change24h + (Math.random() - 0.5) * 0.1
      })))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleCryptoSelect = (symbol: string) => {
    setSelectedCrypto(symbol)
  }

  const handleTimeframeSelect = (timeframe: string) => {
    setSelectedTimeframe(timeframe)
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard de Sinais</h1>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Última atualização: {new Date().toLocaleTimeString()}
              </div>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </div>
          
          {/* Cryptocurrencies Section */}
          <motion.div 
            ref={cryptoRef}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Criptomoedas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cryptos.map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={cryptoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CryptoCard
                    symbol={crypto.symbol}
                    name={crypto.name}
                    price={crypto.price}
                    change24h={crypto.change24h}
                    onClick={() => handleCryptoSelect(crypto.symbol)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Chart and Timeframe Section */}
          <motion.div 
            ref={chartRef}
            initial={{ opacity: 0, y: 20 }}
            animate={chartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">Gráfico: {selectedCrypto}</h2>
              <div className="flex space-x-2">
                {["1m", "5m", "15m", "1h", "4h"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    size="sm"
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    onClick={() => handleTimeframeSelect(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
            <ChartComponent symbol={selectedCrypto} timeframe={selectedTimeframe} />
          </motion.div>
          
          {/* Technical Indicators Section */}
          {latestSignal && (
            <motion.div 
              ref={indicatorsRef}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Indicadores Técnicos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestSignal.indicators.map((indicator: any, index: number) => {
                  const icons = {
                    "RSI": <Gauge className="h-5 w-5 mr-2 text-primary" />,
                    "MACD": <BarChart className="h-5 w-5 mr-2 text-primary" />,
                    "Bollinger": <LineChart className="h-5 w-5 mr-2 text-primary" />,
                    "EMA": <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  };
                  
                  const icon = icons[indicator.name as keyof typeof icons] || <BarChart2 className="h-5 w-5 mr-2 text-primary" />;
                  
                  return (
                    <motion.div
                      key={indicator.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={indicatorsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <IndicatorCard
                        name={indicator.name}
                        value={indicator.value}
                        signal={indicator.signal}
                        description={indicator.description}
                        icon={icon}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {/* Latest Signal Section */}
          {latestSignal && (
            <motion.div 
              ref={signalRef}
              initial={{ opacity: 0, y: 20 }}
              animate={signalInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Último Sinal</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SignalCard
                    symbol={latestSignal.symbol}
                    direction={latestSignal.direction}
                    entryPrice={latestSignal.entryPrice}
                    stopLoss={latestSignal.stopLoss}
                    takeProfit={latestSignal.takeProfit}
                    confidence={latestSignal.confidence}
                    leverage={latestSignal.leverage}
                    createdAt={latestSignal.createdAt}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="flex justify-center">
                    <ConfidenceMeter value={latestSignal.confidence} />
                  </div>
                  <LeverageRecommendation confidence={latestSignal.confidence} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}