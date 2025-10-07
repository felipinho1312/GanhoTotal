import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

interface RegisterPageProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export default function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      onRegister();
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-[hsl(195_100%_50%)] p-4">
      <Card className="w-full max-w-md animate-in fade-in duration-1000">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Crie sua conta para gerenciar seus ganhos e perdas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
                placeholder="Mínimo 4 caracteres"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                data-testid="input-confirm-password"
                placeholder="Repita sua senha"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" data-testid="text-error">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="button-register"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBackToLogin}
              data-testid="button-back-to-login"
            >
              Já tenho conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
