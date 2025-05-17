"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignalCard } from "@/components/signal-card"
import { 
  BarChart2, 
  TrendingUp, 
  Shield, 
  Clock, 
  Zap, 
  ChevronRight,
  LineChart,
  BarChart,
  Gauge,
  ArrowRight
} from "lucide-react"

export default function Home() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  
  const [recentSignals, setRecentSignals] = useState<any[]>([])
  
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [signalsRef, signalsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Simulating fetching recent signals
    const mockSignals = [
      {
        id: "1",
        symbol: "BTCUSDT",
        direction: "BUY",
        entryPrice: 65432.50,
        stopLoss: 64500.00,
        takeProfit: 67000.00,
        confidence: 85,
        leverage: 5,
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
      },
      {
        id: "2",
        symbol: "ETHUSDT",
        direction: "SELL",
        entryPrice: 3245.75,
        stopLoss: 3300.00,
        takeProfit: 3150.00,
        confidence: 72,
        leverage: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 15)
      },
      {
        id: "3",
        symbol: "BNBUSDT",
        direction: "BUY",
        entryPrice: 567.80,
        stopLoss: 550.00,
        takeProfit: 590.00,
        confidence: 68,
        leverage: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 30)
      }
    ]
    
    setRecentSignals(mockSignals)
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
          <Image
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop"
            alt="Crypto trading background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Sinais de Trading para <span className="text-primary">Futuros de Criptomoedas</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Receba sinais de trading precisos com recomendações de alavancagem baseadas na confiabilidade do sinal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Ver Dashboard
                </Button>
              </Link>
              <Link href="/signals">
                <Button size="lg" variant="outline" className="gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Últimos Sinais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que usar nossa ferramenta?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desenvolvida para traders de todos os níveis, nossa plataforma oferece sinais precisos e recomendações personalizadas.
            </p>
          </div>
          
          <motion.div 
            ref={featureRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <LineChart className="h-10 w-10 text-primary" />,
                title: "Análise Técnica Avançada",
                description: "Combinamos múltiplos indicadores técnicos para gerar sinais de alta precisão para o mercado de futuros."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Gerenciamento de Risco",
                description: "Recomendações de alavancagem baseadas na confiabilidade do sinal para otimizar seus resultados."
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Atualizações em Tempo Real",
                description: "Receba sinais a cada minuto, com foco especial no timeframe de 5 minutos para maior eficácia."
              },
              {
                icon: <BarChart className="h-10 w-10 text-primary" />,
                title: "Múltiplos Timeframes",
                description: "Análise de todos os timeframes relevantes para identificar as melhores oportunidades de mercado."
              },
              {
                icon: <Gauge className="h-10 w-10 text-primary" />,
                title: "Score de Confiança",
                description: "Cada sinal inclui uma pontuação de confiança para ajudar você a tomar decisões mais informadas."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Totalmente Gratuito",
                description: "Acesse todos os recursos da plataforma sem custos, democratizando o acesso a sinais de qualidade."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { value: "95%", label: "Precisão dos Sinais", icon: <TrendingUp className="h-8 w-8 text-primary" /> },
              { value: "+1440", label: "Sinais por Dia", icon: <Clock className="h-8 w-8 text-primary" /> },
              { value: "+50", label: "Pares de Criptomoedas", icon: <BarChart2 className="h-8 w-8 text-primary" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card rounded-lg p-8 text-center shadow-sm"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Recent Signals Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Sinais Recentes</h2>
            <Link href="/signals">
              <Button variant="outline" className="gap-2">
                Ver Todos
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <motion.div 
            ref={signalsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recentSignals.map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={signalsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  onClick={() => {}}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Acessar Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BarChart2 className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">CryptoSignals</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CryptoSignals. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}