import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { LineChart, BarChart3 } from "lucide-react";
import type { Entry } from "./EntryForm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialChartsProps {
  entries: Entry[];
}

export default function FinancialCharts({ entries }: FinancialChartsProps) {
  const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dates = Array.from(new Set(sorted.map((e) => e.date)));
  const balances: number[] = [];
  let cumulative = 0;

  dates.forEach((date) => {
    const dayAmount = sorted
      .filter((e) => e.date === date)
      .reduce((sum, e) => sum + e.amount, 0);
    cumulative += dayAmount;
    balances.push(cumulative);
  });

  const monthlyData: { [key: string]: { gains: number; losses: number } } = {};
  sorted.forEach((entry) => {
    const month = entry.date.slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { gains: 0, losses: 0 };
    }
    if (entry.amount > 0) {
      monthlyData[month].gains += entry.amount;
    } else {
      monthlyData[month].losses += Math.abs(entry.amount);
    }
  });

  const months = Object.keys(monthlyData).sort();

  const lineData = {
    labels: dates.map((d) => new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })),
    datasets: [
      {
        label: "Saldo",
        data: balances,
        borderColor: "hsl(204, 100%, 50%)",
        backgroundColor: "hsl(204, 100%, 50%, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: months.map((m) => {
      const [year, month] = m.split("-");
      return `${month}/${year}`;
    }),
    datasets: [
      {
        label: "Ganhos",
        data: months.map((m) => monthlyData[m].gains),
        backgroundColor: "hsl(142, 71%, 45%)",
      },
      {
        label: "Perdas",
        data: months.map((m) => monthlyData[m].losses),
        backgroundColor: "hsl(0, 84%, 48%)",
      },
    ],
  };

  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Saldo ao Longo do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Ganhos vs Perdas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
