import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Users,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Megaphone,
  CheckCircle2,
  Clock,
  TrendingUp,
  Bell,
  Calendar,
  Shield,
  AlertTriangle,
  BarChart3,
  UserCheck,
} from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";

const adminData = {
  stats: {
    totalHackathons: 18,
    activeHackathons: 6,
    totalParticipants: 52340,
    totalSubmissions: 4127,
    pendingApprovals: 24,
  },
  recentActivity: [
    { type: "hackathon", message: "New hackathon created: Healthcare AI Sprint", time: "2 hours ago" },
    { type: "approval", message: "45 team registrations approved", time: "4 hours ago" },
    { type: "announcement", message: "Critical announcement sent to 12,500 participants", time: "6 hours ago" },
    { type: "concern", message: "2 concerns flagged by mentors require attention", time: "1 day ago" },
  ],
  activeHackathons: [
    {
      id: "h1",
      name: "Smart India Hackathon 2025",
      status: "ongoing",
      organizer: "Ministry of Education, Govt. of India",
      participants: 12500,
      teams: 2890,
      submissions: 1240,
      progress: 75,
      startDate: "Feb 20, 2025",
      endDate: "Feb 22, 2025",
    },
    {
      id: "h2",
      name: "TechnoVerse AI Challenge",
      status: "registration",
      organizer: "Google Cloud India",
      participants: 8750,
      teams: 2100,
      submissions: 0,
      progress: 40,
      startDate: "Feb 1, 2025",
      endDate: "Feb 3, 2025",
    },
    {
      id: "h3",
      name: "FinTech Innovation Sprint",
      status: "evaluation",
      organizer: "NPCI & Razorpay",
      participants: 6200,
      teams: 1480,
      submissions: 1420,
      progress: 92,
      startDate: "Jan 15, 2025",
      endDate: "Jan 17, 2025",
    },
    {
      id: "h4",
      name: "Healthcare AI Sprint",
      status: "upcoming",
      organizer: "AIIMS & Microsoft Health",
      participants: 3400,
      teams: 820,
      submissions: 0,
      progress: 15,
      startDate: "Mar 5, 2025",
      endDate: "Mar 7, 2025",
    },
  ],
  pendingApprovals: [
    {
      id: "app1",
      type: "team_registration",
      teamName: "Code Warriors",
      hackathon: "Smart India Hackathon 2025",
      submittedAt: "Dec 18, 2025, 3:45 PM",
      memberCount: 5,
    },
    {
      id: "app2",
      type: "team_registration",
      teamName: "AI Innovators",
      hackathon: "TechnoVerse AI Challenge",
      submittedAt: "Dec 18, 2025, 2:20 PM",
      memberCount: 4,
    },
    {
      id: "app3",
      type: "mentor_application",
      name: "Dr. Ramesh Kumar",
      hackathon: "Healthcare AI Sprint",
      submittedAt: "Dec 17, 2025, 5:15 PM",
      expertise: "AI/ML, Healthcare Tech",
    },
  ],
  systemHealth: {
    serverStatus: "operational",
    databaseLoad: 45,
    apiResponseTime: 124,
    activeUsers: 3420,
  },
  upcomingActions: [
    {
      action: "Announce winners for FinTech Innovation Sprint",
      deadline: "Dec 25, 2025",
      priority: "high",
    },
    {
      action: "Review and approve 24 pending team registrations",
      deadline: "Dec 20, 2025",
      priority: "medium",
    },
    {
      action: "Send reminder for Smart India Hackathon final submission",
      deadline: "Dec 22, 2025",
      priority: "high",
    },
  ],
  recentAnnouncements: [
    {
      id: "ann1",
      title: "Extended Submission Deadline",
      hackathon: "Smart India Hackathon 2025",
      priority: "high",
      publishedAt: "Dec 16, 2025",
      recipients: 12500,
    },
    {
      id: "ann2",
      title: "New Problem Statements Released",
      hackathon: "TechnoVerse AI Challenge",
      priority: "normal",
      publishedAt: "Dec 14, 2025",
      recipients: 8750,
    },
  ],
  platformMetrics: {
    avgEngagement: 87,
    submissionQuality: 82,
    participantSatisfaction: 4.6,
    completionRate: 78,
  },
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [createHackathonOpen, setCreateHackathonOpen] = useState(false);
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementPriority, setAnnouncementPriority] = useState("normal");
  const [hackathonTitle, setHackathonTitle] = useState("");

  const { data } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: () => Promise.resolve(adminData),
  });

  if (!data) return null;

  const handleCreateHackathon = () => {
    if (!hackathonTitle.trim()) {
      alert("Please enter a hackathon title.");
      return;
    }

    console.log("Creating hackathon:", {
      title: hackathonTitle,
      // Additional fields would be captured from form
    });

    alert(`Hackathon "${hackathonTitle}" created successfully!`);
    setHackathonTitle("");
    setCreateHackathonOpen(false);
  };

  const handlePublishAnnouncement = () => {
    if (!selectedHackathon || !announcementTitle.trim() || !announcementMessage.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Publishing announcement:", {
      hackathon: selectedHackathon,
      title: announcementTitle,
      message: announcementMessage,
      priority: announcementPriority,
    });

    alert(`Announcement "${announcementTitle}" published successfully!`);
    setSelectedHackathon("");
    setAnnouncementTitle("");
    setAnnouncementMessage("");
    setAnnouncementPriority("normal");
    setCreateAnnouncementOpen(false);
  };

  const handleViewHackathon = (hackathonId: string) => {
    setLocation(`/hackathon/${hackathonId}`);
  };

  const handleEditHackathon = (hackathonId: string) => {
    console.log("Editing hackathon:", hackathonId);
    alert(`Opening editor for hackathon ID: ${hackathonId}`);
  };

  const handleDeleteHackathon = (hackathonId: string, hackathonName: string) => {
    if (confirm(`Are you sure you want to delete "${hackathonName}"? This action cannot be undone.`)) {
      console.log("Deleting hackathon:", hackathonId);
      alert(`Hackathon "${hackathonName}" deleted successfully.`);
    }
  };

  const handleApproveApplication = (applicationId: string, type: string) => {
    console.log("Approving application:", applicationId, type);
    alert(`${type} application approved successfully!`);
  };

  const handleRejectApplication = (applicationId: string) => {
    if (confirm("Are you sure you want to reject this application?")) {
      console.log("Rejecting application:", applicationId);
      alert("Application rejected.");
    }
  };

  const handleDeleteAnnouncement = (announcementId: string, title: string) => {
    if (confirm(`Delete announcement "${title}"?`)) {
      console.log("Deleting announcement:", announcementId);
      alert("Announcement deleted successfully.");
    }
  };

  const handleExportData = (type: string) => {
    console.log("Exporting data:", type);
    alert(`Exporting ${type} data...`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage hackathons, users, and platform operations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setCreateAnnouncementOpen(true)}>
                <Megaphone className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
              <Button onClick={() => setCreateHackathonOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Hackathon
              </Button>
              <Button variant="outline" size="icon" onClick={() => setNotificationsOpen(true)}>
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hackathons</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.totalHackathons}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.activeHackathons}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Participants</p>
                  <p className="text-3xl font-bold mt-2">{formatNumber(data.stats.totalParticipants)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submissions</p>
                  <p className="text-3xl font-bold mt-2">{formatNumber(data.stats.totalSubmissions)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold mt-2">{data.stats.pendingApprovals}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Health & Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Avg Engagement</span>
                  <span className="text-sm font-bold">{data.platformMetrics.avgEngagement}%</span>
                </div>
                <Progress value={data.platformMetrics.avgEngagement} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Submission Quality</span>
                  <span className="text-sm font-bold">{data.platformMetrics.submissionQuality}%</span>
                </div>
                <Progress value={data.platformMetrics.submissionQuality} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Satisfaction</span>
                  <span className="text-sm font-bold">{data.platformMetrics.participantSatisfaction}/5</span>
                </div>
                <Progress value={(data.platformMetrics.participantSatisfaction / 5) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm font-bold">{data.platformMetrics.completionRate}%</span>
                </div>
                <Progress value={data.platformMetrics.completionRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Hackathons & Approvals */}
          <div className="space-y-6 lg:col-span-2">
            {/* Active Hackathons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Hackathons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.activeHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{hackathon.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{hackathon.organizer}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant={
                            hackathon.status === "ongoing" ? "default" :
                            hackathon.status === "registration" ? "secondary" :
                            hackathon.status === "evaluation" ? "outline" : "secondary"
                          }>
                            {hackathon.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {hackathon.startDate} - {hackathon.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleViewHackathon(hackathon.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditHackathon(hackathon.id)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteHackathon(hackathon.id, hackathon.name)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center py-3 border-t">
                      <div>
                        <p className="text-lg font-bold">{formatNumber(hackathon.participants)}</p>
                        <p className="text-xs text-muted-foreground">Participants</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{formatNumber(hackathon.teams)}</p>
                        <p className="text-xs text-muted-foreground">Teams</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{formatNumber(hackathon.submissions)}</p>
                        <p className="text-xs text-muted-foreground">Submissions</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{hackathon.progress}%</span>
                      </div>
                      <Progress value={hackathon.progress} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Approvals ({data.pendingApprovals.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {approval.type === "team_registration" ? "Team Registration" : "Mentor Application"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">
                          {approval.type === "team_registration" ? approval.teamName : approval.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{approval.hackathon}</p>
                        {approval.type === "team_registration" && (
                          <p className="text-xs text-muted-foreground mt-1">{approval.memberCount} members</p>
                        )}
                        {approval.type === "mentor_application" && approval.expertise && (
                          <p className="text-xs text-muted-foreground mt-1">Expertise: {approval.expertise}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">{approval.submittedAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApproveApplication(approval.id, approval.type)}>
                          <CheckCircle2 className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRejectApplication(approval.id)}>
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & System */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <Badge variant="default" className="bg-green-500">
                    {data.systemHealth.serverStatus}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Database Load</span>
                    <span className="font-medium">{data.systemHealth.databaseLoad}%</span>
                  </div>
                  <Progress value={data.systemHealth.databaseLoad} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response</span>
                  <span className="text-sm font-bold">{data.systemHealth.apiResponseTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-bold">{formatNumber(data.systemHealth.activeUsers)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.upcomingActions.map((action, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant={action.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{action.action}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {action.deadline}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === "hackathon" ? "bg-purple-500/10" :
                      activity.type === "approval" ? "bg-green-500/10" :
                      activity.type === "announcement" ? "bg-blue-500/10" :
                      "bg-orange-500/10"
                    }`}>
                      {activity.type === "hackathon" && <Trophy className="h-4 w-4 text-purple-500" />}
                      {activity.type === "approval" && <UserCheck className="h-4 w-4 text-green-500" />}
                      {activity.type === "announcement" && <Megaphone className="h-4 w-4 text-blue-500" />}
                      {activity.type === "concern" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDeleteAnnouncement(announcement.id, announcement.title)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{announcement.hackathon}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {announcement.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatNumber(announcement.recipients)} recipients</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{announcement.publishedAt}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Create Hackathon Dialog */}
        <Dialog open={createHackathonOpen} onOpenChange={setCreateHackathonOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Hackathon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="hackathonTitle">Hackathon Title *</Label>
                <Input
                  id="hackathonTitle"
                  placeholder="Enter hackathon title"
                  value={hackathonTitle}
                  onChange={(e) => setHackathonTitle(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ml">AI/ML</SelectItem>
                      <SelectItem value="web3">Web3/Blockchain</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="edutech">EduTech</SelectItem>
                      <SelectItem value="open">Open Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Mode</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the hackathon objectives..." rows={3} className="mt-2" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Start Date & Time</Label>
                  <Input type="datetime-local" className="mt-2" />
                </div>
                <div>
                  <Label>End Date & Time</Label>
                  <Input type="datetime-local" className="mt-2" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Prize Pool (₹)</Label>
                  <Input type="number" placeholder="500000" className="mt-2" />
                </div>
                <div>
                  <Label>Min Team Size</Label>
                  <Input type="number" defaultValue="2" className="mt-2" />
                </div>
                <div>
                  <Label>Max Team Size</Label>
                  <Input type="number" defaultValue="6" className="mt-2" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setHackathonTitle("");
                setCreateHackathonOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleCreateHackathon} disabled={!hackathonTitle.trim()}>
                <Plus className="mr-2 h-4 w-4" />
                Create Hackathon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Announcement Dialog */}
        <Dialog open={createAnnouncementOpen} onOpenChange={setCreateAnnouncementOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Select Hackathon *</Label>
                <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select hackathon" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.activeHackathons.map((h) => (
                      <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="announcementTitle">Title *</Label>
                <Input
                  id="announcementTitle"
                  placeholder="Announcement title"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="announcementMessage">Message *</Label>
                <Textarea
                  id="announcementMessage"
                  placeholder="Write your announcement..."
                  rows={4}
                  value={announcementMessage}
                  onChange={(e) => setAnnouncementMessage(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={announcementPriority} onValueChange={setAnnouncementPriority}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setSelectedHackathon("");
                setAnnouncementTitle("");
                setAnnouncementMessage("");
                setAnnouncementPriority("normal");
                setCreateAnnouncementOpen(false);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handlePublishAnnouncement}
                disabled={!selectedHackathon || !announcementTitle.trim() || !announcementMessage.trim()}
              >
                <Megaphone className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notifications Sheet */}
        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications & Alerts</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div className="p-4 border rounded-lg border-orange-500/20 bg-orange-500/5">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">2 Concerns Flagged</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mentors have flagged concerns for 2 teams requiring admin attention
                    </p>
                    <Button variant="link" size="sm" className="mt-2 h-auto p-0">View Concerns</Button>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Platform Usage Spike</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      45% increase in concurrent users detected
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">3 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Hackathon Completed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      FinTech Innovation Sprint concluded successfully
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">High Registration Volume</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1,200+ registrations in last 24 hours for Smart India Hackathon
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
