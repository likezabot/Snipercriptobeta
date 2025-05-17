# Binance Futures Trading Signals

Uma ferramenta que fornece sinais de trading para o mercado de futuros na Binance, com recomendações de alavancagem baseadas na confiabilidade do sinal.

## Características

- Sinais de trading para criptomoedas no mercado de futuros da Binance
- Análise técnica utilizando múltiplos indicadores
- Cálculo de confiabilidade para cada sinal
- Recomendações de alavancagem baseadas na confiabilidade
- Atualizações em tempo real (pelo menos uma vez por minuto)
- Foco especial no timeframe de 5 minutos
- Interface responsiva e intuitiva

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- Framer Motion para animações
- React Plotly.js para gráficos

## Configuração do Projeto

### Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL (ou outro banco de dados compatível com Prisma)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/binance-futures-signals.git
   cd binance-futures-signals
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/binance_signals"
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

- `/app`: Páginas da aplicação (Next.js App Router)
- `/components`: Componentes React reutilizáveis
- `/lib`: Funções utilitárias
- `/prisma`: Schema do banco de dados e migrações

## Uso

1. Acesse a página inicial para uma visão geral da ferramenta
2. Navegue para o Dashboard para ver os sinais em tempo real
3. Utilize a página de Sinais para ver o histórico e filtrar por diferentes critérios
4. Consulte a página Sobre para entender como os sinais são calculados

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.