import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
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

function ClientelePage() {
  const partners = [
    "Ministry of Education",
    "NASSCOM",
    "IIT Bombay",
    "IIT Delhi",
    "IIIT Hyderabad",
    "IIT Madras",
    "IIT Kanpur",
    "IIT Kharagpur",
    "NIT Trichy",
    "BITS Pilani",
    "Infosys",
    "TCS",
    "Wipro",
    "Tech Mahindra",
    "HCL Technologies",
    "Cognizant",
    "Microsoft",
    "Google",
    "Amazon",
    "IBM",
    "Flipkart",
    "Paytm",
    "Zomato",
    "Ola",
    "ISRO",
    "DRDO",
    "Bharat Electronics",
    "HAL",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Clientele</h1>
          <p className="text-lg text-muted-foreground">
            Partnering with leading organizations, institutions, and enterprises across India
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-lg border bg-card p-8 text-center transition-all hover:border-primary hover:shadow-lg"
            >
              <span className="font-medium">{partner}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <a className="text-primary hover:underline">Back to Home</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      <Route path="/clientele" component={ClientelePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="zidio-theme">
        <TooltipProvider>
          <div className="min-h-screen">
            <AppSidebar />
            <main>
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
