import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FilterOptions {
  startDate: string;
  endDate: string;
  type: "all" | "gain" | "loss";
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState<FilterOptions["type"]>("all");

  const handleApply = () => {
    onFilterChange({ startDate, endDate, type });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_1fr]">
          <div className="space-y-2">
            <Label htmlFor="start-date">Data Início</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              data-testid="input-start-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Data Fim</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              data-testid="input-end-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={type} onValueChange={(val) => setType(val as FilterOptions["type"])}>
              <SelectTrigger id="type" data-testid="select-type">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="gain">Ganhos</SelectItem>
                <SelectItem value="loss">Perdas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleApply} className="w-full" data-testid="button-apply-filter">
              Aplicar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
