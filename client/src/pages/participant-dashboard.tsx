import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Users,
  FileText,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Bell,
  MessageSquare,
} from "lucide-react";
import { formatDate, getTimeRemaining, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";

const mockDashboardData = {
  stats: {
    activeHackathons: 3,
    submissions: 2,
    certificates: 5,
    teamMembers: 4,
  },
  activeHackathons: [
    {
      id: "1",
      title: "Smart India Hackathon 2025",
      status: "ongoing",
      deadline: new Date("2025-02-22"),
      teamName: "Tech Titans",
      progress: 75,
      problemStatement: "Smart Traffic Management System",
    },
    {
      id: "2",
      title: "TechnoVerse AI Challenge",
      status: "registration_open",
      deadline: new Date("2025-01-20"),
      teamName: null,
      progress: 0,
      problemStatement: null,
    },
  ],
  recentSubmissions: [
    {
      id: "sub-1",
      hackathonTitle: "FinTech Innovation Sprint",
      title: "PaySecure - UPI Fraud Detection",
      status: "scored",
      score: 85,
      submittedAt: new Date("2024-12-10"),
    },
    {
      id: "sub-2",
      hackathonTitle: "GreenTech Challenge",
      title: "EcoTrack - Carbon Footprint Monitor",
      status: "winner",
      score: 92,
      submittedAt: new Date("2024-11-25"),
    },
  ],
  announcements: [
    {
      id: "ann-1",
      hackathonTitle: "Smart India Hackathon 2025",
      title: "Submission deadline extended by 24 hours",
      priority: "high",
      publishedAt: new Date("2024-12-16"),
    },
    {
      id: "ann-2",
      hackathonTitle: "TechnoVerse AI Challenge",
      title: "New problem statement added in AI/ML category",
      priority: "normal",
      publishedAt: new Date("2024-12-15"),
    },
  ],
  team: {
    id: "team-1",
    name: "Tech Titans",
    members: [
      { id: "u1", name: "Arjun Sharma", role: "leader", avatar: null },
      { id: "u2", name: "Priya Patel", role: "member", avatar: null },
      { id: "u3", name: "Rohit Kumar", role: "member", avatar: null },
      { id: "u4", name: "Sneha Gupta", role: "member", avatar: null },
    ],
  },
};

function StatCard({ title, value, icon: Icon, trend }: { title: string; value: number | string; icon: React.ComponentType<{ className?: string }>; trend?: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ParticipantDashboard() {
  const { user, isLoading: authLoading } = useAuth();

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: () => Promise.resolve(mockDashboardData),
  });

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-dashboard-title">
                Welcome back, {user?.firstName || "Participant"}!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your hackathons
              </p>
            </div>
            <Link href="/explore">
              <Button data-testid="button-explore-hackathons">
                <Zap className="mr-2 h-4 w-4" />
                Find Hackathons
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto space-y-6 p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Hackathons"
            value={dashboard.stats.activeHackathons}
            icon={Trophy}
          />
          <StatCard
            title="Submissions"
            value={dashboard.stats.submissions}
            icon={FileText}
          />
          <StatCard
            title="Certificates Earned"
            value={dashboard.stats.certificates}
            icon={Award}
            trend="+2 this month"
          />
          <StatCard
            title="Team Members"
            value={dashboard.stats.teamMembers}
            icon={Users}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Hackathons */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-lg">Active Hackathons</CardTitle>
                <Link href="/explore">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboard.activeHackathons.map((hackathon) => (
                  <div
                    key={hackathon.id}
                    className="rounded-lg border p-4"
                    data-testid={`card-active-hackathon-${hackathon.id}`}
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{hackathon.title}</h3>
                        <Badge className={getStatusColor(hackathon.status)}>
                          {getStatusLabel(hackathon.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {getTimeRemaining(hackathon.deadline)}
                      </div>
                    </div>

                    {hackathon.teamName ? (
                      <div className="mb-3">
                        <div className="mb-1 flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Team: {hackathon.teamName}</span>
                        </div>
                        {hackathon.problemStatement && (
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>Problem: {hackathon.problemStatement}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mb-3 text-sm text-muted-foreground">
                        You haven't joined a team yet
                      </p>
                    )}

                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{hackathon.progress}%</span>
                    </div>
                    <Progress value={hackathon.progress} className="h-2" />

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/hackathon/${hackathon.id}`}>
                        <Button size="sm" variant="outline">View Details</Button>
                      </Link>
                      {hackathon.teamName ? (
                        <Link href="/submissions">
                          <Button size="sm">Make Submission</Button>
                        </Link>
                      ) : (
                        <Link href="/teams">
                          <Button size="sm">Join/Create Team</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}

                {dashboard.activeHackathons.length === 0 && (
                  <div className="py-8 text-center">
                    <Trophy className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 font-semibold">No Active Hackathons</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      You haven't registered for any hackathons yet
                    </p>
                    <Link href="/explore">
                      <Button>Explore Hackathons</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-lg">Recent Submissions</CardTitle>
                <Link href="/submissions">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboard.recentSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                      data-testid={`card-submission-${submission.id}`}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{submission.title}</p>
                        <p className="text-sm text-muted-foreground">{submission.hackathonTitle}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusLabel(submission.status)}
                        </Badge>
                        {submission.score && (
                          <div className="text-right">
                            <p className="text-lg font-bold">{submission.score}</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {dashboard.recentSubmissions.length === 0 && (
                    <div className="py-8 text-center">
                      <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">No submissions yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Current Team */}
            {dashboard.team && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-3 font-semibold">{dashboard.team.name}</h3>
                  <div className="space-y-2">
                    {dashboard.team.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || undefined} />
                          <AvatarFallback>
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs capitalize text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/teams">
                    <Button variant="outline" className="mt-4 w-full" size="sm">
                      Manage Team
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Announcements */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-4 w-4" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboard.announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`rounded-lg border p-3 ${
                        announcement.priority === "high"
                          ? "border-orange-500/50 bg-orange-500/5"
                          : ""
                      }`}
                    >
                      <p className="text-sm font-medium">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {announcement.hackathonTitle} • {formatDate(announcement.publishedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Mentor */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Mentor</h3>
                    <p className="text-xs text-muted-foreground">Get instant help</p>
                  </div>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Stuck on a problem? Our AI mentor can help with technical questions, project ideas, and more.
                </p>
                <Button className="w-full" size="sm" data-testid="button-ai-mentor">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link href="/teams">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Team Management
                  </Button>
                </Link>
                <Link href="/submissions">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    My Submissions
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" />
                    Certificates
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    My Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
