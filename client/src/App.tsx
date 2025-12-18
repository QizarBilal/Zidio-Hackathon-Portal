import { Switch, Route, Link, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Lock, User, Users, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight, Trophy, GraduationCap, Code } from "lucide-react";
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
        <div className="mb-12 space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">Trusted Partners</Badge>
          <h1 className="text-4xl font-bold lg:text-5xl">Our Esteemed Clientele</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Collaborating with India's leading government ministries, premier educational institutions, and enterprise technology partners
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex aspect-square items-center justify-center rounded-xl border-2 bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
            >
              <span className="text-sm font-semibold leading-tight">{partner}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button variant="ghost" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SignupPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [step, setStep] = useState<"role" | "details" | "otp" | "pending">("role");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");

  const handleRoleSubmit = () => {
    if (role) setStep("details");
  };

  const handleDetailsSubmit = () => {
    if (role === "admin") {
      setStep("pending");
    } else {
      setStep("otp");
    }
  };

  const handleOtpSubmit = () => {
    login(role as any, email, name);
    if (role === "judge") {
      setLocation("/judge");
    } else if (role === "admin") {
      setLocation("/admin");
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative animate-in fade-in duration-700">
      {/* Premium animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-primary/5 animate-gradient" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* LEFT: Form Section - 55% */}
      <div className="flex w-full lg:w-[55%] items-center justify-center p-3 lg:p-4 overflow-hidden relative z-10 animate-in slide-in-from-left duration-700">
        <div className="w-full max-w-xl h-full flex flex-col justify-center py-2">
          <div className="mb-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:gap-3 transition-all hover:bg-primary/10 group h-8">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                <Badge className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground shadow-lg">GET STARTED</Badge>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Join India's Largest
                </span>
                <br/>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Innovation Network
                </span>
              </h1>
              <p className="text-xs text-muted-foreground leading-snug max-w-lg">
                Where brilliant minds converge and groundbreaking ideas flourish.
              </p>
            </div>
          
          <div className="bg-card border-2 border-border/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 hover:border-primary/30 transition-all">
            <div className="space-y-1 mb-3">
              <h2 className="text-lg font-bold text-foreground">Create Your Account</h2>
              <p className="text-xs text-muted-foreground">
                {step === "role" && "Choose your role to get started"}
                {step === "details" && "Complete your registration"}
                {step === "otp" && "Verify your email address"}
                {step === "pending" && "Approval pending"}
              </p>
            </div>

            {step === "role" && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setRole("participant")}
                    className={`group flex flex-col items-center gap-2 rounded-xl border-2 p-3.5 transition-all hover:scale-105 hover:shadow-lg ${
                      role === "participant" ? "border-primary bg-primary/10 shadow-lg scale-105" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                      role === "participant" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold">Participant</div>
                      <div className="text-xs text-muted-foreground">Compete & build</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setRole("mentor")}
                    className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all hover:scale-105 hover:shadow-lg ${
                      role === "mentor" ? "border-primary bg-primary/10 shadow-lg scale-105" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                      role === "mentor" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Mentor</div>
                      <div className="text-xs text-muted-foreground mt-1">Guide teams</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setRole("judge")}
                    className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all hover:scale-105 hover:shadow-lg ${
                      role === "judge" ? "border-primary bg-primary/10 shadow-lg scale-105" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                      role === "judge" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <Code className="h-7 w-7" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Judge</div>
                      <div className="text-xs text-muted-foreground mt-1">Evaluate work</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setRole("admin")}
                    className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all hover:scale-105 hover:shadow-lg ${
                      role === "admin" ? "border-primary bg-primary/10 shadow-lg scale-105" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                      role === "admin" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <Shield className="h-7 w-7" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Admin</div>
                      <div className="text-xs text-muted-foreground mt-1">Manage platform</div>
                    </div>
                  </button>
                </div>
                {role && (
                  <div className="rounded-lg border bg-muted/50 p-3 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-xs leading-relaxed">
                      {role === "participant" && "Compete in national-level hackathons and build innovative solutions"}
                      {role === "mentor" && "Share your expertise and guide the next generation of innovators"}
                      {role === "judge" && "Evaluate submissions and provide structured feedback"}
                      {role === "admin" && "Manage platform operations and coordinate events"}
                    </p>
                  </div>
                )}
                <Button onClick={handleRoleSubmit} disabled={!role} className="w-full h-11" size="default">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === "details" && (
              <form onSubmit={handleDetailsSubmit} className="space-y-3.5 animate-in fade-in duration-500">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="h-10 pl-10 transition-all focus:ring-2 focus:ring-primary/20" 
                      placeholder="John Doe"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="h-10 pl-10 transition-all focus:ring-2 focus:ring-primary/20" 
                      placeholder="john@university.edu"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="h-10 pl-10 transition-all focus:ring-2 focus:ring-primary/20" 
                      placeholder="Create strong password"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="h-10 pl-10 transition-all focus:ring-2 focus:ring-primary/20" 
                      placeholder="Re-enter password"
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 shadow-lg hover:shadow-xl transition-all" size="default">
                  {role === "admin" ? "Submit for Approval" : "Send Verification Code"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {step === "otp" && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Verification Code Sent</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Enter the 6-digit code sent to <span className="font-medium text-foreground">{email}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="otp" className="text-sm font-medium">Verification Code</Label>
                  <Input 
                    id="otp" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                    placeholder="000000" 
                    maxLength={6}
                    className="h-14 text-center text-2xl tracking-[0.5em] font-semibold transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button 
                  onClick={handleOtpSubmit} 
                  disabled={otp.length !== 6} 
                  className="w-full h-11 shadow-lg hover:shadow-xl transition-all"
                  size="default"
                >
                  Verify & Complete Registration <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
                <button className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  Didn't receive code? <span className="font-medium">Resend</span>
                </button>
              </div>
            )}

            {step === "pending" && (
              <div className="space-y-4 text-center animate-in fade-in duration-500">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-950/30 shadow-lg">
                  <AlertCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Approval Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Your admin access request has been submitted successfully
                  </p>
                </div>
                <div className="rounded-lg border bg-gradient-to-br from-muted/50 to-muted p-4 text-left">
                  <div className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium mb-1">What happens next?</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Our team will review your request and send a confirmation email to{" "}
                        <span className="font-semibold text-foreground">{email}</span>. You'll be notified by{" "}
                        <span className="font-semibold text-primary">zidiohacks@gmail.com</span> once approved.
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/">
                  <Button variant="outline" className="w-full h-11" size="default">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                  </Button>
                </Link>
              </div>
            )}

            {step !== "pending" && (
              <div className="text-center text-sm pt-2">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      
      {/* RIGHT: Stunning Visual Section - 45% */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden animate-in slide-in-from-right duration-700 delay-200">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=90"
            alt="Team collaboration"
            className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-6 text-white h-full">
          {/* Top Badge */}
          <div className="animate-in fade-in duration-1000 delay-500">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 shadow-2xl hover:bg-white/20 transition-all group">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold">10,000+ Innovators</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                Your Ideas.<br/>
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent animate-shimmer">Our Platform.</span><br/>
                <span className="text-white/90">Limitless Innovation.</span>
              </h2>
              <p className="text-xs text-white/95 leading-snug max-w-md font-medium">
                Join a thriving ecosystem of innovators and transform ideas into reality.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">50+</div>
                <div className="text-xs text-white/80 font-medium leading-tight">Universities</div>
              </div>
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">100+</div>
                <div className="text-xs text-white/80 font-medium leading-tight">Partners</div>
              </div>
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">24/7</div>
                <div className="text-xs text-white/80 font-medium leading-tight">Support</div>
              </div>
            </div>

            {/* Avatar Stack */}
            <div className="flex items-center gap-2 animate-in fade-in duration-1000 delay-1000">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white/20"></div>
                ))}
              </div>
              <p className="text-xs text-white/90 font-medium">
                Join <span className="font-bold">thousands</span> of innovators
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"participant" | "judge" | "admin" | "mentor">("participant");

  const handleLogin = () => {
    login(role, email);
    if (role === "judge") {
      setLocation("/judge");
    } else if (role === "admin") {
      setLocation("/admin");
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-full relative animate-in fade-in duration-700">
      {/* Dynamic animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-accent/5 animate-gradient" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* LEFT: Stunning Visual Section - 45% */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden animate-in slide-in-from-left duration-700">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=90"
            alt="Innovation ecosystem"
            className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.2),transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-6 text-white h-full">
          {/* Top Badge */}
          <div className="animate-in fade-in duration-1000 delay-300">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 shadow-2xl hover:bg-white/20 transition-all group">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <Shield className="w-3 h-3 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Secure Portal</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                Welcome Back,<br/>
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent animate-shimmer">Innovator</span>
              </h2>
              <p className="text-xs text-white/95 leading-snug max-w-md font-medium">
                Your innovation dashboard awaits. Continue building the future.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Live Progress</div>
                  <div className="text-xs text-white/75">Real-time rankings</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Collaboration</div>
                  <div className="text-xs text-white/75">Connect with talent</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/20">
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">10K+</div>
                <div className="text-xs text-white/80 font-medium">Users</div>
              </div>
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">50+</div>
                <div className="text-xs text-white/80 font-medium">Colleges</div>
              </div>
              <div className="space-y-0.5 group hover:scale-110 transition-all duration-300 cursor-default">
                <div className="text-xl font-black bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">24/7</div>
                <div className="text-xs text-white/80 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Premium Form Section - 55% */}
      <div className="flex w-full lg:w-[55%] items-center justify-center p-3 lg:p-4 overflow-hidden relative z-10 animate-in slide-in-from-right duration-700 delay-200">
        <div className="w-full max-w-xl h-full flex flex-col justify-center py-2">
          <div className="mb-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:gap-3 transition-all hover:bg-primary/10 group h-8">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                <Badge className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground shadow-lg">SIGN IN</Badge>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Continue Your
                </span>
                <br/>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Innovation Journey
                </span>
              </h1>
              <p className="text-xs text-muted-foreground leading-snug max-w-lg">
                Access your personalized dashboard and connect with the ecosystem.
              </p>
            </div>

            <div className="bg-card border-2 border-border/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 hover:border-primary/30 transition-all">
              <div className="space-y-0.5 mb-3">
                <h2 className="text-base font-bold text-foreground">Sign In to Your Account</h2>
                <p className="text-xs text-muted-foreground">Enter credentials to access workspace</p>
              </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-2.5 animate-in fade-in duration-500 delay-300">
              <div className="space-y-1.5 group">
                <Label htmlFor="login-role" className="text-sm font-medium group-hover:text-primary transition-colors">Select Your Role</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger id="login-role" className="h-11 transition-all hover:border-primary/50 focus:ring-2 focus:ring-primary/20 hover:shadow-md">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="participant">
                      <div className="flex items-center gap-2 py-0.5">
                        <Trophy className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Participant</div>
                          <div className="text-xs text-muted-foreground">Compete & build</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="mentor">
                      <div className="flex items-center gap-2 py-0.5">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Mentor</div>
                          <div className="text-xs text-muted-foreground">Guide teams</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="judge">
                      <div className="flex items-center gap-2 py-0.5">
                        <Code className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Judge</div>
                          <div className="text-xs text-muted-foreground">Evaluate work</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2 py-0.5">
                        <Shield className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Admin</div>
                          <div className="text-xs text-muted-foreground">Manage platform</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="login-email" className="text-sm font-medium group-hover:text-primary transition-colors">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  <Input 
                    id="login-email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="h-11 pl-10 transition-all focus:ring-2 focus:ring-primary/20 hover:border-primary/50 hover:shadow-md focus:scale-[1.01]" 
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="login-password" className="text-sm font-medium group-hover:text-primary transition-colors">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="h-11 pl-10 transition-all focus:ring-2 focus:ring-primary/20 hover:border-primary/50 hover:shadow-md focus:scale-[1.01]" 
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!email || !password} 
                className="w-full h-12 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold" 
                size="default"
              >
                Sign In <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="text-center text-sm pt-2 animate-in fade-in duration-500 delay-500">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
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
            <Router />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
