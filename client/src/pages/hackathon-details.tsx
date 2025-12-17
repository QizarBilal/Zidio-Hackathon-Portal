import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Globe,
  Mail,
  Building2,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowLeft,
  Share2,
  ExternalLink,
  FileText,
  Lightbulb,
  Award,
  AlertCircle,
} from "lucide-react";
import { formatDate, formatDateTime, formatCurrency, getTimeRemaining, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Hackathon, ProblemStatement } from "@shared/schema";

const mockHackathon: Hackathon = {
  id: "1",
  title: "Smart India Hackathon 2025",
  slug: "smart-india-hackathon-2025",
  description: `Smart India Hackathon (SIH) is India's biggest innovation marathon. It is a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving.

The first edition SIH2017 ثم was organized by AICTE, i4c, MHRD and NASSCOM. The 2025 edition continues this legacy with even bigger challenges and opportunities.

This year, we're focusing on:
- Smart Cities & Infrastructure
- Healthcare & Wellness
- Agriculture & Rural Development
- Clean & Green Technology
- Smart Vehicles
- Miscellaneous`,
  shortDescription: "India's largest open innovation model providing students a platform to solve pressing problems.",
  bannerImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80",
  organizerName: "Ministry of Education, Government of India",
  organizerLogoUrl: null,
  organizerType: "government",
  category: "Open Innovation",
  mode: "hybrid",
  venue: "Grand Finals at multiple nodal centers",
  city: "Pan India",
  state: null,
  country: "India",
  level: "national",
  prizePool: 5000000,
  currency: "INR",
  maxTeamSize: 6,
  minTeamSize: 4,
  maxParticipants: 50000,
  registrationStartDate: new Date("2024-12-01"),
  registrationEndDate: new Date("2025-01-15"),
  hackathonStartDate: new Date("2025-02-20"),
  hackathonEndDate: new Date("2025-02-22"),
  submissionDeadline: new Date("2025-02-22"),
  judgingStartDate: new Date("2025-02-23"),
  judgingEndDate: new Date("2025-02-25"),
  resultsDate: new Date("2025-02-28"),
  status: "registration_open",
  isPaid: false,
  entryFee: 0,
  eligibility: "Open to all students enrolled in recognized institutions across India",
  rules: `1. Team must consist of 4-6 members from the same institution
2. At least one team member should be female (encouraged but not mandatory)
3. Each team can submit solution for only one problem statement
4. Use of AI assistance tools is allowed with proper disclosure
5. All submissions must be original work
6. Previous SIH winners are not allowed to participate`,
  judgingCriteria: {
    innovation: 25,
    feasibility: 20,
    technical: 25,
    presentation: 15,
    impact: 15,
  },
  prizes: {
    first: { amount: 100000, title: "Grand Prize Winner" },
    second: { amount: 75000, title: "First Runner Up" },
    third: { amount: 50000, title: "Second Runner Up" },
    special: [
      { amount: 25000, title: "Best Women-Led Team" },
      { amount: 25000, title: "Most Innovative Solution" },
    ],
  },
  sponsors: ["AICTE", "NASSCOM", "MeitY"],
  partners: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIIT Hyderabad"],
  tags: ["innovation", "government", "national", "technology"],
  websiteUrl: "https://sih.gov.in",
  contactEmail: "support@sih.gov.in",
  isPublished: true,
  isFeatured: true,
  createdById: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProblemStatements: ProblemStatement[] = [
  {
    id: "ps-1",
    hackathonId: "1",
    title: "Smart Traffic Management System",
    description: "Develop an AI-powered traffic management system that can optimize signal timings based on real-time traffic density.",
    category: "Smart Cities",
    difficulty: "hard",
    expectedOutcome: "A working prototype with 30% improvement in traffic flow",
    resources: null,
    datasetUrl: null,
    maxSubmissions: 100,
    sponsorName: "Ministry of Road Transport",
    sponsorLogoUrl: null,
    prizeAmount: 100000,
    order: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "ps-2",
    hackathonId: "1",
    title: "Healthcare Appointment Optimization",
    description: "Create a platform that reduces patient waiting times and optimizes doctor schedules in government hospitals.",
    category: "Healthcare",
    difficulty: "medium",
    expectedOutcome: "Reduce average waiting time by 50%",
    resources: null,
    datasetUrl: null,
    maxSubmissions: 150,
    sponsorName: "Ministry of Health",
    sponsorLogoUrl: null,
    prizeAmount: 75000,
    order: 2,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "ps-3",
    hackathonId: "1",
    title: "Agricultural Yield Prediction",
    description: "Build a machine learning model to predict crop yields based on weather, soil, and historical data.",
    category: "Agriculture",
    difficulty: "hard",
    expectedOutcome: "Accuracy of 85% or above in yield prediction",
    resources: null,
    datasetUrl: "https://data.gov.in/agriculture",
    maxSubmissions: 120,
    sponsorName: "Ministry of Agriculture",
    sponsorLogoUrl: null,
    prizeAmount: 100000,
    order: 3,
    isActive: true,
    createdAt: new Date(),
  },
];

const timelineStages = [
  { id: "registration", label: "Registration", icon: Users, status: "completed" },
  { id: "problems", label: "Problem Release", icon: FileText, status: "completed" },
  { id: "hackathon", label: "Hackathon", icon: Target, status: "active" },
  { id: "judging", label: "Judging", icon: Lightbulb, status: "pending" },
  { id: "results", label: "Results", icon: Trophy, status: "pending" },
  { id: "certificates", label: "Certificates", icon: Award, status: "pending" },
];

export default function HackathonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: hackathon, isLoading } = useQuery<Hackathon>({
    queryKey: ["/api/hackathons", id],
    queryFn: () => Promise.resolve(mockHackathon),
  });

  const { data: problemStatements } = useQuery<ProblemStatement[]>({
    queryKey: ["/api/hackathons", id, "problems"],
    queryFn: () => Promise.resolve(mockProblemStatements),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-64 w-full" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-4 h-8 w-96" />
          <Skeleton className="mb-8 h-4 w-64" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Hackathon Not Found</h2>
          <p className="mb-4 text-muted-foreground">The hackathon you're looking for doesn't exist.</p>
          <Link href="/explore">
            <Button>Browse Hackathons</Button>
          </Link>
        </div>
      </div>
    );
  }

  const judgingCriteria = hackathon.judgingCriteria as Record<string, number> | null;
  const prizes = hackathon.prizes as { first?: { amount: number; title: string }; second?: { amount: number; title: string }; third?: { amount: number; title: string }; special?: { amount: number; title: string }[] } | null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-r from-primary/80 to-primary sm:h-80">
        {hackathon.bannerImageUrl && (
          <img
            src={hackathon.bannerImageUrl}
            alt={hackathon.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-6">
          <Link href="/explore" className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Explore
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(hackathon.status || "draft")}>
              {getStatusLabel(hackathon.status || "draft")}
            </Badge>
            <Badge variant="secondary">{hackathon.category}</Badge>
            <Badge variant="outline" className="border-white/30 text-white capitalize">
              {hackathon.mode}
            </Badge>
            {hackathon.level && (
              <Badge variant="outline" className="border-white/30 text-white capitalize">
                {hackathon.level}
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl" data-testid="text-hackathon-title">
            {hackathon.title}
          </h1>
          <div className="mt-2 flex items-center gap-1 text-white/80">
            {hackathon.organizerType === "government" ? (
              <Building2 className="h-4 w-4" />
            ) : hackathon.organizerType === "university" ? (
              <GraduationCap className="h-4 w-4" />
            ) : (
              <Building2 className="h-4 w-4" />
            )}
            <span>{hackathon.organizerName}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {timelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`flex flex-col items-center ${stage.status === "active" ? "text-primary" : stage.status === "completed" ? "text-green-500" : "text-muted-foreground"}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${stage.status === "active" ? "border-primary bg-primary/10" : stage.status === "completed" ? "border-green-500 bg-green-500/10" : "border-muted"}`}>
                    <stage.icon className="h-4 w-4" />
                  </div>
                  <span className="mt-1 whitespace-nowrap text-xs font-medium">{stage.label}</span>
                </div>
                {index < timelineStages.length - 1 && (
                  <div className={`mx-2 h-0.5 w-8 sm:w-16 ${stage.status === "completed" ? "bg-green-500" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="problems" data-testid="tab-problems">Problem Statements</TabsTrigger>
                <TabsTrigger value="rules" data-testid="tab-rules">Rules & Eligibility</TabsTrigger>
                <TabsTrigger value="prizes" data-testid="tab-prizes">Prizes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About the Hackathon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {hackathon.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-muted-foreground">{para}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {judgingCriteria && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Judging Criteria</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(judgingCriteria).map(([key, value]) => (
                        <div key={key}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="capitalize">{key}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Registration Opens</span>
                        <span className="font-medium">{formatDate(hackathon.registrationStartDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Registration Closes</span>
                        <span className="font-medium">{formatDate(hackathon.registrationEndDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Hackathon Starts</span>
                        <span className="font-medium">{formatDateTime(hackathon.hackathonStartDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Submission Deadline</span>
                        <span className="font-medium">{formatDateTime(hackathon.submissionDeadline)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Results Announcement</span>
                        <span className="font-medium">{formatDate(hackathon.resultsDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="problems" className="space-y-4">
                {problemStatements && problemStatements.length > 0 ? (
                  problemStatements.map((ps) => (
                    <Card key={ps.id} data-testid={`card-problem-${ps.id}`}>
                      <CardContent className="p-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{ps.category}</Badge>
                          <Badge variant="outline" className="capitalize">{ps.difficulty}</Badge>
                          {ps.prizeAmount && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                              <Trophy className="mr-1 h-3 w-3" />
                              {formatCurrency(ps.prizeAmount)}
                            </Badge>
                          )}
                        </div>
                        <h3 className="mb-2 font-semibold">{ps.title}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">{ps.description}</p>
                        {ps.expectedOutcome && (
                          <div className="flex items-start gap-2 rounded-md bg-muted p-3">
                            <Target className="mt-0.5 h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs font-medium">Expected Outcome</p>
                              <p className="text-sm text-muted-foreground">{ps.expectedOutcome}</p>
                            </div>
                          </div>
                        )}
                        {ps.sponsorName && (
                          <p className="mt-3 text-xs text-muted-foreground">
                            Sponsored by: {ps.sponsorName}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold">Problem Statements Coming Soon</h3>
                      <p className="text-center text-sm text-muted-foreground">
                        Problem statements will be released before the hackathon begins.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rules" className="space-y-6">
                {hackathon.eligibility && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{hackathon.eligibility}</p>
                    </CardContent>
                  </Card>
                )}

                {hackathon.rules && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hackathon.rules.split('\n').map((rule, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Team Size: {hackathon.minTeamSize} - {hackathon.maxTeamSize} members</span>
                      </div>
                      {hackathon.isPaid && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span>Entry Fee: {formatCurrency(hackathon.entryFee || 0)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prizes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Total Prize Pool: {formatCurrency(hackathon.prizePool || 0)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {prizes && (
                      <div className="grid gap-4 sm:grid-cols-3">
                        {prizes.first && (
                          <div className="rounded-lg border bg-gradient-to-b from-yellow-500/10 to-transparent p-4 text-center">
                            <div className="mb-2 text-3xl">1st</div>
                            <div className="text-xl font-bold">{formatCurrency(prizes.first.amount)}</div>
                            <div className="text-sm text-muted-foreground">{prizes.first.title}</div>
                          </div>
                        )}
                        {prizes.second && (
                          <div className="rounded-lg border bg-gradient-to-b from-gray-400/10 to-transparent p-4 text-center">
                            <div className="mb-2 text-3xl">2nd</div>
                            <div className="text-xl font-bold">{formatCurrency(prizes.second.amount)}</div>
                            <div className="text-sm text-muted-foreground">{prizes.second.title}</div>
                          </div>
                        )}
                        {prizes.third && (
                          <div className="rounded-lg border bg-gradient-to-b from-orange-500/10 to-transparent p-4 text-center">
                            <div className="mb-2 text-3xl">3rd</div>
                            <div className="text-xl font-bold">{formatCurrency(prizes.third.amount)}</div>
                            <div className="text-sm text-muted-foreground">{prizes.third.title}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {prizes?.special && prizes.special.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Special Awards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {prizes.special.map((award, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                            <Award className="h-8 w-8 text-primary" />
                            <div>
                              <div className="font-semibold">{award.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(award.amount)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-xl font-bold">
                        {formatCurrency(hackathon.prizePool || 0)}
                      </span>
                    </div>
                    {!hackathon.isPaid && (
                      <Badge variant="secondary">Free Entry</Badge>
                    )}
                  </div>

                  <div className="mb-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(hackathon.hackathonStartDate)} - {formatDate(hackathon.hackathonEndDate)}</span>
                    </div>
                    {hackathon.city && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{hackathon.city}, {hackathon.country}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{hackathon.minTeamSize}-{hackathon.maxTeamSize} members per team</span>
                    </div>
                    {hackathon.registrationEndDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{getTimeRemaining(hackathon.registrationEndDate)}</span>
                      </div>
                    )}
                  </div>

                  {isAuthenticated ? (
                    <Link href={`/hackathon/${id}/register`}>
                      <Button className="w-full" size="lg" data-testid="button-register">
                        Register Now
                      </Button>
                    </Link>
                  ) : (
                    <a href="/api/login">
                      <Button className="w-full" size="lg" data-testid="button-login-to-register">
                        Login to Register
                      </Button>
                    </a>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" data-testid="button-share">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                    {hackathon.websiteUrl && (
                      <a href={hackathon.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Website
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-3 font-semibold">Contact Organizers</h3>
                  <div className="space-y-2 text-sm">
                    {hackathon.contactEmail && (
                      <a
                        href={`mailto:${hackathon.contactEmail}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{hackathon.contactEmail}</span>
                      </a>
                    )}
                    {hackathon.websiteUrl && (
                      <a
                        href={hackathon.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Official Website</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
