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
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
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
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [stat.value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <stat.icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-bold sm:text-3xl">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      eyebrow: "For Innovators & Builders",
      headline: "Where India's Best Minds Build Real Solutions",
      description: "Participate in national and state-level hackathons, collaborate with top talent, and solve real-world challenges backed by institutions and industry.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Students collaborating on hackathon projects",
      cta1: { text: "Sign Up", href: "/signup" },
      cta2: { text: "Explore Hackathons", href: "/explore" }
    },
    {
      eyebrow: "For Universities & Institutions",
      headline: "Powering Academic Innovation at Scale",
      description: "Enable students to innovate beyond classrooms through structured hackathons aligned with curriculum, research, and industry needs.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "University innovation lab",
      cta1: { text: "Partner with Us", href: "/signup" },
      cta2: { text: "Learn More", href: "/explore" }
    },
    {
      eyebrow: "For Enterprises & Recruiters",
      headline: "Discover Talent Through Real Innovation",
      description: "Identify skilled candidates by evaluating real projects, not resumes — through enterprise-grade hackathons and challenges.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Corporate innovation setting",
      cta1: { text: "Host a Hackathon", href: "/signup" },
      cta2: { text: "View Talent Pool", href: "/explore" }
    },
    {
      eyebrow: "For Mentors & Judges",
      headline: "Evaluate, Guide, and Shape Innovation",
      description: "Mentor teams, review submissions, and uphold transparent, structured evaluation across national-level competitions.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Judges reviewing hackathon submissions",
      cta1: { text: "Join as Mentor", href: "/signup" },
      cta2: { text: "View Opportunities", href: "/explore" }
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <div className="min-h-screen">
      <section 
        className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/[0.02]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-12 lg:py-14 min-h-[500px] flex items-center">
            
            {currentSlide === 0 && (
              <div className="w-full transition-all duration-1000 opacity-100">
                <div className="grid items-center gap-10 lg:grid-cols-[1.2fr,0.8fr]">
                  <div className="space-y-6 max-w-3xl">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 backdrop-blur-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Innovators & Builders</span>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                        Where India's Best Minds Build Real Solutions
                      </h1>
                      
                      <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
                        Participate in national and state-level hackathons, collaborate with top talent, and solve real-world challenges backed by institutions and industry.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link href="/signup">
                        <Button className="h-11 px-6 text-sm font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                          Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/explore">
                        <Button variant="outline" className="h-11 px-6 text-sm font-semibold rounded-xl border-2 hover:bg-primary/5 hover:border-primary/50 hover:scale-105 transition-all duration-300">
                          Explore Hackathons
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative h-[380px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" alt="Students collaborating" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent dark:from-background/90 dark:via-background/20"></div>
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/40 bg-background/95 dark:bg-background/80 backdrop-blur-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">10,000+ Participants</div>
                            <div className="text-xs text-muted-foreground">Active Innovators</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="w-full transition-all duration-1000 opacity-100">
                <div className="grid items-center gap-8 lg:grid-cols-[1.3fr,0.7fr]">
                  <div className="space-y-5">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <GraduationCap className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Universities & Institutions</span>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                        Powering Academic Innovation at Scale
                      </h1>
                      
                      <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
                        Enable students to innovate beyond classrooms through structured hackathons aligned with curriculum, research, and industry needs.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl border bg-card p-3">
                        <div className="text-2xl font-bold text-primary">50+</div>
                        <div className="text-xs text-muted-foreground">Universities</div>
                      </div>
                      <div className="rounded-xl border bg-card p-3">
                        <div className="text-2xl font-bold text-primary">200+</div>
                        <div className="text-xs text-muted-foreground">Events</div>
                      </div>
                      <div className="rounded-xl border bg-card p-3">
                        <div className="text-2xl font-bold text-primary">5k+</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link href="/signup">
                        <Button className="h-11 px-6 text-sm font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                          Partner with Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/explore">
                        <Button variant="outline" className="h-11 px-6 text-sm font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-300">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-[380px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" alt="University innovation lab" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent dark:from-background/80"></div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/40 bg-background/95 dark:bg-background/90 backdrop-blur-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">IITs, NITs, IIITs</div>
                          <div className="text-xs text-muted-foreground">Premier Institutions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="w-full transition-all duration-1000 opacity-100">
                <div className="grid items-center gap-6 lg:grid-cols-[0.7fr,1.3fr]">
                  <div className="relative h-[400px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80" alt="Enterprise" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent dark:from-background/80"></div>
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="rounded-xl border border-border/40 bg-background/95 dark:bg-background/90 backdrop-blur-xl p-4 w-full">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-8 w-8 text-primary" />
                          <div>
                            <div className="text-sm font-bold">100+ Partners</div>
                            <div className="text-xs text-muted-foreground">Enterprise Organizations</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <Briefcase className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Enterprises & Recruiters</span>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                        Discover Talent Through Real Innovation
                      </h1>
                      
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        Identify skilled candidates by evaluating real projects, not resumes — through enterprise-grade hackathons and challenges.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link href="/signup">
                        <Button className="h-11 px-6 text-sm font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                          Host a Hackathon <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/explore">
                        <Button variant="outline" className="h-11 px-6 text-sm font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-300">
                          View Talent Pool
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 3 && (
              <div className="w-full transition-all duration-1000 opacity-100">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Mentors & Judges</span>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                        Evaluate, Guide, and Shape Innovation
                      </h1>
                      
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        Mentor teams, review submissions, and uphold transparent, structured evaluation across national-level competitions.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link href="/signup">
                        <Button className="h-11 px-6 text-sm font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                          Join as Mentor <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/explore">
                        <Button variant="outline" className="h-11 px-6 text-sm font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-300">
                          View Opportunities
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="relative h-[180px] overflow-hidden rounded-xl border border-border/50 shadow-lg">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" alt="Mentors" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent dark:from-background/70"></div>
                      </div>
                      <div className="rounded-xl border bg-card p-4">
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-xs text-muted-foreground">Expert Mentors</div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="rounded-xl border bg-card p-4">
                        <div className="text-2xl font-bold text-primary">1000+</div>
                        <div className="text-xs text-muted-foreground">Reviews Completed</div>
                      </div>
                      <div className="relative h-[180px] overflow-hidden rounded-xl border border-border/50 shadow-lg">
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80" alt="Judging" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent dark:from-background/70"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 rounded-full bg-background/60 backdrop-blur-md border border-border/50 px-4 py-2.5 shadow-lg">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-500 ${
                  currentSlide === index 
                    ? 'h-2.5 w-10 bg-primary shadow-sm shadow-primary/50' 
                    : 'h-2.5 w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:w-6'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>
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
