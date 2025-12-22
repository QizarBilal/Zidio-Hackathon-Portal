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
    title: "TechnoVerse Innovation Challenge",
    organizer: "IIT Delhi",
    category: "Technology",
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
    title: "Smart Team Matching",
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
    description: "Transparent judging with structured scoring and multi-tier review process.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track your progress, submissions, and rankings with comprehensive dashboards.",
  },
];

const partnerLogos = [
  { name: "Ministry of Education", logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
  { name: "IIT Bombay", logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg" },
  { name: "IIT Delhi", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/150px-Indian_Institute_of_Technology_Delhi_Logo.svg.png" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" },
  { name: "Flipkart", logo: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png" },
  { name: "Adobe", logo: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/200px-Intel_logo_%282006-2020%29.svg.png" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/200px-Nvidia_logo.svg.png" },
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
    }, 3000);

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
          <div className="relative py-6 sm:py-12 lg:py-14 min-h-[450px] sm:min-h-[500px] flex items-center">
            
            {currentSlide === 0 && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 opacity-100">
                <div className="grid items-center gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1.2fr,0.8fr]">
                  <div className="space-y-4 sm:space-y-6 max-w-3xl">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 backdrop-blur-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Innovators & Builders</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                        Where India's Best Minds Build Real Solutions
                      </h1>
                      
                      <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                        Participate in national and state-level hackathons, collaborate with top talent, and solve real-world challenges backed by institutions and industry.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link href="/signup">
                        <Button className="h-11 px-5 sm:px-6 text-sm font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                          Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/explore">
                        <Button variant="outline" className="h-11 px-5 sm:px-6 text-sm font-semibold rounded-xl border-2 hover:bg-primary/5 hover:border-primary/50 hover:scale-105 transition-all duration-300">
                          Explore Hackathons
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative hidden lg:block">
                    <div className="relative h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" alt="Students collaborating" className="h-full w-full object-cover brightness-100 dark:brightness-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-background/90 dark:via-background/20"></div>
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/40 bg-white/95 dark:bg-background/80 backdrop-blur-xl p-4 shadow-lg">
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
              <div className="w-full animate-in fade-in slide-in-from-left-4 duration-700 opacity-100">
                <div className="grid items-center gap-6 lg:grid-cols-[1.3fr,0.7fr]">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <GraduationCap className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Universities & Institutions</span>
                      </div>
                      
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                        Powering Academic Innovation at Scale
                      </h1>
                      
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
                        Enable students to innovate beyond classrooms through structured hackathons.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 rounded-xl border bg-card/50 p-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold">Curriculum Integration</div>
                          <div className="text-[11px] text-muted-foreground">Integrate hackathons into academic programs</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 rounded-xl border bg-card/50 p-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold">Industry Partnerships</div>
                          <div className="text-[11px] text-muted-foreground">Connect students with companies and mentors</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 rounded-xl border bg-card/50 p-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold">End-to-End Management</div>
                          <div className="text-[11px] text-muted-foreground">Complete platform for organizing events</div>
                        </div>
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
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" alt="University innovation lab" className="h-full w-full object-cover brightness-100 dark:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-background/80"></div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/40 bg-white/95 dark:bg-background/90 backdrop-blur-xl p-4 shadow-lg">
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
              <div className="w-full animate-in fade-in slide-in-from-right-4 duration-700 opacity-100">
                <div className="grid items-center gap-6 lg:grid-cols-[0.7fr,1.3fr]">
                  <div className="relative h-[400px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80" alt="Enterprise" className="h-full w-full object-cover brightness-100 dark:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-background/80"></div>
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="rounded-xl border border-border/40 bg-white/95 dark:bg-background/90 backdrop-blur-xl p-4 w-full shadow-lg">
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
                      
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[1.05] tracking-tight">
                        Discover Talent Through Real Innovation
                      </h1>
                      
                      <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
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
              <div className="w-full animate-in fade-in zoom-in-95 duration-700 opacity-100">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">For Mentors & Judges</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                        Evaluate, Guide, and Shape Innovation
                      </h1>
                      
                      <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
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

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-4">
                      <div className="relative h-[120px] sm:h-[150px] lg:h-[180px] overflow-hidden rounded-xl border border-border/50 shadow-lg">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" alt="Mentors" className="h-full w-full object-cover brightness-100 dark:brightness-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent dark:from-background/70"></div>
                      </div>
                      <div className="rounded-xl border bg-card p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                        <div className="text-xs text-muted-foreground">Expert Mentors</div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="rounded-xl border bg-card p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl font-bold text-primary">1000+</div>
                        <div className="text-xs text-muted-foreground">Reviews Completed</div>
                      </div>
                      <div className="relative h-[120px] sm:h-[150px] lg:h-[180px] overflow-hidden rounded-xl border border-border/50 shadow-lg">
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80" alt="Judging" className="h-full w-full object-cover brightness-100 dark:brightness-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent dark:from-background/70"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 rounded-full bg-background/60 backdrop-blur-md border border-border/50 px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
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
      <section className="border-y bg-card py-6 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Featured Hackathons</h2>
              <p className="mt-1 text-sm text-muted-foreground">
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

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="p-4 sm:p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
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
                    <h3 className="mb-1 text-sm sm:text-base font-semibold line-clamp-2">{hackathon.title}</h3>
                    <p className="mb-3 text-xs sm:text-sm text-muted-foreground">
                      by {hackathon.organizer}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-primary text-xs sm:text-sm">
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

      <section id="why-zidiohacks" className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-14 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-sm text-muted-foreground">
              A complete ecosystem designed for hackathon participants, organizers, judges, and recruiters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Problem-Driven Innovation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Access curated problem statements from government bodies, enterprises, and startups across sectors.
              </p>
            </div>

            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Smart Team Matching</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Find the perfect teammates based on skills, experience, and project compatibility.
              </p>
            </div>

            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Verified Credentials</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Earn blockchain-verified certificates and build your professional portfolio.
              </p>
            </div>

            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Direct Hiring Pipeline</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Get noticed by top recruiters and secure internships through your hackathon performance.
              </p>
            </div>

            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Fair Evaluation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Transparent judging with structured scoring and multi-tier review process.
              </p>
            </div>

            <div className="bg-background border p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex p-2.5 sm:p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Real-Time Analytics</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Track your progress, submissions, and rankings with comprehensive dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-10 lg:mb-12 text-center">
            <h2 className="mb-3 text-xl sm:text-2xl lg:text-3xl font-bold">For Everyone in the Ecosystem</h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Tailored experiences for every stakeholder in the hackathon journey.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-5 sm:p-6">
              <Users className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mb-2 text-base sm:text-lg font-semibold">Participants</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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

            <Card className="p-5 sm:p-6">
              <GraduationCap className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mb-2 text-base sm:text-lg font-semibold">Universities</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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

            <Card className="p-5 sm:p-6">
              <Building2 className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mb-2 text-base sm:text-lg font-semibold">Enterprises</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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

            <Card className="p-5 sm:p-6">
              <Briefcase className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mb-2 text-base sm:text-lg font-semibold">Recruiters</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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

      <section className="border-t bg-background py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-16 text-center">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-foreground px-4 leading-tight">
              Identified 5000+ solutions for over 200+ organisations worldwide
            </h2>
          </div>
          
          <div className="relative mb-12">
            <style>{`
              @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll {
                animation: scroll-left 12s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="flex items-center gap-6 sm:gap-10 lg:gap-12 animate-scroll">
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 h-12 w-28 sm:h-14 sm:w-32 lg:h-16 lg:w-40 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain brightness-110 contrast-125 saturate-110"
                    style={{ filter: 'brightness(1.1) contrast(1.25) saturate(1.1)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/clientele">
              <Button variant="ghost" className="text-sm hover:text-primary">
                Explore more
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
                <li><Link href="/about" className="hover:text-slate-100">About Us</Link></li>
                <li><Link href="/clientele" className="hover:text-slate-100">Our Clientele</Link></li>
                <li><Link href="/careers" className="hover:text-slate-100">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-slate-100">Contact</Link></li>
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
                  <span>support@zidiohacks.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 123 456 7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>Zidio Development<br />Bangalore, Karnataka, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
              <p>&copy; 2025 Hackathon Portal. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy-policy" className="hover:text-slate-100">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-slate-100">Terms of Service</Link>
                <Link href="/cookie-policy" className="hover:text-slate-100">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
