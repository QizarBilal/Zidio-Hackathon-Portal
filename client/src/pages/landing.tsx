import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, useRef } from "react";
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
  Mail,
  Phone,
  MapPin,
  Search,
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
  { label: "Active Hackathons", value: 50, icon: Trophy },
  { label: "Registered Participants", value: 10000, icon: Users },
  { label: "Partner Organizations", value: 100, icon: Building2 },
  { label: "Universities", value: 50, icon: GraduationCap },
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

function StatCounter({ stat }: { stat: { label: string; value: number; icon: any } }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <stat.icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-bold sm:text-3xl">
        {count.toLocaleString()}
        {stat.label.includes("Participants") ? "+" : "+"}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.02]"></div>
        <div className="container relative mx-auto px-4 py-24 lg:py-40">
          <div className="grid items-center gap-16 lg:grid-cols-[1.35fr,1fr] lg:gap-24">
            <div className="space-y-12">
              <div className="space-y-10">
                <div className="inline-block opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <span className="text-[0.8125rem] font-semibold tracking-[0.1em] text-primary uppercase">
                    National Hackathon Infrastructure
                  </span>
                </div>
                
                <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.02em] opacity-0 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100 sm:text-6xl lg:text-[5rem] xl:text-[5.75rem]">
                  India's Institutional Platform
                  <br />
                  <span className="text-primary">
                    for Innovation Ecosystems
                  </span>
                </h1>
                
                <div className="max-w-[38rem] space-y-6 opacity-0 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
                  <p className="text-[1.0625rem] font-normal leading-[1.7] text-foreground/80">
                    A verified infrastructure connecting research institutions, government bodies, and enterprise organizations with student innovators through structured problem statements, transparent evaluation frameworks, and recognized credentials.
                  </p>
                  <p className="text-[0.9375rem] leading-[1.65] text-muted-foreground">
                    From university participation to enterprise mentorship and recruitment—Zidio provides the complete lifecycle for national-scale innovation programs.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-600 delay-300">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-9 text-[0.9375rem] font-semibold shadow-md transition-all duration-300 hover:shadow-xl" data-testid="button-get-started">
                    Sign Up
                    <ArrowRight className="ml-2 h-[1.125rem] w-[1.125rem]" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="h-12 border-2 px-9 text-[0.9375rem] font-semibold transition-all duration-300 hover:border-primary/80 hover:bg-primary/[0.03]" data-testid="button-explore">
                    Explore Hackathons
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-10 border-l-[3px] border-primary/60 bg-card/40 py-7 pl-7 pr-5 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-600 delay-400 backdrop-blur-[2px]">
                <div className="flex items-center gap-4">
                  <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-primary/[0.08]">
                    <Trophy className="h-[1.875rem] w-[1.875rem] text-primary" />
                  </div>
                  <div>
                    <div className="text-[2rem] font-bold leading-none">50+</div>
                    <div className="mt-1.5 text-[0.8125rem] font-medium text-muted-foreground">Active Programs</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-primary/[0.08]">
                    <Users className="h-[1.875rem] w-[1.875rem] text-primary" />
                  </div>
                  <div>
                    <div className="text-[2rem] font-bold leading-none">10,000+</div>
                    <div className="mt-1.5 text-[0.8125rem] font-medium text-muted-foreground">Verified Participants</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-primary/[0.08]">
                    <Building2 className="h-[1.875rem] w-[1.875rem] text-primary" />
                  </div>
                  <div>
                    <div className="text-[2rem] font-bold leading-none">100+</div>
                    <div className="mt-1.5 text-[0.8125rem] font-medium text-muted-foreground">Institutional Partners</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block opacity-0 animate-in fade-in slide-in-from-right-6 duration-1000 delay-150">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" 
                  alt="Students collaborating on hackathon project" 
                  className="h-full w-full object-cover transition-transform duration-[8000ms] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-background/5"></div>
                <div className="absolute bottom-0 left-0 right-0 p-9">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg">
                      <GraduationCap className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[1.0625rem] font-bold leading-tight text-foreground">Academic Collaboration</div>
                      <div className="text-[0.8125rem] leading-relaxed text-muted-foreground">IITs, NITs, IIITs & 50+ Research Institutions</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/[0.08] blur-[80px]"></div>
              <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-primary/[0.05] blur-[100px]"></div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
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
      <section className="border-t bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Esteemed Partners</h2>
            <p className="text-muted-foreground">Trusted by leading institutions and enterprises across India</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex aspect-square items-center justify-center rounded-xl border-2 bg-background p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-center text-xs font-semibold leading-tight">{partner}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/clientele">
              <Button variant="outline" size="lg">
                View All Partners
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-slate-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-lg font-bold">Hackathon Portal</span>
              </div>
              <p className="text-sm text-slate-400">
                Building India's largest hackathon ecosystem for students, innovators, and organizations.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Hackathons</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/explore" className="hover:text-slate-100">Browse All</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">National Level</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">University</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">Corporate</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-slate-100">About Us</Link></li>
                <li><Link href="/clientele" className="hover:text-slate-100">Our Clientele</Link></li>
                <li><Link href="/" className="hover:text-slate-100">Careers</Link></li>
                <li><Link href="/" className="hover:text-slate-100">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Star Events</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/explore" className="hover:text-slate-100">Smart India Hackathon</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">TechnoVerse</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">Innovation Challenge</Link></li>
                <li><Link href="/explore" className="hover:text-slate-100">Featured Events</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Connect</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@hackathon.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 1234567890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>Innovation Hub, Tech Park<br />Bangalore, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
              <p>&copy; 2025 Hackathon Portal. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-slate-100">Privacy Policy</a>
                <a href="#" className="hover:text-slate-100">Terms of Service</a>
                <a href="#" className="hover:text-slate-100">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
