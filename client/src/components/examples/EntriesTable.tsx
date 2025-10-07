import EntriesTable from "../EntriesTable";

export default function EntriesTableExample() {
  const mockEntries = [
    { id: "1", date: "2025-01-15", amount: 5000, description: "Salário", type: "Ganho" as const },
    { id: "2", date: "2025-01-20", amount: -1200, description: "Aluguel", type: "Perda" as const },
    { id: "3", date: "2025-01-25", amount: 500, description: "Freelance", type: "Ganho" as const },
  ];

  return <EntriesTable entries={mockEntries} />;
}
