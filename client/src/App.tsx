import { useState, useEffect } from "react";
import { useQuery, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage";
import Dashboard from "@/components/Dashboard";

type Page = "login" | "register" | "dashboard";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  // Check if user is already authenticated
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/me"],
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setCurrentPage("dashboard");
    }
  }, [user]);

  const handleLogin = () => {
    setCurrentPage("dashboard");
    window.location.reload(); // Reload to fetch user data
  };

  const handleRegister = () => {
    setCurrentPage("dashboard");
    window.location.reload(); // Reload to fetch user data
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  const handleGoToRegister = () => {
    setCurrentPage("register");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {currentPage === "dashboard" ? (
        <Dashboard onLogout={handleLogout} />
      ) : currentPage === "register" ? (
        <RegisterPage onRegister={handleRegister} onBackToLogin={handleBackToLogin} />
      ) : (
        <LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
