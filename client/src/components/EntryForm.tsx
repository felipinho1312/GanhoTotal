import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Entry {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: "Ganho" | "Perda";
}

interface EntryFormProps {
  onAddEntry: (entry: Omit<Entry, "id">) => void;
}

export default function EntryForm({ onAddEntry }: EntryFormProps) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    const entry = {
      date,
      amount: numAmount,
      description,
      type: (numAmount > 0 ? "Ganho" : "Perda") as "Ganho" | "Perda",
    };

    onAddEntry(entry);
    setDate("");
    setAmount("");
    setDescription("");
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Adicionar Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[2fr_2fr_3fr_1fr]">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                data-testid="input-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (+ ganho, - perda)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                data-testid="input-amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Salário, Aluguel..."
                data-testid="input-description"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full" data-testid="button-add-entry">
                Adicionar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
