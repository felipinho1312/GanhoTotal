import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardsProps {
  balance: number;
  gains: number;
  losses: number;
}

export default function SummaryCards({ balance, gains, losses }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-4">
      <Card className="relative overflow-hidden hover-elevate">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-50 animate-bounce">
          💰
        </div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Wallet className="h-4 w-4 inline mr-2" />
            Saldo Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" data-testid="text-balance">
            R$ {balance.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Ganhos Totais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600" data-testid="text-gains">
            R$ {gains.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <TrendingDown className="h-4 w-4 inline mr-2" />
            Perdas Totais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600" data-testid="text-losses">
            R$ {losses.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
