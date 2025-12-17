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
import { Shield, Mail, Lock, User, AlertCircle, CheckCircle2, ArrowLeft, Trophy, GraduationCap, Code } from "lucide-react";
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
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Join India's Premier Hackathon Ecosystem</h2>
          <p className="text-lg text-muted-foreground">
            Connect with government bodies, premier institutions, and enterprise partners
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="rounded-lg border bg-background p-4">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Active Events</div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">Partners</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                {step === "role" && "Choose your role and get started"}
                {step === "details" && "Fill in your details"}
                {step === "otp" && "Verify your email address"}
                {step === "pending" && "Account pending approval"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === "role" && (
                <div className="space-y-4">
                  <Label>Select Your Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participant">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          <span>Participant</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mentor">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Mentor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="judge">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          <span>Judge</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-lg border bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      {role === "participant" && "Build innovative solutions and win prizes"}
                      {role === "mentor" && "Guide teams and share expertise"}
                      {role === "judge" && "Evaluate submissions and provide feedback"}
                      {role === "admin" && "Manage hackathons and coordinate events"}
                      {!role && "Select a role to see details"}
                    </p>
                  </div>
                  <Button onClick={handleRoleSubmit} disabled={!role} className="w-full">
                    Continue
                  </Button>
                </div>
              )}

            {step === "details" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" placeholder="Enter your name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" placeholder="Create password" />
                  </div>
                </div>
                <Button onClick={handleDetailsSubmit} disabled={!name || !email || !password} className="w-full">
                  {role === "admin" ? "Submit for Approval" : "Send OTP"}
                </Button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Verification Code Sent</p>
                      <p className="text-xs text-muted-foreground">
                        Check your inbox at <span className="font-medium text-foreground">{email}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                  <Input 
                    id="otp" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                    placeholder="000000" 
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                </div>
                <Button onClick={handleOtpSubmit} disabled={otp.length !== 6} className="w-full">
                  Verify & Complete Signup
                </Button>
                <button className="w-full text-center text-sm text-muted-foreground hover:text-primary">
                  Resend OTP
                </button>
              </div>
            )}

            {step === "pending" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50 dark:bg-yellow-950">
                  <AlertCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Admin Access Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Your admin account request has been submitted successfully.
                  </p>
                  <div className="mt-4 rounded-lg border bg-muted p-4">
                    <p className="text-sm">
                      You will receive an email at <span className="font-semibold text-foreground">{email}</span> once your account is verified by <span className="font-semibold text-primary">zidiohacks@gmail.com</span>
                    </p>
                  </div>
                </div>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            )}

            {step !== "pending" && (
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
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
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="text-lg text-muted-foreground">
            Access your dashboard and continue building innovative solutions
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-role">Role</Label>
                  <Select value={role} onValueChange={(value: any) => setRole(value)}>
                    <SelectTrigger id="login-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participant">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          <span>Participant</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mentor">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Mentor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="judge">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          <span>Judge</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" placeholder="Enter password" />
                  </div>
                </div>
                <Button onClick={handleLogin} disabled={!email || !password} className="w-full">
                  Login
                </Button>
              </div>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
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
