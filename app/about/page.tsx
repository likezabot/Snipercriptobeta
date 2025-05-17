"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart2, 
  LineChart, 
  TrendingUp, 
  BarChart, 
  Gauge, 
  Shield,
  BookOpen,
  HelpCircle,
  Info
} from "lucide-react"

export default function AboutPage() {
  const [section1Ref, section1InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [section2Ref, section2InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [section3Ref, section3InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sobre a Plataforma</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça mais sobre nossa ferramenta de sinais de trading para o mercado de futuros na Binance.
            </p>
          </div>
          
          {/* Section 1: How It Works */}
          <motion.section 
            ref={section1Ref}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold inline-flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                Como Funciona
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Coleta de Dados",
                  description: "Conectamos à API da Binance para obter dados de mercado em tempo real, incluindo preços, volumes e dados de candlestick para diversos timeframes.",
                  icon: <BarChart2 className="h-10 w-10 text-primary" />
                },
                {
                  title: "Análise Técnica",
                  description: "Aplicamos múltiplos indicadores técnicos como RSI, MACD, Bandas de Bollinger e Médias Móveis para identificar oportunidades de trading.",
                  icon: <LineChart className="h-10 w-10 text-primary" />
                },
                {
                  title: "Geração de Sinais",
                  description: "Combinamos os resultados dos indicadores para gerar sinais de compra e venda com níveis de confiança e recomendações de alavancagem.",
                  icon: <TrendingUp className="h-10 w-10 text-primary" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={section1InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2 text-center">
                      <div className="flex justify-center mb-4">{item.icon}</div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Section 2: Technical Indicators */}
          <motion.section 
            ref={section2Ref}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold inline-flex items-center">
                <BarChart className="h-6 w-6 mr-2 text-primary" />
                Indicadores Técnicos Utilizados
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Médias Móveis (MA)",
                  description: "Suavizam os dados de preço para revelar a tendência subjacente. Utilizamos o 'Golden Cross' (MA curta cruzando acima da MA longa) como sinal de alta, e o 'Death Cross' como sinal de baixa.",
                  category: "Tendência"
                },
                {
                  name: "MACD",
                  description: "Combina análise de tendência e momentum. Fornece sinais através de cruzamentos e detecção de divergências. Confiável em mercados com tendência definida.",
                  category: "Tendência"
                },
                {
                  name: "RSI (Índice de Força Relativa)",
                  description: "Mede o momentum e condições de sobrecompra/sobrevenda. Ajuda a identificar reversões potenciais, especialmente quando ocorrem divergências entre RSI e preço.",
                  category: "Momentum"
                },
                {
                  name: "Bandas de Bollinger",
                  description: "Avalia a volatilidade e pontos potenciais de breakout. Quando os preços tocam ou cruzam as bandas, interpretamos condições de sobrecompra ou sobrevenda.",
                  category: "Volatilidade"
                },
                {
                  name: "Oscilador Estocástico",
                  description: "Identifica condições de sobrecompra/sobrevenda e reversões potenciais. Especialmente útil em mercados laterais e menos confiável durante tendências fortes.",
                  category: "Momentum"
                },
                {
                  name: "Volume Profile",
                  description: "Mostra a distribuição do volume em diferentes níveis de preço. Identifica níveis de suporte e resistência baseados em volume, útil para identificar níveis importantes.",
                  category: "Volume"
                }
              ].map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={section2InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{indicator.name}</CardTitle>
                        <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {indicator.category}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{indicator.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Section 3: Confidence Score and Leverage */}
          <motion.section 
            ref={section3Ref}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold inline-flex items-center">
                <Gauge className="h-6 w-6 mr-2 text-primary" />
                Pontuação de Confiança e Alavancagem
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={section3InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gauge className="h-5 w-5 mr-2 text-primary" />
                      Cálculo de Confiabilidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Nossa pontuação de confiança é calculada combinando múltiplos fatores:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                        <span>Concordância entre diferentes indicadores técnicos</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                        <span>Força do sinal em cada indicador individual</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                        <span>Confirmação em múltiplos timeframes</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                        <span>Condições gerais de mercado e volatilidade</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                        <span>Desempenho histórico de padrões similares</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={section3InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Recomendação de Alavancagem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Ajustamos a alavancagem recomendada com base na pontuação de confiança:
                    </p>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium mb-1">Confiança 90-100%</div>
                        <div className="text-sm text-muted-foreground">Alavancagem: 5x-10x</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium mb-1">Confiança 80-89%</div>
                        <div className="text-sm text-muted-foreground">Alavancagem: 3x-5x</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium mb-1">Confiança 70-79%</div>
                        <div className="text-sm text-muted-foreground">Alavancagem: 2x-3x</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium mb-1">Confiança 60-69%</div>
                        <div className="text-sm text-muted-foreground">Alavancagem: 1x-2x</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium mb-1">Confiança <60%</div>
                        <div className="text-sm text-muted-foreground">Alavancagem: 1x ou sem operação</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>
          
          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold inline-flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-primary" />
                Perguntas Frequentes
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Os sinais são realmente gratuitos?",
                  answer: "Sim, todos os sinais são fornecidos gratuitamente. Nossa plataforma foi desenvolvida para democratizar o acesso a sinais de trading de qualidade para o mercado de futuros de criptomoedas."
                },
                {
                  question: "Com que frequência os sinais são atualizados?",
                  answer: "Os sinais são atualizados pelo menos uma vez por minuto, garantindo que você tenha acesso às informações mais recentes do mercado. Damos ênfase especial ao timeframe de 5 minutos, que consideramos mais eficaz para trading."
                },
                {
                  question: "Posso confiar nas recomendações de alavancagem?",
                  answer: "Nossas recomendações de alavancagem são baseadas na confiabilidade calculada do sinal, mas é importante lembrar que o trading de futuros envolve riscos significativos. Sempre utilize seu próprio julgamento e gerenciamento de risco adequado."
                },
                {
                  question: "Quais criptomoedas são suportadas?",
                  answer: "Fornecemos sinais para os principais pares de criptomoedas disponíveis no mercado de futuros da Binance, incluindo BTC, ETH, BNB, SOL, ADA, XRP, DOGE, DOT e muitos outros."
                },
                {
                  question: "Como devo usar os sinais?",
                  answer: "Os sinais devem ser usados como uma ferramenta complementar à sua própria análise. Recomendamos verificar múltiplos timeframes, considerar o contexto geral do mercado e sempre utilizar stop-loss para gerenciar o risco."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}