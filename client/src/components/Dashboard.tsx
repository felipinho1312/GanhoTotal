import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import SummaryCards from "./SummaryCards";
import EntryForm from "./EntryForm";
import FilterSection, { type FilterOptions } from "./FilterSection";
import EntriesTable from "./EntriesTable";
import FinancialCharts from "./FinancialCharts";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Entry as BackendEntry } from "@shared/schema";

interface DashboardProps {
  onLogout: () => void;
}

// Transform backend entry to frontend entry format
const transformEntry = (entry: BackendEntry) => ({
  id: entry.id,
  date: entry.date,
  amount: entry.amount,
  description: entry.description || "",
  type: entry.type as "Ganho" | "Perda",
});

export default function Dashboard({ onLogout }: DashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: "",
    endDate: "",
    type: "all",
  });

  // Fetch entries from backend
  const { data: backendEntries = [], isLoading } = useQuery<BackendEntry[]>({
    queryKey: ["/api/entries"],
  });

  // Create entry mutation
  const createEntryMutation = useMutation({
    mutationFn: async (entry: { date: string; amount: number; description: string; type: string }) => {
      return apiRequest("/api/entries", {
        method: "POST",
        body: JSON.stringify(entry),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
    },
  });

  const handleLogout = async () => {
    try {
      await apiRequest("/api/logout", { method: "POST" });
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
      onLogout();
    }
  };

  const handleAddEntry = (entry: { date: string; amount: number; description: string; type: "Ganho" | "Perda" }) => {
    createEntryMutation.mutate(entry);
  };

  const getFilteredEntries = () => {
    const entries = backendEntries.map(transformEntry);
    
    return entries.filter((entry) => {
      let dateMatch = true;
      if (filters.startDate) dateMatch = dateMatch && entry.date >= filters.startDate;
      if (filters.endDate) dateMatch = dateMatch && entry.date <= filters.endDate;

      let typeMatch = true;
      if (filters.type !== "all") {
        typeMatch = filters.type === "gain" ? entry.amount > 0 : entry.amount < 0;
      }

      return dateMatch && typeMatch;
    });
  };

  const filteredEntries = getFilteredEntries();
  const balance = filteredEntries.reduce((sum, e) => sum + e.amount, 0);
  const gains = filteredEntries.filter((e) => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
  const losses = Math.abs(
    filteredEntries.filter((e) => e.amount < 0).reduce((sum, e) => sum + e.amount, 0)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-gradient-to-r from-primary to-[hsl(195_100%_50%)] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-medium">Gestor de Ganhos</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="destructive" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <SummaryCards balance={balance} gains={gains} losses={losses} />
        <EntryForm onAddEntry={handleAddEntry} />
        <FilterSection onFilterChange={setFilters} />
        <EntriesTable entries={filteredEntries} />
        <FinancialCharts entries={filteredEntries} />
      </div>
    </div>
  );
}
