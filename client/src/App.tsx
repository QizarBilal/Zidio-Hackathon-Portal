import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import ExplorePage from "@/pages/explore";
import HackathonDetailsPage from "@/pages/hackathon-details";
import ParticipantDashboard from "@/pages/participant-dashboard";
import TeamsPage from "@/pages/teams";
import SubmissionsPage from "@/pages/submissions";
import LeaderboardPage from "@/pages/leaderboard";
import CertificatesPage from "@/pages/certificates";
import PortfolioPage from "@/pages/portfolio";
import JudgeDashboard from "@/pages/judge-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/hackathon/:id" component={HackathonDetailsPage} />
      <Route path="/dashboard" component={ParticipantDashboard} />
      <Route path="/teams" component={TeamsPage} />
      <Route path="/submissions" component={SubmissionsPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/certificates" component={CertificatesPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/judge" component={JudgeDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="zidio-theme">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <ThemeToggle />
                </header>
                <main className="flex-1">
                  <Router />
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
