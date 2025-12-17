import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navigation() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src="/logo.png" alt="Zidio" className="h-8 w-auto" />
                <span className="text-xl font-semibold text-gray-900">Zidio</span>
              </a>
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link href="/">
                <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Home</a>
              </Link>
              <Link href="/explore">
                <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Explore Hackathons</a>
              </Link>
              <Link href="/leaderboard">
                <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Leaderboard</a>
              </Link>
              <Link href="/certificates">
                <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Certificates</a>
              </Link>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Dashboard</a>
                </Link>
                <Link href="/portfolio">
                  <a className="text-sm font-medium text-gray-700 hover:text-gray-900">Portfolio</a>
                </Link>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">Login</Button>
                <Button size="sm">Sign Up</Button>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link href="/">
              <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Home</a>
            </Link>
            <Link href="/explore">
              <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Explore Hackathons</a>
            </Link>
            <Link href="/leaderboard">
              <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Leaderboard</a>
            </Link>
            <Link href="/certificates">
              <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Certificates</a>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Dashboard</a>
                </Link>
                <Link href="/portfolio">
                  <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Portfolio</a>
                </Link>
              </>
            ) : (
              <div className="space-y-2 px-3 pt-2">
                <Button variant="ghost" className="w-full" size="sm">Login</Button>
                <Button className="w-full" size="sm">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Zidio" className="h-8 w-auto mb-4" />
            <p className="text-sm leading-relaxed">
              National-level hackathon platform connecting innovators, universities, and enterprises across India.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/explore"><a className="text-sm hover:text-white">Explore Hackathons</a></Link></li>
              <li><Link href="/certificates"><a className="text-sm hover:text-white">Certificates</a></Link></li>
              <li><Link href="/leaderboard"><a className="text-sm hover:text-white">Leaderboard</a></Link></li>
              <li><Link href="/portfolio"><a className="text-sm hover:text-white">Portfolio</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Organization</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white">Universities</a></li>
              <li><a href="#" className="text-sm hover:text-white">Recruiters</a></li>
              <li><a href="#" className="text-sm hover:text-white">Mentors</a></li>
              <li><Link href="/admin"><a className="text-sm hover:text-white">Admin Access</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white">About Zidio</a></li>
              <li><a href="#" className="text-sm hover:text-white">Partnerships</a></li>
              <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
              <li><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm">© 2025 Zidio Development. All rights reserved.</p>
            <p className="text-sm">India</p>
          </div>
        </div>
      </div>
    </footer>
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="zidio-theme">
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
