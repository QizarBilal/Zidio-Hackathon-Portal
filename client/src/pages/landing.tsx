import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Shield,
  Zap,
  Target,
  Award,
  TrendingUp,
  Globe,
  CheckCircle2,
} from "lucide-react";

const featuredHackathons = [
  {
    id: "1",
    title: "Smart India Hackathon 2025",
    organizer: "Ministry of Education",
    category: "National",
    prizePool: 5000000,
    registrations: 45000,
    status: "registration_open",
    deadline: "2025-01-15",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    title: "TechnoVerse AI Challenge",
    organizer: "IIT Delhi",
    category: "AI/ML",
    prizePool: 1500000,
    registrations: 12000,
    status: "registration_open",
    deadline: "2025-01-20",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    title: "FinTech Innovation Sprint",
    organizer: "HDFC Bank",
    category: "FinTech",
    prizePool: 2000000,
    registrations: 8500,
    status: "upcoming",
    deadline: "2025-02-01",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
  },
];

const stats = [
  { label: "Active Hackathons", value: "150+", icon: Trophy },
  { label: "Registered Participants", value: "2.5L+", icon: Users },
  { label: "Partner Organizations", value: "500+", icon: Building2 },
  { label: "Universities", value: "1200+", icon: GraduationCap },
];

const features = [
  {
    icon: Target,
    title: "Problem-Driven Innovation",
    description: "Access curated problem statements from government bodies, enterprises, and startups across sectors.",
  },
  {
    icon: Users,
    title: "AI-Powered Team Matching",
    description: "Find the perfect teammates based on skills, experience, and project compatibility.",
  },
  {
    icon: Award,
    title: "Verified Credentials",
    description: "Earn blockchain-verified certificates and build your professional portfolio.",
  },
  {
    icon: Briefcase,
    title: "Direct Hiring Pipeline",
    description: "Get noticed by top recruiters and secure internships through your hackathon performance.",
  },
  {
    icon: Shield,
    title: "Fair Evaluation",
    description: "Transparent judging with AI-assisted scoring and multi-tier review process.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track your progress, submissions, and rankings with comprehensive dashboards.",
  },
];

const partners = [
  "Ministry of Education",
  "NASSCOM",
  "IIT Bombay",
  "IIT Delhi",
  "IIIT Hyderabad",
  "Infosys",
  "TCS",
  "Wipro",
  "Microsoft",
  "Google",
  "Amazon",
  "Flipkart",
];

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Globe className="mr-1 h-3 w-3" />
              India's Largest Hackathon Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build. Compete.{" "}
              <span className="text-primary">Innovate.</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Join the national-level hackathon ecosystem connecting students, developers, and innovators 
              with government bodies, enterprises, and top universities across India.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {!isLoading && !isAuthenticated ? (
                <a href="/api/login">
                  <Button size="lg" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Link href="/dashboard">
                  <Button size="lg" data-testid="button-go-to-dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link href="/explore">
                <Button variant="outline" size="lg" data-testid="button-explore">
                  Explore Hackathons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured Hackathons</h2>
              <p className="mt-1 text-muted-foreground">
                Top opportunities handpicked for you
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" data-testid="button-view-all">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredHackathons.map((hackathon) => (
              <Link key={hackathon.id} href={`/hackathon/${hackathon.id}`}>
                <Card className="group cursor-pointer overflow-hidden transition-all hover-elevate" data-testid={`card-hackathon-${hackathon.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {hackathon.category}
                      </Badge>
                      <Badge
                        className={
                          hackathon.status === "registration_open"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }
                      >
                        {hackathon.status === "registration_open" ? "Open" : "Upcoming"}
                      </Badge>
                    </div>
                    <h3 className="mb-1 font-semibold line-clamp-1">{hackathon.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      by {hackathon.organizer}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-primary">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(hackathon.prizePool)}
                      </span>
                      <span className="text-muted-foreground">
                        {hackathon.registrations.toLocaleString()} registered
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A complete ecosystem designed for hackathon participants, organizers, judges, and recruiters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-background p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">For Everyone in the Ecosystem</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Tailored experiences for every stakeholder in the hackathon journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Participants</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Team formation & matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Multi-format submissions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Portfolio & certificates
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <GraduationCap className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Universities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Host branded hackathons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Student analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Industry partnerships
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Building2 className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Enterprises</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Sponsor hackathons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Define problem statements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Direct talent access
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Briefcase className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Recruiters</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Browse talent pool
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  View project portfolios
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Shortlist candidates
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by Leading Organizations
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-sm font-medium text-muted-foreground"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-xl bg-primary p-8 text-center text-primary-foreground sm:p-12">
            <Zap className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Ready to Start Your Hackathon Journey?
            </h2>
            <p className="mb-6 opacity-90">
              Join thousands of innovators building solutions for real-world problems.
            </p>
            {!isLoading && !isAuthenticated ? (
              <a href="/api/login">
                <Button
                  size="lg"
                  variant="secondary"
                  data-testid="button-cta-signup"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href="/explore">
                <Button
                  size="lg"
                  variant="secondary"
                  data-testid="button-cta-explore"
                >
                  Find Hackathons
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Zidio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              National Hackathon Platform for India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
