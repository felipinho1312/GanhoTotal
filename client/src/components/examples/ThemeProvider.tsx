import { ThemeProvider, useTheme } from "../ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeToggleExample() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="p-4">
      <Button onClick={toggleTheme} variant="outline" data-testid="button-theme-toggle">
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
      <p className="mt-2">Tema atual: {theme}</p>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <ThemeToggleExample />
    </ThemeProvider>
  );
}
