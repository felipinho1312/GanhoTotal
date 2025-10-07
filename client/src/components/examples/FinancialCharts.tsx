import FinancialCharts from "../FinancialCharts";

export default function FinancialChartsExample() {
  const mockEntries = [
    { id: "1", date: "2025-01-05", amount: 3000, description: "Salário", type: "Ganho" as const },
    { id: "2", date: "2025-01-10", amount: -800, description: "Aluguel", type: "Perda" as const },
    { id: "3", date: "2025-01-15", amount: 500, description: "Freelance", type: "Ganho" as const },
    { id: "4", date: "2025-01-20", amount: -300, description: "Mercado", type: "Perda" as const },
    { id: "5", date: "2025-02-05", amount: 3000, description: "Salário", type: "Ganho" as const },
    { id: "6", date: "2025-02-12", amount: -850, description: "Aluguel", type: "Perda" as const },
  ];

  return <FinancialCharts entries={mockEntries} />;
}
