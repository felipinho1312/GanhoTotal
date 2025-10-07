import { ThemeProvider } from "../ThemeProvider";
import Dashboard from "../Dashboard";

export default function DashboardExample() {
  return (
    <ThemeProvider>
      <Dashboard onLogout={() => console.log("Logout clicked")} />
    </ThemeProvider>
  );
}
