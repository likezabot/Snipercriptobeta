"use client"

import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LeverageRecommendationProps {
  confidence: number
}

export function LeverageRecommendation({ confidence }: LeverageRecommendationProps) {
  const getLeverageRecommendation = (confidence: number) => {
    if (confidence >= 90) return 10;
    if (confidence >= 80) return 5;
    if (confidence >= 70) return 3;
    if (confidence >= 60) return 2;
    if (confidence >= 50) return 1;
    return 0;
  };

  const leverage = getLeverageRecommendation(confidence);
  
  const getRiskLevel = (leverage: number) => {
    if (leverage >= 5) return { text: "Alto", color: "text-destructive", icon: <AlertTriangle className="h-4 w-4" /> };
    if (leverage >= 2) return { text: "Médio", color: "text-warning", icon: <Info className="h-4 w-4" /> };
    return { text: "Baixo", color: "text-success", icon: <Info className="h-4 w-4" /> };
  };
  
  const risk = getRiskLevel(leverage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Alavancagem Recomendada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-5xl font-bold mb-2"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {leverage}x
            </motion.div>
            <div className="text-sm text-muted-foreground mb-4">
              Baseado na confiança do sinal: {confidence}%
            </div>
            <div className={`flex items-center ${risk.color}`}>
              {risk.icon}
              <span className="ml-1">Nível de risco: {risk.text}</span>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Lembre-se:</strong> A alavancagem amplifica tanto ganhos quanto perdas.
              </p>
              <p>
                Sempre utilize gerenciamento de risco adequado e considere sua tolerância pessoal ao risco.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}