import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  Plus,
  Copy,
  Check,
  Crown,
  UserPlus,
  Settings,
  Trash2,
  Search,
  LogOut,
  Link as LinkIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getInitials, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Team, TeamMember } from "@shared/schema";

const mockTeams = [
  {
    id: "team-1",
    hackathonId: "1",
    hackathonTitle: "Smart India Hackathon 2025",
    name: "Tech Titans",
    description: "Building innovative solutions for smart traffic management",
    inviteCode: "TT2025X",
    leaderId: "u1",
    status: "active",
    problemStatement: "Smart Traffic Management System",
    members: [
      { id: "m1", userId: "u1", name: "Arjun Sharma", email: "arjun@example.com", role: "leader", skills: ["React", "Node.js", "Python"] },
      { id: "m2", userId: "u2", name: "Priya Patel", email: "priya@example.com", role: "member", skills: ["UI/UX", "Figma", "React"] },
      { id: "m3", userId: "u3", name: "Rohit Kumar", email: "rohit@example.com", role: "member", skills: ["Python", "ML", "TensorFlow"] },
      { id: "m4", userId: "u4", name: "Sneha Gupta", email: "sneha@example.com", role: "member", skills: ["Backend", "Django", "PostgreSQL"] },
    ],
    maxSize: 6,
    isLookingForMembers: true,
    requiredSkills: ["DevOps", "Mobile Development"],
  },
  {
    id: "team-2",
    hackathonId: "2",
    hackathonTitle: "TechnoVerse AI Challenge",
    name: "AI Innovators",
    description: "Exploring the frontiers of artificial intelligence",
    inviteCode: "AI2025Y",
    leaderId: "u1",
    status: "active",
    problemStatement: null,
    members: [
      { id: "m5", userId: "u1", name: "Arjun Sharma", email: "arjun@example.com", role: "leader", skills: ["React", "Node.js", "Python"] },
      { id: "m6", userId: "u5", name: "Kiran Rao", email: "kiran@example.com", role: "member", skills: ["ML", "Deep Learning", "PyTorch"] },
    ],
    maxSize: 4,
    isLookingForMembers: true,
    requiredSkills: ["NLP", "Computer Vision"],
  },
];

const mockOpenTeams = [
  {
    id: "team-open-1",
    hackathonTitle: "Smart India Hackathon 2025",
    name: "Code Crusaders",
    description: "Looking for passionate developers to build healthcare solutions",
    memberCount: 3,
    maxSize: 6,
    requiredSkills: ["React", "Node.js", "Healthcare Domain"],
    leaderId: "other-user",
    leaderName: "Vikram Singh",
  },
  {
    id: "team-open-2",
    hackathonTitle: "Smart India Hackathon 2025",
    name: "Green Warriors",
    description: "Building sustainable tech solutions for agriculture",
    memberCount: 4,
    maxSize: 6,
    requiredSkills: ["Python", "IoT", "Data Science"],
    leaderId: "other-user-2",
    leaderName: "Anjali Verma",
  },
];

export default function TeamsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-teams");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const { data: teams } = useQuery({
    queryKey: ["/api/teams"],
    queryFn: () => Promise.resolve(mockTeams),
  });

  const { data: openTeams } = useQuery({
    queryKey: ["/api/teams/open"],
    queryFn: () => Promise.resolve(mockOpenTeams),
  });

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: "Copied!", description: "Invite code copied to clipboard" });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleJoinTeam = () => {
    if (!inviteCode.trim()) {
      toast({ title: "Error", description: "Please enter an invite code", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Join request sent to team leader" });
    setJoinDialogOpen(false);
    setInviteCode("");
  };

  const isTeamLeader = (team: typeof mockTeams[0]) => {
    return team.leaderId === "u1"; // Simulating current user
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-teams-title">
                Team Management
              </h1>
              <p className="text-muted-foreground">
                Create, join, and manage your hackathon teams
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" data-testid="button-join-team">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Join with Code
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join a Team</DialogTitle>
                    <DialogDescription>
                      Enter the invite code shared by your team leader
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-code">Invite Code</Label>
                      <Input
                        id="invite-code"
                        placeholder="Enter 6-character code"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        maxLength={10}
                        data-testid="input-invite-code"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleJoinTeam} data-testid="button-submit-join">
                      Join Team
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-team">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>
                      Create a team for an upcoming hackathon
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-name">Team Name</Label>
                      <Input id="team-name" placeholder="Enter team name" data-testid="input-team-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team-description">Description</Label>
                      <Textarea
                        id="team-description"
                        placeholder="What will your team build?"
                        data-testid="input-team-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hackathon-select">Select Hackathon</Label>
                      <select
                        id="hackathon-select"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        data-testid="select-hackathon"
                      >
                        <option value="">Select a hackathon</option>
                        <option value="1">Smart India Hackathon 2025</option>
                        <option value="2">TechnoVerse AI Challenge</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button data-testid="button-submit-create">Create Team</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-teams" data-testid="tab-my-teams">
              <Users className="mr-2 h-4 w-4" />
              My Teams
            </TabsTrigger>
            <TabsTrigger value="find-teams" data-testid="tab-find-teams">
              <Search className="mr-2 h-4 w-4" />
              Find Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-teams" className="space-y-6">
            {teams && teams.length > 0 ? (
              teams.map((team) => (
                <Card key={team.id} data-testid={`card-team-${team.id}`}>
                  <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 pb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        {isTeamLeader(team) && (
                          <Badge variant="secondary">
                            <Crown className="mr-1 h-3 w-3" />
                            Leader
                          </Badge>
                        )}
                        <Badge className={getStatusColor(team.status)}>
                          {getStatusLabel(team.status)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{team.hackathonTitle}</p>
                    </div>
                    {isTeamLeader(team) && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="mr-1 h-4 w-4" />
                          Settings
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{team.description}</p>

                    {team.problemStatement && (
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-xs font-medium text-muted-foreground">Problem Statement</p>
                        <p className="text-sm">{team.problemStatement}</p>
                      </div>
                    )}

                    {/* Invite Code */}
                    <div className="flex flex-wrap items-center gap-4 rounded-md border p-3">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Invite Code</p>
                        <p className="font-mono text-lg font-semibold">{team.inviteCode}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyInviteCode(team.inviteCode)}
                        data-testid={`button-copy-code-${team.id}`}
                      >
                        {copiedCode === team.inviteCode ? (
                          <Check className="mr-1 h-4 w-4" />
                        ) : (
                          <Copy className="mr-1 h-4 w-4" />
                        )}
                        {copiedCode === team.inviteCode ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    {/* Team Members */}
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold">
                          Team Members ({team.members.length}/{team.maxSize})
                        </h3>
                        {isTeamLeader(team) && team.members.length < team.maxSize && (
                          <Button variant="outline" size="sm">
                            <UserPlus className="mr-1 h-4 w-4" />
                            Invite
                          </Button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {team.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{member.name}</p>
                                  {member.role === "leader" && (
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {member.skills?.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {isTeamLeader(team) && member.role !== "leader" && (
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Looking for Members */}
                    {team.isLookingForMembers && team.requiredSkills && team.requiredSkills.length > 0 && (
                      <div className="rounded-md bg-blue-500/10 p-3">
                        <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                          Looking for team members with:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {team.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isTeamLeader(team) && (
                      <Button variant="outline" className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Leave Team
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center py-12">
                  <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No Teams Yet</h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    Create a new team or join an existing one to participate in hackathons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
                      Join with Code
                    </Button>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                      Create Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="find-teams" className="space-y-6">
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search teams by name or skills..."
                  className="pl-10"
                  data-testid="input-search-teams"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {openTeams?.map((team) => (
                <Card key={team.id} data-testid={`card-open-team-${team.id}`}>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">{team.name}</h3>
                      <p className="text-xs text-muted-foreground">{team.hackathonTitle}</p>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{team.description}</p>

                    <div className="mb-3 flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{team.memberCount}/{team.maxSize} members</span>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1 text-xs text-muted-foreground">Looking for:</p>
                      <div className="flex flex-wrap gap-1">
                        {team.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Led by {team.leaderName}</span>
                    </div>

                    <Button className="mt-4 w-full" size="sm" data-testid={`button-request-join-${team.id}`}>
                      Request to Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {(!openTeams || openTeams.length === 0) && (
              <Card>
                <CardContent className="flex flex-col items-center py-12">
                  <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No Open Teams Found</h3>
                  <p className="text-center text-muted-foreground">
                    Check back later or create your own team
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
