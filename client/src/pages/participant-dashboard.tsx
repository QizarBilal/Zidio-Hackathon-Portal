import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Trophy,
  Users,
  FileText,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  Target,
  Bell,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Github,
  Figma,
  Video,
  FileCode,
  ChevronRight,
  Upload,
  BarChart3,
  Download,
  Share2,
  Zap,
  Building2,
  MapPin,
  TrendingUp,
  GraduationCap,
  MessageSquare,
  UserPlus,
  User,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPinned,
  Briefcase,
  Edit,
} from "lucide-react";
import { formatDate, getTimeRemaining, formatCurrency } from "@/lib/utils";

const userProfileData = {
  name: "Demo Participant",
  email: "participant@demo.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  institution: "Indian Institute of Technology, Bombay",
  degree: "B.Tech in Computer Science",
  year: "3rd Year",
  skills: ["React", "Node.js", "Python", "Machine Learning", "UI/UX Design"],
  bio: "Passionate developer and problem solver with experience in full-stack development and AI/ML projects.",
  github: "https://github.com/demouser",
  linkedin: "https://linkedin.com/in/demouser",
  portfolio: "https://demouser.dev"
};

const dashboardData = {
  activeHackathons: [
    {
      id: "1",
      title: "Smart India Hackathon 2025",
      organizer: "Ministry of Education, Government of India",
      organizerType: "government",
      status: "Live",
      statusType: "active",
      teamSize: 4,
      maxTeamSize: 6,
      deadline: new Date("2025-02-22T23:59:59"),
      phase: "Submission Phase",
      teamName: "Tech Innovators",
      problemStatement: "Smart Traffic Management for Tier-2 Cities",
      prizePool: 5000000,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
      mode: "hybrid",
      city: "Pan India"
    },
    {
      id: "2",
      title: "TechnoVerse AI Challenge",
      organizer: "IIT Delhi",
      organizerType: "university",
      status: "Registration Open",
      statusType: "registration",
      teamSize: 0,
      maxTeamSize: 4,
      deadline: new Date("2025-01-20T23:59:59"),
      phase: "Team Formation",
      teamName: null,
      problemStatement: null,
      prizePool: 1500000,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
      mode: "online",
      city: "Online"
    }
  ],
  upcomingDeadlines: [
    {
      id: "d1",
      hackathon: "Smart India Hackathon 2025",
      task: "Project Submission",
      dueDate: new Date("2025-02-22T23:59:59"),
      type: "critical"
    },
    {
      id: "d2",
      hackathon: "Smart India Hackathon 2025",
      task: "Demo Video Upload",
      dueDate: new Date("2025-02-21T18:00:00"),
      type: "important"
    },
    {
      id: "d3",
      hackathon: "TechnoVerse AI Challenge",
      task: "Team Formation Closes",
      dueDate: new Date("2025-01-18T23:59:59"),
      type: "normal"
    }
  ],
  team: {
    hackathon: "Smart India Hackathon 2025",
    name: "Tech Innovators",
    members: [
      { name: "Arjun Sharma", role: "Team Leader", institution: "IIT Bombay" },
      { name: "Priya Desai", role: "Full Stack Developer", institution: "IIT Bombay" },
      { name: "Rahul Verma", role: "UI/UX Designer", institution: "NIT Trichy" },
      { name: "Ananya Iyer", role: "ML Engineer", institution: "IIIT Hyderabad" }
    ],
    mentor: "Dr. Rajesh Kumar, IIT Delhi"
  },
  submissions: {
    hackathon: "Smart India Hackathon 2025",
    status: "In Progress",
    links: {
      github: "https://github.com/techinnovators/smart-traffic",
      figma: null,
      docs: "https://docs.google.com/document/...",
      video: null
    },
    lastUpdated: new Date("2025-02-18T14:30:00")
  },
  announcements: [
    {
      id: "a1",
      source: "Smart India Hackathon 2025",
      message: "Submission deadline extended to February 22, 11:59 PM",
      timestamp: new Date("2025-02-17T09:00:00"),
      type: "urgent"
    },
    {
      id: "a2",
      source: "TechnoVerse AI Challenge",
      message: "Mentor allocation completed. Check your dashboard.",
      timestamp: new Date("2025-02-16T16:45:00"),
      type: "info"
    },
    {
      id: "a3",
      source: "Platform Update",
      message: "New certificate download feature now available",
      timestamp: new Date("2025-02-15T11:20:00"),
      type: "info"
    }
  ],
  leaderboard: {
    hackathon: "Smart India Hackathon 2025",
    rank: 47,
    totalTeams: 2847,
    score: null,
    status: "Judging in progress"
  },
  certificates: [
    {
      id: "c1",
      hackathon: "FinTech Innovation Sprint 2024",
      achievement: "Winner - Best Innovation",
      issuedDate: new Date("2024-12-15"),
      verified: true
    },
    {
      id: "c2",
      hackathon: "GreenTech Solutions Challenge",
      achievement: "Participation Certificate",
      issuedDate: new Date("2024-11-20"),
      verified: true
    }
  ]
};

export default function ParticipantDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(userProfileData);
  const [editingProfile, setEditingProfile] = useState(userProfileData);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["/api/dashboard/participant"],
    queryFn: () => Promise.resolve(dashboardData),
  });

  const handleProfileSave = () => {
    setUserProfile(editingProfile);
    setProfileDialogOpen(false);
    // Show success toast
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleInviteMember = (hackathonId: string) => {
    alert(`Invite member feature for hackathon ${hackathonId}. This would open an email invite dialog.`);
  };

  const handleTeamChat = (hackathonId: string) => {
    alert(`Opening team chat for hackathon ${hackathonId}. This would open a chat interface.`);
  };

  const handleDownloadCertificate = (certId: string) => {
    alert(`Downloading certificate ${certId}. This would trigger a PDF download.`);
  };

  const handleShareCertificate = (certId: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: 'Check out my hackathon achievement!',
        url: window.location.href
      });
    } else {
      alert(`Share certificate ${certId}. Link copied to clipboard!`);
    }
  };

  const handleFileUpload = (type: string, hackathonId: string) => {
    alert(`Upload ${type} for hackathon ${hackathonId}. This would open a file picker.`);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <Skeleton className="h-6 sm:h-8 w-48 sm:w-64" />
          </div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <Skeleton className="h-24 sm:h-32" />
          <Skeleton className="h-64 sm:h-96" />
        </div>
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight truncate">Participant Dashboard</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">Welcome back, {userProfile.name}!</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Notifications Sheet */}
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>Stay updated with your hackathon activities</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {dashboard?.announcements.slice(0, 5).map((announcement) => (
                      <div key={announcement.id} className="border-b pb-4">
                        <p className="text-sm font-medium">{announcement.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{announcement.source} • {formatDate(announcement.timestamp)}</p>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Profile Dialog */}
              <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your profile information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editingProfile.name}
                          onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editingProfile.email}
                          onChange={(e) => setEditingProfile({...editingProfile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editingProfile.phone}
                          onChange={(e) => setEditingProfile({...editingProfile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editingProfile.location}
                          onChange={(e) => setEditingProfile({...editingProfile, location: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          value={editingProfile.institution}
                          onChange={(e) => setEditingProfile({...editingProfile, institution: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                          id="degree"
                          value={editingProfile.degree}
                          onChange={(e) => setEditingProfile({...editingProfile, degree: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editingProfile.bio}
                        onChange={(e) => setEditingProfile({...editingProfile, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                          id="github"
                          value={editingProfile.github}
                          onChange={(e) => setEditingProfile({...editingProfile, github: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          value={editingProfile.linkedin}
                          onChange={(e) => setEditingProfile({...editingProfile, linkedin: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          value={editingProfile.portfolio}
                          onChange={(e) => setEditingProfile({...editingProfile, portfolio: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleProfileSave}>Save Changes</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <ThemeToggle />

              {/* Logout Button */}
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={handleLogout}>
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
        
        {/* Welcome Header */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Here's what's happening with your hackathons today.</p>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-500" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Active</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{dashboard.activeHackathons.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Hackathons</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-500" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Urgent</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{dashboard.upcomingDeadlines.filter(d => d.type === 'critical').length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Deadlines</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-500" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Rank</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">#{dashboard.leaderboard.rank}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">of {dashboard.leaderboard.totalTeams.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Earned</span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{dashboard.certificates.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Certificates</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              My Active Hackathons
            </h2>
            <Badge variant="secondary" className="text-xs">
              {dashboard.activeHackathons.length} Active
            </Badge>
          </div>
          
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {dashboard.activeHackathons.map((hackathon) => (
              <Link key={hackathon.id} href={`/hackathon/${hackathon.id}`}>
                <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge variant={hackathon.statusType === "active" ? "default" : "secondary"} className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                        {hackathon.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 capitalize">
                        {hackathon.mode}
                      </Badge>
                    </div>
                    <h3 className="mb-1 text-sm sm:text-base font-semibold line-clamp-2 leading-tight">{hackathon.title}</h3>
                    <div className="flex items-center gap-1 mb-2 text-xs sm:text-sm text-muted-foreground">
                      {hackathon.organizerType === "government" ? (
                        <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      ) : (
                        <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      )}
                      <span className="truncate">{hackathon.organizer}</span>
                    </div>
                    
                    <div className="space-y-1.5 text-xs sm:text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prize Pool</span>
                        <span className="font-semibold text-primary">{formatCurrency(hackathon.prizePool)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="font-medium">{hackathon.teamSize} / {hackathon.maxTeamSize} members</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                        <span className="font-medium">{getTimeRemaining(hackathon.deadline)}</span>
                      </div>
                    </div>

                    {hackathon.teamName ? (
                      <div className="space-y-2">
                        <div className="p-2 rounded-md bg-primary/5 border border-primary/20">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                            <span className="font-medium truncate">{hackathon.teamName}</span>
                          </div>
                          {hackathon.problemStatement && (
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 line-clamp-1">{hackathon.problemStatement}</p>
                          )}
                        </div>
                        <div className="flex gap-1.5">
                          <Button 
                            size="sm" 
                            className="flex-1 h-7 text-xs gap-1"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Continue working on ${hackathon.title}`);
                            }}
                          >
                            <FileText className="h-3 w-3" />
                            Continue
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 h-7 text-xs gap-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTeamChat(hackathon.id);
                            }}
                          >
                            <MessageSquare className="h-3 w-3" />
                            Team
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-700 dark:text-amber-500 mb-2">
                          <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                          <span className="font-medium">Team formation pending</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full h-7 text-xs gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                            handleInviteMember(hackathon.id);
                          }}
                        >
                          <UserPlus className="h-3 w-3" />
                          Form Team
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions - Mobile Only */}
        <div className="lg:hidden">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs gap-1.5 bg-background/50"
                  onClick={() => handleFileUpload('Project Files', dashboard.activeHackathons[0]?.title || 'Project')}
                >
                  <Upload className="h-3 w-3" />
                  Upload Work
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs gap-1.5 bg-background/50"
                  onClick={() => handleTeamChat(dashboard.activeHackathons[0]?.id || '1')}
                >
                  <MessageSquare className="h-3 w-3" />
                  Team Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Upcoming Deadlines
              </h2>
              
              <div className="border rounded-lg bg-card">
                <div className="divide-y">
                  {dashboard.upcomingDeadlines.map((deadline, idx) => (
                    <div key={deadline.id} className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4 hover:bg-accent/5 transition-colors">
                      <div className="relative">
                        <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 ${
                          deadline.type === "critical" ? "bg-red-100 dark:bg-red-950" :
                          deadline.type === "important" ? "bg-orange-100 dark:bg-orange-950" :
                          "bg-blue-100 dark:bg-blue-950"
                        }`}>
                          <Clock className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            deadline.type === "critical" ? "text-red-600 dark:text-red-400" :
                            deadline.type === "important" ? "text-orange-600 dark:text-orange-400" :
                            "text-blue-600 dark:text-blue-400"
                          }`} />
                        </div>
                        {idx < dashboard.upcomingDeadlines.length - 1 && (
                          <div className="absolute left-1/2 top-8 sm:top-10 w-px h-8 sm:h-10 bg-border -translate-x-1/2" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                        <p className="font-medium text-xs sm:text-sm lg:text-base leading-tight">{deadline.task}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">{deadline.hackathon}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 flex items-center gap-1 flex-wrap">
                          <span>{formatDate(deadline.dueDate)}</span>
                          <span>•</span>
                          <span className="font-medium">{getTimeRemaining(deadline.dueDate)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Submission Progress
                </h2>
                <Badge variant={dashboard.submissions.status === "In Progress" ? "secondary" : "default"} className="text-xs">
                  {dashboard.submissions.status}
                </Badge>
              </div>
              
              <div className="border rounded-lg bg-card p-3 sm:p-4">
                <div className="mb-3">
                  <p className="font-medium text-sm sm:text-base truncate">{dashboard.submissions.hackathon}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ 
                          width: `${[
                            dashboard.submissions.links.github,
                            dashboard.submissions.links.figma,
                            dashboard.submissions.links.docs,
                            dashboard.submissions.links.video
                          ].filter(Boolean).length * 25}%` 
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {[
                        dashboard.submissions.links.github,
                        dashboard.submissions.links.figma,
                        dashboard.submissions.links.docs,
                        dashboard.submissions.links.video
                      ].filter(Boolean).length}/4
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border bg-background/50">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">GitHub Repository</span>
                    </div>
                    {dashboard.submissions.links.github ? (
                      <a href={dashboard.submissions.links.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-6 sm:h-7 gap-1 text-xs px-2 shrink-0">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 gap-1 text-xs px-2 text-muted-foreground shrink-0"
                        onClick={() => handleFileUpload('GitHub Repository', dashboard.submissions.hackathon)}
                      >
                        <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border bg-background/50">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Figma className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">Design Files</span>
                    </div>
                    {dashboard.submissions.links.figma ? (
                      <a href={dashboard.submissions.links.figma} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-6 sm:h-7 gap-1 text-xs px-2 shrink-0">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 gap-1 text-xs px-2 text-muted-foreground shrink-0"
                        onClick={() => handleFileUpload('Design Files', dashboard.submissions.hackathon)}
                      >
                        <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border bg-background/50">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FileCode className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">Documentation</span>
                    </div>
                    {dashboard.submissions.links.docs ? (
                      <a href={dashboard.submissions.links.docs} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-6 sm:h-7 gap-1 text-xs px-2 shrink-0">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 gap-1 text-xs px-2 text-muted-foreground shrink-0"
                        onClick={() => handleFileUpload('Documentation', dashboard.submissions.hackathon)}
                      >
                        <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border bg-background/50">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">Demo Video</span>
                    </div>
                    {dashboard.submissions.links.video ? (
                      <a href={dashboard.submissions.links.video} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-6 sm:h-7 gap-1 text-xs px-2 shrink-0">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 gap-1 text-xs px-2 text-muted-foreground shrink-0"
                        onClick={() => handleFileUpload('Demo Video', dashboard.submissions.hackathon)}
                      >
                        <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-3 pt-3 border-t">
                  Last updated: {formatDate(dashboard.submissions.lastUpdated)}
                </p>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Team Activity
              </h2>
              
              <div className="border rounded-lg bg-card p-3 sm:p-4">
                <div className="mb-3 pb-3 border-b">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm sm:text-base truncate">{dashboard.team.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {dashboard.team.members.length} Members
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{dashboard.team.hackathon}</p>
                </div>

                <div className="space-y-2">
                  {dashboard.team.members.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 transition-colors">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      </div>
                      {member.role === "Leader" && (
                        <Badge variant="secondary" className="text-xs shrink-0">Lead</Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs">
                  <Target className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-muted-foreground">Mentor:</span>
                  <span className="font-medium truncate flex-1">{dashboard.team.mentor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Latest Updates
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {dashboard.announcements.length} New
                </Badge>
              </div>
              
              <div className="border rounded-lg bg-card divide-y max-h-[350px] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
                {dashboard.announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`p-2.5 sm:p-3.5 hover:bg-accent/30 transition-colors ${
                      announcement.type === "urgent" ? "bg-red-50/50 dark:bg-red-950/20 border-l-2 border-l-red-500" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {announcement.type === "urgent" ? (
                        <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium leading-snug">{announcement.message}</p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs flex-wrap">
                          <span className="text-primary font-medium truncate">{announcement.source}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground truncate">{formatDate(announcement.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Your Performance
              </h2>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground mb-2 truncate">{dashboard.leaderboard.hackathon}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Your Rank</p>
                      <p className="text-3xl sm:text-4xl font-bold text-primary">#{dashboard.leaderboard.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">of {dashboard.leaderboard.totalTeams.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">Top 2%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/30">
                  <p className="text-xs text-center text-muted-foreground">{dashboard.leaderboard.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Recent Achievements
              </h2>
              
              <div className="border rounded-lg bg-card divide-y">
                {dashboard.certificates.map((cert) => (
                  <div key={cert.id} className="p-3 sm:p-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 flex items-center justify-center shrink-0 shadow-sm">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold leading-tight truncate">{cert.achievement}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{cert.hackathon}</p>
                        <div className="flex items-center gap-1.5 text-xs mt-1.5 flex-wrap">
                          <span className="text-muted-foreground">{formatDate(cert.issuedDate)}</span>
                          {cert.verified && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <div className="flex items-center gap-0.5 text-green-600 dark:text-green-500">
                                <CheckCircle2 className="h-3 w-3 shrink-0" />
                                <span className="font-medium">Verified</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 sm:h-7 text-xs gap-1 px-2 hover:bg-primary/10"
                            onClick={() => handleDownloadCertificate(cert.id)}
                          >
                            <Download className="h-3 w-3 shrink-0" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 sm:h-7 text-xs gap-1 px-2 hover:bg-primary/10"
                            onClick={() => handleShareCertificate(cert.id)}
                          >
                            <Share2 className="h-3 w-3 shrink-0" />
                            <span className="hidden sm:inline">Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
