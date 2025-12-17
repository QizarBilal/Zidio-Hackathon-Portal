import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Trophy,
  Users,
  FileText,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  BarChart3,
  Megaphone,
  Award,
  Download,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Building2,
} from "lucide-react";
import { formatDate, formatNumber, getStatusColor, getStatusLabel } from "@/lib/utils";

const mockAdminData = {
  stats: {
    totalHackathons: 15,
    activeHackathons: 5,
    totalParticipants: 45678,
    totalSubmissions: 3245,
    pendingReviews: 156,
  },
  hackathons: [
    {
      id: "1",
      title: "Smart India Hackathon 2025",
      status: "ongoing",
      participants: 12500,
      teams: 2500,
      submissions: 890,
      startDate: new Date("2025-02-20"),
      endDate: new Date("2025-02-22"),
    },
    {
      id: "2",
      title: "TechnoVerse AI Challenge",
      status: "registration_open",
      participants: 8750,
      teams: 2100,
      submissions: 0,
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-03"),
    },
    {
      id: "3",
      title: "FinTech Innovation Sprint",
      status: "upcoming",
      participants: 4200,
      teams: 980,
      submissions: 0,
      startDate: new Date("2025-02-15"),
      endDate: new Date("2025-02-16"),
    },
    {
      id: "4",
      title: "GreenTech Challenge 2024",
      status: "completed",
      participants: 6800,
      teams: 1420,
      submissions: 1350,
      startDate: new Date("2024-11-10"),
      endDate: new Date("2024-11-12"),
    },
  ],
  recentParticipants: [
    { id: "u1", name: "Arjun Sharma", email: "arjun@example.com", hackathon: "SIH 2025", registeredAt: new Date("2024-12-15") },
    { id: "u2", name: "Priya Patel", email: "priya@example.com", hackathon: "SIH 2025", registeredAt: new Date("2024-12-15") },
    { id: "u3", name: "Rohit Kumar", email: "rohit@example.com", hackathon: "TechnoVerse", registeredAt: new Date("2024-12-14") },
    { id: "u4", name: "Sneha Gupta", email: "sneha@example.com", hackathon: "FinTech Sprint", registeredAt: new Date("2024-12-14") },
    { id: "u5", name: "Vikram Singh", email: "vikram@example.com", hackathon: "SIH 2025", registeredAt: new Date("2024-12-13") },
  ],
  announcements: [
    { id: "a1", title: "Submission deadline extended", hackathon: "SIH 2025", priority: "high", publishedAt: new Date("2024-12-16") },
    { id: "a2", title: "New problem statements added", hackathon: "TechnoVerse", priority: "normal", publishedAt: new Date("2024-12-15") },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [createHackathonOpen, setCreateHackathonOpen] = useState(false);
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);

  const { data: adminData } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: () => Promise.resolve(mockAdminData),
  });

  if (!adminData) return null;

  const { stats, hackathons, recentParticipants, announcements } = adminData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-admin-dashboard-title">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage hackathons, participants, and platform settings
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={createAnnouncementOpen} onOpenChange={setCreateAnnouncementOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Megaphone className="mr-2 h-4 w-4" />
                    New Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                    <DialogDescription>Send an announcement to participants</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Select Hackathon</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select hackathon" /></SelectTrigger>
                        <SelectContent>
                          {hackathons.map((h) => (
                            <SelectItem key={h.id} value={h.id}>{h.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input placeholder="Announcement title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="Write your announcement..." rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                    <Button variant="outline" onClick={() => setCreateAnnouncementOpen(false)}>Cancel</Button>
                    <Button>Publish Announcement</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={createHackathonOpen} onOpenChange={setCreateHackathonOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-hackathon">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Hackathon
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Hackathon</DialogTitle>
                    <DialogDescription>Set up a new hackathon event</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] space-y-4 overflow-y-auto py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Hackathon Title</Label>
                        <Input placeholder="Enter hackathon title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai-ml">AI/ML</SelectItem>
                            <SelectItem value="web3">Web3</SelectItem>
                            <SelectItem value="fintech">FinTech</SelectItem>
                            <SelectItem value="healthtech">HealthTech</SelectItem>
                            <SelectItem value="open">Open Innovation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Describe the hackathon..." rows={3} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input type="datetime-local" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Prize Pool (INR)</Label>
                        <Input type="number" placeholder="500000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Min Team Size</Label>
                        <Input type="number" defaultValue="2" />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Team Size</Label>
                        <Input type="number" defaultValue="6" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Mode</Label>
                        <Select defaultValue="online">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Level</Label>
                        <Select defaultValue="national">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="national">National</SelectItem>
                            <SelectItem value="state">State</SelectItem>
                            <SelectItem value="university">University</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateHackathonOpen(false)}>Cancel</Button>
                    <Button>Create Hackathon</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hackathons</p>
                <p className="text-2xl font-bold">{stats.totalHackathons}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.activeHackathons}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-2xl font-bold">{formatNumber(stats.totalParticipants)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submissions</p>
                <p className="text-2xl font-bold">{formatNumber(stats.totalSubmissions)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{stats.pendingReviews}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hackathons" data-testid="tab-hackathons">
              <Trophy className="mr-2 h-4 w-4" />
              Hackathons
            </TabsTrigger>
            <TabsTrigger value="participants" data-testid="tab-participants">
              <Users className="mr-2 h-4 w-4" />
              Participants
            </TabsTrigger>
            <TabsTrigger value="announcements" data-testid="tab-announcements">
              <Megaphone className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Active Hackathons */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                  <CardTitle className="text-lg">Active Hackathons</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/hackathons">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {hackathons.slice(0, 4).map((hackathon) => (
                      <div key={hackathon.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{hackathon.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(hackathon.status)}>
                          {getStatusLabel(hackathon.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Registrations */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                  <CardTitle className="text-lg">Recent Registrations</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentParticipants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground">{participant.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{participant.hackathon}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDate(participant.registeredAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hackathons">
            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-2">
                <CardTitle className="text-lg">All Hackathons</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search hackathons..." className="w-64 pl-10" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hackathon</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Teams</TableHead>
                      <TableHead className="text-center">Submissions</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hackathons.map((hackathon) => (
                      <TableRow key={hackathon.id}>
                        <TableCell className="font-medium">{hackathon.title}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(hackathon.status)}>
                            {getStatusLabel(hackathon.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{formatNumber(hackathon.participants)}</TableCell>
                        <TableCell className="text-center">{formatNumber(hackathon.teams)}</TableCell>
                        <TableCell className="text-center">{formatNumber(hackathon.submissions)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(hackathon.startDate)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-2">
                <CardTitle className="text-lg">All Participants</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search participants..." className="w-64 pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Hackathons</SelectItem>
                      {hackathons.map((h) => (
                        <SelectItem key={h.id} value={h.id}>{h.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Hackathon</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{participant.hackathon}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(participant.registeredAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-lg">Announcements</CardTitle>
                <Button onClick={() => setCreateAnnouncementOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge
                            className={
                              announcement.priority === "high"
                                ? "bg-orange-500/10 text-orange-600"
                                : announcement.priority === "urgent"
                                ? "bg-red-500/10 text-red-600"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {announcement.hackathon} • {formatDate(announcement.publishedAt)}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
