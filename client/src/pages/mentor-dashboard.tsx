import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Users,
  Clock,
  MessageSquare,
  FileText,
  Github,
  Figma,
  Video,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap,
  TrendingUp,
  Flag,
  ExternalLink,
  Edit,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const mentorData = {
  profile: {
    name: "Dr. Rajesh Kumar",
    role: "Technical Mentor",
    expertise: ["Machine Learning", "Cloud Architecture", "Full Stack Development", "DevOps"],
    organization: "Microsoft Research India",
    experience: "15 years in technology",
    hackathonsMentored: 28,
    teamsGuided: 142
  },
  activeHackathons: [
    {
      id: "h1",
      name: "Smart India Hackathon 2025",
      organizer: "Ministry of Education, Government of India",
      organizerType: "government",
      phase: "Development Phase",
      teamsAssigned: 4,
      mentorRole: "Technical Mentor",
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-02-28")
    },
    {
      id: "h2",
      name: "FinTech Innovation Challenge",
      organizer: "HDFC Bank & IIT Bombay",
      organizerType: "corporate",
      phase: "Ideation Phase",
      teamsAssigned: 3,
      mentorRole: "Domain Expert",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-03-15")
    },
    {
      id: "h3",
      name: "Healthcare AI Sprint",
      organizer: "Apollo Hospitals",
      organizerType: "corporate",
      phase: "Submission Phase",
      teamsAssigned: 2,
      mentorRole: "Technical Mentor",
      startDate: new Date("2024-12-10"),
      endDate: new Date("2025-01-30")
    }
  ],
  assignedTeams: [
    {
      id: "t1",
      name: "Code Crusaders",
      hackathon: "Smart India Hackathon 2025",
      leader: "Priya Sharma",
      teamSize: 6,
      problemStatement: "AI-powered Traffic Management System for Tier-2 Cities",
      progress: 68,
      status: "On Track",
      lastInteraction: new Date("2025-01-17T14:30:00"),
      stage: "Prototype Development",
      concerns: []
    },
    {
      id: "t2",
      name: "InnoVentures",
      hackathon: "Smart India Hackathon 2025",
      leader: "Arjun Patel",
      teamSize: 5,
      problemStatement: "Smart Energy Grid Optimization using IoT",
      progress: 45,
      status: "Needs Guidance",
      lastInteraction: new Date("2025-01-16T10:15:00"),
      stage: "Architecture Design",
      concerns: ["Technical feasibility", "Timeline alignment"]
    },
    {
      id: "t3",
      name: "TechTitans",
      hackathon: "Smart India Hackathon 2025",
      leader: "Sneha Deshmukh",
      teamSize: 6,
      problemStatement: "Blockchain-based Agricultural Supply Chain",
      progress: 82,
      status: "Exceeding Expectations",
      lastInteraction: new Date("2025-01-17T16:45:00"),
      stage: "Testing & Refinement",
      concerns: []
    },
    {
      id: "t4",
      name: "Digital Innovators",
      hackathon: "Smart India Hackathon 2025",
      leader: "Rahul Verma",
      teamSize: 4,
      problemStatement: "Rural Healthcare Telemedicine Platform",
      progress: 38,
      status: "Behind Schedule",
      lastInteraction: new Date("2025-01-15T11:20:00"),
      stage: "Initial Development",
      concerns: ["Resource constraints", "Technical debt"]
    },
    {
      id: "t5",
      name: "FinTech Pioneers",
      hackathon: "FinTech Innovation Challenge",
      leader: "Aditya Singh",
      teamSize: 5,
      problemStatement: "AI-driven Credit Risk Assessment for MSMEs",
      progress: 25,
      status: "Early Stage",
      lastInteraction: new Date("2025-01-16T15:00:00"),
      stage: "Problem Validation",
      concerns: []
    }
  ],
  upcomingSessions: [
    {
      id: "s1",
      type: "Team Review",
      team: "Code Crusaders",
      dateTime: new Date("2025-01-19T15:00:00"),
      duration: "60 min",
      mode: "Virtual"
    },
    {
      id: "s2",
      type: "Office Hours",
      team: "Open to all teams",
      dateTime: new Date("2025-01-20T10:00:00"),
      duration: "120 min",
      mode: "Virtual"
    },
    {
      id: "s3",
      type: "Demo Review",
      team: "TechTitans",
      dateTime: new Date("2025-01-21T14:00:00"),
      duration: "45 min",
      mode: "In-person"
    },
    {
      id: "s4",
      type: "Technical Discussion",
      team: "InnoVentures",
      dateTime: new Date("2025-01-22T11:00:00"),
      duration: "90 min",
      mode: "Virtual"
    }
  ],
  submissions: [
    {
      id: "sub1",
      team: "TechTitans",
      hackathon: "Smart India Hackathon 2025",
      submittedDate: new Date("2025-01-17T18:30:00"),
      status: "Pending Review",
      links: {
        github: "https://github.com/techTitans/agri-blockchain",
        figma: "https://figma.com/file/xyz",
        docs: "https://docs.google.com/document/xyz",
        video: "https://youtube.com/watch?v=xyz"
      }
    },
    {
      id: "sub2",
      team: "Digital Innovators",
      hackathon: "Smart India Hackathon 2025",
      submittedDate: new Date("2025-01-16T22:15:00"),
      status: "Reviewed",
      links: {
        github: "https://github.com/digitalInnovators/telemedicine",
        docs: "https://docs.google.com/document/abc"
      }
    }
  ],
  announcements: [
    {
      id: "a1",
      source: "SIH 2025 Organizing Committee",
      message: "Mid-evaluation phase begins next week. Please complete team progress reviews.",
      timestamp: new Date("2025-01-18T09:00:00"),
      type: "important",
      read: false
    },
    {
      id: "a2",
      source: "Team: InnoVentures",
      message: "Request for technical guidance on microservices architecture implementation.",
      timestamp: new Date("2025-01-17T20:30:00"),
      type: "request",
      read: false
    },
    {
      id: "a3",
      source: "Platform Update",
      message: "New feedback template available for submission reviews.",
      timestamp: new Date("2025-01-17T14:00:00"),
      type: "info",
      read: true
    },
    {
      id: "a4",
      source: "Admin",
      message: "Mentor feedback session scheduled for January 25th at 4 PM.",
      timestamp: new Date("2025-01-16T16:00:00"),
      type: "info",
      read: true
    }
  ]
};

export default function MentorDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [concernText, setConcernText] = useState("");

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["/api/dashboard/mentor"],
    queryFn: () => Promise.resolve(mentorData),
  });

  const handleProvideFeedback = (teamId: string) => {
    setSelectedTeam(teamId);
    setFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      alert("Please provide feedback before submitting.");
      return;
    }
    console.log(`Feedback submitted for team ${selectedTeam}:`, {
      feedback: feedbackText,
      concerns: concernText,
      timestamp: new Date().toISOString()
    });
    alert(`Feedback successfully submitted for team ${selectedTeam}`);
    setFeedbackDialogOpen(false);
    setFeedbackText("");
    setConcernText("");
    setSelectedTeam(null);
  };

  const handleFlagConcern = (teamId: string) => {
    const team = dashboard?.assignedTeams.find(t => t.id === teamId);
    const confirmFlag = confirm(`Flag concern for team "${team?.name}"?\n\nThis will notify administrators for review.`);
    if (confirmFlag) {
      console.log(`Concern flagged for team ${teamId}:`, {
        teamName: team?.name,
        timestamp: new Date().toISOString()
      });
      alert(`Concern flagged for ${team?.name}. Admin team has been notified.`);
    }
  };

  const handleMarkReviewed = (submissionId: string) => {
    const submission = dashboard?.submissions.find(s => s.id === submissionId);
    const confirmReview = confirm(`Mark submission from "${submission?.team}" as reviewed?`);
    if (confirmReview) {
      console.log(`Submission ${submissionId} marked as reviewed:`, {
        team: submission?.team,
        timestamp: new Date().toISOString()
      });
      alert(`Submission from ${submission?.team} marked as reviewed.`);
    }
  };

  const handleViewTeamDetails = (teamId: string) => {
    const team = dashboard?.assignedTeams.find(t => t.id === teamId);
    console.log(`Viewing team details for ${teamId}:`, team);
    alert(`Opening detailed view for team "${team?.name}".\n\nIn production, this would navigate to /teams/${teamId}`);
  };

  const handleOpenDiscussion = (teamId: string) => {
    const team = dashboard?.assignedTeams.find(t => t.id === teamId);
    console.log(`Opening discussion for team ${teamId}`);
    alert(`Opening discussion channel for team "${team?.name}".\n\nIn production, this would open a real-time chat interface.`);
  };

  const handleViewHackathon = (hackathonId: string) => {
    const hackathon = dashboard?.activeHackathons.find(h => h.id === hackathonId);
    console.log(`Viewing hackathon ${hackathonId}:`, hackathon);
    window.location.href = `/hackathon/${hackathonId}`;
  };

  const handleEditProfile = () => {
    alert("Opening profile editor.\n\nIn production, this would open a detailed profile editing form.");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-64" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!dashboard) return null;

  const unreadCount = dashboard.announcements.filter(a => !a.read).length;
  const teamsNeedingAttention = dashboard.assignedTeams.filter(t => 
    t.status === "Needs Guidance" || t.status === "Behind Schedule"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Mentor Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {dashboard.activeHackathons.length} active mentorships · {dashboard.assignedTeams.length} teams assigned
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>Updates and requests from your teams</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {dashboard.announcements.map((announcement) => (
                      <div key={announcement.id} className={`border-b pb-4 ${!announcement.read ? 'border-l-2 border-l-primary pl-3' : ''}`}>
                        <div className="flex items-start gap-2">
                          {announcement.type === "request" && (
                            <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          )}
                          {announcement.type === "important" && (
                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-500 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{announcement.message}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{announcement.source}</span>
                              <span>·</span>
                              <span>{formatDate(announcement.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Hackathons</span>
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{dashboard.activeHackathons.length}</p>
          </div>
          <div className="border rounded-lg bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Teams Assigned</span>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{dashboard.assignedTeams.length}</p>
          </div>
          <div className="border rounded-lg bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Needs Attention</span>
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
            </div>
            <p className="text-3xl font-bold">{teamsNeedingAttention}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Active Hackathons</h2>
              <div className="border rounded-lg bg-card divide-y">
                {dashboard.activeHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="p-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{hackathon.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {hackathon.organizerType === "government" ? (
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span className="truncate">{hackathon.organizer}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">{hackathon.phase}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Teams Assigned: </span>
                        <span className="font-medium">{hackathon.teamsAssigned}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Role: </span>
                        <span className="font-medium">{hackathon.mentorRole}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewHackathon(hackathon.id)}
                    >
                      View Hackathon
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Assigned Teams</h2>
              <div className="border rounded-lg bg-card divide-y">
                {dashboard.assignedTeams.map((team) => (
                  <div key={team.id} className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{team.name}</h3>
                          <Badge 
                            variant={
                              team.status === "Exceeding Expectations" ? "default" :
                              team.status === "On Track" ? "secondary" :
                              team.status === "Needs Guidance" ? "outline" :
                              "destructive"
                            }
                            className="text-xs"
                          >
                            {team.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{team.hackathon}</p>
                        <p className="text-sm font-medium mb-1">{team.problemStatement}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Lead: {team.leader}</span>
                          <span>·</span>
                          <span>{team.teamSize} members</span>
                          <span>·</span>
                          <span>{team.stage}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-bold text-primary">{team.progress}%</div>
                        <div className="text-xs text-muted-foreground">Progress</div>
                      </div>
                    </div>
                    
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full transition-all ${
                          team.status === "Exceeding Expectations" ? "bg-green-600" :
                          team.status === "On Track" ? "bg-primary" :
                          team.status === "Needs Guidance" ? "bg-orange-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${team.progress}%` }}
                      />
                    </div>

                    <div className="text-xs text-muted-foreground mb-3">
                      Last interaction: {formatDate(team.lastInteraction)}
                    </div>

                    {team.concerns.length > 0 && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded p-2 mb-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-500 mt-0.5 shrink-0" />
                          <div className="text-xs text-amber-700 dark:text-amber-500">
                            <span className="font-medium">Flagged concerns: </span>
                            {team.concerns.join(", ")}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewTeamDetails(team.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleOpenDiscussion(team.id)}
                      >
                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                        Discussion
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleProvideFeedback(team.id)}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Feedback
                      </Button>
                      {(team.status === "Needs Guidance" || team.status === "Behind Schedule") && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFlagConcern(team.id)}
                          title="Flag concern to admin"
                        >
                          <Flag className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Submission Reviews</h2>
              <div className="border rounded-lg bg-card divide-y">
                {dashboard.submissions.map((submission) => (
                  <div key={submission.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{submission.team}</h3>
                        <p className="text-sm text-muted-foreground">{submission.hackathon}</p>
                      </div>
                      <Badge variant={submission.status === "Pending Review" ? "secondary" : "default"}>
                        {submission.status}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      Submitted: {formatDate(submission.submittedDate)}
                    </div>

                    <div className="space-y-2 mb-3">
                      {submission.links.github && (
                        <a href={submission.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Github className="h-4 w-4 shrink-0" />
                          <span>GitHub Repository</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {submission.links.figma && (
                        <a href={submission.links.figma} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Figma className="h-4 w-4 shrink-0" />
                          <span>Design Files</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {submission.links.docs && (
                        <a href={submission.links.docs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <FileText className="h-4 w-4 shrink-0" />
                          <span>Documentation</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {submission.links.video && (
                        <a href={submission.links.video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Video className="h-4 w-4 shrink-0" />
                          <span>Demo Video</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleProvideFeedback(submission.team)}
                      >
                        Provide Feedback
                      </Button>
                      {submission.status === "Pending Review" && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleMarkReviewed(submission.id)}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Mark Reviewed
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
              <div className="border rounded-lg bg-card divide-y">
                {dashboard.upcomingSessions.map((session, idx) => (
                  <div key={session.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        {idx < dashboard.upcomingSessions.length - 1 && (
                          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="font-medium text-sm mb-1">{session.type}</div>
                        <div className="text-sm text-muted-foreground mb-1">{session.team}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 shrink-0" />
                          <span>{formatDate(session.dateTime)}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <Badge variant="outline" className="text-xs">{session.duration}</Badge>
                          <Badge variant="secondary" className="text-xs">{session.mode}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Announcements</h2>
              <div className="border rounded-lg bg-card divide-y max-h-96 overflow-y-auto">
                {dashboard.announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`p-4 ${
                      announcement.type === "important" ? "bg-orange-50/30 dark:bg-orange-950/10" : 
                      announcement.type === "request" ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!announcement.read && (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">{announcement.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{announcement.source}</span>
                          <span>·</span>
                          <span>{formatDate(announcement.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Mentor Profile</h2>
              <div className="border rounded-lg bg-card p-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">
                      {dashboard.profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{dashboard.profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{dashboard.profile.role}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Organization:</span>
                    <p className="font-medium">{dashboard.profile.organization}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <p className="font-medium">{dashboard.profile.experience}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expertise:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {dashboard.profile.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                    <div>
                      <div className="text-xl font-bold text-primary">{dashboard.profile.hackathonsMentored}</div>
                      <div className="text-xs text-muted-foreground">Hackathons</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{dashboard.profile.teamsGuided}</div>
                      <div className="text-xs text-muted-foreground">Teams Guided</div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4" 
                  size="sm"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              Share your guidance and insights with the team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback & Guidance</Label>
              <Textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Provide constructive feedback, technical suggestions, or guidance..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concern">Flag Concerns (Optional - Private to Admin)</Label>
              <Textarea
                id="concern"
                value={concernText}
                onChange={(e) => setConcernText(e.target.value)}
                placeholder="Flag any concerns regarding timeline, technical feasibility, or team dynamics..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setFeedbackDialogOpen(false);
                setFeedbackText("");
                setConcernText("");
                setSelectedTeam(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitFeedback}
              disabled={!feedbackText.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
